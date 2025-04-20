<?php

namespace Database\Seeders;

use App\Models\Nugget;
use App\Models\Stream;
use App\Models\Category;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class NuggetSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get all streams and categories to reference
        $streams = Stream::all();
        $categories = Category::all();
        
        // Australian states
        $states = [
            'NSW', // New South Wales
            'VIC', // Victoria
            'QLD', // Queensland 
            'SA',  // South Australia
            'WA',  // Western Australia
            'TAS', // Tasmania
            'NT',  // Northern Territory
            'ACT'  // Australian Capital Territory
        ];
        
        $nuggets = [
            [
                'description' => 'New infrastructure project announced for Sydney metro',
                'url' => 'https://example.com/news/1',
            ],
            [
                'description' => 'Local farmers markets expanding in Brisbane suburbs',
                'url' => 'https://example.com/news/2',
            ],
            [
                'description' => 'Melbourne tech startups receive major investment',
                'url' => 'https://example.com/news/3',
            ],
            [
                'description' => 'Educational reforms proposed for Perth schools',
                'url' => 'https://example.com/news/4',
            ],
            [
                'description' => 'Adelaide cultural festival announces lineup',
                'url' => 'https://example.com/news/5',
            ],
            [
                'description' => 'Hobart conservation effort saves endangered species',
                'url' => 'https://example.com/news/6',
            ],
            [
                'description' => 'Darwin community project wins international recognition',
                'url' => 'https://example.com/news/7',
            ],
            [
                'description' => 'Canberra policy changes impact renewable energy sector',
                'url' => 'https://example.com/news/8',
            ],
            [
                'description' => 'Regional tourism surge in Queensland coastal towns',
                'url' => 'https://example.com/news/9',
            ],
            [
                'description' => 'Healthcare initiatives launched in Victoria',
                'url' => 'https://example.com/news/10',
            ],
            [
                'description' => 'Northern Territory wildlife sanctuary expands operations',
                'url' => 'https://example.com/news/11',
            ],
            [
                'description' => 'New South Wales rural development program announced',
                'url' => 'https://example.com/news/12',
            ],
            [
                'description' => 'Western Australia mining regulations updated',
                'url' => 'https://example.com/news/13',
            ],
            [
                'description' => 'South Australian wine industry celebrates record exports',
                'url' => 'https://example.com/news/14',
            ],
            [
                'description' => 'Tasmania tourism campaign wins marketing award',
                'url' => 'https://example.com/news/15',
            ],
        ];
        
        foreach ($nuggets as $index => $nugget) {
            // Assign to a random stream and category
            $streamId = $streams->random()->id;
            $categoryId = $categories->random()->id;
            
            // Get a random state
            $state = $states[array_rand($states)];
            
            // Create date within last 30 days
            $date = Carbon::now()->subDays(rand(1, 30));
            
            Nugget::create([
                'stream_id' => $streamId,
                'category_id' => $categoryId,
                'state' => $state,
                'description' => $nugget['description'],
                'date' => $date,
                'url' => $nugget['url']
            ]);
        }
    }
}