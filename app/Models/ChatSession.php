<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ChatSession extends Model
{
    use HasFactory;

    protected $fillable = [
        'session_id',
        'guest_name',
        'guest_email',
        'guest_phone',
        'status', // 'active', 'closed'
        'last_activity_at',
        'metadata',
    ];

    protected $casts = [
        'metadata' => 'array',
        'last_activity_at' => 'datetime',
    ];

    /**
     * Get all messages for this chat session.
     */
    public function messages(): HasMany
    {
        return $this->hasMany(ChatMessage::class)->orderBy('created_at', 'asc');
    }

    /**
     * Get unread messages count for admin.
     */
    public function getUnreadMessagesCountAttribute(): int
    {
        return $this->messages()->fromGuest()->unread()->count();
    }

    /**
     * Get the latest message.
     */
    public function getLatestMessageAttribute(): ?ChatMessage
    {
        return $this->messages()->latest()->first();
    }

    /**
     * Scope for active sessions.
     */
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    /**
     * Scope for closed sessions.
     */
    public function scopeClosed($query)
    {
        return $query->where('status', 'closed');
    }

    /**
     * Update last activity timestamp.
     */
    public function updateActivity(): void
    {
        $this->update(['last_activity_at' => now()]);
    }

    /**
     * Close the chat session.
     */
    public function close(): void
    {
        $this->update(['status' => 'closed']);
    }
}
