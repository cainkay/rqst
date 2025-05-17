<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PreferenceController extends Controller
{
    //
    public function patch(Request $request)
    {
        // get categies from the request, array of ids
        $categories = $request->input('categories', []);
        $states = $request->input('states', []);
        $lgas = $request->input('lgas', []);

        // get the user
        $user = Auth::user();

        //update the user categories
        $user->subscribedCategories()->sync($categories);
        $user->subscribedStates()->sync($states);
        $user->subscribedLgas()->sync($lgas);

        return to_route('profile.edit');
    }
}
