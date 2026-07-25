import { Head, Link, useForm } from '@inertiajs/react';
import type { FormEventHandler } from 'react';
import { store as passwordStore } from '@/actions/App/Http/Controllers/Auth/NewPasswordController';
import { login } from '@/routes';

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
                    Hampir selesai
                </span>

                <h2 className="mt-6 font-display text-[40px] font-bold leading-[1.15] tracking-tight text-white xl:text-[48px]">
                    Atur <em className="italic text-brand-gold-light">password baru</em>{' '}
                    kamu.
                </h2>

                <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-white/75">
                    Tinggal beberapa langkah lagi sebelum kamu bisa masuk kembali
                    dan melanjutkan belajar. Pilih password yang mudah kamu ingat.
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

export default function ResetPassword({ token, email }: { token: string; email: string }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (event) => {
        event.preventDefault();
        post(passwordStore.url(), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    const inputClass =
        'mt-2 block w-full rounded-xl border-[1.5px] border-brand-border bg-white px-4 py-2.5 text-[14px] text-brand-dark placeholder:text-brand-light transition-all outline-none focus:border-brand-teal focus:ring-4 focus:ring-brand-teal-light';

    return (
        <>
            <Head title="Atur Ulang Password" />

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
                                    Atur ulang password
                                </h1>
                                <p className="mt-2 text-[13.5px] leading-relaxed text-brand-mid">
                                    Masukkan password baru dua kali untuk keamanan. Akun kamu akan siap dipakai lagi setelah ini.
                                </p>
                            </div>

                            <form onSubmit={submit} className="space-y-4">
                                <div>
                                    <label htmlFor="email" className="block text-[13px] font-semibold text-brand-dark">
                                        Email akun
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        autoComplete="username"
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
                                        Password baru
                                    </label>
                                    <input
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        autoComplete="new-password"
                                        autoFocus
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

                                <div>
                                    <label
                                        htmlFor="password_confirmation"
                                        className="block text-[13px] font-semibold text-brand-dark"
                                    >
                                        Konfirmasi password baru
                                    </label>
                                    <input
                                        id="password_confirmation"
                                        type="password"
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        autoComplete="new-password"
                                        onChange={(event) =>
                                            setData('password_confirmation', event.target.value)
                                        }
                                        placeholder="••••••••"
                                        className={inputClass}
                                    />
                                    {errors.password_confirmation && (
                                        <p className="mt-2 text-[12.5px] font-medium text-rose-600">
                                            {errors.password_confirmation}
                                        </p>
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
                                            Menyimpan…
                                        </>
                                    ) : (
                                        <>
                                            Simpan Password Baru
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

                            <p className="mt-5 text-center text-[13.5px] text-brand-mid">
                                Ingat password lama?{' '}
                                <Link
                                    href={login.url()}
                                    className="font-semibold text-brand-teal underline-offset-4 transition-colors hover:text-brand-teal-dark hover:underline"
                                >
                                    Kembali masuk
                                </Link>
                            </p>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
