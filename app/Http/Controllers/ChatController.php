<?php

namespace App\Http\Controllers;

use App\Models\ChatMessage;
use App\Models\ChatSession;
use App\Events\ChatMessageSent;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class ChatController extends Controller
{
    /**
     * Start a new chat session.
     */
    public function startSession(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        // Generate unique session ID
        $sessionId = Str::uuid();

        $chatSession = ChatSession::create([
            'session_id' => $sessionId,
            'guest_name' => $request->name,
            'guest_email' => $request->email,
            'guest_phone' => $request->phone,
            'last_activity_at' => now(),
            'metadata' => [
                'ip_address' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'url' => $request->header('referer'),
            ],
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Chat session dimulai!',
            'data' => [
                'session_id' => $sessionId,
                'chat_session' => $chatSession
            ]
        ])->cookie('chat_session_id', $sessionId, 60 * 24 * 7); // 7 days
    }

    /**
     * Send a chat message.
     */
    public function sendMessage(Request $request): JsonResponse
    {
        try {
            \Log::info('SendMessage request received', [
                'data' => $request->all(),
                'user' => auth()->user() ? auth()->user()->id : 'guest',
                'headers' => $request->headers->all()
            ]);

            $validator = Validator::make($request->all(), [
                'session_id' => 'required|string',
                'message' => 'required|string|max:1000',
                'sender_type' => 'required|in:guest,admin',
            ]);

            if ($validator->fails()) {
                \Log::error('Validation failed', ['errors' => $validator->errors()]);
                return response()->json([
                    'success' => false,
                    'errors' => $validator->errors()
                ], 422);
            }

            // Find chat session
            $chatSession = ChatSession::where('session_id', $request->session_id)->first();

            if (!$chatSession) {
                \Log::error('Chat session not found', ['session_id' => $request->session_id]);
                return response()->json([
                    'success' => false,
                    'message' => 'Chat session tidak ditemukan.'
                ], 404);
            }

            // Determine sender name
            $senderName = $request->sender_type === 'admin'
                ? (auth()->user()->name ?? 'Admin')
                : $chatSession->guest_name;

            $chatMessage = ChatMessage::create([
                'chat_session_id' => $chatSession->id,
                'message' => $request->message,
                'sender_type' => $request->sender_type,
                'sender_name' => $senderName,
                'metadata' => [
                    'ip_address' => $request->ip(),
                    'user_agent' => $request->userAgent(),
                ],
            ]);

            \Log::info('Chat message created', ['message_id' => $chatMessage->id]);

            // Update session activity
            $chatSession->updateActivity();

            // Broadcast the message
            try {
                \Log::info('About to broadcast message', ['message_id' => $chatMessage->id]);
                broadcast(new ChatMessageSent($chatMessage));
                \Log::info('Message broadcasted successfully', ['message_id' => $chatMessage->id]);
            } catch (\Exception $broadcastError) {
                \Log::error('Broadcast error', [
                    'error' => $broadcastError->getMessage(),
                    'message_id' => $chatMessage->id
                ]);
                // Don't fail the request if broadcast fails
            }

            return response()->json([
                'success' => true,
                'message' => 'Pesan terkirim!',
                'data' => $chatMessage->load('chatSession')
            ]);

        } catch (\Exception $e) {
            \Log::error('Error in sendMessage', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan saat mengirim pesan: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get chat sessions for admin.
     */
    public function getSessions(Request $request): JsonResponse
    {
        $query = ChatSession::with(['messages' => function($q) {
                $q->latest()->limit(1);
            }])
            ->withCount(['messages as unread_messages_count' => function($q) {
                $q->fromGuest()->unread();
            }])
            ->orderBy('last_activity_at', 'desc');

        // Filter by status if provided
        if ($request->has('status') && in_array($request->status, ['active', 'closed'])) {
            $query->where('status', $request->status);
        }

        // Search functionality
        if ($request->has('search') && !empty($request->search)) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('guest_name', 'like', "%{$search}%")
                  ->orWhere('guest_email', 'like', "%{$search}%");
            });
        }

        $sessions = $query->paginate(20);

        return response()->json([
            'success' => true,
            'data' => $sessions
        ]);
    }

    /**
     * Get messages for a specific chat session.
     */
    public function getSessionMessages(Request $request, $sessionId): JsonResponse
    {
        $chatSession = ChatSession::where('session_id', $sessionId)->first();

        if (!$chatSession) {
            return response()->json([
                'success' => false,
                'message' => 'Chat session tidak ditemukan.'
            ], 404);
        }

        $messages = $chatSession->messages()->paginate(50);

        // Mark guest messages as read if admin is viewing
        if (auth()->check()) {
            $chatSession->messages()
                ->fromGuest()
                ->unread()
                ->update(['is_read' => true]);
        }

        return response()->json([
            'success' => true,
            'data' => [
                'session' => $chatSession,
                'messages' => $messages
            ]
        ]);
    }

    /**
     * Close a chat session.
     */
    public function closeSession(Request $request, $sessionId): JsonResponse
    {
        $chatSession = ChatSession::where('session_id', $sessionId)->first();

        if (!$chatSession) {
            return response()->json([
                'success' => false,
                'message' => 'Chat session tidak ditemukan.'
            ], 404);
        }

        $chatSession->close();

        return response()->json([
            'success' => true,
            'message' => 'Chat session telah ditutup.'
        ]);
    }

    /**
     * Get or create chat session from cookie.
     */
    public function getSessionFromCookie(Request $request): JsonResponse
    {
        \Log::info('getSessionFromCookie called', [
            'cookies' => $request->cookies->all(),
            'headers' => $request->headers->all(),
            'url' => $request->fullUrl(),
            'method' => $request->method()
        ]);

        $sessionId = $request->cookie('chat_session_id');

        if (!$sessionId) {
            \Log::info('No session ID found in cookie');
            return response()->json([
                'success' => false,
                'message' => 'No active chat session found.'
            ], 404);
        }

        \Log::info('Looking for session with ID: ' . $sessionId);

        $chatSession = ChatSession::where('session_id', $sessionId)
            ->where('status', 'active') // Only get active sessions
            ->with(['messages' => function($q) {
                $q->orderBy('created_at', 'asc');
            }])
            ->first();

        if (!$chatSession) {
            \Log::info('Chat session not found or inactive for ID: ' . $sessionId);

            // Clear the invalid cookie
            return response()->json([
                'success' => false,
                'message' => 'Chat session not found or expired.'
            ], 404)->cookie('chat_session_id', '', -1);
        }

        // Update last activity
        $chatSession->updateActivity();

        \Log::info('Chat session found and returned', [
            'session_id' => $chatSession->session_id,
            'messages_count' => $chatSession->messages->count()
        ]);

        return response()->json([
            'success' => true,
            'data' => $chatSession
        ]);
    }

    /**
     * Get chat statistics for admin dashboard.
     */
    public function getStatistics(): JsonResponse
    {
        $stats = [
            'total_sessions' => ChatSession::count(),
            'active_sessions' => ChatSession::active()->count(),
            'closed_sessions' => ChatSession::closed()->count(),
            'total_messages' => ChatMessage::count(),
            'unread_messages' => ChatMessage::fromGuest()->unread()->count(),
            'today_sessions' => ChatSession::whereDate('created_at', today())->count(),
            'this_week_sessions' => ChatSession::whereBetween('created_at', [
                now()->startOfWeek(),
                now()->endOfWeek()
            ])->count(),
        ];

        return response()->json([
            'success' => true,
            'data' => $stats
        ]);
    }
}
