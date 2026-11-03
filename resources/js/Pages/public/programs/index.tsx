import { Link, useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import type { FormEvent } from 'react';
import AppHead from '@/Components/AppHead';

type Program = {
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

type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

type ProgramsPaginator = {
    data: Program[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number | null;
    to: number | null;
    links: PaginationLink[];
    prev_page_url: string | null;
    next_page_url: string | null;
};

type FilterOption = {
    value: string;
    label: string;
};

type Filters = {
    search: string | null;
    category: string | null;
    level: string | null;
    price_min: number | null;
    price_max: number | null;
};

type PublicProgramsIndexProps = {
    programs: ProgramsPaginator;
    filters: Filters;
    categories: FilterOption[];
    levels: FilterOption[];
};

function ProgramCard({ program }: { program: Program }) {
    return (
        <Link
            href={program.show_url}
            className="group flex flex-col rounded-3xl border border-[#eadcc8] bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
        >
            <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center rounded-full bg-teal-50 px-2.5 py-1 text-xs font-medium text-teal-700">
                    {program.category_label}
                </span>
                <span className="inline-flex items-center rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
                    {program.level_label}
                </span>
            </div>

            <h3 className="mt-4 text-lg font-semibold text-slate-900 transition-colors group-hover:text-[#0f766e]">
                {program.title}
            </h3>

            <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">
                {program.description ??
                    'Deskripsi program akan ditambahkan kemudian.'}
            </p>

            {program.ustadz_name && (
                <p className="mt-3 text-sm text-slate-500">
                    Ustadz:{' '}
                    <span className="font-medium text-slate-700">
                        {program.ustadz_name}
                    </span>
                </p>
            )}

            <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
                <p className="text-sm font-semibold text-[#0f766e]">
                    Rp {program.price.toLocaleString('id-ID')}
                </p>
                <span className="text-xs text-slate-400 transition-colors group-hover:text-[#0f766e]">
                    Lihat detail →
                </span>
            </div>
        </Link>
    );
}

function ProgramCardSkeleton() {
    return (
        <div className="flex animate-pulse flex-col rounded-3xl border border-[#eadcc8] bg-white p-6 shadow-sm">
            <div className="flex flex-wrap gap-2">
                <div className="h-6 w-16 rounded-full bg-slate-200"></div>
                <div className="h-6 w-20 rounded-full bg-slate-200"></div>
            </div>

            <div className="mt-4 h-6 w-3/4 rounded-lg bg-slate-200"></div>
            <div className="mt-2 h-4 w-full rounded-lg bg-slate-200"></div>
            <div className="mt-1 h-4 w-2/3 rounded-lg bg-slate-200"></div>

            <div className="mt-3 h-4 w-32 rounded-lg bg-slate-200"></div>

            <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
                <div className="h-5 w-24 rounded-lg bg-slate-200"></div>
                <div className="h-4 w-20 rounded-lg bg-slate-200"></div>
            </div>
        </div>
    );
}

function Pagination({ paginator }: { paginator: ProgramsPaginator }) {
    if (paginator.last_page <= 1) {
        return null;
    }

    return (
        <nav className="mt-8 flex items-center justify-between rounded-3xl border-t border-[#eadcc8] bg-white px-4 py-3 sm:px-6">
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <p className="text-sm text-slate-600">
                    Menampilkan{' '}
                    <span className="font-medium">{paginator.from ?? 0}</span>{' '}
                    sampai{' '}
                    <span className="font-medium">{paginator.to ?? 0}</span>{' '}
                    dari <span className="font-medium">{paginator.total}</span>{' '}
                    hasil
                </p>
            </div>

            <div className="flex gap-1">
                {paginator.prev_page_url ? (
                    <Link
                        href={paginator.prev_page_url}
                        className="inline-flex items-center rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-500 hover:bg-slate-50"
                    >
                        ← Sebelumnya
                    </Link>
                ) : (
                    <span className="inline-flex items-center rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-300">
                        ← Sebelumnya
                    </span>
                )}

                {paginator.links.slice(1, -1).map((link, index) => (
                    <Link
                        key={index}
                        href={link.url ?? '#'}
                        preserveScroll
                        className={`inline-flex items-center rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
                            link.active
                                ? 'bg-[#0f766e] text-white'
                                : 'border border-slate-300 bg-white text-slate-500 hover:bg-slate-50'
                        }`}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                ))}

                {paginator.next_page_url ? (
                    <Link
                        href={paginator.next_page_url}
                        preserveScroll
                        className="inline-flex items-center rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-500 hover:bg-slate-50"
                    >
                        Selanjutnya →
                    </Link>
                ) : (
                    <span className="inline-flex items-center rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-300">
                        Selanjutnya →
                    </span>
                )}
            </div>
        </nav>
    );
}

function EmptyState() {
    return (
        <section className="rounded-3xl border border-dashed border-[#d8c7ae] bg-white p-12 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                <span className="text-3xl">📚</span>
            </div>
            <h3 className="mt-6 text-xl font-semibold text-slate-900">
                Tidak ada program yang ditemukan
            </h3>
            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-600">
                Coba ubah filter pencarian atau periksa kembali kata kunci yang
                Anda gunakan.
            </p>
        </section>
    );
}

export default function PublicProgramsIndex({
    programs,
    filters,
    categories,
    levels,
}: PublicProgramsIndexProps) {
    const { data, setData, get, processing } = useForm({
        search: filters.search ?? '',
        category: filters.category ?? '',
        level: filters.level ?? '',
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        get('/programs', {
            preserveState: true,
            preserveScroll: true,
        });
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            get('/programs', {
                preserveState: true,
                preserveScroll: true,
            });
        }, 400);

        return () => clearTimeout(timer);
    }, [data.search, get]);

    const handleFilterChange = (key: string, value: string) => {
        setData(key as any, value);
        get('/programs', {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const clearFilters = () => {
        setData({
            search: '',
            category: '',
            level: '',
        });
        get('/programs', {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const hasActiveFilters = data.search || data.category || data.level;

    return (
        <div className="min-h-screen bg-[#f8f5ef] px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
            <AppHead
                title="Program Ngaji Online"
                description="Kumpulan program pembelajaran Al-Qur'an dan studi Islam dari ustadz terverifikasi. Cari berdasarkan kategori, level, dan jadwal batch."
            />
            <div className="mx-auto max-w-7xl space-y-8">
                <Link
                    href="/"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-[#0f766e] focus-visible:ring-2 focus-visible:ring-[#0f766e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f8f5ef] focus-visible:outline-none"
                >
                    <span aria-hidden="true">←</span>
                    Kembali ke Beranda
                </Link>

                {/* Header */}
                <div className="space-y-3 text-center">
                    <p className="text-xs font-semibold tracking-[0.24em] text-[#0f766e] uppercase">
                        Program Pembelajaran
                    </p>
                    <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                        Temukan Program yang Tepat
                    </h1>
                    <p className="mx-auto max-w-2xl text-base text-slate-600">
                        Pelajari Al-Quran dengan bimbingan ustadz yang sudah
                        terverifikasi. Pilih program sesuai dengan level dan
                        kategori yang Anda inginkan.
                    </p>
                </div>

                {/* Search and Filters */}
                <section className="rounded-3xl border border-[#eadcc8] bg-white p-4 shadow-sm sm:p-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid gap-4 sm:grid-cols-12">
                            {/* Search Input */}
                            <div className="sm:col-span-5">
                                <label htmlFor="search" className="sr-only">
                                    Cari program
                                </label>
                                <div className="relative">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <svg
                                            className="h-5 w-5 text-slate-400"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                    <input
                                        id="search"
                                        type="text"
                                        placeholder="Cari program..."
                                        value={data.search}
                                        onChange={(e) =>
                                            setData('search', e.target.value)
                                        }
                                        className="block w-full rounded-xl border border-slate-300 bg-white py-2.5 pr-3 pl-10 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#0f766e] focus:ring-1 focus:ring-[#0f766e] focus:outline-none"
                                    />
                                </div>
                            </div>

                            {/* Category Filter */}
                            <div className="sm:col-span-3">
                                <label htmlFor="category" className="sr-only">
                                    Kategori
                                </label>
                                <select
                                    id="category"
                                    value={data.category}
                                    onChange={(e) =>
                                        handleFilterChange(
                                            'category',
                                            e.target.value,
                                        )
                                    }
                                    className="block w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 focus:border-[#0f766e] focus:ring-1 focus:ring-[#0f766e] focus:outline-none"
                                >
                                    <option value="">Semua Kategori</option>
                                    {categories.map((cat) => (
                                        <option
                                            key={cat.value}
                                            value={cat.value}
                                        >
                                            {cat.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Level Filter */}
                            <div className="sm:col-span-3">
                                <label htmlFor="level" className="sr-only">
                                    Level
                                </label>
                                <select
                                    id="level"
                                    value={data.level}
                                    onChange={(e) =>
                                        handleFilterChange(
                                            'level',
                                            e.target.value,
                                        )
                                    }
                                    className="block w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 focus:border-[#0f766e] focus:ring-1 focus:ring-[#0f766e] focus:outline-none"
                                >
                                    <option value="">Semua Level</option>
                                    {levels.map((level) => (
                                        <option
                                            key={level.value}
                                            value={level.value}
                                        >
                                            {level.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Clear Filters */}
                            <div className="flex items-center justify-end sm:col-span-1">
                                {hasActiveFilters && (
                                    <button
                                        type="button"
                                        onClick={clearFilters}
                                        className="text-sm font-medium text-slate-500 transition-colors hover:text-slate-700"
                                    >
                                        Reset
                                    </button>
                                )}
                            </div>
                        </div>
                    </form>
                </section>

                {/* Results Count */}
                {!processing && programs.total > 0 && (
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-slate-600">
                            Ditemukan{' '}
                            <span className="font-semibold text-slate-900">
                                {programs.total}
                            </span>{' '}
                            program
                        </p>
                    </div>
                )}

                {/* Program Grid */}
                {processing ? (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {[...Array(6)].map((_, i) => (
                            <ProgramCardSkeleton key={i} />
                        ))}
                    </div>
                ) : programs.data.length > 0 ? (
                    <>
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {programs.data.map((program) => (
                                <ProgramCard
                                    key={program.id}
                                    program={program}
                                />
                            ))}
                        </div>

                        <Pagination paginator={programs} />
                    </>
                ) : (
                    <EmptyState />
                )}
            </div>
        </div>
    );
}
