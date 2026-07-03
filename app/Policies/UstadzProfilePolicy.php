<?php

namespace App\Policies;

use App\Models\User;
use App\Models\UstadzProfile;

class UstadzProfilePolicy
{
    /**
     * Determine whether the user can view the ustadz profile.
     */
    public function view(User $user, UstadzProfile $profile): bool
    {
        return $user->id === $profile->user_id;
    }

    /**
     * Determine whether the user can update the ustadz profile.
     */
    public function update(User $user, UstadzProfile $profile): bool
    {
        return $user->id === $profile->user_id;
    }

    /**
     * Determine whether the user can publish programs.
     * Only verified ustadz can publish/create/edit programs.
     */
    public function publish(User $user, UstadzProfile $profile): bool
    {
        return $user->id === $profile->user_id && $profile->is_verified;
    }

    /**
     * Determine whether the user can create programs.
     * Alias for publish - checks if ustadz is verified.
     */
    public function createProgram(User $user): bool
    {
        if (! $user->isUstadz()) {
            return false;
        }

        return $user->ustadzProfile?->is_verified ?? false;
    }

    /**
     * Determine whether the user can edit programs.
     * Only verified ustadz can edit their own programs.
     */
    public function editProgram(User $user, UstadzProfile $profile): bool
    {
        return $this->publish($user, $profile);
    }
}
