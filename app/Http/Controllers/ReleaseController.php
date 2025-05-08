<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Nugget;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class ReleaseController extends Controller
{
    public function index(Request $request)
    {
        $user = auth()->user();
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
                $q->where('description', 'like', '%' . $search . '%');
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

        // Execute the query with paginationst
        $releases = $query->paginate($perPage, ['*'], 'page', $page);

        // Return JSON if requested
        if ($request->wantsJson() && !$request->header('X-Inertia')) {
            return response()->json($releases);
        }

        return Inertia::render('releases', [
            'releases' => $releases, 
            'categories' => Category::all()
        ]);
    }
}