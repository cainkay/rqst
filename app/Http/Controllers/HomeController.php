<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Stream;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class HomeController extends Controller
{
    public function index(Request $request)
    {
        $current_page = $request->query('page', 1);
        $user = auth()->user();
        $isSubscribed = $user && $user->subscribed();
        $userId = $user ? $user->id : null;


        if (!$user) {
           $current_page = 1;
        }
        
        // Build the query for streams
        $streamsQuery = Stream::orderBy('date', 'desc');
        
        // If user is present but not subscribed, restrict to last 3 months
        if ($user && !$isSubscribed) {
            $threeMonthsAgo = Carbon::now()->subMonths(3);
            $streamsQuery->where('date', '>=', $threeMonthsAgo);
        }
        

        // Get paginated streams
        $streams = $streamsQuery->paginate(1, ['*'], 'page', $current_page);
        
        if ($streams->isEmpty()) {
            return Inertia::render('home', ['stream' => null]);
        }

        
        // Get the current stream from the paginated collection
        $currentStream = $streams->first();


        
        // Get the nuggets with category
        $nuggets = $currentStream->nuggets()
            ->with(['category'])
            ->latest();
        
        // If user is logged in, include saved status
        if (!$userId) {
            $nuggets = $nuggets->take(5)->get();
        } else {
            $nuggets = $nuggets->withCount(['savedByUsers' => function ($query) use ($userId) {
                $query->where('user_id', $userId);
            }])->get();
        }

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
        $streamData = $currentStream->toArray();
        $streamData['nugget_groups'] = $groupedNuggets;
        // Add pagination metadata from the streams pagination
        $streamData['current_page'] = $streams->currentPage();
        $streamData['last_page'] = $streams->lastPage();
        $streamData['per_page'] = $streams->perPage();
        $streamData['total'] = $streams->total();
        
        // Add subscription status to the response
        $streamData['is_subscribed'] = $isSubscribed;


        if ($request->wantsJson() && !$request->header('X-Inertia')) {
            return response()->json([
                'stream' => $streamData,
            ]);
        }
    

        $categories = Category::all();
        return Inertia::render('home', ['stream' => $streamData, 'categories' => $categories]);
    }
}