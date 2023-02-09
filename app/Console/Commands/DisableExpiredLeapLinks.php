<?php

namespace App\Console\Commands;

use App\Biolink;
use Carbon\Carbon;
use Illuminate\Console\Command;

class DisableExpiredLeapLinks extends Command
{

    protected $signature = 'leapLinks:disable';
    protected $description = 'Disable expires biolink leap links.';

    public function handle(): int
    {
        app(Biolink::class)
            ->links()
            ->where('leap_until', '<', Carbon::now())
            ->update(['leap_until' => null]);

        $this->info('Disabled all expired leap links.');

        return 0;
    }
}
