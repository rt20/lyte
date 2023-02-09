<?php

namespace Database\Factories;

use App\Link;
use App\LinkeableClick;
use Carbon\CarbonPeriod;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Arr;

class LinkeableClickFactory extends Factory
{
    protected $model = LinkeableClick::class;

    public function definition(): array
    {
        $period = CarbonPeriod::create(now()->subMonths(1), now());
        $referrers = json_decode(
            file_get_contents(database_path('seeders/referrers.json')),
            true,
        );
        $referrers = array_map(function ($referrer) {
            return "https://{$referrer}";
        }, $referrers);
        // Direct, Email, SMS
        $referrers[] = null;

        return [
            'linkeable_id' => $this->faker->numberBetween(1, 500),
            'linkeable_type' => Link::class,
            'location' => Arr::random([
                'US',
                'DE',
                'FR',
                'GB',
                'CA',
                'AU',
                'JP',
                'CN',
                'IN',
                'RU',
            ]),
            'ip' => $this->faker->ipv4,
            'platform' => Arr::random(['windows', 'linux', 'ios', 'androidos']),
            'device' => Arr::random(['mobile', 'tablet', 'desktop']),
            'crawler' => false,
            'browser' => Arr::random([
                'chrome',
                'firefox',
                'edge',
                'internet explorer',
                'safari',
            ]),
            'referrer' => Arr::random($referrers),
            'created_at' => Arr::random($period->toArray()),
        ];
    }
}
