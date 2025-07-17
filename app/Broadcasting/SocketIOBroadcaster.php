<?php

namespace App\Broadcasting;

use Illuminate\Broadcasting\Broadcasters\Broadcaster;
use Illuminate\Broadcasting\BroadcastException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;

class SocketIOBroadcaster extends Broadcaster
{
    /**
     * The Socket.IO server URL.
     */
    protected string $serverUrl;

    /**
     * Create a new broadcaster instance.
     */
    public function __construct(array $config)
    {
        $this->serverUrl = $config['server_url'] ?? 'http://localhost:3001';
    }

    /**
     * Authenticate the incoming request for a given channel.
     */
    public function auth($request, $channel)
    {
        // For Socket.IO, we'll handle authentication differently
        // This method is mainly for compatibility with Laravel's broadcasting
        return true;
    }

    /**
     * Return the valid authentication response.
     */
    public function validAuthenticationResponse($request, $result)
    {
        return response()->json($result);
    }

    /**
     * Broadcast the given event.
     */
    public function broadcast(array $channels, $event, array $payload = [])
    {
        try {
            foreach ($channels as $channel) {
                $this->broadcastToChannel($channel, $event, $payload);
            }
        } catch (\Exception $e) {
            Log::error('SocketIO broadcast failed', [
                'error' => $e->getMessage(),
                'channels' => $channels,
                'event' => $event,
                'payload' => $payload
            ]);
            
            throw new BroadcastException($e->getMessage());
        }
    }

    /**
     * Broadcast to a specific channel.
     */
    protected function broadcastToChannel(string $channel, string $event, array $payload)
    {
        $url = rtrim($this->serverUrl, '/') . '/broadcast';
        
        $data = [
            'channel' => $channel,
            'event' => $event,
            'data' => $payload
        ];

        Log::info('Broadcasting to SocketIO server', [
            'url' => $url,
            'data' => $data
        ]);

        $response = Http::timeout(5)->post($url, $data);

        if (!$response->successful()) {
            Log::error('SocketIO broadcast request failed', [
                'status' => $response->status(),
                'body' => $response->body(),
                'data' => $data
            ]);
            
            throw new \Exception("Failed to broadcast to SocketIO server: " . $response->body());
        }

        Log::info('SocketIO broadcast successful', [
            'channel' => $channel,
            'event' => $event,
            'response' => $response->json()
        ]);
    }
}
