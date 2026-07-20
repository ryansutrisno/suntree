import { Link } from '@inertiajs/react';

export interface ProgramCardProps {
    id: number;
    title: string;
    description: string | null;
    price: number;
    category: string;
    level: string;
    ustadz_name: string | null;
    thumbnail_url?: string | null;
}

interface ProgramCardLoadingProps {
    count?: number;
}

interface ProgramCardErrorProps {
    message?: string;
    onRetry?: () => void;
}

const categoryLabels: Record<string, string> = {
    iqra: 'Iqra',
    tajwid: 'Tajwid',
    tahsin: 'Tahsin',
    tahfidz: 'Tahfidz',
    lainnya: 'Lainnya',
};

const levelLabels: Record<string, string> = {
    pemula: 'Pemula',
    menengah: 'Menengah',
    lanjutan: 'Lanjutan',
};

function formatCategory(category: string): string {
    return categoryLabels[category] ?? category;
}

function formatLevel(level: string): string {
    return levelLabels[level] ?? level;
}

function formatPrice(price: number): string {
    return `Rp ${price.toLocaleString('id-ID')}`;
}

export function ProgramCard({
    id,
    title,
    description,
    price,
    category,
    level,
    ustadz_name,
    thumbnail_url,
}: ProgramCardProps) {
    return (
        <Link
            href={`/programs/${id}`}
            className="group block h-full rounded-3xl border border-[#eadcc8] bg-white shadow-sm transition-all duration-200 hover:shadow-md"
        >
            {/* Thumbnail */}
            <div className="relative aspect-video w-full overflow-hidden rounded-t-3xl bg-[#f8f5ef]">
                {thumbnail_url ? (
                    <img
                        src={thumbnail_url}
                        alt={title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center">
                        <svg
                            className="h-12 w-12 text-[#eadcc8]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                        </svg>
                    </div>
                )}

                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-700 shadow-sm">
                        {formatCategory(category)}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-5">
                {/* Level Badge */}
                <div className="mb-2">
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0f766e]">
                        {formatLevel(level)}
                    </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-slate-900 group-hover:text-[#0f766e] transition-colors">
                    {title}
                </h3>

                {/* Description */}
                {description && (
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600">
                        {description}
                    </p>
                )}

                {/* Divider */}
                <div className="my-4 border-t border-[#eadcc8]" />

                {/* Footer: Ustadz & Price */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 min-w-0">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f8f5ef]">
                            <svg
                                className="h-4 w-4 text-slate-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                            </svg>
                        </div>
                        <span className="truncate text-sm text-slate-600">
                            {ustadz_name ?? 'Ustadz akan ditentukan'}
                        </span>
                    </div>

                    <div className="text-right shrink-0 ml-3">
                        <p className="text-sm font-semibold text-[#0f766e]">
                            {formatPrice(price)}
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export function ProgramCardLoading({ count = 1 }: ProgramCardLoadingProps) {
    const cards = Array.from({ length: count }, (_, i) => i);

    return (
        <>
            {cards.map((i) => (
                <div
                    key={i}
                    className="h-full rounded-3xl border border-[#eadcc8] bg-white shadow-sm overflow-hidden"
                >
                    {/* Thumbnail Skeleton */}
                    <div className="aspect-video w-full bg-[#f8f5ef] animate-pulse" />

                    {/* Content Skeleton */}
                    <div className="p-5">
                        <div className="h-3 w-20 bg-[#f8f5ef] rounded animate-pulse mb-2" />
                        <div className="h-5 w-3/4 bg-[#f8f5ef] rounded animate-pulse mt-2" />
                        <div className="h-4 w-full bg-[#f8f5ef] rounded animate-pulse mt-2" />
                        <div className="h-4 w-2/3 bg-[#f8f5ef] rounded animate-pulse mt-1" />
                        <div className="my-4 border-t border-[#eadcc8]" />
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-full bg-[#f8f5ef] animate-pulse" />
                                <div className="h-4 w-24 bg-[#f8f5ef] rounded animate-pulse" />
                            </div>
                            <div className="h-4 w-20 bg-[#f8f5ef] rounded animate-pulse" />
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}

export function ProgramCardError({
    message = 'Gagal memuat program',
    onRetry,
}: ProgramCardErrorProps) {
    return (
        <div className="col-span-full flex flex-col items-center justify-center rounded-3xl border border-[#eadcc8] bg-white p-12 text-center shadow-sm">
            <svg
                className="h-16 w-16 text-slate-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
            </svg>
            <p className="mt-4 text-slate-600">{message}</p>
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="mt-4 rounded-xl bg-[#0f766e] px-6 py-2 text-sm font-medium text-white hover:bg-[#0d655d] transition-colors"
                >
                    Coba Lagi
                </button>
            )}
        </div>
    );
}

export function ProgramCardEmpty({ message = 'Belum ada program tersedia' }: { message?: string }) {
    return (
        <div className="col-span-full flex flex-col items-center justify-center rounded-3xl border border-[#eadcc8] bg-white p-12 text-center shadow-sm">
            <svg
                className="h-16 w-16 text-[#eadcc8]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
            </svg>
            <p className="mt-4 text-slate-500">{message}</p>
        </div>
    );
}

interface ProgramCardGridProps {
    children: React.ReactNode;
}

export function ProgramCardGrid({ children }: ProgramCardGridProps) {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {children}
        </div>
    );
}
