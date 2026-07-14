<?php

namespace App\Policies;

use App\Models\Batch;
use App\Models\Program;
use App\Models\User;

class BatchPolicy
{
    /**
     * Determine whether the user can view any batches for a program.
     */
    public function viewAny(User $user, Program $program): bool
    {
        return $user->isVerifiedUstadz()
            && $user->ustadzProfile?->id === $program->ustadz_profile_id;
    }

    /**
     * Determine whether the user can create a batch for a program.
     */
    public function create(User $user, Program $program): bool
    {
        return $user->isVerifiedUstadz()
            && $user->ustadzProfile?->id === $program->ustadz_profile_id;
    }

    /**
     * Determine whether the user can update the batch.
     */
    public function update(User $user, Batch $batch): bool
    {
        return $user->isVerifiedUstadz()
            && $user->ustadzProfile?->id === $batch->program->ustadz_profile_id;
    }

    /**
     * Determine whether the user can transition the batch status.
     */
    public function updateStatus(User $user, Batch $batch): bool
    {
        return $this->update($user, $batch);
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Batch $batch): bool
    {
        return false;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Batch $batch): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Batch $batch): bool
    {
        return false;
    }
}
