<?php

use Common\Settings\Settings;
use Illuminate\Database\Migrations\Migration;

class MigrateLandingPageConfigTo20 extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $config = app(Settings::class)->get('homepage.appearance');
        if ($config) {
            $config = str_replace('campaign.svg', 'add-file.svg', $config);
            $config = str_replace('lock.svg', 'authentication.svg', $config);
            $config = str_replace('globe.svg', 'right-direction.svg', $config);
            app(Settings::class)->save([
                'homepage.appearance' => $config
            ]);
        }
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
