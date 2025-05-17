<?php

use App\Http\Controllers\PreferenceController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {
    Route::prefix('preference')->name('preference.')->group(function () {
        Route::patch('/', [PreferenceController::class, 'patch'])->name('patch');
    });
});
