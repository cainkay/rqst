<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Stream;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class StreamController extends Controller
{
    //
    public function index(Request $request)
    {
        $user = auth()->user();
        $isSubscribed = $user && $user->subscribed();
        $page = $request->query('page', 1);
        $perPage = 20; // Number of items per page
        $offset = ($page - 1) * $perPage;

        // Start building the query
        $query = Stream::orderBy('date', 'desc');

        // Apply filtering if needed
        if ($user && !$isSubscribed) {
            $threeMonthsAgo = now()->subMonths(3);
            $query->where('date', '>=', $threeMonthsAgo);
        }

        // Execute the query with pagination
        $streams = $query->paginate($perPage, ['*'], 'page', $page);

        // For debugging
        // dump(json_encode($streams));

        if ($request->wantsJson() && !$request->header('X-Inertia')) {
            return response()->json($streams);
        }

        return Inertia::render('stream/index', [
            'streams' => $streams,
        ]);
    }

    public function show($id)
    {
        $stream = Stream::find($id);
        $userId = Auth::user()->id;
        if (!$stream) {
            return redirect()->route('home')->with('error', 'Stream not found');
        }

        // Get the nuggets with category and saved status in a single query
        $nuggets = $stream->nuggets()
            ->with(['category'])
            ->when($userId, function ($query) use ($userId) {
                // Only join the pivot table if we have a user ID
                return $query->leftJoin('nugget_user', function ($join) use ($userId) {
                    $join->on('nuggets.id', '=', 'nugget_user.nugget_id')
                        ->where('nugget_user.user_id', '=', $userId);
                })
                    // Select all nugget fields and add is_saved field
                    ->select('nuggets.*', \DB::raw('CASE WHEN nugget_user.user_id IS NOT NULL THEN 1 ELSE 0 END as is_saved'));
            }, function ($query) {
                // If no user ID, just select all nugget fields with is_saved as 0
                return $query->select('nuggets.*', \DB::raw('0 as is_saved'));
            })
            ->latest()
            ->get();

        // No need for transform as is_saved is already a property
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
        $stream['nugget_groups'] = $groupedNuggets;



        return Inertia::render('stream/show', [
            'stream' => $stream,
            'categories' => Category::all(),
        ]);
    }


}
