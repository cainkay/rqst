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

        $page = $request->input('page', 1);
        $perPage = 5; // Number of items per page
        $offset = ($page - 1) * $perPage;
        $streams = Stream::orderBy('date', 'desc')->offset($offset)->limit($perPage)->get();

        //get 5 first 5 streams, paginated 
        return Inertia::render('stream/index', ['streams' => $streams]);
    }


    public function show($id)
    {
        return Inertia::render('stream/show', ['stream' => []]);
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
