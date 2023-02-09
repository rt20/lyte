<?php

namespace Database\Factories;

use App\LinkGroup;
use Carbon\CarbonPeriod;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Arr;
use Str;

class LinkGroupFactory extends Factory
{
    protected $model = LinkGroup::class;

    public function definition(): array
    {
        $period = CarbonPeriod::create(now()->subMonths(3), now());

        $name = $this->faker->unique()->randomElement([
          'Holiday special',
          'Winter sale',
          'Personal links',
          'Business links',
          'Summer campaign',
        ]);

        return [
            'name' => $name,
            'hash' => Str::random(6),
            'user_id' => $this->faker->numberBetween(1, 100),
            'clicks_count' => 0,
            'active' => true,
            'rotator' => false,
            'created_at' => Arr::random($period->toArray()),
            'workspace_id' => 0,
        ];
    }
}
