# PojokSantri.ID

[![Laravel](https://img.shields.io/badge/Laravel-13.x-FF2D20?logo=laravel&logoColor=white)](https://laravel.com)
[![PHP](https://img.shields.io/badge/PHP-8.3%2B-777BB4?logo=php&logoColor=white)](https://www.php.net)
[![Inertia](https://img.shields.io/badge/Inertia-3.x-9553E9?logo=inertia&logoColor=white)](https://inertiajs.com)
[![React](https://img.shields.io/badge/React-19.x-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

PojokSantri.ID adalah marketplace cohort-based untuk pembelajaran ngaji online di Indonesia. Platform ini menghubungkan santri dengan ustadz terverifikasi melalui program berbasis batch, jadwal, kapasitas, harga, pendaftaran, dan konfirmasi pembayaran manual.

Status proyek: **Phase 1 MVP Alignment**. Sumber kebenaran produk dan teknis saat ini berada di `specs/PojokSantriID-PRD-v1.1.md` dan `specs/PojokSantriID-TechStack-v1.1.md`.

## Daftar Isi

- [Fitur Utama MVP](#fitur-utama-mvp)
- [Tech Stack](#tech-stack)
- [Prasyarat](#prasyarat)
- [Instalasi Lokal](#instalasi-lokal)
- [Menjalankan Aplikasi](#menjalankan-aplikasi)
- [Struktur Project](#struktur-project)
- [Arsitektur Aplikasi](#arsitektur-aplikasi)
- [Domain dan Database](#domain-dan-database)
- [Environment Variables](#environment-variables)
- [Command yang Tersedia](#command-yang-tersedia)
- [Testing dan Quality Check](#testing-dan-quality-check)
- [Development Workflow](#development-workflow)
- [Release Automation](#release-automation)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Roadmap Singkat](#roadmap-singkat)
- [Kontribusi](#kontribusi)
- [Lisensi](#lisensi)
- [Credits](#credits)

## Fitur Utama MVP

- **Marketplace program ngaji online**: listing program, detail program, batch, jadwal, kapasitas, dan harga.
- **Profil ustadz publik**: informasi ustadz dan status verifikasi admin.
- **Role-based access**: santri, ustadz, dan admin.
- **Auth email/password**: autentikasi awal berbasis session Laravel.
- **Dashboard admin**: kelola data utama, verifikasi ustadz, dan konfirmasi pembayaran manual.
- **Ustadz onboarding**: ustadz mengisi profil dan menunggu approval admin.
- **Enrollment santri**: santri mendaftar batch program yang tersedia.
- **Manual bank transfer**: pembayaran MVP melalui transfer bank dan konfirmasi oleh admin.

## Tech Stack

| Area | Teknologi |
| --- | --- |
| Backend | Laravel 13, PHP 8.3+ |
| Frontend | Inertia React v3, React 19 |
| Styling | Tailwind CSS v4 |
| Bundler | Vite |
| Route helper | Laravel Wayfinder |
| Database MVP | MySQL |
| Database lokal starter | SQLite via `.env.example` |
| Auth | Laravel session auth |
| ORM | Eloquent |
| Testing | Pest 4, PHPUnit 12 |
| Formatter | Laravel Pint, Prettier |
| Linter | ESLint |
| Release | Semantic Release + Conventional Commits |

## Prasyarat

- PHP 8.3 atau lebih baru.
- Composer.
- Node.js 22 atau lebih baru.
- npm.
- MySQL untuk target MVP, atau SQLite untuk setup lokal cepat mengikuti `.env.example`.
- Laravel Herd direkomendasikan untuk macOS local development.

## Instalasi Lokal

### 1. Clone repository

```bash
git clone https://github.com/ryansutrisno/suntree.git
cd suntree
```

### 2. Install dependency backend

```bash
composer install
```

### 3. Install dependency frontend

```bash
npm install
```

### 4. Siapkan environment

```bash
cp .env.example .env
php artisan key:generate
```

### 5. Konfigurasi database

Untuk setup lokal cepat, `.env.example` sudah memakai SQLite:

```dotenv
DB_CONNECTION=sqlite
```

Untuk mengikuti target MVP, gunakan MySQL:

```dotenv
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=pojoksantri
DB_USERNAME=root
DB_PASSWORD=
```

### 6. Jalankan migrasi dan seeder

```bash
php artisan migrate --seed
```

### 7. Build asset frontend

```bash
npm run build
```

### Opsi one-shot setup

Project menyediakan script Composer untuk setup awal:

```bash
composer run setup
```

Script ini menjalankan install dependency, membuat `.env`, generate app key, migrasi database, install npm package, dan build asset.

## Menjalankan Aplikasi

### Dengan Laravel Herd

Laravel Herd otomatis menyajikan aplikasi di domain berbasis nama folder, misalnya:

```text
http://suntree.test
```

Jalankan Vite saat mengembangkan frontend:

```bash
npm run dev
```

### Dengan script development Composer

```bash
composer run dev
```

Script ini menjalankan server Laravel, queue listener, Laravel Pail, dan Vite secara bersamaan.

## Struktur Project

```text
├── app/                    # Kode Laravel: model, controller, middleware, provider
├── bootstrap/              # Bootstrap Laravel
├── config/                 # Konfigurasi aplikasi
├── database/               # Migration, factory, seeder
├── public/                 # Public entry point dan asset publik
├── resources/
│   ├── css/                # CSS aplikasi
│   └── js/                 # Inertia React pages, layouts, components
├── routes/                 # Web, console, auth routes
├── specs/                  # PRD dan dokumen tech stack PojokSantri.ID
├── tests/                  # Pest tests
├── .github/workflows/      # CI, lint, dan release workflow
├── composer.json           # Dependency dan script PHP/Laravel
└── package.json            # Dependency dan script frontend
```

## Arsitektur Aplikasi

PojokSantri.ID menggunakan **Laravel modular monolith** dengan Inertia React. Pendekatan ini dipilih agar MVP cepat dibangun tanpa kompleksitas API-first, microservice, Redis, WebSocket, atau monorepo.

```text
Browser
  ↓
React 19 + Inertia React v3 + Tailwind CSS v4
  ↓
Laravel Web Routes + Controllers + Form Requests
  ↓
Policies/Gates + Actions bila logic mulai membesar
  ↓
Eloquent Models
  ↓
MySQL
```

### Domain inti MVP

- `User`: akun santri, ustadz, dan admin.
- `UstadzProfile`: profil dan status approval ustadz.
- `Program`: program pembelajaran ngaji online.
- `Batch`: jadwal, kapasitas, harga, dan lifecycle program.
- `Enrollment`: pendaftaran santri ke batch.

### Prinsip teknis

- Gunakan `Inertia::render()` untuk page server-side routing.
- Gunakan Wayfinder untuk helper route/action typed di frontend.
- Gunakan Form Request untuk validasi input.
- Gunakan Policy/Gate untuk authorization.
- Hitung kapasitas batch dari enrollment aktif; realtime counter ditunda.
- Payment gateway live ditunda sampai marketplace tervalidasi.

## Domain dan Database

Target database MVP adalah **MySQL**. `.env.example` masih menggunakan SQLite agar starter Laravel bisa berjalan cepat di lokal.

Saat masuk implementasi Phase 1, pastikan migrasi mengikuti domain PRD v1.1:

- user dan role dasar;
- profil ustadz;
- program;
- batch;
- enrollment;
- status pembayaran manual.

## Environment Variables

| Variable | Wajib | Deskripsi | Default lokal |
| --- | --- | --- | --- |
| `APP_NAME` | Ya | Nama aplikasi | `Laravel` |
| `APP_ENV` | Ya | Environment aplikasi | `local` |
| `APP_KEY` | Ya | Encryption key Laravel | dibuat via `php artisan key:generate` |
| `APP_URL` | Ya | URL aplikasi | `http://localhost` |
| `DB_CONNECTION` | Ya | Driver database | `sqlite` |
| `DB_HOST` | Untuk MySQL | Host database | `127.0.0.1` |
| `DB_PORT` | Untuk MySQL | Port database | `3306` |
| `DB_DATABASE` | Untuk MySQL | Nama database | `laravel` |
| `DB_USERNAME` | Untuk MySQL | User database | `root` |
| `DB_PASSWORD` | Untuk MySQL | Password database | kosong |
| `SESSION_DRIVER` | Ya | Driver session | `database` |
| `QUEUE_CONNECTION` | Ya | Driver queue | `database` |
| `CACHE_STORE` | Ya | Driver cache | `database` |
| `MAIL_MAILER` | Ya | Mail transport | `log` |
| `VITE_APP_NAME` | Ya | Nama app untuk Vite | `${APP_NAME}` |

## Command yang Tersedia

| Command | Deskripsi |
| --- | --- |
| `composer run setup` | Setup awal project secara one-shot |
| `composer run dev` | Jalankan Laravel server, queue listener, Pail, dan Vite |
| `composer lint` | Format PHP dengan Laravel Pint |
| `composer lint:check` | Cek format PHP tanpa mengubah file |
| `composer test` | Clear config, cek lint PHP, lalu run test Laravel |
| `composer ci:check` | Cek format frontend, lint frontend, typecheck, lalu test backend |
| `php artisan test` | Jalankan test Laravel/Pest |
| `npm run dev` | Jalankan Vite dev server |
| `npm run build` | Build asset production |
| `npm run build:ssr` | Build asset dan SSR bundle |
| `npm run format` | Format file frontend di `resources/` |
| `npm run format:check` | Cek format frontend |
| `npm run lint` | Jalankan ESLint dengan auto-fix |
| `npm run lint:check` | Jalankan ESLint tanpa auto-fix |
| `npm run types:check` | Cek TypeScript tanpa emit |

## Testing dan Quality Check

Jalankan seluruh quality gate lokal:

```bash
composer ci:check
```

Jalankan test backend:

```bash
php artisan test
```

Atau gunakan Pest langsung:

```bash
./vendor/bin/pest --compact
```

Build frontend production:

```bash
npm run build
```

CI GitHub saat ini menjalankan test pada PHP `8.3`, `8.4`, dan `8.5` dengan Node.js 22.

## Development Workflow

1. Baca PRD dan Tech Stack v1.1 sebelum menambah fitur besar.
2. Buat perubahan kecil dan terarah.
3. Ikuti konvensi Laravel: controller, Form Request, Policy/Gate, migration, factory, seeder, dan Pest test bila relevan.
4. Untuk frontend Inertia, gunakan page di `resources/js/pages` dan helper Wayfinder untuk route/action.
5. Gunakan Conventional Commits agar semantic-release bisa membuat changelog otomatis.

Contoh commit:

```text
feat: add ustadz profile approval flow
fix: prevent duplicate enrollment for same batch
docs: add phase 1 setup notes
```

## Release Automation

Project ini menggunakan Semantic Release melalui `.github/workflows/release.yml` dan `.releaserc.json`.

- Branch release: `main`.
- `feat` menghasilkan minor release.
- `fix`, `docs`, `refactor`, `chore`, `perf`, dan `ci` menghasilkan patch release.
- Breaking change menghasilkan major release.
- `style` dan `test` tidak membuat release.

Workflow release menginstall tool semantic-release menggunakan `npm install --no-save`, sehingga dependency release tidak perlu dimasukkan ke `package.json`.

## Deployment

Belum ada konfigurasi deployment final di repository ini. Baseline deployment Laravel production:

```bash
composer install --no-dev --optimize-autoloader
npm ci
npm run build
php artisan migrate --force
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

Pastikan production environment memakai database MySQL, `APP_ENV=production`, `APP_DEBUG=false`, dan secret yang aman.

Laravel Cloud dapat menjadi opsi cepat untuk deploy Laravel production. Alternatif lain: VPS, Forge, Ploi, Render, Railway, atau platform Docker-compatible.

## Troubleshooting

### Frontend tidak berubah di browser

Jalankan Vite dev server:

```bash
npm run dev
```

Atau build ulang asset production:

```bash
npm run build
```

### Vite manifest tidak ditemukan

```bash
npm run build
```

### Database belum siap

```bash
php artisan migrate --seed
```

### Config cache mengganggu saat development

```bash
php artisan config:clear
php artisan cache:clear
```

### Dependency frontend bermasalah

```bash
rm -rf node_modules package-lock.json
npm install
```

## Roadmap Singkat

### Phase 1 — Foundation

- Role dan auth email/password.
- Core data model.
- Admin seeder.

### Phase 2 — Admin Operations

- Dashboard admin basic.
- Ustadz approval boolean.
- Payment confirmation manual.

### Phase 3 — Marketplace Public

- Listing program.
- Program detail.
- Profil ustadz publik.

### Phase 4+ — Ustadz dan Enrollment

- Ustadz onboarding.
- Program CRUD.
- Batch CRUD.
- Enrollment dan dashboard minimal.

### Later

- Mayar payment gateway.
- Google login.
- Upload dokumen verifikasi.
- WhatsApp/email automation.
- Review/rating.
- Certificate.

## Kontribusi

Untuk kontribusi internal:

1. Gunakan branch dari `main` atau branch kerja yang disepakati.
2. Ikuti Conventional Commits.
3. Jalankan quality check sebelum push:

```bash
composer ci:check
```

4. Pastikan perubahan tetap selaras dengan PRD dan Tech Stack v1.1.

## Lisensi

Project ini menggunakan lisensi MIT. Lihat file [LICENSE](LICENSE).

## Credits

- Product & Engineering: PojokSantri.ID Team.
- Maintainer: Ryan Sutrisno.
