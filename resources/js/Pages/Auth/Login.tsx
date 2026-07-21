import { Head, Link, useForm } from '@inertiajs/react';
import type { FormEventHandler } from 'react';
import { store as loginStore } from '@/actions/App/Http/Controllers/Auth/AuthenticatedSessionController';
import { register } from '@/routes';
import { request as passwordRequest } from '@/routes/password';

type LoginProps = {
    status?: string;
    canResetPassword: boolean;
};

type DemoAccount = {
    role: string;
    email: string;
    initial: string;
};

const DEMO_ACCOUNTS: DemoAccount[] = [
    { role: 'Admin', email: 'admin@pojoksantri.id', initial: 'A' },
    { role: 'Ustadz', email: 'ustadz@pojoksantri.id', initial: 'U' },
    { role: 'Santri', email: 'santri@pojoksantri.id', initial: 'S' },
];

function MarketingPanel() {
    return (
        <aside className="relative hidden overflow-hidden bg-brand-teal-dark lg:flex lg:flex-col lg:justify-between lg:p-12 xl:p-16">
            {/* Decorative gradient wash */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-brand-teal opacity-40 blur-3xl" />
                <div className="absolute bottom-0 -left-20 h-80 w-80 rounded-full bg-brand-gold opacity-15 blur-3xl" />
            </div>

            {/* Subtle dotted overlay */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.15]"
                style={{
                    backgroundImage:
                        'radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)',
                    backgroundSize: '22px 22px',
                }}
                aria-hidden="true"
            />

            {/* Top: brand mark */}
            <div className="relative">
                <Link href="/" className="inline-flex items-center gap-2.5">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-white backdrop-blur">
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2.2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-5 w-5"
                            aria-hidden="true"
                        >
                            <path d="M12 21c4.5-2.5 7-6 7-11V6l-7-3-7 3v4c0 5 2.5 8.5 7 11Z" />
                            <path d="M9.5 12.5l1.8 1.8L15 10.5" />
                        </svg>
                    </span>
                    <span className="font-display text-[22px] font-black tracking-tight text-white">
                        Pojok<span className="text-brand-gold">Santri</span>
                    </span>
                </Link>
            </div>

            {/* Middle: hero copy */}
            <div className="relative max-w-md">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80 backdrop-blur">
                    <span className="h-1 w-4 bg-brand-gold" />
                    Selamat datang kembali
                </span>

                <h2 className="mt-6 font-display text-[40px] font-bold leading-[1.15] tracking-tight text-white xl:text-[48px]">
                    Belajar Al-Qur'an,
                    <br />
                    dalam komunitas yang{' '}
                    <em className="italic text-brand-gold-light">menenangkan</em>.
                </h2>

                <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-white/75">
                    PojokSantri menyatukan santri dan ustadz terverifikasi dalam
                    batch kecil — pribadi, terstruktur, dan transparan.
                </p>
            </div>

            {/* Bottom: stats row */}
            <div className="relative grid grid-cols-3 gap-6 border-t border-white/15 pt-7">
                <div>
                    <p className="font-display text-2xl font-extrabold text-white">6+</p>
                    <p className="mt-0.5 text-[11px] font-medium uppercase tracking-[0.12em] text-white/55">
                        Program Aktif
                    </p>
                </div>
                <div>
                    <p className="font-display text-2xl font-extrabold text-white">100%</p>
                    <p className="mt-0.5 text-[11px] font-medium uppercase tracking-[0.12em] text-white/55">
                        Ustadz Terverifikasi
                    </p>
                </div>
                <div>
                    <p className="font-display text-2xl font-extrabold text-white">3</p>
                    <p className="mt-0.5 text-[11px] font-medium uppercase tracking-[0.12em] text-white/55">
                        Level Pembelajaran
                    </p>
                </div>
            </div>

            {/* Decorative geometric ornament */}
            <svg
                viewBox="0 0 200 200"
                className="pointer-events-none absolute right-8 top-1/3 h-32 w-32 text-white/10"
                fill="none"
                stroke="currentColor"
                strokeWidth={1}
                aria-hidden="true"
            >
                <path d="M100 10l90 50v100l-90 50-90-50V60z" />
                <path d="M100 30l70 40v80l-70 40-70-40V70z" />
                <circle cx="100" cy="100" r="28" />
            </svg>
        </aside>
    );
}

function MobileBrandMark() {
    return (
        <Link href="/" className="inline-flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-teal text-white shadow-sm">
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                    aria-hidden="true"
                >
                    <path d="M12 21c4.5-2.5 7-6 7-11V6l-7-3-7 3v4c0 5 2.5 8.5 7 11Z" />
                    <path d="M9.5 12.5l1.8 1.8L15 10.5" />
                </svg>
            </span>
            <span className="font-display text-[20px] font-black tracking-tight text-brand-teal-dark">
                Pojok<span className="text-brand-gold">Santri</span>
            </span>
        </Link>
    );
}

function DemoAccountCard({ account, onPick }: { account: DemoAccount; onPick: (email: string) => void }) {
    return (
        <button
            type="button"
            onClick={() => onPick(account.email)}
            className="group flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left transition-colors hover:bg-white/70"
        >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-teal-light text-[12px] font-bold text-brand-teal">
                {account.initial}
            </span>
            <div className="min-w-0 flex-1">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-brand-light">
                    {account.role}
                </p>
                <p className="truncate text-[12.5px] font-medium text-brand-dark">
                    {account.email}
                </p>
            </div>
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                className="h-3.5 w-3.5 shrink-0 text-brand-light opacity-0 transition-opacity group-hover:text-brand-teal group-hover:opacity-100"
                aria-hidden="true"
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
        </button>
    );
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false as boolean,
    });

    const submit: FormEventHandler = (event) => {
        event.preventDefault();
        post(loginStore.url(), {
            onFinish: () => reset('password'),
        });
    };

    const fillDemo = (email: string) => {
        setData({
            email,
            password: 'password',
            remember: false,
        });
    };

    const inputClass =
        'mt-2 block w-full rounded-xl border-[1.5px] border-brand-border bg-white px-4 py-2.5 text-[14px] text-brand-dark placeholder:text-brand-light transition-all outline-none focus:border-brand-teal focus:ring-4 focus:ring-brand-teal-light';

    return (
        <>
            <Head title="Masuk" />

            <main className="grid min-h-screen grid-cols-1 bg-brand-surface lg:h-dvh lg:grid-cols-[1.05fr_0.95fr] lg:overflow-hidden">
                <MarketingPanel />

                {/* Form panel */}
                <section className="relative flex flex-col items-center justify-center px-5 py-10 sm:px-8 lg:py-6">
                    {/* Subtle dotted bg */}
                    <div
                        className="pointer-events-none absolute inset-0 opacity-30"
                        style={{
                            backgroundImage:
                                'radial-gradient(circle, rgba(10,124,107,0.10) 1px, transparent 1px)',
                            backgroundSize: '22px 22px',
                        }}
                        aria-hidden="true"
                    />

                    <div className="relative w-full max-w-md">
                        {/* Mobile/tablet brand */}
                        <div className="mb-6 lg:hidden">
                            <MobileBrandMark />
                        </div>

                        <div className="animate-fade-up rounded-2xl border border-brand-border bg-white p-6 shadow-[0_8px_40px_rgba(10,74,69,0.06)] sm:p-7 lg:max-h-[calc(100dvh-3rem)] lg:overflow-y-auto">
                            <div className="mb-5 lg:mb-4">
                                <h1 className="font-display text-[26px] font-bold leading-tight tracking-tight text-brand-dark sm:text-[30px] lg:text-[26px]">
                                    Masuk ke akunmu
                                </h1>
                                <p className="mt-2 text-[13.5px] leading-relaxed text-brand-mid">
                                    Lanjutkan perjalanan ngaji kamu dari tempat kamu tinggalkan.
                                </p>
                            </div>

                            {status && (
                                <div className="mb-4 rounded-xl border border-brand-teal-mid bg-brand-teal-light px-4 py-3 text-[13px] font-medium text-brand-teal-dark">
                                    {status}
                                </div>
                            )}

                            <form onSubmit={submit} className="space-y-4">
                                <div>
                                    <label htmlFor="email" className="block text-[13px] font-semibold text-brand-dark">
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        autoComplete="username"
                                        autoFocus
                                        onChange={(event) => setData('email', event.target.value)}
                                        placeholder="nama@pojoksantri.id"
                                        className={inputClass}
                                    />
                                    {errors.email && (
                                        <p className="mt-2 text-[12.5px] font-medium text-rose-600">
                                            {errors.email}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block text-[13px] font-semibold text-brand-dark"
                                    >
                                        Password
                                    </label>
                                    <input
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        autoComplete="current-password"
                                        onChange={(event) => setData('password', event.target.value)}
                                        placeholder="••••••••"
                                        className={inputClass}
                                    />
                                    {errors.password && (
                                        <p className="mt-2 text-[12.5px] font-medium text-rose-600">
                                            {errors.password}
                                        </p>
                                    )}
                                </div>

                                <div className="flex items-center justify-between">
                                    <label className="flex cursor-pointer items-center gap-2.5 text-[13px] text-brand-mid">
                                        <input
                                            type="checkbox"
                                            name="remember"
                                            checked={data.remember}
                                            onChange={(event) =>
                                                setData('remember', event.target.checked as boolean)
                                            }
                                            className="h-4 w-4 rounded border-brand-border text-brand-teal focus:ring-2 focus:ring-brand-teal-light"
                                        />
                                        Ingat saya
                                    </label>

                                    {canResetPassword && (
                                        <Link
                                            href={passwordRequest.url()}
                                            className="text-[13px] font-semibold text-brand-teal transition-colors hover:text-brand-teal-dark"
                                        >
                                            Lupa password?
                                        </Link>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-teal px-6 py-3 text-[14px] font-bold text-white shadow-[0_8px_24px_rgba(10,124,107,0.25)] transition-all hover:-translate-y-0.5 hover:bg-brand-teal-dark hover:shadow-[0_12px_32px_rgba(10,124,107,0.35)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                                >
                                    {processing ? (
                                        <>
                                            <svg
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                className="h-4 w-4 animate-spin"
                                                aria-hidden="true"
                                            >
                                                <circle
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="3"
                                                    className="opacity-25"
                                                />
                                                <path
                                                    fill="currentColor"
                                                    className="opacity-90"
                                                    d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z"
                                                />
                                            </svg>
                                            Memproses…
                                        </>
                                    ) : (
                                        <>
                                            Masuk
                                            <svg
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth={2.5}
                                                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M5 12h14m-6-6l6 6-6 6"
                                                />
                                            </svg>
                                        </>
                                    )}
                                </button>
                            </form>

                            {/* Demo credentials helper */}
                            <div className="mt-5 rounded-xl border border-[#E8D5A8] bg-brand-gold-light p-4 lg:p-3.5">
                                <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
                                    <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-gold">
                                        Akun Demo
                                    </p>
                                    <p className="text-[10px] text-brand-light">
                                        Klik untuk pakai · Password:{' '}
                                        <span className="font-mono text-brand-mid">password</span>
                                    </p>
                                </div>
                                <div className="mt-2 space-y-0.5">
                                    {DEMO_ACCOUNTS.map((account) => (
                                        <DemoAccountCard
                                            key={account.email}
                                            account={account}
                                            onPick={fillDemo}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Register CTA — inside card so it scrolls with content if viewport is short */}
                            <p className="mt-5 text-center text-[13.5px] text-brand-mid">
                                Belum punya akun?{' '}
                                <Link
                                    href={register.url()}
                                    className="font-semibold text-brand-teal underline-offset-4 transition-colors hover:text-brand-teal-dark hover:underline"
                                >
                                    Daftar sebagai Ustadz
                                </Link>
                            </p>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
