import { Link } from '@inertiajs/react';

export type ProgramHighlight = {
    id: number;
    title: string;
    description: string | null;
    price: number;
    category: string;
    category_label: string;
    level: string;
    level_label: string;
    ustadz_name: string | null;
    show_url: string;
};

const LEVEL_STYLES: Record<string, string> = {
    pemula: 'bg-brand-pemula-bg text-brand-pemula',
    menengah: 'bg-brand-menengah-bg text-brand-menengah',
    lanjutan: 'bg-brand-lanjutan-bg text-brand-lanjutan',
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

export function ProgramHighlightCard({ program }: { program: ProgramHighlight }) {
    const levelClass = LEVEL_STYLES[program.level] ?? 'bg-brand-teal-light text-brand-teal';

    return (
        <Link
            href={program.show_url}
            className="group flex h-full flex-col overflow-hidden rounded-2xl border border-brand-border bg-white transition-all duration-300 hover:-translate-y-1 hover:border-brand-teal-mid hover:shadow-[0_16px_40px_rgba(10,74,69,0.10)]"
        >
            {/* Top strip: level + bookmark */}
            <div className="flex items-start justify-between px-5 pt-5">
                <span
                    className={`rounded-md px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em] ${levelClass}`}
                >
                    {program.level_label}
                </span>
                <button
                    type="button"
                    aria-label="Simpan ke wishlist"
                    onClick={(event) => event.preventDefault()}
                    className="flex h-8 w-8 items-center justify-center rounded-full border-[1.5px] border-brand-border bg-white text-sm text-brand-light transition-all hover:scale-110 hover:border-rose-400 hover:text-rose-500"
                >
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        className="h-3.5 w-3.5"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 5.6A2.6 2.6 0 0 1 7.6 3h8.8A2.6 2.6 0 0 1 19 5.6V21l-7-3.6L5 21V5.6Z"
                        />
                    </svg>
                </button>
            </div>

            {/* Body */}
            <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
                <div className="mb-2 flex flex-wrap gap-1.5">
                    <span className="rounded bg-brand-teal-light px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-brand-teal">
                        {program.category_label}
                    </span>
                </div>

                <h3 className="text-[15px] font-bold leading-snug text-brand-dark transition-colors group-hover:text-brand-teal">
                    {program.title}
                </h3>

                {program.description && (
                    <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-brand-light">
                        {program.description}
                    </p>
                )}

                <div className="mt-4 flex items-center gap-2.5">
                    {program.ustadz_name ? (
                        <>
                            <span className="flex h-7 w-7 items-center justify-center rounded-full border-[1.5px] border-brand-teal-mid bg-brand-teal-light text-[11px] font-bold text-brand-teal">
                                {initials(program.ustadz_name)}
                            </span>
                            <span className="flex items-center gap-1 text-[12.5px] font-semibold text-brand-mid">
                                {program.ustadz_name}
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="h-3.5 w-3.5 text-brand-teal"
                                    aria-label="Ustadz terverifikasi"
                                >
                                    <path d="M12 2l2.4 2.3 3.3-.5.9 3.2 3 1.6-1.4 3 1.4 3-3 1.6-.9 3.2-3.3-.5L12 22l-2.4-2.3-3.3.5-.9-3.2-3-1.6 1.4-3-1.4-3 3-1.6.9-3.2 3.3.5L12 2zm-1.1 13.9l5.2-5.2-1.4-1.4-3.8 3.8-1.7-1.7-1.4 1.4 3.1 3.1z" />
                                </svg>
                            </span>
                        </>
                    ) : (
                        <span className="text-[12.5px] text-brand-light">Ustadz akan ditentukan</span>
                    )}
                </div>

                <div className="mt-auto pt-4">
                    <div className="flex items-end justify-between border-t border-brand-border pt-3">
                        <div>
                            <p className="text-[17px] font-extrabold text-brand-teal">
                                {formatPrice(program.price)}
                            </p>
                            <p className="text-[11px] text-brand-light">per santri / batch</p>
                        </div>
                        <span className="inline-flex items-center gap-1 text-[12px] font-bold text-brand-teal opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100">
                            Lihat
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-3.5 w-3.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6l6 6-6 6" />
                            </svg>
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
