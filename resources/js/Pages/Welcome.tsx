import { Head, Link } from '@inertiajs/react';
import { PlatformFooter } from '@/Components/Platform/PlatformFooter';
import { PlatformNavbar } from '@/Components/Platform/PlatformNavbar';
import { ProgramHighlightCard  } from '@/Components/Platform/ProgramHighlightCard';
import type {ProgramHighlight} from '@/Components/Platform/ProgramHighlightCard';
import { SectionHeading } from '@/Components/Platform/SectionHeading';

type WelcomeProps = {
    canLogin: boolean;
    canRegister: boolean;
    programs: ProgramHighlight[];
    stats: {
        programs_count: number;
        ustadz_count: number;
    };
};

function formatPrice(price: number): string {
    return `Rp ${price.toLocaleString('id-ID')}`;
}

function initials(name: string): string {
    return name
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part.charAt(0).toUpperCase())
        .join('');
}

const LEVEL_LABEL: Record<string, string> = {
    pemula: 'Pemula',
    menengah: 'Menengah',
    lanjutan: 'Lanjutan',
};

/* ───────────────────────────── HERO ───────────────────────────── */

function HeroBadge({ children, delay }: { children: React.ReactNode; delay: number }) {
    return (
        <span
            className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-[#E8D5A8] bg-brand-gold-light px-3.5 py-1.5 text-[12px] font-semibold text-brand-gold"
            style={{ animationDelay: `${delay}ms` }}
        >
            <span aria-hidden="true">✦</span>
            {children}
        </span>
    );
}

function StatItem({ value, label }: { value: string; label: string }) {
    return (
        <div className="flex flex-col gap-0.5">
            <span className="font-display text-2xl font-extrabold text-brand-dark">{value}</span>
            <span className="text-[12px] font-medium text-brand-light">{label}</span>
        </div>
    );
}

function HeroCardStack({ programs }: { programs: ProgramHighlight[] }) {
    if (programs.length === 0) {
        return (
            <div className="relative hidden h-[420px] items-center justify-center lg:flex">
                <div className="absolute inset-0 rounded-[40px] bg-gradient-to-br from-brand-teal-light via-brand-cream to-brand-gold-light opacity-80" />
                <svg
                    viewBox="0 0 200 200"
                    className="relative h-48 w-48 text-brand-teal/30"
                    fill="none"
                    stroke="currentColor"
                    aria-hidden="true"
                >
                    <circle cx="100" cy="100" r="80" strokeWidth="1.5" />
                    <circle cx="100" cy="100" r="60" strokeWidth="1.5" />
                    <circle cx="100" cy="100" r="40" strokeWidth="1.5" />
                    <path d="M100 20v160M20 100h160M40 40l120 120M160 40L40 160" strokeWidth="0.8" />
                </svg>
            </div>
        );
    }

    const stack = programs.slice(0, 3);
    const rotations = ['rotate-3', '-rotate-1', '-rotate-4'];
    const offsets = [
        { top: 'top-0', right: 'right-0', width: 'w-[280px]', opacity: 'opacity-70', z: 'z-10' },
        { top: 'top-10', right: 'right-6', width: 'w-[300px]', opacity: 'opacity-100', z: 'z-30' },
        { top: 'top-6', right: 'right-16', width: 'w-[260px]', opacity: 'opacity-60', z: 'z-20' },
    ];

    return (
        <div className="relative hidden h-[440px] lg:block">
            {/* Decorative background */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute right-10 top-10 h-72 w-72 rounded-full bg-brand-teal-light blur-3xl opacity-70" />
                <div className="absolute bottom-6 left-0 h-64 w-64 rounded-full bg-brand-gold-light blur-3xl opacity-80" />
            </div>

            {/* Geometric ornament */}
            <svg
                viewBox="0 0 200 200"
                className="absolute -left-4 top-0 h-32 w-32 text-brand-teal/15"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.2}
                aria-hidden="true"
            >
                <path d="M100 10l90 50v100l-90 50-90-50V60z" />
                <path d="M100 40l60 35v70l-60 35-60-35V75z" />
                <circle cx="100" cy="100" r="22" />
            </svg>

            <div className="relative h-full">
                {stack.map((program, index) => {
                    const pos = offsets[index];
                    const ustadzName = program.ustadz_name ?? 'Ustadz';

                    return (
                        <div
                            key={program.id}
                            className={`animate-fade-up absolute rounded-2xl border border-brand-border bg-white p-5 shadow-[0_8px_40px_rgba(10,74,69,0.12)] ${pos.top} ${pos.right} ${pos.width} ${pos.opacity} ${pos.z} ${rotations[index]}`}
                            style={{ animationDelay: `${500 + index * 150}ms` }}
                        >
                            <div className="mb-3.5 flex items-start gap-2.5">
                                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-brand-teal-mid bg-brand-teal-light text-base font-bold text-brand-teal">
                                    {initials(ustadzName)}
                                </span>
                                <div className="min-w-0">
                                    <p className="line-clamp-2 text-[13px] font-bold leading-tight text-brand-dark">
                                        {program.title}
                                    </p>
                                    <p className="mt-0.5 truncate text-[11px] text-brand-light">
                                        {ustadzName}
                                    </p>
                                </div>
                            </div>

                            <div className="mb-3 flex flex-wrap gap-1.5">
                                <span className="rounded bg-brand-teal-light px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-brand-teal">
                                    {program.category_label}
                                </span>
                                <span className="rounded bg-brand-teal-light px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-brand-teal">
                                    {LEVEL_LABEL[program.level] ?? program.level_label}
                                </span>
                            </div>

                            {index === 1 && (
                                <div className="mb-3">
                                    <div className="mb-1.5 flex justify-between text-[11px]">
                                        <span className="text-brand-light">Slot batch</span>
                                        <span className="font-semibold text-brand-teal">Tersedia</span>
                                    </div>
                                    <div className="h-1.5 overflow-hidden rounded-full bg-brand-border">
                                        <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-brand-teal to-brand-teal-dark" />
                                    </div>
                                </div>
                            )}

                            <div className="flex items-baseline justify-between">
                                <span className="text-[15px] font-extrabold text-brand-teal">
                                    {formatPrice(program.price)}
                                </span>
                                <span className="text-[11px] text-brand-light">/ santri</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function Hero({ programs, stats }: { programs: ProgramHighlight[]; stats: WelcomeProps['stats'] }) {
    return (
        <section className="relative overflow-hidden bg-brand-cream">
            {/* Subtle dotted background pattern */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.4]"
                style={{
                    backgroundImage:
                        'radial-gradient(circle, rgba(10,124,107,0.12) 1px, transparent 1px)',
                    backgroundSize: '22px 22px',
                }}
                aria-hidden="true"
            />
            <div className="relative mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:py-24">
                <div className="max-w-xl space-y-6">
                    <HeroBadge delay={0}>Platform ngaji berbasis batch</HeroBadge>

                    <h1
                        className="animate-fade-up font-display text-[40px] font-black leading-[1.1] tracking-tight text-brand-dark sm:text-[52px]"
                        style={{ animationDelay: '80ms' }}
                    >
                        Belajar Al-Qur'an &amp; studi Islam,
                        <br />
                        langsung dari{' '}
                        <em className="italic text-brand-teal">ustadz terpercaya</em>.
                    </h1>

                    <p
                        className="animate-fade-up text-[16px] leading-relaxed text-brand-mid"
                        style={{ animationDelay: '160ms' }}
                    >
                        Jelajahi program ngaji terstruktur dari ustadz yang sudah terverifikasi.
                        Lihat profil, kuota, dan jadwal batch sebelum mendaftar — tanpa kejutan,
                        tanpa basa-basi.
                    </p>

                    <div
                        className="animate-fade-up flex flex-wrap items-center gap-3 pt-2"
                        style={{ animationDelay: '240ms' }}
                    >
                        <Link
                            href="/programs"
                            className="group inline-flex items-center gap-2 rounded-xl bg-brand-teal px-7 py-3.5 text-[14px] font-bold text-white shadow-[0_8px_24px_rgba(10,124,107,0.25)] transition-all hover:-translate-y-0.5 hover:bg-brand-teal-dark hover:shadow-[0_12px_32px_rgba(10,124,107,0.35)]"
                        >
                            Jelajahi Program
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2.5}
                                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6l6 6-6 6" />
                            </svg>
                        </Link>
                        <Link
                            href="/register"
                            className="inline-flex items-center gap-2 rounded-xl border-2 border-brand-border bg-white px-7 py-3.5 text-[14px] font-semibold text-brand-mid transition-all hover:-translate-y-0.5 hover:border-brand-teal hover:text-brand-teal"
                        >
                            Saya seorang Ustadz
                        </Link>
                    </div>

                    <div
                        className="animate-fade-up grid grid-cols-3 gap-6 border-t border-brand-border pt-7"
                        style={{ animationDelay: '320ms' }}
                    >
                        <StatItem
                            value={stats.programs_count > 0 ? `${stats.programs_count}+` : 'Baru'}
                            label="Program Aktif"
                        />
                        <StatItem
                            value={`${stats.ustadz_count}`}
                            label="Ustadz Terverifikasi"
                        />
                        <StatItem value="100%" label="Tanpa Biaya Tersembunyi" />
                    </div>
                </div>

                <HeroCardStack programs={programs} />
            </div>
        </section>
    );
}

/* ─────────────────────── SEARCH / FILTER CTA ─────────────────── */

function SearchTeaser() {
    return (
        <section className="relative z-10 -mt-6 px-5 sm:px-8">
            <div className="mx-auto max-w-[1100px]">
                <Link
                    href="/programs"
                    className="group flex flex-col items-stretch gap-3 rounded-2xl border-[1.5px] border-brand-border bg-white p-2 shadow-[0_8px_28px_rgba(10,74,69,0.08)] transition-all hover:border-brand-teal-mid hover:shadow-[0_14px_36px_rgba(10,74,69,0.12)] sm:flex-row sm:items-center"
                >
                    <div className="flex flex-1 items-center gap-3 px-3 py-2">
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            className="h-5 w-5 text-brand-light"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.3-4.3M11 19a8 8 0 110-16 8 8 0 010 16z" />
                        </svg>
                        <span className="text-[14px] text-brand-light">
                            Cari program, ustadz, atau metode pembelajaran…
                        </span>
                    </div>
                    <div className="flex items-center gap-1.5 overflow-x-auto px-2 pb-1 sm:pb-0">
                        {['Semua', 'Iqra', 'Tajwid', 'Tahsin', 'Tahfidz'].map((tag, index) => (
                            <span
                                key={tag}
                                className={`whitespace-nowrap rounded-md px-2.5 py-1 text-[12px] font-medium ${
                                    index === 0
                                        ? 'bg-brand-teal-light text-brand-teal'
                                        : 'text-brand-mid'
                                }`}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                    <span className="flex shrink-0 items-center justify-center rounded-xl bg-brand-teal px-6 py-3 text-[13px] font-bold text-white transition-colors group-hover:bg-brand-teal-dark">
                        Cari
                    </span>
                </Link>
            </div>
        </section>
    );
}

/* ───────────────────────── HOW IT WORKS ──────────────────────── */

type Step = {
    number: string;
    title: string;
    description: string;
    icon: React.ReactNode;
};

const STEPS: Step[] = [
    {
        number: '01',
        title: 'Jelajahi program',
        description:
            'Telusuri katalog program dari berbagai ustadz terverifikasi. Bandingkan kategori, level, jadwal, dan harga dengan tenang.',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-6 w-6">
                <circle cx="11" cy="11" r="7" strokeLinecap="round" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.3-4.3" />
            </svg>
        ),
    },
    {
        number: '02',
        title: 'Pilih dan daftar batch',
        description:
            'Setiap program punya batch terjadwal dengan kuota terbatas. Pilih batch yang sesuai jadwalmu, lalu daftar dalam beberapa langkah.',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-6 w-6">
                <rect x="3" y="5" width="18" height="16" rx="2" strokeLinejoin="round" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 9h18M8 3v4M16 3v4M9 14l2 2 4-4" />
            </svg>
        ),
    },
    {
        number: '03',
        title: 'Mulai belajar',
        description:
            'Ikuti pembelajaran langsung dengan ustadz pilihanmu. Bayar per batch, jelas dari awal, tanpa biaya tersembunyi.',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 19V6a2 2 0 012-2h11v15H6a2 2 0 00-2 2zm0 0a2 2 0 002 2h11M9 8h4M9 12h4" />
            </svg>
        ),
    },
];

function HowItWorks() {
    return (
        <section id="cara-kerja" className="px-5 py-20 sm:px-8 sm:py-28">
            <div className="mx-auto max-w-[1200px]">
                <SectionHeading
                    align="center"
                    eyebrow="Cara Kerja"
                    title={
                        <>
                            Tiga langkah sampai{' '}
                            <em className="font-display italic text-brand-teal">hafalan pertama</em>.
                        </>
                    }
                    description="Tidak ada rumus rahasia. Kami menyusun prosesnya sesimpel mungkin supaya kamu bisa fokus belajar."
                />

                <ol className="mt-14 grid gap-6 md:grid-cols-3">
                    {STEPS.map((step, index) => (
                        <li
                            key={step.number}
                            className="group relative flex flex-col rounded-2xl border border-brand-border bg-white p-7 transition-all hover:-translate-y-1 hover:border-brand-teal-mid hover:shadow-[0_16px_40px_rgba(10,74,69,0.08)]"
                            style={{ marginTop: index === 1 ? '0px' : undefined }}
                        >
                            <span className="absolute right-6 top-6 font-display text-[44px] font-black leading-none text-brand-teal-light transition-colors group-hover:text-brand-teal-mid">
                                {step.number}
                            </span>
                            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-teal-light text-brand-teal">
                                {step.icon}
                            </span>
                            <h3 className="mt-5 text-lg font-bold text-brand-dark">{step.title}</h3>
                            <p className="mt-2 text-[14px] leading-relaxed text-brand-mid">
                                {step.description}
                            </p>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}

/* ────────────────────── PROGRAM HIGHLIGHTS ──────────────────── */

function ProgramHighlights({ programs }: { programs: ProgramHighlight[] }) {
    return (
        <section className="bg-brand-cream px-5 py-20 sm:px-8 sm:py-28">
            <div className="mx-auto max-w-[1200px]">
                <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
                    <SectionHeading
                        eyebrow="Program Pilihan"
                        title="Sedang ramai dibuka"
                        description="Batch terbaru dari ustadz terverifikasi. Cepat-cepatan, kuota terbatas."
                    />
                    <Link
                        href="/programs"
                        className="group inline-flex shrink-0 items-center gap-1.5 rounded-xl border-[1.5px] border-brand-border bg-white px-5 py-2.5 text-[13px] font-semibold text-brand-mid transition-all hover:-translate-y-0.5 hover:border-brand-teal hover:text-brand-teal"
                    >
                        Lihat semua program
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2.5}
                            className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6l6 6-6 6" />
                        </svg>
                    </Link>
                </div>

                {programs.length > 0 ? (
                    <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {programs.map((program) => (
                            <ProgramHighlightCard key={program.id} program={program} />
                        ))}
                    </div>
                ) : (
                    <div className="mt-12 rounded-3xl border border-dashed border-brand-teal-mid bg-white p-14 text-center">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-teal-light text-2xl">
                            📚
                        </div>
                        <h3 className="mt-5 font-display text-xl font-bold text-brand-dark">
                            Program segera hadir
                        </h3>
                        <p className="mt-2 text-sm text-brand-mid">
                            Ustadz sedang menyiapkan batch baru. Sementara itu, cek semua program
                            yang sudah dibuka.
                        </p>
                        <Link
                            href="/programs"
                            className="mt-5 inline-flex items-center gap-1.5 rounded-xl bg-brand-teal px-5 py-2.5 text-[13px] font-bold text-white transition-colors hover:bg-brand-teal-dark"
                        >
                            Lihat semua program
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}

/* ───────────────────────── WHY POJOKSANTRI ──────────────────── */

type Reason = {
    title: string;
    description: string;
    icon: React.ReactNode;
};

const REASONS: Reason[] = [
    {
        title: 'Ustadz Terverifikasi',
        description:
            'Setiap ustadz melalui proses verifikasi identitas dan kelayakan mengajar sebelum ditampilkan di platform.',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M12 22s8-4 8-10V6l-8-3-8 3v6c0 6 8 10 8 10z" />
            </svg>
        ),
    },
    {
        title: 'Sistem Batch',
        description:
            'Belajar dalam kelompok kecil dengan jadwal yang jelas. Bayar per batch, tahu pasti apa yang kamu dapatkan.',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-2.13a4 4 0 10-4-4 4 4 0 004 4zm6 0a3 3 0 10-2-5.24M5 12a3 3 0 100-6 3 3 0 000 6z" />
            </svg>
        ),
    },
    {
        title: 'Harga Transparan',
        description:
            'Tidak ada biaya tersembunyi. Kamu melihat harga, kuota, dan detail program sebelum mendaftar.',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
            </svg>
        ),
    },
    {
        title: 'Untuk Semua Level',
        description:
            'Pemula yang baru mengenal huruf hijaiyah, atau santri lanjutan yang ingin menghafal — ada programnya.',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M3 6h18M3 18h18M7 4v16M17 4v16" />
            </svg>
        ),
    },
];

function WhyPojokSantri() {
    return (
        <section id="tentang" className="px-5 py-20 sm:px-8 sm:py-28">
            <div className="mx-auto max-w-[1200px]">
                <SectionHeading
                    align="center"
                    eyebrow="Kenapa PojokSantri"
                    title={
                        <>
                            Belajar Al-Qur'an seharusnya{' '}
                            <em className="font-display italic text-brand-teal">tenang</em>.
                        </>
                    }
                    description="Kami merancang ulang cara santri menemukan ustadz — supaya kamu bisa fokus pada pembelajaran, bukan kerumitan administrasi."
                />

                <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
                    {REASONS.map((reason) => (
                        <div key={reason.title} className="group">
                            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-teal-light text-brand-teal transition-all duration-300 group-hover:bg-brand-teal group-hover:text-white">
                                {reason.icon}
                            </span>
                            <h3 className="mt-5 text-base font-bold text-brand-dark">
                                {reason.title}
                            </h3>
                            <p className="mt-2 text-[13.5px] leading-relaxed text-brand-mid">
                                {reason.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ───────────────────────── FINAL CTA ────────────────────────── */

function FinalCta() {
    return (
        <section className="px-5 pb-20 sm:px-8 sm:pb-28">
            <div className="relative mx-auto max-w-[1200px] overflow-hidden rounded-3xl bg-brand-teal px-6 py-14 sm:px-14 sm:py-20">
                {/* Decorative pattern */}
                <svg
                    viewBox="0 0 200 200"
                    className="pointer-events-none absolute -right-12 -top-12 h-64 w-64 text-white/10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1}
                    aria-hidden="true"
                >
                    <path d="M100 10l90 50v100l-90 50-90-50V60z" />
                    <path d="M100 30l70 40v80l-70 40-70-40V70z" />
                    <circle cx="100" cy="100" r="30" />
                </svg>
                <svg
                    viewBox="0 0 200 200"
                    className="pointer-events-none absolute -bottom-16 -left-10 h-48 w-48 text-white/10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1}
                    aria-hidden="true"
                >
                    <circle cx="100" cy="100" r="80" />
                    <circle cx="100" cy="100" r="50" />
                    <circle cx="100" cy="100" r="20" />
                </svg>

                <div className="relative mx-auto max-w-2xl text-center">
                    <h2 className="font-display text-3xl font-bold leading-tight text-white sm:text-[40px]">
                        Siap memulai perjalanan ngajimu?
                    </h2>
                    <p className="mt-4 text-[15px] leading-relaxed text-white/80">
                        Daftar sebagai santri untuk mengikuti program, atau jadi ustadz untuk mulai
                        mengajar di PojokSantri.
                    </p>
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                        <Link
                            href="/programs"
                            className="group inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-[14px] font-bold text-brand-teal-dark transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/10"
                        >
                            Jelajahi Program
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2.5}
                                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6l6 6-6 6" />
                            </svg>
                        </Link>
                        <Link
                            href="/register"
                            className="inline-flex items-center gap-2 rounded-xl border-2 border-white/30 bg-transparent px-7 py-3.5 text-[14px] font-semibold text-white transition-all hover:-translate-y-0.5 hover:border-white"
                        >
                            Jadi Ustadz
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ─────────────────────────── PAGE ───────────────────────────── */

export default function Welcome({ canLogin, canRegister, programs, stats }: WelcomeProps) {
    return (
        <>
            <Head title="PojokSantri — Belajar Al-Qur'an & Studi Islam dari Ustadz Terverifikasi" />
            <div className="min-h-screen bg-brand-surface">
                <PlatformNavbar canLogin={canLogin} canRegister={canRegister} />
                <main>
                    <Hero programs={programs} stats={stats} />
                    <SearchTeaser />
                    <ProgramHighlights programs={programs} />
                    <HowItWorks />
                    <WhyPojokSantri />
                    <FinalCta />
                </main>
                <PlatformFooter />
            </div>
        </>
    );
}
