<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Category extends Model
{
    use HasFactory;

    protected $fillable = ['name'];

    // public function pages(): HasMany
    // {
    //     return $this->hasMany(Page::class);
    // }

    public function pages(): BelongsToMany
    {
        return $this->belongsToMany(Page::class, 'category_page');
    }

}
