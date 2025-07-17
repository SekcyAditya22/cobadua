<?php

use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

// Channel untuk chat session - admin bisa akses semua, guest hanya session mereka
Broadcast::channel('chat-session.{sessionId}', function ($user, $sessionId) {
    \Log::info('Channel authorization for chat-session', [
        'sessionId' => $sessionId,
        'user' => $user ? $user->id : 'guest',
        'cookies' => request()->cookies->all()
    ]);

    // Jika user adalah admin (authenticated user), bisa akses semua session
    if ($user) {
        \Log::info('Admin user authorized for chat-session', ['user_id' => $user->id]);
        return ['id' => $user->id, 'name' => $user->name, 'type' => 'admin'];
    }

    // Untuk guest user, cek apakah session_id cocok dengan cookie mereka
    $cookieSessionId = request()->cookie('chat_session_id');
    \Log::info('Guest authorization check', [
        'cookieSessionId' => $cookieSessionId,
        'requestedSessionId' => $sessionId
    ]);

    if ($cookieSessionId === $sessionId) {
        // Verify session exists in database
        $chatSession = \App\Models\ChatSession::where('session_id', $sessionId)
            ->where('status', 'active')
            ->first();

        if ($chatSession) {
            \Log::info('Guest user authorized for chat-session', ['session_id' => $sessionId]);
            return ['id' => $cookieSessionId, 'name' => 'Guest', 'type' => 'guest'];
        }
    }

    \Log::info('Authorization denied for chat-session', ['session_id' => $sessionId]);
    return false;
});

// Channel untuk admin - hanya admin yang bisa akses
Broadcast::channel('admin-chat', function ($user) {
    \Log::info('Channel authorization for admin-chat', [
        'user' => $user ? $user->id : 'guest'
    ]);

    // Hanya authenticated user (admin) yang bisa akses
    if ($user) {
        \Log::info('Admin user authorized for admin-chat', ['user_id' => $user->id]);
        return ['id' => $user->id, 'name' => $user->name, 'type' => 'admin'];
    }

    \Log::info('Authorization denied for admin-chat');
    return false;
});
