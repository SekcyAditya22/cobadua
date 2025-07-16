<?php

use Inertia\Inertia;
use Laravel\Fortify\Features;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\TwoFactorController;
use App\Http\Controllers\BrowserSessionController;
use App\Http\Controllers\ProfileSettingsController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\CCTVController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');


    
// Test route
Route::get('/test', function () {
    return 'Test route works!';
});



// CCTV routes - public access
Route::get('/cctv-packages', [CCTVController::class, 'index'])->name('cctv.packages');
Route::get('/cctv-detail/{id}', [CCTVController::class, 'show'])->name('cctv.detail');

// About page route
Route::get('/about', function () {
    return Inertia::render('About');
})->name('about');

// Internet packages route
Route::get('/internet-packages', function () {
    return Inertia::render('InternetPackages');
})->name('internet.packages');

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::get('settings/password', function () {
        return Inertia::render('Profile/Password');
    })->name('password.edit');

    Route::get('settings/appearance', function () {
        return Inertia::render('Profile/Appearance');
    })->name('appearance');

    Route::get('settings/browser-sessions', [ProfileSettingsController::class, 'showBrowserSessions'])->name('browser-sessions');

    // Two-factor authentication route - only if feature is enabled
    if (Features::optionEnabled(Features::twoFactorAuthentication(), 'confirm')) {
        Route::get('settings/two-factor', [ProfileSettingsController::class, 'showTwoFactor'])->name('two-factor');
    }

    // Chat admin routes - protected by authentication
    Route::prefix('admin/chat')->name('admin.chat.')->group(function () {
        Route::get('/', function () {
            return Inertia::render('Admin/ChatManagement');
        })->name('index');

        Route::get('/api/sessions', [ChatController::class, 'getSessions'])->name('sessions');
        Route::get('/api/sessions/{sessionId}/messages', [ChatController::class, 'getSessionMessages'])->name('session.messages');
        Route::post('/api/send-message', [ChatController::class, 'sendMessage'])->name('send.message');
        Route::post('/api/sessions/{sessionId}/close', [ChatController::class, 'closeSession'])->name('close.session');
        Route::get('/api/statistics', [ChatController::class, 'getStatistics'])->name('statistics');
    });
});
