<?php

namespace App\Http\Controllers;

use App\Models\Stream;
use Illuminate\Http\Request;
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

        return Inertia::render('stream/index', ['streams' => $streams]);
    }

    public function show($id)
    {
        $stream = Stream::find($id);
        $userId = auth()->id();

        if (!$stream) {
            return redirect()->route('home')->with('error', 'Stream not found');
        }

        // Get the nuggets with category
        $nuggets = $stream->nuggets()
            ->with(['category'])
            ->latest()
            ->get();


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
        $stream['nugget_groups'] = $groupedNuggets;



        return Inertia::render('stream/show', ['stream' => $stream]);
    }


    public function saved(Request $request)
    {
        $page = $request->input('page', 1);
        $perPage = 5; // Number of items per page
        $offset = ($page - 1) * $perPage;

        $nuggets = auth()->user()->savedNuggets()
            ->orderBy('created_at', 'desc')
            ->offset($offset)
            ->limit($perPage)
            ->get();

        // Add is_saved property to each nugget
        $nuggets->transform(function ($nugget) {
            $nugget->is_saved = true; // These are all saved by definition
            return $nugget;
        });


        return Inertia::render('stream/saved', ['nuggets' => $nuggets]);
    }
}
