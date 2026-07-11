<?php

namespace App\Enums;

enum ProgramStatus: string
{
    case Draft = 'draft';
    case Published = 'published';
    case Archived = 'archived';
}
