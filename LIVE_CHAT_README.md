# Live Chat System Documentation

## Overview
Sistem live chat ini memungkinkan pengunjung website untuk berkomunikasi langsung dengan admin tanpa perlu registrasi. Sistem menggunakan Pusher untuk real-time messaging dan cookie-based session untuk tracking user.

## Features
- ✅ Real-time messaging menggunakan Pusher
- ✅ Cookie-based session (tidak perlu registrasi)
- ✅ Admin chat management interface
- ✅ Guest user hanya perlu mengisi nama, email, dan no. WhatsApp (opsional)
- ✅ Session tracking dan management
- ✅ Responsive design

## Setup Instructions

### 1. Pusher Configuration
Untuk menggunakan sistem live chat, Anda perlu mengkonfigurasi Pusher:

1. Daftar di [Pusher.com](https://pusher.com)
2. Buat aplikasi baru
3. Copy credentials ke file `.env`:

```env
BROADCAST_DRIVER=pusher

PUSHER_APP_ID=your_app_id
PUSHER_APP_KEY=your_app_key
PUSHER_APP_SECRET=your_app_secret
PUSHER_APP_CLUSTER=mt1

VITE_PUSHER_APP_KEY="${PUSHER_APP_KEY}"
VITE_PUSHER_APP_CLUSTER="${PUSHER_APP_CLUSTER}"
```

### 2. Database Migration
Jalankan migration untuk membuat tabel chat:

```bash
php artisan migrate
```

### 3. Seeder (Optional)
Untuk testing, Anda bisa menjalankan seeder:

```bash
php artisan db:seed --class=ChatSeeder
```

## Usage

### For Guests (Website Visitors)
1. Klik tombol chat widget di pojok kanan bawah halaman
2. Isi form dengan:
   - Nama (required)
   - Email (required)
   - No. WhatsApp (optional)
3. Klik "Mulai Chat"
4. Mulai mengirim pesan

### For Admin
1. Login ke dashboard admin
2. Akses `/admin/chat`
3. Lihat daftar chat sessions di sidebar kiri
4. Klik session untuk melihat percakapan
5. Balas pesan dari guest users
6. Tutup session jika sudah selesai

## API Endpoints

### Public Endpoints (Guest Users)
- `POST /api/chat/start-session` - Memulai chat session baru
- `POST /api/chat/send-message` - Mengirim pesan
- `GET /api/chat/session-from-cookie` - Mendapatkan session dari cookie
- `GET /api/chat/session/{sessionId}/messages` - Mendapatkan pesan dalam session

### Admin Endpoints (Authenticated)
- `GET /admin/chat/api/sessions` - Mendapatkan daftar chat sessions
- `GET /admin/chat/api/sessions/{sessionId}/messages` - Mendapatkan pesan dalam session
- `POST /admin/chat/api/send-message` - Mengirim pesan sebagai admin
- `POST /admin/chat/api/sessions/{sessionId}/close` - Menutup chat session
- `GET /admin/chat/api/statistics` - Mendapatkan statistik chat

## Database Schema

### chat_sessions
- `id` - Primary key
- `session_id` - Unique session identifier (UUID)
- `guest_name` - Nama guest user
- `guest_email` - Email guest user
- `guest_phone` - No. WhatsApp (optional)
- `status` - Status session (active/closed)
- `last_activity_at` - Timestamp aktivitas terakhir
- `metadata` - Data tambahan (JSON)
- `created_at`, `updated_at` - Timestamps

### chat_messages
- `id` - Primary key
- `chat_session_id` - Foreign key ke chat_sessions
- `message` - Isi pesan
- `sender_type` - Tipe pengirim (guest/admin)
- `sender_name` - Nama pengirim
- `is_read` - Status baca pesan
- `metadata` - Data tambahan (JSON)
- `created_at`, `updated_at` - Timestamps

## Real-time Features

### Pusher Channels
- `chat-session.{sessionId}` - Channel untuk session tertentu
- `admin-chat` - Channel untuk admin menerima semua pesan

### Events
- `message.sent` - Event ketika pesan dikirim

## Components

### Frontend Components
- `LiveChatWidget` - Widget chat untuk guest users
- `ChatManagement` - Interface admin untuk mengelola chat
- `usePusher` - Hook untuk integrasi Pusher

### Backend Components
- `ChatController` - Controller untuk API chat
- `ChatSession` - Model untuk session chat
- `ChatMessage` - Model untuk pesan chat
- `ChatMessageSent` - Event untuk broadcasting pesan

## Troubleshooting

### Chat Widget Tidak Muncul
- Pastikan `LiveChatWidget` sudah ditambahkan ke halaman
- Check console browser untuk error JavaScript

### Real-time Tidak Berfungsi
- Pastikan konfigurasi Pusher sudah benar
- Check network tab untuk koneksi WebSocket
- Pastikan BROADCAST_DRIVER=pusher di .env

### Cookie Session Tidak Tersimpan
- Pastikan `chat_session_id` tidak di-encrypt di bootstrap/app.php
- Check browser cookies untuk memastikan cookie tersimpan

### Admin Tidak Bisa Akses Chat Management
- Pastikan user sudah login
- Check route `/admin/chat` sudah terdaftar
- Pastikan middleware auth berfungsi

## Security Considerations

1. **CSRF Protection**: Semua form menggunakan CSRF token
2. **Input Validation**: Semua input divalidasi di backend
3. **XSS Prevention**: Output di-escape untuk mencegah XSS
4. **Rate Limiting**: Implementasikan rate limiting untuk API chat
5. **Session Security**: Cookie menggunakan secure flags di production

## Performance Optimization

1. **Database Indexing**: Index pada kolom yang sering di-query
2. **Pagination**: Pesan dan session menggunakan pagination
3. **Caching**: Cache statistik chat untuk performa
4. **Connection Pooling**: Gunakan connection pooling untuk Pusher

## Future Enhancements

- [ ] File upload dalam chat
- [ ] Emoji support
- [ ] Typing indicators
- [ ] Message read receipts
- [ ] Chat history export
- [ ] Multiple admin support
- [ ] Chat routing berdasarkan topik
- [ ] Integration dengan WhatsApp Business API
