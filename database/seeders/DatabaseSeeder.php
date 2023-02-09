<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        if (config('common.site.demo') || app()->environment('local')) {
            $this->call(DemoProductSeeder::class);
        }
        $this->call(WorkspaceRoleSeeder::class);
    }
}
