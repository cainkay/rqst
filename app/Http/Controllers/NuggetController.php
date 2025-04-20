<?php

namespace App\Http\Controllers;

use App\Models\Nugget;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NuggetController extends Controller
{
    public function store(Request $request, Nugget $nugget)
    {
        $user = Auth::user();
        
        // Check if user has already saved this nugget
        if ($user->savedNuggets()->where('nugget_id', $nugget->id)->exists()) {
            // Unsave - remove the relationship
            $user->savedNuggets()->detach($nugget->id);
            $isSaved = false;
        } else {
            // Save - create the relationship
            $user->savedNuggets()->attach($nugget->id);
            $isSaved = true;
        }
        
        if ($request->wantsJson() && !$request->header('X-Inertia')) {
            return response()->json([
                'success' => true,
                'is_saved' => $isSaved
            ]);
        }

        //refresh the page
        return redirect()->back()->with('success', 'Nugget saved successfully!');
    }
}