<?php

namespace Database\Seeders;

use Common\Auth\Permissions\Permission;
use Common\Billing\Models\Product;
use Common\Billing\Products\Actions\CrupdateProduct;
use Illuminate\Database\Seeder;

class DemoProductSeeder extends Seeder
{
    public function run()
    {
        if (Product::count()) {
            return;
        }

        $this->basicPlan();
        $this->standardPlan();
        $this->proPlan();
    }

    protected function basicPlan()
    {
        [$featureList, $permissions] = $this->getFeaturesAndPermission([
            'visitors' => 1000,
            'links' => 50,
            'pages' => 10,
            'groups' => 10,
            'overlays' => 10,
            'pixels' => 10,
        ]);

        app(CrupdateProduct::class)->execute([
            'name' => 'Basic',
            'position' => 1,
            'feature_list' => $featureList,
            'permissions' => $permissions,
            'prices' => [
                [
                    'amount' => 10,
                    'currency' => 'USD',
                    'interval' => 'month',
                    'interval_count' => 1,
                ],
                [
                    'amount' => 54,
                    'currency' => 'USD',
                    'interval' => 'month',
                    'interval_count' => 6,
                ],
                [
                    'amount' => 96,
                    'currency' => 'USD',
                    'interval' => 'month',
                    'interval_count' => 12,
                ],
            ],
        ]);
    }

    protected function standardPlan()
    {
        [$featureList, $permissions] = $this->getFeaturesAndPermission([
            'visitors' => 3000,
            'links' => 150,
            'pages' => 30,
            'groups' => 30,
            'overlays' => 30,
            'pixels' => 30,
        ]);
        app(CrupdateProduct::class)->execute([
            'name' => 'Standard',
            'position' => 2,
            'feature_list' => $featureList,
            'permissions' => $permissions,
            'recommended' => true,
            'prices' => [
                [
                    'amount' => 15,
                    'currency' => 'USD',
                    'interval' => 'month',
                    'interval_count' => 1,
                ],
                [
                    'amount' => 81,
                    'currency' => 'USD',
                    'interval' => 'month',
                    'interval_count' => 6,
                ],
                [
                    'amount' => 144,
                    'currency' => 'USD',
                    'interval' => 'month',
                    'interval_count' => 12,
                ],
            ],
        ]);
    }

    protected function proPlan()
    {
        [$featureList, $permissions] = $this->getFeaturesAndPermission([]);
        app(CrupdateProduct::class)->execute([
            'name' => 'Pro',
            'position' => 3,
            'feature_list' => $featureList,
            'permissions' => $permissions,
            'prices' => [
                [
                    'amount' => 20,
                    'currency' => 'USD',
                    'interval' => 'month',
                    'interval_count' => 1,
                ],
                [
                    'amount' => 135,
                    'currency' => 'USD',
                    'interval' => 'month',
                    'interval_count' => 6,
                ],
                [
                    'amount' => 240,
                    'currency' => 'USD',
                    'interval' => 'month',
                    'interval_count' => 12,
                ],
            ],
        ]);
    }

    protected function getFeaturesAndPermission(array $params): array
    {
        $permissionIds = app(Permission::class)->pluck('id', 'name');
        $featureList = [
            isset($params['visitors'])
                ? "Up to {$params['visitors']} visitors / month"
                : 'Unlimited visitors / month',
            isset($params['links'])
                ? "Up to {$params['links']} links"
                : 'Unlimited links',
            isset($params['pages'])
                ? "Up to {$params['pages']} custom link pages"
                : 'Unlimited link pages',
            isset($params['groups'])
                ? "Up to {$params['groups']} link groups"
                : 'Unlimited link groups',
            isset($params['overlays'])
                ? "Up to {$params['overlays']} link overlays"
                : 'Unlimited link overlays',
            isset($params['pixels'])
                ? "Up to {$params['pixels']} tracking pixels"
                : 'Unlimited tracking pixels',
        ];

        $permissions = [];

        $permissions[] = [
            'id' => $permissionIds['links.create'],
            'restrictions' => [
                ['name' => 'count', 'value' => $params['links'] ?? null],
                [
                    'name' => 'click_count',
                    'value' => $params['visitors'] ?? null,
                ],
            ],
        ];

        $permissions[] = [
            'id' => $permissionIds['custom_pages.create'],
            'restrictions' => [
                ['name' => 'count', 'value' => $params['pages'] ?? null],
            ],
        ];

        $permissions[] = [
            'id' => $permissionIds['link_groups.create'],
            'restrictions' => [
                ['name' => 'count', 'value' => $params['groups'] ?? null],
            ],
        ];

        $permissions[] = [
            'id' => $permissionIds['link_overlays.create'],
            'restrictions' => [
                ['name' => 'count', 'value' => $params['overlays'] ?? null],
            ],
        ];

        $permissions[] = [
            'id' => $permissionIds['tracking_pixels.create'],
            'restrictions' => [
                ['name' => 'count', 'value' => $params['pixels'] ?? null],
            ],
        ];

        return [$featureList, $permissions];
    }
}
