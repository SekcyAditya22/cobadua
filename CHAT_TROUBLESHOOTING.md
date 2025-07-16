# Chat System Troubleshooting Guide

## Masalah yang Diperbaiki

### 1. CSRF Token Error 419 (Admin tidak bisa membalas)
**Solusi:**
- Diperbaiki middleware VerifyCsrfToken dengan method tokensMatch yang lebih robust
- Ditambahkan request interceptor di axios untuk refresh CSRF token otomatis
- Ditambahkan retry logic untuk error 419

### 2. API Route 404 (/api/chat/session-from-cookie)
**Solusi:**
- Ditambahkan middleware 'web' pada route API chat
- Diperbaiki method getSessionFromCookie dengan logging yang lebih detail
- Ditambahkan fallback route untuk error handling

### 3. Session Management (Client kembali ke "Selamat datang")
**Solusi:**
- Ditambahkan useEffect untuk check session saat component mount
- Diperbaiki error handling untuk session tidak ditemukan
- Ditambahkan auto-clear invalid session data

### 4. Pusher Authentication Issues
**Solusi:**
- Diperbaiki authorizer dengan fresh CSRF token untuk setiap request
- Ditambahkan retry logic untuk CSRF error di Pusher auth
- Diperbaiki channel authorization dengan logging detail
- Ditambahkan verifikasi session di database untuk guest users

### 5. Error Handling
**Solusi:**
- Ditambahkan error handling yang lebih spesifik untuk berbagai status code
- Ditambahkan logging detail untuk debugging
- Diperbaiki user feedback dengan pesan error yang jelas

## Checklist Verifikasi

### Backend
- [ ] BROADCAST_DRIVER=pusher di .env
- [ ] Pusher credentials benar di .env
- [ ] BroadcastServiceProvider terdaftar di bootstrap/providers.php
- [ ] Route /broadcasting/auth tidak di-exclude dari CSRF
- [ ] ChatSession model memiliki method updateActivity()

### Frontend
- [ ] CSRF token tersedia di meta tag
- [ ] Pusher credentials benar di .env frontend
- [ ] usePusher hook digunakan dengan benar
- [ ] Channel names sesuai dengan yang didefinisikan di channels.php

### Network
- [ ] WebSocket connection berhasil (check Network tab)
- [ ] Broadcasting auth endpoint mengembalikan 200
- [ ] API endpoints mengembalikan response yang benar

## Testing Steps

1. **Test Admin Chat:**
   ```
   - Login sebagai admin
   - Buka halaman chat management
   - Pilih session yang ada
   - Coba kirim pesan
   - Periksa console untuk error
   ```

2. **Test Client Chat:**
   ```
   - Buka halaman dengan chat widget
   - Mulai chat session baru
   - Kirim beberapa pesan
   - Refresh halaman dan pastikan session tetap ada
   - Periksa console untuk error
   ```

3. **Test Realtime:**
   ```
   - Buka admin dan client di tab berbeda
   - Kirim pesan dari client
   - Pastikan admin menerima realtime
   - Balas dari admin
   - Pastikan client menerima realtime
   ```

## Common Issues

### Error: "CSRF token not found"
- Pastikan meta tag csrf-token ada di layout
- Periksa axios configuration

### Error: "Authorization failed for channel"
- Periksa Pusher credentials
- Periksa channel authorization di routes/channels.php
- Periksa session cookie untuk guest users

### Error: "Session not found"
- Periksa cookie chat_session_id
- Periksa database untuk session yang valid
- Periksa status session (active/closed)

### Pusher tidak connect
- Periksa Pusher credentials di .env
- Periksa network connectivity
- Periksa browser console untuk WebSocket errors

## Monitoring

Untuk monitoring realtime chat:
1. Check Laravel logs: `tail -f storage/logs/laravel.log`
2. Check browser console untuk Pusher events
3. Check Network tab untuk WebSocket connections
4. Check Pusher dashboard untuk connection stats
