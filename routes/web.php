<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\NuggetController;
use App\Http\Controllers\ReleaseController;
use App\Http\Controllers\StreamController;
use App\Http\Controllers\SubscriptionController;
use App\Http\Middleware\RedirectSubscribedUsers;
use Illuminate\Auth\Middleware\RedirectIfAuthenticated;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

//public routes
Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/about', function () {
    return Inertia::render('about');
})->name('about');

Route::get('/privacy-policy', function () {
    return Inertia::render('privacy');
})->name('privacy');

Route::get('/terms-of-service', function () {
    return Inertia::render('terms');
})->name('terms');

Route::get('/subscribe', function () {
    return Inertia::render('subscribe');
})->name('subscribe');

Route::get('/stream', [StreamController::class, 'index'])->name('index');


Route::prefix('pricing')->name('pricing.')->group(function () {
    Route::get('/member', [SubscriptionController::class, 'subscribe'])->name('subscribe');
    Route::get('/free', [SubscriptionController::class, 'free'])->name('free');
});

Route::get('/checkout', function () {
    $user = Auth::user();

    return $user->newSubscription('default', env('STRIPE_PRICE_ID'))
        ->allowPromotionCodes()
        ->checkout([
            'success_url' => route('home') . '?session_id={CHECKOUT_SESSION_ID}',
            'cancel_url' => route('register'),
            'customer_update' => [
                'name' => 'auto',
            ],
            // 'custom_fields' => [
            //     [
            //         'key' => 'company',
            //         'label' => [
            //             'type' => 'custom',
            //             'custom' => 'Company Name',
            //         ],
            //         'type' => 'text',
            //         'optional' => true,
            //     ]
            // ],
        ]);
})->name('checkout');


Route::middleware(['auth'])->group(function () {
    Route::prefix('stream')->name('stream.')->group(function () {

        // View individual stream - place this AFTER specific routes
        Route::get('/{id}', [StreamController::class, 'show'])->name('show')
            ->where('id', '[0-9]+')->middleware(RedirectSubscribedUsers::class);

        // You can add more stream-related routes here
        // Route::get('/{id}/edit', [StreamController::class, 'edit'])->name('edit');
        // Route::put('/{id}', [StreamController::class, 'update'])->name('update');
        // Route::delete('/{id}', [StreamController::class, 'destroy'])->name('delete');
    });

    Route::prefix('nugget')->name('nugget.')->group(function () {
        // Save a nugget
        Route::post('/save/{nugget}', [NuggetController::class, 'store'])->name('save');
    });

    Route::prefix('releases')->name('releases.')->group(function () {
        Route::get('/', [ReleaseController::class, 'index'])->name('index');
        Route::get('/saved', [ReleaseController::class, 'saved'])->name('saved')
            ->middleware(RedirectSubscribedUsers::class);;
    });

    Route::prefix('nugget')->name('nugget.')->group(function () {
        // Save a nugget
        Route::post('/save/{nugget}', [NuggetController::class, 'store'])->name('save');
    });
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
require __DIR__ . '/category.php';
