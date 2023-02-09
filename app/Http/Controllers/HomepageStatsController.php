<?php

namespace App\Http\Controllers;

use App\Link;
use App\LinkeableClick;
use App\User;
use Common\Core\BaseController;

class HomepageStatsController extends BaseController
{
    public function __invoke()
    {
        $data = ['stats' => [
            'links' => app(Link::class)->count(),
            'clicks' => app(LinkeableClick::class)->count(),
            'users' => app(User::class)->count(),
        ]];

        return $this->success($data, 200, [
            'prerender.config' => 'home.show',
        ]);
    }
}
