<?php

use Common\Settings\Settings;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class MigrateLandingPageCtaToMenuItem extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $config = app(Settings::class)->getJson('homepage.appearance');
        if ($config) {
            $config['actions']['cta1'] = [
                'label' => $config['actions']['cta1'],
                'action' => '/login',
                'type' => 'route',
            ];
            $config['actions']['cta2'] = [
                'label' => $config['actions']['cta2'],
                'action' => '.first-secondary-feature',
                'type' => 'scrollTo',
            ];
            app(Settings::class)->save([
                'homepage.appearance' => json_encode($config)
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
