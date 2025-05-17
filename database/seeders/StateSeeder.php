<?php

namespace Database\Seeders;

use App\Models\State;
use Illuminate\Database\Seeder;

class StateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $states = [
            [
                'name' => 'New South Wales',
                'abbr' => 'NSW',
            ],
            [
                'name' => 'Victoria',
                'abbr' => 'VIC',
            ],
            [
                'name' => 'Queensland',
                'abbr' => 'QLD',
            ],
            [
                'name' => 'South Australia',
                'abbr' => 'SA',
            ],
            [
                'name' => 'Western Australia',
                'abbr' => 'WA',
            ],
            [
                'name' => 'Tasmania',
                'abbr' => 'TAS',
            ],
            [
                'name' => 'Australian Capital Territory',
                'abbr' => 'ACT',
            ],
            [
                'name' => 'Northern Territory',
                'abbr' => 'NT',
            ],
        ];

        foreach ($states as $state) {
            State::updateOrCreate(
                ['abbr' => $state['abbr']], // Unique identifier to prevent duplicates
                $state
            );
        }
    }
}