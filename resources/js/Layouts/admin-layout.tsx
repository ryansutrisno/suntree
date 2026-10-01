import { Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import type { PropsWithChildren, ReactNode } from 'react';
import { logout } from '@/routes';
import MobileSidebarDrawer from '@/Components/MobileSidebarDrawer';

type AdminLayoutProps = PropsWithChildren<{
    title: string;
    description: string;
}>;

const navigationItems = [
    { label: 'Dashboard', href: '/admin' },
    { label: 'Users', href: '/admin/users' },
    { label: 'Ustadz', href: '/admin/ustadz' },
    { label: 'Programs', href: '/admin/programs' },
    { label: 'Batches', href: '/admin/batches' },
    { label: 'Enrollments', href: '/admin/enrollments' },
    { label: 'Payments', href: '/admin/payments' },
];

export default function AdminLayout({
    title,
    description,
    children,
}: AdminLayoutProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const currentUrl = usePage().url;

    useEffect(() => {
        setIsSidebarOpen(false);
    }, [currentUrl]);

    const sidebarContent = (
        <>
            <div className="space-y-2 border-b border-white/15 pb-6">
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#f7d27a]">
                    Suntree
                </p>
                <h1 className="text-2xl font-semibold">Admin Panel</h1>
            </div>

            <nav className="mt-6 space-y-2" aria-label="Admin panel navigation">
                {navigationItems.map((item) => (
                    <Link
                        key={item.label}
                        href={item.href}
                        className="flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium text-white/90 transition hover:bg-white/10 hover:text-white"
                    >
                        <span>{item.label}</span>
                        {item.href === '/admin' ? (
                            <span className="rounded-full bg-[#f7d27a] px-2 py-0.5 text-xs font-semibold text-[#0f766e]">
                                Live
                            </span>
                        ) : null}
                    </Link>
                ))}
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
        </>
    );

    return (
        <div className="min-h-screen bg-[#f8f3eb] text-slate-900">
            <header className="sticky top-0 z-40 border-b border-[#d6c3a5] bg-[#0f766e] text-white shadow-sm lg:hidden">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
                    <div className="min-w-0">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#f7d27a]">
                            Suntree
                        </p>
                        <p className="truncate text-sm font-semibold leading-5">
                            Admin Panel
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={() => setIsSidebarOpen(true)}
                        className="inline-flex items-center justify-center rounded-2xl p-2.5 text-white/90 transition hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f7d27a]"
                        aria-label="Buka menu navigasi"
                        aria-expanded={isSidebarOpen}
                        aria-controls="admin-mobile-sidebar"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-5 w-5"
                            aria-hidden="true"
                        >
                            <path d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </header>

            <div className="mx-auto grid min-h-screen max-w-7xl gap-6 px-4 py-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:px-6">
                <aside className="hidden flex-col rounded-3xl border border-[#d6c3a5] bg-[#0f766e] p-6 text-white shadow-sm lg:flex">
                    {sidebarContent}
                </aside>

                <main className="space-y-6">
                    <section className="rounded-3xl border border-[#eadcc8] bg-white p-6 shadow-sm">
                        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#0f766e]">
                            Area Admin
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

            <MobileSidebarDrawer
                show={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                panelId="admin-mobile-sidebar"
            >
                {sidebarContent}
            </MobileSidebarDrawer>
        </div>
    );
}
