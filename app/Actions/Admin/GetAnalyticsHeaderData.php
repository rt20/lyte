<?php

namespace App\Actions\Admin;

use App\Biolink;
use App\Link;
use App\LinkGroup;
use App\User;
use Common\Admin\Analytics\Actions\GetAnalyticsHeaderDataAction;
use Common\Database\Metrics\ValueMetric;

class GetAnalyticsHeaderData implements GetAnalyticsHeaderDataAction
{
    public function execute(array $params): array
    {
        return [
            array_merge(
                [
                    'icon' => [
                        [
                            'tag' => 'path',
                            'attr' => [
                                'd' =>
                                    'M17 7h-4v2h4c1.65 0 3 1.35 3 3s-1.35 3-3 3h-4v2h4c2.76 0 5-2.24 5-5s-2.24-5-5-5zm-6 8H7c-1.65 0-3-1.35-3-3s1.35-3 3-3h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-2zm-3-4h8v2H8z',
                            ],
                        ],
                    ],
                    'name' => 'New links',
                ],
                (new ValueMetric(
                    Link::withTrashed(),
                    dateRange: $params['dateRange'],
                ))->count(),
            ),
            array_merge(
                [
                    'icon' => [
                        [
                            'tag' => 'path',
                            'attr' => [
                                'd' =>
                                    'M20 5h-3.2L15 3H9L7.2 5H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 14h-8v-1c-2.8 0-5-2.2-5-5s2.2-5 5-5V7h8v12zm-3-6c0-2.8-2.2-5-5-5v1.8c1.8 0 3.2 1.4 3.2 3.2s-1.4 3.2-3.2 3.2V18c2.8 0 5-2.2 5-5zm-8.2 0c0 1.8 1.4 3.2 3.2 3.2V9.8c-1.8 0-3.2 1.4-3.2 3.2z',
                            ],
                        ],
                    ],
                    'name' => 'New biolinks',
                ],
                (new ValueMetric(
                    Biolink::query(),
                    dateRange: $params['dateRange'],
                ))->count(),
            ),
            array_merge(
                [
                    'icon' => [
                        [
                            'tag' => 'path',
                            'attr' => [
                                'd' =>
                                    'M19 5v2h-4V5h4M9 5v6H5V5h4m10 8v6h-4v-6h4M9 17v2H5v-2h4M21 3h-8v6h8V3zM11 3H3v10h8V3zm10 8h-8v10h8V11zm-10 4H3v6h8v-6z',
                            ],
                        ],
                    ],
                    'name' => 'New groups',
                ],
                (new ValueMetric(
                    LinkGroup::withTrashed(),
                    dateRange: $params['dateRange'],
                ))->count(),
            ),
            array_merge(
                [
                    'icon' => [
                        [
                            'tag' => 'path',
                            'attr' => [
                                'd' =>
                                    'M12 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m0 10c2.7 0 5.8 1.29 6 2H6c.23-.72 3.31-2 6-2m0-12C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z',
                            ],
                        ],
                    ],
                    'name' => 'New users',
                ],
                (new ValueMetric(
                    User::query(),
                    dateRange: $params['dateRange'],
                ))->count(),
            ),
        ];
    }
}
