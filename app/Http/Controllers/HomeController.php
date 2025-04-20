<?php

namespace App\Http\Controllers;

use App\Models\Stream;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        // Cache key based on the latest stream's ID
        $latestStream = Stream::latest()->first();

        if (!$latestStream) {
            return Inertia::render('home', ['stream' => null]);
        }

        $cacheKey = 'stream_' . $latestStream->id . '_with_grouped_nuggets';

        //remove cache
        if (Cache::has($cacheKey)) {
            Cache::forget($cacheKey);
        }

        // Cache for 1 hour (or adjust as needed)
        $stream = Cache::remember($cacheKey, 3600, function () use ($latestStream) {
            // Get the nuggets for this stream with their categories
            $nuggetsByCategory = $latestStream->nuggets()
                ->with('category')
                ->get()
                ->groupBy('category_id');

            // Convert to a format easier to use in frontend
            $groupedNuggets = $nuggetsByCategory->map(function ($nuggets, $categoryId) {
                // Get the category from the first nugget in the group
                $category = $nuggets->first()->category;

                return [
                    'category_id' => (int)$categoryId ?: null,
                    'category_title' => $category ? $category->title : 'Uncategorized',
                    'nuggets' => $nuggets
                ];
            })->values();

            // Add the grouped nuggets to the stream
            $streamData = $latestStream->toArray();
            $streamData['nugget_groups'] = $groupedNuggets;

            return $streamData;
        });

        return Inertia::render('home', ['stream' => $stream]);
    }
}
