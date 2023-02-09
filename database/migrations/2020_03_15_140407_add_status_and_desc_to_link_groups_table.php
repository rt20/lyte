<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddStatusAndDescToLinkGroupsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('link_groups', function (Blueprint $table) {
            $table->boolean('public')->index()->default(0);
            $table->text('description')->nullable();
            $table->string('slug', 10)->unique();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('link_groups', function (Blueprint $table) {
            //
        });
    }
}
