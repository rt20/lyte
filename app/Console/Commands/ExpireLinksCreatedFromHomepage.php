<?php

namespace App\Console\Commands;

use App\Link;
use Carbon\Carbon;
use Common\Settings\Settings;
use Illuminate\Console\Command;

class ExpireLinksCreatedFromHomepage extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'linksFromHomepage:expire';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Expire links create from homepage.';

    public function handle(): int
    {
        $period = app(Settings::class)->get('links.home_expiration');

        if ($period) {
            $expirationDate = Carbon::now();
            if ($period === '1day') {
                $expirationDate = $expirationDate->addDays(-1);
            } else if ($period === '3days') {
                $expirationDate = $expirationDate->addDays(-3);
            } else if ($period === '7days') {
                $expirationDate = $expirationDate->addDays(-7);
            }

            Link::whereNull('user_id')
                ->where('created_at', '<=', $expirationDate)
                ->update(['expires_at' => Carbon::now()]);
        }

        return 0;
    }
}
