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
        Schema::table('enrollments', function (Blueprint $table) {
            $table->unsignedInteger('amount')->nullable()->after('payment_status');
            $table->string('payment_method')->default('manual_bank_transfer')->after('amount');
            $table->text('payment_notes')->nullable()->after('payment_method');
            $table->foreignId('confirmed_by')->nullable()->constrained('users')->nullOnDelete()->after('payment_notes');
            $table->timestamp('confirmed_at')->nullable()->after('confirmed_by');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('enrollments', function (Blueprint $table) {
            $table->dropForeign(['confirmed_by']);
            $table->dropColumn(['amount', 'payment_method', 'payment_notes', 'confirmed_by', 'confirmed_at']);
        });
    }
};
