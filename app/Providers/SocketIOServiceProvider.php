<?php

namespace App\Providers;

use App\Broadcasting\SocketIOBroadcaster;
use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\ServiceProvider;

class SocketIOServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        Broadcast::extend('socketio', function ($app, $config) {
            return new SocketIOBroadcaster($config);
        });
    }
}
