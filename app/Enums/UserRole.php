<?php

namespace App\Enums;

enum UserRole: string
{
    case Santri = 'santri';
    case Ustadz = 'ustadz';
    case Admin = 'admin';
}
