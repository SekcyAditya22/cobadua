#!/bin/bash

echo "🔧 Fixing Authentication Issues..."

echo "1. Running migrations..."
php artisan migrate --force

echo "2. Clearing all caches and sessions..."
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear
php artisan session:flush

echo "3. Clearing session files manually..."
rm -rf storage/framework/sessions/*
rm -rf storage/framework/cache/*

echo "4. Setting proper permissions..."
chmod -R 775 storage/
chmod -R 775 bootstrap/cache/

echo "5. Optimizing application..."
php artisan config:cache

echo "5. Checking session configuration..."
php artisan tinker --execute="
echo 'Session Driver: ' . config('session.driver') . PHP_EOL;
echo 'Session Lifetime: ' . config('session.lifetime') . ' minutes' . PHP_EOL;
echo 'Session Cookie: ' . config('session.cookie') . PHP_EOL;
echo 'CSRF Token: ' . csrf_token() . PHP_EOL;
"

echo "6. Testing database connection..."
php artisan tinker --execute="
try {
    \DB::connection()->getPdo();
    echo 'Database connection: OK' . PHP_EOL;
} catch (Exception \$e) {
    echo 'Database connection: FAILED - ' . \$e->getMessage() . PHP_EOL;
}
"

echo "7. Checking sessions table..."
php artisan tinker --execute="
try {
    \DB::table('sessions')->count();
    echo 'Sessions table: OK' . PHP_EOL;
} catch (Exception \$e) {
    echo 'Sessions table: FAILED - ' . \$e->getMessage() . PHP_EOL;
}
"

echo "✅ Authentication fix completed!"
echo ""
echo "Next steps:"
echo "1. Restart your development server"
echo "2. Clear browser cache and cookies"
echo "3. Try login/register again"
echo "4. If still having issues, run debug-auth.js in browser console"
