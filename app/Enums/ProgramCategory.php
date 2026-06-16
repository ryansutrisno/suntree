<?php

namespace App\Enums;

enum ProgramCategory: string
{
    case Iqra = 'iqra';
    case Tajwid = 'tajwid';
    case Tahsin = 'tahsin';
    case Tahfidz = 'tahfidz';
    case Lainnya = 'lainnya';
}
