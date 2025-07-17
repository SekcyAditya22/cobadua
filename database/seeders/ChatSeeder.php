<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\ChatSession;
use App\Models\ChatMessage;
use Illuminate\Support\Str;

class ChatSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create sample chat sessions
        $session1 = ChatSession::create([
            'session_id' => Str::uuid(),
            'guest_name' => 'John Doe',
            'guest_email' => 'john@example.com',
            'guest_phone' => '08123456789',
            'status' => 'active',
            'last_activity_at' => now(),
            'metadata' => [
                'ip_address' => '127.0.0.1',
                'user_agent' => 'Mozilla/5.0 Test Browser',
            ],
        ]);

        $session2 = ChatSession::create([
            'session_id' => Str::uuid(),
            'guest_name' => 'Jane Smith',
            'guest_email' => 'jane@example.com',
            'guest_phone' => '08987654321',
            'status' => 'active',
            'last_activity_at' => now()->subMinutes(30),
            'metadata' => [
                'ip_address' => '127.0.0.1',
                'user_agent' => 'Mozilla/5.0 Test Browser',
            ],
        ]);

        // Create sample messages for session 1
        ChatMessage::create([
            'chat_session_id' => $session1->id,
            'message' => 'Halo, saya ingin bertanya tentang paket internet.',
            'sender_type' => 'guest',
            'sender_name' => 'John Doe',
            'is_read' => false,
        ]);

        ChatMessage::create([
            'chat_session_id' => $session1->id,
            'message' => 'Halo! Tentu, saya akan membantu Anda. Paket internet apa yang Anda cari?',
            'sender_type' => 'admin',
            'sender_name' => 'Admin',
            'is_read' => true,
        ]);

        ChatMessage::create([
            'chat_session_id' => $session1->id,
            'message' => 'Saya butuh paket untuk rumah dengan kecepatan minimal 50 Mbps.',
            'sender_type' => 'guest',
            'sender_name' => 'John Doe',
            'is_read' => false,
        ]);

        // Create sample messages for session 2
        ChatMessage::create([
            'chat_session_id' => $session2->id,
            'message' => 'Apakah ada promo untuk paket CCTV?',
            'sender_type' => 'guest',
            'sender_name' => 'Jane Smith',
            'is_read' => false,
        ]);
    }
}
