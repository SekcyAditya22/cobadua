# Authentication Fix Guide - Error 419 CSRF Token

## Masalah
Login dan register admin mengalami error 419 (CSRF token mismatch/expired).

## Penyebab
1. **Session storage issue** - Database session driver tidak berfungsi dengan baik
2. **CSRF token tidak dikirim** - Inertia.js tidak mengirim CSRF token dengan benar
3. **Session lifetime terlalu pendek** - Token expire sebelum form disubmit
4. **Missing sessions table** - Tabel sessions belum ada di database

## Solusi yang Telah Diterapkan

### 1. ✅ Session Configuration
- Mengubah session driver dari `database` ke `file` (lebih stabil)
- Meningkatkan session lifetime dari 120 ke 240 menit
- File: `config/session.php`

### 2. ✅ CSRF Token Handling
- Menambahkan CSRF token ke Inertia props
- Membuat middleware `RefreshCsrfToken` untuk refresh token otomatis
- Konfigurasi Inertia untuk mengirim CSRF token di setiap request
- Files: `app/Http/Middleware/HandleInertiaRequests.php`, `resources/js/lib/inertia-csrf.ts`

### 3. ✅ Sessions Table
- Membuat migration untuk tabel sessions
- File: `database/migrations/2025_07_16_000000_create_sessions_table.php`

### 4. ✅ Middleware Configuration
- Menambahkan `RefreshCsrfToken` middleware ke web routes
- File: `bootstrap/app.php`

### 5. ✅ Frontend Configuration
- Setup CSRF protection untuk Inertia requests
- File: `resources/js/app.tsx`, `resources/js/lib/inertia-csrf.ts`

## Langkah-Langkah Perbaikan

### 1. Jalankan Migration
```bash
php artisan migrate --force
```

### 2. Clear All Caches
```bash
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear
php artisan session:flush
```

### 3. Rebuild Caches
```bash
php artisan config:cache
php artisan route:cache
```

### 4. Restart Development Server
```bash
# Stop current server
# Then restart with:
php artisan serve
# or
npm run dev
```

### 5. Clear Browser Data
- Clear browser cache
- Clear cookies for your domain
- Hard refresh (Ctrl+F5)

## Testing

### 1. Manual Test
1. Buka halaman login
2. Buka browser console
3. Paste script dari `test-auth-simple.js`
4. Lihat hasil test

### 2. Login Test
1. Coba login dengan credentials yang benar
2. Periksa console untuk error
3. Jika masih error 419, lanjut ke troubleshooting

## Troubleshooting

### Jika Masih Error 419:

1. **Check CSRF Token**
   ```javascript
   // Di browser console:
   console.log(document.querySelector('meta[name="csrf-token"]')?.content);
   ```

2. **Check Session Files**
   ```bash
   ls -la storage/framework/sessions/
   ```

3. **Check Permissions**
   ```bash
   chmod -R 775 storage/
   chmod -R 775 bootstrap/cache/
   ```

4. **Check .env Configuration**
   - Pastikan `SESSION_DRIVER=file`
   - Pastikan `SESSION_LIFETIME=240`

5. **Debug Mode**
   - Set `APP_DEBUG=true` di .env
   - Check Laravel logs: `tail -f storage/logs/laravel.log`

### Jika Session Driver Database Diperlukan:

1. **Pastikan tabel sessions ada:**
   ```bash
   php artisan migrate
   ```

2. **Test database connection:**
   ```bash
   php artisan tinker
   DB::connection()->getPdo();
   ```

3. **Update .env:**
   ```
   SESSION_DRIVER=database
   ```

## Files yang Dimodifikasi

1. `config/session.php` - Session configuration
2. `app/Http/Middleware/HandleInertiaRequests.php` - CSRF token sharing
3. `app/Http/Middleware/RefreshCsrfToken.php` - New middleware
4. `bootstrap/app.php` - Middleware registration
5. `resources/js/app.tsx` - Inertia CSRF setup
6. `resources/js/lib/inertia-csrf.ts` - CSRF handling
7. `database/migrations/2025_07_16_000000_create_sessions_table.php` - Sessions table

## Verification

Setelah menerapkan semua perbaikan:

1. ✅ CSRF token tersedia di meta tag
2. ✅ Session berfungsi dengan baik
3. ✅ Login/register tidak error 419
4. ✅ Chat system tetap berfungsi
5. ✅ Pusher authentication bekerja

## Next Steps

Jika semua sudah berfungsi:
1. Test login dengan user yang valid
2. Test register user baru
3. Test chat functionality
4. Monitor logs untuk error lainnya

Jika masih ada masalah, gunakan script debugging yang telah disediakan untuk analisis lebih lanjut.
