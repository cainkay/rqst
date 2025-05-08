<?php

use App\Http\Controllers\Api\StreamController;
use App\Http\Middleware\AuthenticateWebhookRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::post('/stream', [StreamController::class, 'index'])->middleware(AuthenticateWebhookRequest::class);
