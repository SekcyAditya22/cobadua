<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ChatController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Chat routes - public endpoints with proper middleware
Route::prefix('chat')->middleware(['web'])->group(function () {
    Route::post('/start-session', [ChatController::class, 'startSession']);
    Route::post('/send-message', [ChatController::class, 'sendMessage']);
    Route::get('/session-from-cookie', [ChatController::class, 'getSessionFromCookie']);
    Route::get('/session/{sessionId}/messages', [ChatController::class, 'getSessionMessages']);
});

// Additional API routes for better error handling
Route::fallback(function () {
    return response()->json([
        'success' => false,
        'message' => 'API endpoint not found'
    ], 404);
});
