<?php

use App\LinkeableClick;
use Illuminate\Database\Migrations\Migration;

class HydrateOwnerIdColInLinkClicksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        LinkeableClick::whereNull('owner_id')
            ->with(['linkeable'])
            ->chunkById(50, function ($chunk) {
                $chunk->each(function ($click) {
                    $click
                        ->fill(['owner_id' => $click->linkeable->user_id ?? 0])
                        ->save();
                });
            });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
    }
}
