<?php

// Stream Model
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Stream extends Model
{
    use HasFactory;

    protected $fillable = [
        'description',
        'date'
    ];

    protected $casts = [
        'date' => 'datetime'
    ];

    public function nuggets(): HasMany
    {
        return $this->hasMany(Nugget::class);
    }
}
