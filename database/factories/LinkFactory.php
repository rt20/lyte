<?php

namespace Database\Factories;

use App\Link;
use Carbon\CarbonPeriod;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;

class LinkFactory extends Factory
{
    protected $model = Link::class;

    public function definition(): array
    {
        $period = CarbonPeriod::create(now()->subMonths(3), now());

        $websites = json_decode(
            file_get_contents(database_path('seeders/top-websites.json')),
            true,
        );

        $website = $this->faker->unique(true)->randomElement($websites);

        return [
            'name' => $website['title'],
            'long_url' => $website['domain'],
            'description' => $website['description'],
            'hash' => Str::random(6),
            'user_id' => $this->faker->numberBetween(1, 100),
            'type' => Arr::random(['frame', 'direct', 'overlay', 'splash']),
            'workspace_id' => 0,
            'created_at' => Arr::random($period->toArray()),
        ];
    }

    public function shortName(): Factory
    {
        return $this->state(function (array $attributes) {
            return [
                'name' => ucfirst(explode('.', $attributes['long_url'])[0]),
            ];
        });
    }
}
