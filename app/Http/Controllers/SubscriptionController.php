<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class SubscriptionController extends Controller
{
    //
    public function subscribe(Request $request)
    {
        // Handle subscription logic here
        return Inertia::render('pricing/member');
  
    }
}
