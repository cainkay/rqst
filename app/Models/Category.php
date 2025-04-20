<?php


namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        'title'
    ];

    public function nuggets(): HasMany
    {
        return $this->hasMany(Nugget::class);
    }

    public function subscribers(): BelongsToMany
    {
        return $this->belongsToMany(User::class)->withTimestamps();
    }
}