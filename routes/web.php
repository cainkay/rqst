<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\NuggetController;
use App\Http\Controllers\StreamController;
use App\Http\Controllers\SubscriptionController;

//public routes
Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/about', function () {
    return Inertia::render('about');
})->name('about');

Route::get('/subscribe', function () {
    return Inertia::render('subscribe');
})->name('subscribe');

Route::get('/stream', [StreamController::class, 'index'])->name('index');


Route::prefix('pricing')->name('pricing.')->group(function () {
    Route::get('/member', [SubscriptionController::class, 'subscribe'])->name('subscribe');
    Route::get('/free', [SubscriptionController::class, 'free'])->name('free');

});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::prefix('stream')->name('stream.')->group(function () {
        
        Route::get('/saved', [StreamController::class, 'saved'])->name('saved');
        
        // View individual stream - place this AFTER specific routes
        Route::get('/{id}', [StreamController::class, 'show'])->name('show')
            ->where('id', '[0-9]+'); // Limit ID to numbers only
        
        // You can add more stream-related routes here
        // Route::get('/{id}/edit', [StreamController::class, 'edit'])->name('edit');
        // Route::put('/{id}', [StreamController::class, 'update'])->name('update');
        // Route::delete('/{id}', [StreamController::class, 'destroy'])->name('delete');
    });

    Route::prefix('nugget')->name('nugget.')->group(function () {
        // Save a nugget
        Route::post('/save/{nugget}', [NuggetController::class, 'store'])->name('save');
    });
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
