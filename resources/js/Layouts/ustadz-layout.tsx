import { Link, usePage } from '@inertiajs/react';
import type { PropsWithChildren } from 'react';
import { logout } from '@/routes';

type UstadzLayoutProps = PropsWithChildren<{
    title: string;
    description: string;
}>;

const navigationItems = [
    { label: 'Dashboard', href: '/ustadz/dashboard' },
    { label: 'Programs', href: '/ustadz/programs' },
    { label: 'Batches', href: '/ustadz/batches' },
    { label: 'Enrollments', href: '/ustadz/enrollments' },
];

/**
 * Dashboard hanya aktif pada path persis `/ustadz/dashboard`,
 * sedangkan menu lain aktif saat URL dimulai dengan href-nya
 * (agar tetap aktif di halaman detail/filter dengan query string).
 */
function isNavigationItemActive(itemHref: string, currentUrl: string): boolean {
    const [currentPath] = currentUrl.split('?');

    if (itemHref === '/ustadz/dashboard') {
        return currentPath === '/ustadz/dashboard';
    }

    return currentPath.startsWith(itemHref);
}

export default function UstadzLayout({
    title,
    description,
    children,
}: UstadzLayoutProps) {
    const currentUrl = usePage().url;

    return (
        <div className="min-h-screen bg-[#f8f3eb] text-slate-900">
            <div className="mx-auto grid min-h-screen max-w-7xl gap-6 px-4 py-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:px-6">
                <aside className="flex flex-col rounded-3xl border border-[#d6c3a5] bg-[#0f766e] p-6 text-white shadow-sm">
                    <div className="space-y-2 border-b border-white/15 pb-6">
                        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#f7d27a]">
                            PojokSantri.ID
                        </p>
                        <h1 className="text-2xl font-semibold">Ustadz Panel</h1>
                        <p className="text-sm leading-6 text-white/80">
                            Panel ustadz untuk mengelola program, batch, dan enrollment.
                        </p>
                    </div>

                    <nav className="mt-6 space-y-2" aria-label="Ustadz panel navigation">
                        {navigationItems.map((item) => {
                            const isActive = isNavigationItemActive(item.href, currentUrl);

                            return (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    aria-current={isActive ? 'page' : undefined}
                                    className={`flex items-center gap-3 rounded-2xl border-l-4 px-4 py-3 text-sm font-medium transition ${
                                        isActive
                                            ? 'border-l-[#f7d27a] bg-white/10 text-white'
                                            : 'border-l-transparent text-white/90 hover:bg-white/10 hover:text-white'
                                    }`}
                                >
                                    <span>{item.label}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="mt-auto border-t border-white/15 pt-6">
                        <Link
                            href={logout.url()}
                            method="post"
                            as="button"
                            className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-[#f7d27a]"
                        >
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-4 w-4 shrink-0"
                                aria-hidden="true"
                            >
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                <path d="M16 17l5-5-5-5" />
                                <path d="M21 12H9" />
                            </svg>
                            <span>Keluar</span>
                        </Link>
                    </div>
                </aside>

                <main className="space-y-6">
                    <section className="rounded-3xl border border-[#eadcc8] bg-white p-6 shadow-sm">
                        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#0f766e]">
                            Area Ustadz
                        </p>
                        <div className="mt-3 space-y-2">
                            <h2 className="text-3xl font-semibold text-slate-900">{title}</h2>
                            <p className="max-w-2xl text-sm leading-6 text-slate-600">
                                {description}
                            </p>
                        </div>
                    </section>

                    {children}
                </main>
            </div>
        </div>
    );
}