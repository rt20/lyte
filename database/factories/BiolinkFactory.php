<?php

namespace Database\Factories;

use App\Biolink;
use Carbon\CarbonPeriod;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;

class BiolinkFactory extends Factory
{
    protected $model = Biolink::class;

    public function definition(): array
    {
        $period = CarbonPeriod::create(now()->subMonths(2), now());

        return [
            'name' => $this->faker->company,
            'description' => $this->faker->text(),
            'hash' => Str::random(6),
            'active' => true,
            'clicks_count' => $this->faker->numberBetween(1, 1000),
            'user_id' => $this->faker->numberBetween(1, 100),
            'workspace_id' => 0,
            'clicked_at' => Arr::random($period->toArray()),
            'created_at' => Arr::random($period->toArray()),
            'updated_at' => Arr::random($period->toArray()),
        ];
    }
}
