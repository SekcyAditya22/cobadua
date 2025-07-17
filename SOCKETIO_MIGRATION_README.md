# Migrasi dari Pusher ke Socket.IO

Dokumentasi ini menjelaskan proses migrasi sistem chat dari Pusher ke Socket.IO dengan Express server.

## Perubahan yang Dilakukan

### 1. Express Socket.IO Server
- **Lokasi**: `realtimechatexpress/`
- **File utama**: `server.js`
- **Port**: 3001
- **Fitur**:
  - Real-time messaging dengan Socket.IO
  - Room management untuk chat sessions
  - Admin room untuk monitoring semua chat
  - Health check endpoint
  - Broadcast endpoint untuk Laravel integration

### 2. Backend Laravel Changes

#### Custom Broadcaster
- **File**: `app/Broadcasting/SocketIOBroadcaster.php`
- **Fungsi**: Mengirim broadcast messages ke Socket.IO server via HTTP

#### Service Provider
- **File**: `app/Providers/SocketIOServiceProvider.php`
- **Fungsi**: Mendaftarkan custom SocketIO broadcaster

#### Configuration
- **File**: `config/broadcasting.php`
- **Perubahan**: Menambahkan driver 'socketio'

#### Environment Variables
```env
BROADCAST_DRIVER=socketio
SOCKETIO_SERVER_URL=http://localhost:3001
VITE_SOCKETIO_SERVER_URL=https://metanetaccess.peachy.icu:3001
```

### 3. Frontend Changes

#### New Hook
- **File**: `resources/js/hooks/useSocket.ts`
- **Fungsi**: Menggantikan `usePusher` dengan Socket.IO client

#### Updated Components
- **LiveChatWidget**: Menggunakan `useSocket` instead of `usePusher`
- **ChatManagement**: Menggunakan `useSocket` instead of `usePusher`

#### Dependencies
- **Added**: `socket.io-client`
- **Removed**: Dependency pada `pusher-js` (masih ada untuk backward compatibility)

## Setup dan Deployment

### 1. Install Dependencies

#### Socket.IO Server
```bash
cd realtimechatexpress
npm install
```

#### Frontend
```bash
npm install socket.io-client
```

### 2. Start Services

#### Socket.IO Server
```bash
# Development
cd realtimechatexpress
npm run dev

# Production
cd realtimechatexpress
npm start

# Atau gunakan script
./start-socketio.sh    # Linux/Mac
./start-socketio.bat   # Windows
```

#### Laravel Server
```bash
php artisan serve --port=8000
```

### 3. Build Frontend
```bash
npm run build
```

## Testing

### 1. Test Socket.IO Connection
```bash
node test-socketio-connection.js
```

### 2. Test Broadcast Functionality
```bash
node test-broadcast.js
```

### 3. Health Check
```bash
curl http://localhost:3001/health
```

## Architecture

### Room Structure
- `session-{sessionId}` - Room untuk specific chat session
- `admin-room` - Room untuk semua admin

### Message Flow
1. User mengirim pesan via Laravel API
2. Laravel ChatController menyimpan pesan ke database
3. Laravel broadcast event ke Socket.IO server via HTTP POST
4. Socket.IO server broadcast ke appropriate rooms
5. Frontend clients menerima real-time updates

### Socket Events

#### Client to Server
- `join-session` - Join chat session room
- `join-admin` - Join admin room
- `leave-session` - Leave chat session room
- `ping` - Test connection

#### Server to Client
- `joined-session` - Confirmation of joining session
- `joined-admin` - Confirmation of joining admin room
- `message.sent` - New chat message
- `pong` - Response to ping
- `error` - Error messages

## Troubleshooting

### Socket.IO Server Issues
1. **Port 3001 sudah digunakan**: Ubah `SOCKET_PORT` di `.env`
2. **CORS errors**: Pastikan domain sudah ditambahkan di CORS origins
3. **Connection timeout**: Check firewall dan network settings

### Laravel Integration Issues
1. **Driver [socketio] not supported**: Pastikan `SocketIOServiceProvider` terdaftar di `bootstrap/providers.php`
2. **Broadcast gagal**: Check Socket.IO server logs dan pastikan server running
3. **HTTP timeout**: Increase timeout di `SocketIOBroadcaster.php`

### Frontend Issues
1. **useSocket hook error**: Pastikan `socket.io-client` terinstall
2. **Connection failed**: Check `VITE_SOCKETIO_SERVER_URL` di `.env`
3. **Messages tidak muncul**: Check browser console untuk Socket.IO connection errors

## Production Considerations

### 1. Process Management
Gunakan PM2 atau supervisor untuk menjalankan Socket.IO server:

```bash
# Install PM2
npm install -g pm2

# Start Socket.IO server dengan PM2
cd realtimechatexpress
pm2 start server.js --name "socketio-chat"
```

### 2. Reverse Proxy
Setup nginx reverse proxy untuk Socket.IO server:

```nginx
location /socket.io/ {
    proxy_pass http://localhost:3001;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

### 3. SSL/HTTPS
Untuk production dengan HTTPS, update environment variables:
```env
VITE_SOCKETIO_SERVER_URL=https://yourdomain.com:3001
```

## Rollback Plan

Jika perlu rollback ke Pusher:
1. Ubah `.env`: `BROADCAST_DRIVER=pusher`
2. Revert frontend components untuk menggunakan `usePusher`
3. Stop Socket.IO server
4. Deploy ulang frontend

## Performance Notes

- Socket.IO server dapat handle ribuan concurrent connections
- Memory usage sekitar 50-100MB untuk server kosong
- Latency lebih rendah dibanding Pusher karena self-hosted
- Tidak ada limit message rate seperti Pusher free tier
