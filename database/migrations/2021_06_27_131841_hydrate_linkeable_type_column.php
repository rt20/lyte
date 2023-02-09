<?php

use App\Link;
use App\LinkeableClick;
use App\LinkeableRule;
use Illuminate\Database\Migrations\Migration;

class HydrateLinkeableTypeColumn extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        LinkeableRule::whereNotNull('linkeable_id')->update([
            'linkeable_type' => Link::class,
        ]);

        LinkeableClick::whereNotNull('linkeable_id')->update([
            'linkeable_type' => Link::class,
        ]);

        DB::table('link_tracking_pixel')
            ->whereNotNull('linkeable_id')
            ->update([
                'linkeable_type' => Link::class,
            ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
