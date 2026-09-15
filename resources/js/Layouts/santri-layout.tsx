import { Link } from '@inertiajs/react';
import type { PropsWithChildren } from 'react';
import { logout } from '@/routes';

type SantriLayoutProps = PropsWithChildren<{
    title: string;
    description: string;
}>;

const navigationItems = [
    { label: 'Dashboard', href: '/santri/dashboard' },
    { label: 'Batch Tersedia', href: '/santri/batches' },
];

export default function SantriLayout({
    title,
    description,
    children,
}: SantriLayoutProps) {
    return (
        <div className="min-h-screen bg-[#f8f3eb] text-slate-900">
            <div className="mx-auto grid min-h-screen max-w-7xl gap-6 px-4 py-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:px-6">
                <aside className="flex flex-col rounded-3xl border border-[#d6c3a5] bg-[#0f766e] p-6 text-white shadow-sm">
                    <div className="space-y-2 border-b border-white/15 pb-6">
                        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#f7d27a]">
                            PojokSantri.ID
                        </p>
                        <h1 className="text-2xl font-semibold">Santri Panel</h1>
                        <p className="text-sm leading-6 text-white/80">
                            Panel santri untuk melihat enrollment dan pembayaran.
                        </p>
                    </div>

                    <nav className="mt-6 space-y-2">
                        {navigationItems.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium text-white/90 transition hover:bg-white/10 hover:text-white"
                            >
                                <span>{item.label}</span>
                                {item.href === '/santri/dashboard' ? (
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
                </aside>

                <main className="space-y-6">
                    <section className="rounded-3xl border border-[#eadcc8] bg-white p-6 shadow-sm">
                        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#0f766e]">
                            Area Santri
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
