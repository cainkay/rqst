<?php

namespace App\Observers;

use App\Models\User;
use Illuminate\Support\Facades\Http;

class UserObserver
{
    /**
     * Handle the User "created" event.
     */

    public function created(User $user): void
    {
        try {
            //dont run this on local
            if (app()->environment('local')) {
                return;
            }
            $response = Http::withHeaders([
                "Authorization" => "Bearer " . env('ATTIO_API_KEY'),
                "Content-Type" => "application/json",
            ])->put("https://api.attio.com/v2/objects/people/records?matching_attribute=email_addresses", [
                "data" => [
                    "values" => [
                        "email_addresses" => [$user->email],
                        "name" => [
                            [
                                "first_name" => $user->first_name,
                                "last_name" => $user->last_name,
                                "full_name" => $user->first_name . ' ' . $user->last_name
                            ]
                        ]
                    ]
                ]
            ]);

            if ($response->successful()) {
                logger()->info("User created in Attio: " . $user->email);
            } else {
                logger()->error("ATTIO:Error creating user in Attio: Status " . $response->status());
                logger()->error("ATTIO:Error details: " . $response->body());
            }
        } catch (\Illuminate\Http\Client\RequestException $th) {
            // Special handling for HTTP Client exceptions
            logger()->error("ATTIO:Error creating user in Attio: Status " . $th->response->status());
            logger()->error("ATTIO:Error details: " . $th->response->body());
        } catch (\Throwable $th) {
            // General error handling
            logger()->error("ATTIO:General error: " . $th->getMessage());
        }
    }

    /**
     * Handle the User "updated" event.
     */
    public function updated(User $user): void {}

    /**
     * Handle the User "deleted" event.
     */
    public function deleted(User $user): void
    {
        //
    }

    /**
     * Handle the User "restored" event.
     */
    public function restored(User $user): void
    {
        //
    }

    /**
     * Handle the User "force deleted" event.
     */
    public function forceDeleted(User $user): void
    {
        //
    }
}
