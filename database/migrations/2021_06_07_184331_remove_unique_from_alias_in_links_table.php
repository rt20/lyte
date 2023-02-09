<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class RemoveUniqueFromAliasInLinksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('links', function (Blueprint $table) {
            $sm = Schema::getConnection()->getDoctrineSchemaManager();
            $indexesFound = $sm->listTableIndexes('links');

            if (array_key_exists('links_alias_unique', $indexesFound)) {
                $table->dropUnique('links_alias_unique');
            }
        });
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
