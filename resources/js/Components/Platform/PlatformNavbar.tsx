import { Link, router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import type { PropsWithChildren } from 'react';

type NavLink = {
    label: string;
    href: string;
};

const NAV_LINKS: NavLink[] = [
    { label: 'Cari Program', href: '/programs' },
    { label: 'Metode', href: '/programs' },
    { label: 'Tentang Kami', href: '/#tentang' },
];

function BrandMark() {
    return (
        <Link
            href="/"
            className="group flex items-center gap-2"
            aria-label="PojokSantri — kembali ke beranda"
        >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-teal text-white shadow-sm transition-transform duration-200 group-hover:-translate-y-0.5">
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
            <span className="font-display text-[22px] font-black leading-none tracking-tight text-brand-teal-dark">
                Pojok<span className="text-brand-gold">Santri</span>
            </span>
        </Link>
    );
}

function DesktopNav() {
    const page = usePage();
    const current = page.url;

    return (
        <nav className="hidden items-center md:flex" aria-label="Navigasi utama">
            {NAV_LINKS.map((link) => {
                const isActive =
                    (link.href === '/programs' && current.startsWith('/programs')) ||
                    current === link.href;

                return (
                    <Link
                        key={link.label}
                        href={link.href}
                        className={`relative -mb-px flex h-16 items-center border-b-2 px-4 text-[13.5px] font-medium transition-colors ${
                            isActive
                                ? 'border-brand-teal text-brand-teal'
                                : 'border-transparent text-brand-mid hover:text-brand-teal'
                        }`}
                    >
                        {link.label}
                    </Link>
                );
            })}
        </nav>
    );
}

function AuthActions({ canLogin, canRegister }: { canLogin: boolean; canRegister: boolean }) {
    if (!canLogin && !canRegister) {
        return null;
    }

    return (
        <div className="hidden items-center gap-3 md:flex">
            {canLogin && (
                <Link
                    href="/login"
                    className="rounded-lg border-[1.5px] border-brand-border bg-white px-5 py-2 text-[13px] font-semibold text-brand-mid transition-all hover:-translate-y-0.5 hover:border-brand-teal hover:text-brand-teal"
                >
                    Masuk
                </Link>
            )}
            {canRegister && (
                <Link
                    href="/register"
                    className="group inline-flex items-center gap-1.5 rounded-lg bg-brand-teal px-5 py-2 text-[13px] font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-brand-teal-dark hover:shadow-lg hover:shadow-brand-teal/25"
                >
                    Jadi Ustadz
                    <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                        →
                    </span>
                </Link>
            )}
        </div>
    );
}

function MobileMenuToggle({ open, onToggle }: { open: boolean; onToggle: () => void }) {
    return (
        <button
            type="button"
            onClick={onToggle}
            aria-label={open ? 'Tutup menu' : 'Buka menu'}
            aria-expanded={open}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-brand-border bg-white text-brand-mid transition-colors hover:border-brand-teal hover:text-brand-teal md:hidden"
        >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5">
                {open ? (
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                    />
                ) : (
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 7h16M4 12h16M4 17h16"
                    />
                )}
            </svg>
        </button>
    );
}

function MobileNav({
    open,
    canLogin,
    canRegister,
}: PropsWithChildren<{ open: boolean; canLogin: boolean; canRegister: boolean }>) {
    if (!open) {
        return null;
    }

    return (
        <div className="border-t border-brand-border bg-white md:hidden">
            <div className="space-y-1 px-4 py-4">
                {NAV_LINKS.map((link) => (
                    <Link
                        key={link.label}
                        href={link.href}
                        className="block rounded-lg px-3 py-2.5 text-sm font-medium text-brand-mid transition-colors hover:bg-brand-teal-light hover:text-brand-teal"
                    >
                        {link.label}
                    </Link>
                ))}
                <div className="grid grid-cols-2 gap-2 border-t border-brand-border pt-3">
                    {canLogin && (
                        <Link
                            href="/login"
                            className="rounded-lg border-[1.5px] border-brand-border bg-white px-4 py-2.5 text-center text-sm font-semibold text-brand-mid transition-colors hover:border-brand-teal hover:text-brand-teal"
                        >
                            Masuk
                        </Link>
                    )}
                    {canRegister && (
                        <Link
                            href="/register"
                            className="rounded-lg bg-brand-teal px-4 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-brand-teal-dark"
                        >
                            Jadi Ustadz
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}

export function PlatformNavbar({ canLogin, canRegister }: { canLogin: boolean; canRegister: boolean }) {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        return router.on('navigate', () => {
            setOpen(false);
        });
    }, []);

    return (
        <header className="sticky top-0 z-50 border-b border-brand-border bg-white/90 backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-6 px-5 sm:px-8">
                <BrandMark />
                <DesktopNav />
                <AuthActions canLogin={canLogin} canRegister={canRegister} />
                <MobileMenuToggle open={open} onToggle={() => setOpen((prev) => !prev)} />
            </div>
            <MobileNav open={open} canLogin={canLogin} canRegister={canRegister} />
        </header>
    );
}
