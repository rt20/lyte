<?php

namespace Database\Seeders;

use App\User;
use Common\Billing\Subscription;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $range = range(1, 100);
        // 100 times x 10000
        foreach ($range as $r) {
            User::factory()->count(10000)
                ->has(Subscription::factory()->count(1))
                ->create();
        }
    }
}
