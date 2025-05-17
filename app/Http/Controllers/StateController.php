<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class StateController extends Controller
{
    public function patch(Request $request)
    {
        // get categies from the request, array of ids
        $states = $request->input('states', []);

        // get the user
        $user = Auth::user();

        //update the user categories
        $user->subscribedStates()->sync($states);

        return to_route('profile.edit');
    }
}
