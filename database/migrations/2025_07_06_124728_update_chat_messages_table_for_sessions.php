<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('chat_messages', function (Blueprint $table) {
            // Drop foreign key constraint first
            $table->dropForeign(['replied_by']);

            // Drop old indexes
            $table->dropIndex(['status', 'created_at']);
            $table->dropIndex(['email']);

            // Drop old columns
            $table->dropColumn(['name', 'email', 'phone', 'status', 'admin_reply', 'replied_at', 'replied_by', 'session_id']);

            // Add new columns
            $table->foreignId('chat_session_id')->constrained()->onDelete('cascade');
            $table->enum('sender_type', ['guest', 'admin'])->default('guest');
            $table->string('sender_name')->nullable();
            $table->boolean('is_read')->default(false);

            // Add indexes
            $table->index(['chat_session_id', 'created_at']);
            $table->index(['sender_type', 'is_read']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('chat_messages', function (Blueprint $table) {
            // Drop new columns
            $table->dropForeign(['chat_session_id']);
            $table->dropColumn(['chat_session_id', 'sender_type', 'sender_name', 'is_read']);

            // Restore old columns
            $table->string('name');
            $table->string('email');
            $table->string('phone')->nullable();
            $table->enum('status', ['unread', 'read', 'replied'])->default('unread');
            $table->text('admin_reply')->nullable();
            $table->timestamp('replied_at')->nullable();
            $table->foreignId('replied_by')->nullable()->constrained('users')->onDelete('set null');
            $table->string('session_id')->nullable();

            // Restore old indexes
            $table->index(['status', 'created_at']);
            $table->index('email');
        });
    }
};
