<?php

namespace App\Actions\Link;

use App\LinkeableClick;
use App\User;
use Carbon\Carbon;
use Carbon\CarbonPeriod;

class GetMonthlyClicks
{
    public function execute(User $user): int
    {
        $range = CarbonPeriod::create(
            Carbon::now()->startOfMonth(),
            '1 month',
            Carbon::now()->endOfMonth(),
        );

        return LinkeableClick::where('crawler', false)
            ->where('owner_id', $user->id)
            ->whereBetween('link_clicks.created_at', [
                $range->getStartDate(),
                $range->getEndDate(),
            ])
            ->count();
    }
}
