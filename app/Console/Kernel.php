<?php

namespace App\Console;

use App\Console\Commands\DeleteExpiredLinkeables;
use App\Console\Commands\DisableExpiredLeapLinks;
use App\Console\Commands\ExpireLinksCreatedFromHomepage;
use App\Console\Commands\ResetDemoSite;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [];

    /**
     * Define the application's command schedule.
     *
     * @param Schedule $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        $schedule
            ->command(DeleteExpiredLinkeables::class)
            ->everyFifteenMinutes();

        $schedule
            ->command(DisableExpiredLeapLinks::class)
            ->everyFifteenMinutes();

        $schedule->command(ExpireLinksCreatedFromHomepage::class)->daily();

        if (config('common.site.demo')) {
            $schedule->command(ResetDemoSite::class)->daily();
        }

        if (config('queue.default') !== 'sync') {
            $schedule->command('horizon:snapshot')->everyFiveMinutes();
        }
    }

    /**
     * Register the Closure based commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__ . '/Commands');

        require base_path('routes/console.php');
    }
}
