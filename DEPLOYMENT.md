# Deployment & Troubleshooting — PojokSantri.ID

Dokumen ini mencatat cara aplikasi ini di-deploy di production, plus penyebab dan solusi insiden build/deploy yang sudah pernah terjadi. Tujuannya supaya investigasi tidak perlu diulang dari nol.

## Ringkasan platform

- **Server**: VPS yang menjalankan **Dokploy** (Docker Swarm), diakses via SSH alias `trazmediademo`.
- **Build type: Nixpacks** — bukan Dockerfile. Semua aplikasi di server ini memakai Nixpacks.
- **Domain**: `https://suntree.trazmedia.com`
- **Runtime yang dipilih Nixpacks**: PHP 8.4 (`php84`) + Node 22 (`nodejs_22`) + nginx/php-fpm.
- **Database**: MySQL 8.4.11, dijalankan sebagai **Docker Swarm service** terpisah (`suntree-app-dbsuntree-mswkmp`), bukan container biasa.

> `Dockerfile` yang ada di repo **tidak dipakai** oleh Dokploy selama build type-nya Nixpacks. Lihat [Lampiran](#lampiran-dockerfile-di-repo).

## Versi runtime yang di-pin di repo

Dua field ini wajib ada. Kalau dihapus, deploy akan gagal lagi.

| File | Field | Nilai | Alasan |
| --- | --- | --- | --- |
| `composer.json` | `require.php` | `^8.4.1` | `symfony/* 8.1.x` butuh PHP `>=8.4.1` (memakai property hooks PHP 8.4). Nixpacks membaca `composer.json` dan memilih paket Nix lewat pencocokan substring — `"^8.4.1"` mengandung `8.4` → `php84`. |
| `package.json` | `engines.node` | `^22.12.0` | Vite 8 butuh Node `^20.19.0 \|\| >=22.12.0`, sedangkan default Nixpacks adalah Node 18. Caret dipakai sengaja supaya Nixpacks memilih **Node 22** dan tidak ikut melompat ke major terbaru saat ada rilis baru. |

### Cara Nixpacks memilih versi

- **PHP**: env `NIXPACKS_PHP_VERSION` → `composer.json` `require.php` → default. Default Nixpacks = **PHP 8.3**.
- **Node**: env `NIXPACKS_NODE_VERSION` → `package.json` `engines.node` → `.nvmrc` → `.node-version` → default. Default Nixpacks = **Node 18**.
- Nixpacks **selalu** menjalankan `composer install --ignore-platform-reqs` untuk project PHP. Platform check Composer dimatikan, sehingga paket yang tidak kompatibel tetap terpasang dan baru meledak saat dijalankan. Karena itu versi runtime harus benar sejak awal.

## Alur deploy

1. Push ke branch `main` — semantic-release akan menaikkan versi dan membuat CHANGELOG otomatis.
2. Buka aplikasi di Dokploy, lalu **Redeploy**.
3. Nixpacks build: setup (`php84`, `nodejs_22`, nginx) → `composer install --ignore-platform-reqs` + `npm ci` → `npm run build` → start nginx + php-fpm.
4. Verifikasi:

   ```bash
   curl -I https://suntree.trazmedia.com
   ```

   Harus mengembalikan `200`.

## Verifikasi setelah deploy

```bash
ssh trazmediademo

# Nama container app TIDAK memuat kata "php"/"mysql" — pakai filter ini
docker ps --filter name=suntree-app-suntree-app --format '{{.Names}}'

# Status migrasi
docker exec -w /app <APP_CONTAINER> php artisan migrate:status

# 20 baris log terakhir
docker exec -w /app <APP_CONTAINER> tail -n 20 storage/logs/laravel.log
```

## Troubleshooting: insiden yang pernah terjadi

### 1. `syntax error, unexpected token "{"` di `Request.php:117`

**Gejala** — build gagal saat `php artisan package:discover` (hook `post-autoload-dump`):

```text
syntax error, unexpected token "{", expecting "," or ";"
```

menunjuk ke `vendor/symfony/http-foundation/Request.php:117`.

**Penyebab** — baris itu bukan kode rusak, melainkan **property hooks PHP 8.4**:

```php
public ParameterBag $attributes { set { /* ... */ } }
```

Saat itu Nixpacks memilih **PHP 8.3** (karena `composer.json` bilang `^8.3`), sementara `composer install --ignore-platform-reqs` bawaan Nixpacks tetap memasang `symfony/* 8.1.x` yang butuh PHP `>=8.4.1`. Parser PHP 8.3 tidak mengenal sintaks tersebut.

**Solusi** — di `composer.json`, ubah `"php": "^8.3"` menjadi `"^8.4.1"`. Nixpacks lalu memilih `php84`.

### 2. `ReferenceError: CustomEvent is not defined` saat `npm run build`

**Penyebab** — Nixpacks memilih **Node 18** (nilai default-nya), sedangkan Vite 8 butuh Node `^20.19.0 || >=22.12.0`.

**Solusi** — di `package.json`, tambahkan:

```json
"engines": {
    "node": "^22.12.0"
}
```

### 3. `[UNLOADABLE_DEPENDENCY] Could not load @/actions/...` dan `@/routes`

**Gejala** — `vite build` gagal dengan 7 error, contohnya:

```text
Could not load .../resources/js/actions/App/Http/Controllers/Auth/ConfirmablePasswordController
Could not load .../resources/js/routes/password
No such file or directory (os error 2)
```

**Penyebab** — ada **dua** file config Vite di root repo: `vite.config.js` (stale, 13 baris) dan `vite.config.ts` (23 baris, konfigurasi yang sebenarnya dipakai). Vite mendahulukan `.js`, sehingga `vite.config.ts` — yang memuat plugin `@laravel/vite-plugin-wayfinder` — tidak pernah dijalankan. Akibatnya folder hasil generate Wayfinder (`resources/js/actions`, `resources/js/routes`, `resources/js/wayfinder`) tidak pernah dibuat di container build.

Folder-folder itu **di-gitignore**, jadi tidak ikut ter-checkout ke container. Di lokal build tetap sukses karena folder hasil generate masih ada di working tree.

**Solusi** — hapus `vite.config.js`. Setelah itu plugin Wayfinder berjalan di `buildStart()` dan men-generate folder tersebut saat `npm run build`.

> CI (`.github/workflows/tests.yml`) memakai pendekatan lain: `php artisan wayfinder:generate` dipanggil eksplisit sebelum `npm run build`. Dua-duanya sah.

### 4. `SQLSTATE[HY000] [2054] ... caching_sha2_password`

**Gejala** — `php artisan migrate` gagal:

```text
SQLSTATE[HY000] [2054] The server requested authentication method unknown to the client [caching_sha2_password]
(Connection: mysql, Host: suntree-app-dbsuntree-mswkmp, Port: 3306)
```

**Penyebab** — dua hal bertemu:

1. Client `mysqlnd` di image Nixpacks **tidak punya** handler `caching_sha2_password`. Bukti dari `php -i`:

   ```text
   Loaded plugins => mysqlnd,debug_trace,auth_plugin_mysql_native_password,auth_plugin_mysql_clear_password
   ```

   Tidak ada `auth_plugin_caching_sha2_password` — inilah kenapa kodenya `2054` (*plugin cannot be loaded*).

2. Server **MySQL 8.4** menonaktifkan plugin `mysql_native_password` secara default.

Konsekuensi penting: **tidak ada perbaikan dari sisi client**. Mengaktifkan TLS (`MYSQL_ATTR_SSL_CA`) atau RSA public key tidak menolong, karena yang hilang adalah handler auth-nya, bukan transport-nya. Yang harus diubah adalah sisi server.

**Solusi (workaround yang dipakai sekarang)** — aktifkan `mysql_native_password` di server MySQL, lalu ubah plugin user aplikasi:

```bash
# 1. File config di host
sudo mkdir -p /etc/dokploy/mysql-conf
printf '[mysqld]\nmysql_native_password=ON\n' | sudo tee /etc/dokploy/mysql-conf/suntree-native.cnf

# 2. Tambahkan bind mount ke service MySQL
sudo docker service update --detach=false \
  --mount-add type=bind,source=/etc/dokploy/mysql-conf/suntree-native.cnf,target=/etc/mysql/conf.d/zzz-native.cnf \
  suntree-app-dbsuntree-mswkmp

# 3. Verifikasi plugin sudah aktif
sudo docker exec <MYSQL_CONTAINER> mysql -uroot -p"$ROOT_PW" \
  -e "SELECT plugin_name, plugin_status FROM information_schema.plugins WHERE plugin_name='mysql_native_password';"

# 4. Ubah plugin user aplikasi (password TIDAK berubah)
sudo docker exec -i <MYSQL_CONTAINER> mysql -uroot -p"$ROOT_PW" <<'SQL'
ALTER USER 'suntree'@'%' IDENTIFIED WITH mysql_native_password BY '<DB_PASSWORD>';
FLUSH PRIVILEGES;
SQL
```

Titik injeksi config MySQL 8.4 di server ini adalah `/etc/mysql/conf.d/` — `/etc/my.cnf` memuat baris `!includedir /etc/mysql/conf.d/`.

> **Penting**: langkah `--mount-add` di atas hidup **di luar definisi service Dokploy**. Kalau service MySQL di-recreate dari UI Dokploy, mount itu hilang dan error `2054` muncul kembali. Kalau itu terjadi, ulangi langkah 1–4.

> `mysql_native_password` **deprecated** dan **dihapus di MySQL 9**. Ini solusi jangka pendek; aman selama server masih MySQL 8.4.

### 5. Redirect login memakai `http://` sehingga navigasi Inertia diblokir

**Gejala**: setelah submit login, aplikasi mengembalikan `302` tetapi halaman tidak berpindah sampai di-refresh manual.

**Akar masalah**: Cloudflare memakai SSL/TLS mode **Flexible**, jadi Cloudflare menghubungi origin lewat HTTP. Traefik kemudian menimpa header `X-Forwarded-Proto` dengan skema koneksi masuk (`http`), sehingga Laravel menganggap request tidak secure dan membangkitkan URL `http://`. Fitur *Automatic HTTPS Rewrites* Cloudflare memperbaiki aset di dalam HTML, tetapi **tidak bisa** menulis ulang header `Location` pada respons `302` — XHR dari halaman `https` pun diblokir sebagai mixed content.

**Perbaikan (sisi aplikasi)**:

- `app/Providers/AppServiceProvider.php` memanggil `URL::forceScheme('https')` saat environment `production`, sehingga redirect dan URL aset selalu `https`.
- Environment Dokploy: set `SESSION_SECURE_COOKIE=true` supaya cookie sesi ikut ditandai `Secure`.

```bash
# Verifikasi dari server: Location harus https
curl -s -o /dev/null -w "code=%{http_code} loc=%{redirect_url}\n" \
  https://suntree.trazmedia.com/dashboard
# code=302 loc=https://suntree.trazmedia.com/login
```

**Perbaikan yang lebih rapi (belum dikerjakan)**: aktifkan HTTPS/Let's Encrypt untuk domain di Dokploy, lalu ubah SSL/TLS mode Cloudflare ke **Full (strict)**. Dengan begitu jalur Cloudflare → origin juga terenkripsi dan `URL::forceScheme()` tidak lagi dibutuhkan.

## Seeding data demo

`php artisan db:seed` bisa langsung dijalankan di produksi dan menghasilkan akun serta data demo yang siap pakai — tidak ada guard yang menghalangi, jadi tidak ada environment variable yang wajib.

Environment variable berikut **opsional**, dipakai hanya kalau ingin mengganti kredensial demo dari nilai default:

| Variabel | Dipakai oleh | Default |
| --- | --- | --- |
| `ADMIN_SEED_EMAIL` | `AdminUserSeeder` | `admin@pojoksantri.id` |
| `ADMIN_SEED_NAME` | `AdminUserSeeder` | `PojokSantri Admin` |
| `ADMIN_SEED_PASSWORD` | `AdminUserSeeder` | `password` |
| `DEMO_SEED_PASSWORD` | `UstadzUserSeeder`, `SantriUserSeeder` | `password` |

Langkah seeding di server:

```bash
sudo docker exec -w /app <APP_CONTAINER> php artisan db:seed --force
```

Kalau ingin mengganti password demo, set `ADMIN_SEED_PASSWORD` dan `DEMO_SEED_PASSWORD` di Dokploy **lalu redeploy aplikasi** sebelum menjalankan seeder.

Seeder membuat: admin terverifikasi, satu ustadz demo (`ustadz@pojoksantri.id`) dengan profil terverifikasi, satu program untuk setiap kombinasi kategori × level beserta satu batch-nya, dan satu santri demo (`santri@pojoksantri.id`) yang langsung ter-enroll ke batch terakhir.

> **Catatan config cache**: entrypoint container menjalankan `config:cache`. Environment variable baru **tidak** terbaca sampai config di-cache ulang — karena itu setiap perubahan env butuh redeploy (atau jalankan `php artisan config:clear` sebelum seeder).

> **Catatan keamanan**: default `password` sangat lemah. Kalau situs ini publik, ganti password akun demo segera setelah seeding, atau set `ADMIN_SEED_PASSWORD`/`DEMO_SEED_PASSWORD` dulu sebelum seeding.

## Catatan keamanan

- `DB_PASSWORD` dan `APP_KEY` pernah terekspos di output `php -i` yang dibagikan ke pihak lain. Rotasi `DB_PASSWORD` aman dilakukan kapan saja.
- Rotasi `APP_KEY` **berisiko** terhadap data yang sudah terenkripsi (session/cache). Jangan dilakukan tanpa rencana migrasi.
- Warning `SecretsUsedInArgOrEnv` dari Dokploy bersifat kosmetik. Dokploy menyuntikkan environment variable aplikasi sebagai build `ARG`/`ENV` pada Dockerfile yang **di-generate Nixpacks**, bukan pada `Dockerfile` di repo ini.

## Lampiran: `Dockerfile` di repo

Selama build type Dokploy = **Nixpacks**, `Dockerfile` di repo tidak dipakai. Kalau suatu saat ingin beralih ke Dockerfile, perbaiki dulu dua hal:

1. `COPY composer*.json ./` **tidak menyalin `composer.lock`** (pola glob-nya berakhiran `.json`). Ubah menjadi `COPY composer.json composer.lock ./` supaya build memakai versi dependency yang terkunci.
2. Stage builder memakai `composer:2.8` yang versi PHP-nya tidak dijamin `>= 8.4.1`. Ganti ke `php:8.4-cli-alpine` lalu copy binary `composer` dari image `composer:2`.
