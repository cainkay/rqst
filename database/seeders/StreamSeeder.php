<?php

namespace Database\Seeders;

use App\Models\Stream;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class StreamSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $streams = [
            [
                'description' => 'Latest national updates',
                'date' => Carbon::now()->subDays(2)
            ],
            [
                'description' => 'Local community highlights',
                'date' => Carbon::now()->subDays(4)
            ],
            [
                'description' => 'Breaking industry news',
                'date' => Carbon::now()->subDays(7)
            ],
            [
                'description' => 'Upcoming events roundup',
                'date' => Carbon::now()->subDays(10)
            ],
            [
                'description' => 'Technology innovations this week',
                'date' => Carbon::now()->subDays(14)
            ],
        ];

        foreach ($streams as $stream) {
            Stream::create($stream);
        }
    }
}