<?php

namespace Database\Seeders;

use App\Enums\ProgramCategory;
use App\Enums\ProgramLevel;
use App\Models\Batch;
use App\Models\Program;
use App\Models\UstadzProfile;
use Illuminate\Database\Seeder;

class ProgramSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = ProgramCategory::cases();
        $levels = ProgramLevel::cases();

        $ustadzVerified = UstadzProfile::where('is_verified', true)->first()
            ?? UstadzProfile::factory()->create(['is_verified' => true]);

        foreach ($categories as $category) {
            foreach ($levels as $level) {
                $program = Program::factory()
                    ->for($ustadzVerified, 'ustadzProfile')
                    ->create([
                        'category' => $category,
                        'level' => $level,
                        'is_published' => true,
                    ]);

                Batch::factory()
                    ->for($program)
                    ->create();
            }
        }
    }
}
