<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Cashier\Billable;

class User extends Authenticatable implements MustVerifyEmail
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, Billable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'password',
        'phone',
        'subscription_type',
        'subscription_expires_at',
        'stripe_customer_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'stripe_customer_id',
        'is_admin',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'subscription_expires_at' => 'datetime',
        ];
    }


    public function subscribedCategories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class, 'category_user')
            ->withTimestamps()
            ->select('categories.*');
    }

    /**
     * The states that the user is subscribed to.
     */
    public function subscribedStates(): BelongsToMany
    {
        return $this->belongsToMany(State::class, 'state_user')
            ->withTimestamps()
            ->select('states.*');
    }
 


    public function subscribedLgas(): BelongsToMany
    {
        return $this->belongsToMany(GovernmentUnit::class, 'government_units_user')
            ->withTimestamps()
            ->select('government_units.*');
    }


    /**
     * The nuggets that belong to the user.
     */
    public function savedNuggets(): BelongsToMany
    {
        return $this->belongsToMany(Nugget::class)->withTimestamps();
    }
}
