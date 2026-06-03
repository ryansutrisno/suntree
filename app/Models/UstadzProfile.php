<?php

namespace App\Models;

use Database\Factories\UstadzProfileFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable(['user_id', 'display_name', 'bio', 'is_verified', 'approved_at', 'approved_by'])]
class UstadzProfile extends Model
{
    /** @use HasFactory<UstadzProfileFactory> */
    use HasFactory;

    protected function casts(): array
    {
        return [
            'is_verified' => 'boolean',
            'approved_at' => 'datetime',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function programs(): HasMany
    {
        return $this->hasMany(Program::class);
    }
}
