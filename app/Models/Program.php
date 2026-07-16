<?php

namespace App\Models;

use App\Enums\ProgramCategory;
use App\Enums\ProgramLevel;
use App\Enums\ProgramStatus;
use Database\Factories\ProgramFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable(['ustadz_profile_id', 'title', 'description', 'price', 'category', 'level', 'is_published', 'status'])]
class Program extends Model
{
    /** @use HasFactory<ProgramFactory> */
    use HasFactory;

    protected function casts(): array
    {
        return [
            'price' => 'integer',
            'category' => ProgramCategory::class,
            'level' => ProgramLevel::class,
            'is_published' => 'boolean',
            'status' => ProgramStatus::class,
        ];
    }

    public function ustadzProfile(): BelongsTo
    {
        return $this->belongsTo(UstadzProfile::class);
    }

    public function batches(): HasMany
    {
        return $this->hasMany(Batch::class);
    }
}
