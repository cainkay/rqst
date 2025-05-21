<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\GovernmentUnit;
use App\Models\Nugget;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class ReleaseController extends Controller
{
    public function index(Request $request) {
        $user = Auth::user();
        $isSubscribed = $user && $user->subscribed();
        $page = $request->query('page', 1);
        $perPage = 10; // Number of items per page
        $category = $request->query('categories');
        $search = $request->query('search');
        $state = $request->query('states');
        $lga = $request->query('lgas');
        $start_date = $request->query('start_date');
        $end_date = $request->query('end_date');
        
        // Start building the query
        $query = Nugget::orderBy('date', 'desc');

        // Apply filtering if needed
        if ($user && !$isSubscribed) {
            $threeMonthsAgo = now()->subMonths(3);
            $query->where('date', '>=', $threeMonthsAgo);
        }

        // Filter release by category
        if ($category) {
            $query->whereHas('category', function ($q) use ($category) {
                // Convert the category to an array if it's a string
                if (is_string($category)) {
                    $category = explode(',', $category);
                }
                $q->whereIn('id', $category);
            });
        }
        
        // Filter release by search
        if ($search) {
            $query->where(function ($q) use ($search) {
                // Convert the search term to lowercase
                $search = strtolower($search);
                // Use LOWER() function on the description column for case-insensitive comparison
                $q->whereRaw('LOWER(description) LIKE ?', ['%' . $search . '%']);
            });
        }
        
        // Filter release by state
        if ($state) {
            if (is_string($state)) {
                $state = explode(',', $state);
            }
            $query->whereIn('state', $state);
        }

        // Filter release by LGA
        if ($lga) {
            if (is_string($lga)) {
                $lga = explode(',', $lga);
            }
            $query->whereIn('lga', $lga);
        }

        // Filter release by date range
        if ($start_date || $end_date) {
            if ($start_date && $end_date) {
                // Parse dates using Carbon and ensure correct format
                $startDate = Carbon::parse($start_date)->startOfDay();
                $endDate = Carbon::parse($end_date)->endOfDay();
                
                $query->whereBetween('date', [$startDate, $endDate]);
            } 
        }

        // Execute the query with pagination
        $releases = $query->paginate($perPage, ['*'], 'page', $page);

        // Return JSON if requested
        if ($request->wantsJson() && !$request->header('X-Inertia')) {
            return response()->json($releases);
        }

        return Inertia::render('releases', [
            'releases' => $releases, 
            'categories' => Category::all(),
            'lgas' => GovernmentUnit::all(),
        ]);
    }

    public function saved(Request $request)
    {
        $user = Auth::user();
        $page = $request->query('page', 1);
        $perPage = 10; // Number of items per page (matching index method)
        $category = $request->query('categories');
        $search = $request->query('search');
        $state = $request->query('states');
        $lga = $request->query('lgas');
        $start_date = $request->query('start_date');
        $end_date = $request->query('end_date');
        
        // Start building the query for saved nuggets
        $query = $user->savedNuggets()->orderBy('nuggets.date', 'desc');

        // Filter by category
        if ($category) {
            $query->whereHas('category', function ($q) use ($category) {
                // Convert the category to an array if it's a string
                if (is_string($category)) {
                    $category = explode(',', $category);
                }
                $q->whereIn('id', $category);
            });
        }
        
        // Filter by search
        if ($search) {
            $query->where(function ($q) use ($search) {
                // Convert the search term to lowercase
                $search = strtolower($search);
                // Use LOWER() function on the description column for case-insensitive comparison
                $q->whereRaw('LOWER(nuggets.description) LIKE ?', ['%' . $search . '%']);
            });
        }
        
        // Filter by state
        if ($state) {
            if (is_string($state)) {
                $state = explode(',', $state);
            }
            $query->whereIn('nuggets.state', $state);
        }

        // Filter by LGA
        if ($lga) {
            if (is_string($lga)) {
                $lga = explode(',', $lga);
            }
            $query->whereIn('nuggets.lga', $lga);
        }

        // Filter by date range
        if ($start_date && $end_date) {
            // Parse dates using Carbon and ensure correct format
            $startDate = Carbon::parse($start_date)->startOfDay();
            $endDate = Carbon::parse($end_date)->endOfDay();
            
            $query->whereBetween('nuggets.date', [$startDate, $endDate]);
        }

        // Execute the query with pagination
        $nuggets = $query->paginate($perPage, ['*'], 'page', $page);

        // Add is_saved property to each nugget
        $nuggets->getCollection()->transform(function ($nugget) {
            $nugget->is_saved = true; // These are all saved by definition
            return $nugget;
        });

        // Return JSON if requested
        if ($request->wantsJson() && !$request->header('X-Inertia')) {
            return response()->json($nuggets);
        }

        return Inertia::render('stream/saved', [
            'releases' => $nuggets,
            'categories' => Category::all(),
            'lgas' => GovernmentUnit::all(),
        ]);
    }
}