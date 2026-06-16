<?php

namespace Database\Seeders;

use App\Enums\ProgramCategory;
use App\Enums\ProgramLevel;
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

        foreach ($categories as $category) {
            foreach ($levels as $level) {
                $ustadzVerified = UstadzProfile::factory()
                    ->create(['is_verified' => true]);

                Program::factory()
                    ->for($ustadzVerified, 'ustadzProfile')
                    ->create([
                        'category' => $category,
                        'level' => $level,
                        'is_published' => true,
                    ]);
            }
        }
    }
}
