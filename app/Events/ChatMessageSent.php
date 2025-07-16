<?php

namespace App\Events;

use App\Models\ChatMessage;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ChatMessageSent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $chatMessage;

    /**
     * Create a new event instance.
     */
    public function __construct(ChatMessage $chatMessage)
    {
        $this->chatMessage = $chatMessage;

        // Debug logging
        \Log::info('ChatMessageSent event created', [
            'message_id' => $chatMessage->id,
            'session_id' => $chatMessage->chatSession->session_id,
            'sender_type' => $chatMessage->sender_type,
            'message' => $chatMessage->message
        ]);
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        $channels = [
            new PrivateChannel('chat-session.' . $this->chatMessage->chatSession->session_id),
            new PrivateChannel('admin-chat'), // For admin to receive all messages
        ];

        \Log::info('Broadcasting to channels', [
            'channels' => [
                'chat-session.' . $this->chatMessage->chatSession->session_id,
                'admin-chat'
            ]
        ]);

        return $channels;
    }

    /**
     * Get the data to broadcast.
     *
     * @return array
     */
    public function broadcastWith(): array
    {
        return [
            'id' => $this->chatMessage->id,
            'message' => $this->chatMessage->message,
            'sender_type' => $this->chatMessage->sender_type,
            'sender_name' => $this->chatMessage->sender_name,
            'created_at' => $this->chatMessage->created_at->toISOString(),
            'chat_session_id' => $this->chatMessage->chat_session_id,
            'session_id' => $this->chatMessage->chatSession->session_id,
        ];
    }

    /**
     * The event's broadcast name.
     *
     * @return string
     */
    public function broadcastAs(): string
    {
        return 'message.sent';
    }
}
