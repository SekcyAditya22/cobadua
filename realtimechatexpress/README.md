# Real-time Chat Express Server

Express server dengan Socket.IO untuk menggantikan Pusher dalam sistem chat.

## Setup

1. Install dependencies:
```bash
cd realtimechatexpress
npm install
```

2. Copy dan edit environment file:
```bash
cp .env.example .env
```

3. Start server:
```bash
# Development
npm run dev

# Production
npm start
```

## API Endpoints

### Health Check
- `GET /health` - Check server status dan connection statistics

### Broadcasting
- `POST /broadcast` - Endpoint untuk Laravel mengirim broadcast messages
  - Body: `{ "channel": "chat-session.{sessionId}", "event": "message.sent", "data": {...} }`

## Socket Events

### Client to Server
- `join-session` - Join chat session room
  - Data: `{ sessionId: string, userType: 'guest'|'admin' }`
- `join-admin` - Join admin room (admin only)
- `leave-session` - Leave chat session room
  - Data: `{ sessionId: string }`
- `ping` - Test connection

### Server to Client
- `joined-session` - Confirmation of joining session
- `joined-admin` - Confirmation of joining admin room
- `message.sent` - New chat message
- `pong` - Response to ping
- `error` - Error messages

## Room Structure

- `session-{sessionId}` - Room untuk specific chat session
- `admin-room` - Room untuk semua admin

## Integration dengan Laravel

Laravel akan mengirim HTTP POST request ke `/broadcast` endpoint instead of menggunakan Pusher.

## Environment Variables

- `SOCKET_PORT` - Port untuk Socket.IO server (default: 3001)
- `NODE_ENV` - Environment (development/production)
- `LARAVEL_URL` - URL Laravel backend
- `CORS_ORIGINS` - Allowed CORS origins (comma separated)
