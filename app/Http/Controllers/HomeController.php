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
        // Get latest stream
        $latestStream = Stream::latest()->first();
        $userId = auth()->id(); // Get current user ID, null if not logged in
    
        if (!$latestStream) {
            return Inertia::render('home', ['stream' => null]);
        }
    
        // Get the nuggets for this stream with their categories
        $nuggets = $latestStream->nuggets()->with('category');
        
        // If user is logged in, include saved status
        if ($userId) {
            $nuggets = $nuggets->withCount(['savedByUsers' => function ($query) use ($userId) {
                $query->where('user_id', $userId);
            }]);
        }
        
        $nuggets = $nuggets->get();
        
        // Add is_saved property to each nugget
        $nuggets->transform(function ($nugget) use ($userId) {
            $nugget->is_saved = $userId ? ($nugget->saved_by_users_count > 0) : false;
            return $nugget;
        });
        
        // Group by category
        $nuggetsByCategory = $nuggets->groupBy('category_id');
    
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
    
        return Inertia::render('home', ['stream' => $streamData]);
    }
}
