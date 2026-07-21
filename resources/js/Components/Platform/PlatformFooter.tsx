import { Link } from '@inertiajs/react';

type FooterColumn = {
    title: string;
    links: { label: string; href: string }[];
};

const FOOTER_COLUMNS: FooterColumn[] = [
    {
        title: 'Program',
        links: [
            { label: 'Semua Program', href: '/programs' },
            { label: 'Iqra', href: '/programs?category=iqra' },
            { label: 'Tajwid', href: '/programs?category=tajwid' },
            { label: 'Tahsin', href: '/programs?category=tahsin' },
            { label: 'Tahfidz', href: '/programs?category=tahfidz' },
        ],
    },
    {
        title: 'PojokSantri',
        links: [
            { label: 'Tentang Kami', href: '/#tentang' },
            { label: 'Cara Kerja', href: '/#cara-kerja' },
            { label: 'Jadi Ustadz', href: '/register' },
            { label: 'Masuk', href: '/login' },
        ],
    },
];

function BrandMark() {
    return (
        <span className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-teal text-white">
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
            <span className="font-display text-xl font-black tracking-tight text-white">
                Pojok<span className="text-brand-gold">Santri</span>
            </span>
        </span>
    );
}

export function PlatformFooter() {
    return (
        <footer className="border-t border-white/10 bg-brand-dark text-white/70">
            <div className="mx-auto max-w-[1200px] px-5 py-14 sm:px-8">
                <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
                    <div className="space-y-4">
                        <BrandMark />
                        <p className="max-w-xs text-sm leading-relaxed text-white/60">
                            Tempat bertemunya santri dan ustadz terverifikasi untuk belajar
                            Al-Qur'an dan studi Islam secara terstruktur.
                        </p>
                    </div>

                    {FOOTER_COLUMNS.map((column) => (
                        <div key={column.title}>
                            <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">
                                {column.title}
                            </h3>
                            <ul className="mt-4 space-y-2.5">
                                {column.links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-white/70 transition-colors hover:text-brand-gold"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    <div>
                        <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">
                            Hubungi Kami
                        </h3>
                        <ul className="mt-4 space-y-2.5 text-sm text-white/70">
                            <li>halo@pojoksantri.id</li>
                            <li className="text-white/40">Senin–Jumat, 09.00–17.00 WIB</li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row sm:items-center">
                    <p>© {new Date().getFullYear()} PojokSantri. Dibuat untuk santri Indonesia.</p>
                    <p className="flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-brand-teal" />
                        Belajar Al-Qur'an dengan tenang, sukses dunia akhirat.
                    </p>
                </div>
            </div>
        </footer>
    );
}
