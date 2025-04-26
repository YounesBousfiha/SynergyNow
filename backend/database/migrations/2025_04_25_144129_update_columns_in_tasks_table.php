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
        // TODO: Update the Status Column in the database
        Schema::table('tasks', function (Blueprint $table) {
            $table->dropColumn('status');

            $table->enum('status', ['unassigned', 'todo', 'pending', 'in_progress', 'done'])->default('unassigned');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tasks', function (Blueprint $table) {
            //
        });
    }
};
