<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            'News',
            'Events',
            'Business',
            'Technology',
            'Education',
            'Health',
            'Entertainment',
            'Sports',
            'Politics',
            'Environment'
        ];

        foreach ($categories as $category) {
            Category::create([
                'title' => $category
            ]);
        }
    }
}