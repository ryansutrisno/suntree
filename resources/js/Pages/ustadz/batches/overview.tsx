import { Link, router } from '@inertiajs/react';
import { useCallback } from 'react';
import type { ChangeEvent } from 'react';
import AppHead from '@/Components/AppHead';
import UstadzLayout from '@/Layouts/ustadz-layout';

type BatchProgram = {
    id: number;
    title: string;
};

type Batch = {
    id: number;
    name: string;
    status: string;
    status_label: string;
    start_date: string | null;
    end_date: string | null;
    schedule_summary: string | null;
    capacity: number;
    enrolled_count: number;
    remaining_slots: number;
    program: BatchProgram;
    participants_url: string;
    edit_url: string;
};

type PaginatedLinks = Array<{
    url: string | null;
    label: string;
    active: boolean;
}>;

type BatchesPayload = {
    data: Batch[];
    links: PaginatedLinks;
    current_page: number;
    last_page: number;
    from: number | null;
    to: number | null;
    total: number;
};

type OverviewProps = {
    batches: BatchesPayload;
    filters: {
        status: string | null;
    };
    statuses: Array<{
        value: string;
        label: string;
    }>;
};

type BatchStatusTone = {
    badge: string;
    bar: string;
};

const statusTones: Record<string, BatchStatusTone> = {
    ongoing: {
        badge: 'bg-teal-100 text-teal-800',
        bar: 'bg-[#0f766e]',
    },
    open: {
        badge: 'bg-[#f7d27a]/40 text-[#8a6d1f]',
        bar: 'bg-[#f7d27a]',
    },
    draft: {
        badge: 'bg-slate-100 text-slate-600',
        bar: 'bg-slate-400',
    },
    closed: {
        badge: 'bg-slate-100 text-slate-600',
        bar: 'bg-slate-400',
    },
    completed: {
        badge: 'bg-emerald-100 text-emerald-700',
        bar: 'bg-emerald-500',
    },
    cancelled: {
        badge: 'bg-red-100 text-red-700',
        bar: 'bg-red-400',
    },
};

function formatDateRange(
    startDate: string | null,
    endDate: string | null,
): string {
    if (!startDate && !endDate) {
        return 'Schedule not set';
    }

    const formatter = new Intl.DateTimeFormat('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });

    if (startDate && endDate) {
        return `${formatter.format(new Date(startDate))} – ${formatter.format(new Date(endDate))}`;
    }

    if (startDate) {
        return `Starts ${formatter.format(new Date(startDate))}`;
    }

    return `Ends ${formatter.format(new Date(endDate as string))}`;
}

function BatchStatusBadge({ batch }: { batch: Batch }) {
    const tone = statusTones[batch.status] ?? {
        badge: 'bg-slate-100 text-slate-600',
        bar: 'bg-slate-400',
    };

    return (
        <span
            className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${tone.badge}`}
        >
            {batch.status_label}
        </span>
    );
}

function BatchCapacityBar({ batch }: { batch: Batch }) {
    const safeCapacity = batch.capacity > 0 ? batch.capacity : 0;
    const safeEnrolled = Math.min(Math.max(batch.enrolled_count, 0), safeCapacity);
    const fillPercentage =
        safeCapacity > 0 ? Math.round((safeEnrolled / safeCapacity) * 100) : 0;
    const tone = statusTones[batch.status]?.bar ?? 'bg-slate-400';

    return (
        <div className="w-full max-w-56">
            <div className="flex items-baseline justify-between gap-2">
                <p className="text-xs font-medium text-slate-600">
                    {batch.enrolled_count} of {batch.capacity} filled
                </p>
                <p className="text-xs font-semibold text-slate-500">
                    {fillPercentage}%
                </p>
            </div>
            <div
                className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-[#f0e6d2]"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={batch.capacity}
                aria-valuenow={batch.enrolled_count}
                aria-label={`Capacity: ${batch.enrolled_count} of ${batch.capacity} filled`}
            >
                <div
                    className={`h-full rounded-full transition-all ${tone}`}
                    style={{ width: `${fillPercentage}%` }}
                />
            </div>
            {batch.remaining_slots > 0 && batch.status === 'open' ? (
                <p className="mt-1 text-xs font-medium text-[#0f766e]">
                    {batch.remaining_slots} slots left
                </p>
            ) : null}
        </div>
    );
}

function BatchCard({ batch }: { batch: Batch }) {
    return (
        <article className="flex h-full flex-col gap-4 rounded-3xl border border-[#eadcc8] bg-white p-5 shadow-sm transition hover:border-[#0f766e]/50">
            <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#0f766e]">
                        {batch.program.title}
                    </p>
                    <h3 className="mt-1 truncate text-lg font-semibold text-slate-900">
                        {batch.name}
                    </h3>
                    <p className="mt-1 text-xs text-slate-500">
                        {formatDateRange(batch.start_date, batch.end_date)}
                    </p>
                </div>
                <BatchStatusBadge batch={batch} />
            </div>

            {batch.schedule_summary ? (
                <p className="text-sm text-slate-600">{batch.schedule_summary}</p>
            ) : null}

            <div className="mt-auto space-y-4">
                <BatchCapacityBar batch={batch} />
                <div className="flex items-center gap-2 border-t border-[#f0e6d2] pt-4">
                    <Link
                        href={batch.participants_url}
                        className="rounded-xl bg-[#0f766e] px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-[#0d655d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f766e]"
                    >
                        Participants
                    </Link>
                    <Link
                        href={batch.edit_url}
                        className="rounded-xl border border-[#eadcc8] bg-[#f8f3eb] px-3.5 py-2 text-xs font-semibold text-slate-700 transition hover:border-[#0f766e]/50 hover:text-[#0f766e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f766e]"
                    >
                        Edit
                    </Link>
                </div>
            </div>
        </article>
    );
}

function BatchRow({ batch }: { batch: Batch }) {
    const tone = statusTones[batch.status] ?? {
        badge: 'bg-slate-100 text-slate-600',
        bar: 'bg-slate-400',
    };

    return (
        <tr className="transition hover:bg-[#f8f3eb]/60">
            <td className="px-4 py-4">
                <div className="flex items-center gap-3">
                    <span
                        className={`hidden h-9 w-1.5 shrink-0 rounded-full lg:block ${tone.bar}`}
                        aria-hidden="true"
                    />
                    <div className="min-w-0">
                        <p className="truncate font-medium text-slate-900">{batch.name}</p>
                        <p className="text-xs text-slate-500">{batch.program.title}</p>
                    </div>
                </div>
            </td>
            <td className="px-4 py-4">
                <BatchStatusBadge batch={batch} />
            </td>
            <td className="hidden px-4 py-4 text-slate-600 md:table-cell">
                {formatDateRange(batch.start_date, batch.end_date)}
            </td>
            <td className="hidden px-4 py-4 lg:table-cell">
                <BatchCapacityBar batch={batch} />
            </td>
            <td className="px-4 py-4">
                <div className="flex items-center gap-2">
                    <Link
                        href={batch.participants_url}
                        className="text-xs font-semibold text-[#0f766e] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f766e]"
                    >
                        Participants
                    </Link>
                    <span className="text-[#eadcc8]" aria-hidden="true">
                        ·
                    </span>
                    <Link
                        href={batch.edit_url}
                        className="text-xs font-semibold text-slate-500 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f766e]"
                    >
                        Edit
                    </Link>
                </div>
            </td>
        </tr>
    );
}

function EmptyState() {
    return (
        <div className="mt-6 rounded-3xl border border-dashed border-[#d6c3a5] bg-[#f8f3eb]/60 px-6 py-14 text-center">
            <div
                className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm"
                aria-hidden="true"
            >
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-7 w-7 text-[#0f766e]"
                >
                    <path d="M8 2v4M16 2v4" />
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <path d="M3 10h18M9 16l2 2 4-4" />
                </svg>
            </div>
            <h3 className="mt-4 text-base font-semibold text-slate-900">
                No batches yet
            </h3>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
                Once you add batches to your programs, they will show up here with
                their schedule and filled slots.
            </p>
        </div>
    );
}

type PaginationLink = PaginatedLinks[number];

function Pagination({ batches }: { batches: BatchesPayload }) {
    const navigate = useCallback((url: string | null) => {
        if (!url) {
            return;
        }

        router.visit(url, {
            preserveState: true,
            preserveScroll: true,
        });
    }, []);

    const paginationLinkClasses = (link: PaginationLink) =>
        `inline-flex min-w-9 items-center justify-center rounded-xl px-3 py-2 text-xs font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f766e] ${
            link.active
                ? 'bg-[#0f766e] text-white'
                : link.url === null
                  ? 'cursor-not-allowed text-slate-300'
                  : 'bg-[#f8f3eb] text-slate-600 hover:bg-[#f0e6d2]'
        }`;

    return (
        <nav
            className="mt-6 flex flex-col items-center gap-4 border-t border-[#f0e6d2] pt-6 sm:flex-row sm:justify-between"
            aria-label="Batches pagination"
        >
            <p className="text-xs text-slate-500">
                {batches.from ?? 0}&ndash;{batches.to ?? 0} of {batches.total} batches
            </p>
            <ul className="flex flex-wrap items-center gap-1.5">
                {batches.links.map((link, index) => {
                    const isNavArrow = index === 0 || index === batches.links.length - 1;
                    const label = isNavArrow
                        ? (link.label === '&laquo; Previous' ? 'Previous' : 'Next')
                        : link.label;

                    return (
                        <li key={index}>
                            <button
                                type="button"
                                onClick={() => navigate(link.url)}
                                disabled={link.url === null}
                                className={paginationLinkClasses(link)}
                                dangerouslySetInnerHTML={{
                                    __html: isNavArrow ? label : link.label,
                                }}
                            />
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}

export default function BatchesOverview({
    batches,
    filters,
    statuses,
}: OverviewProps) {
    const handleStatusChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;

        router.get('/ustadz/batches', value ? { status: value } : {}, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <UstadzLayout
            title="Batches Overview"
            description="All batches across your programs: schedules, capacity, and current status."
        >
            <AppHead
                title="Batches Overview"
                description="All batches across your programs with schedules, filled slots, and statuses."
                noindex
            />

            <section className="rounded-3xl border border-[#eadcc8] bg-white p-6 shadow-sm sm:p-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="text-2xl font-semibold text-slate-900">
                            All Batches
                        </h2>
                        <p className="mt-1 text-sm text-slate-600">
                            {batches.total} batch{batches.total === 1 ? '' : 'es'} in total
                        </p>
                    </div>
                    <div>
                        <label
                            htmlFor="batch-status-filter"
                            className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.24em] text-slate-500"
                        >
                            Status
                        </label>
                        <select
                            id="batch-status-filter"
                            value={filters.status ?? ''}
                            onChange={handleStatusChange}
                            className="block w-full rounded-xl border border-[#eadcc8] bg-[#f8f3eb] px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition focus:border-[#0f766e] focus:ring-[#0f766e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f766e] sm:w-56"
                        >
                            <option value="">All statuses</option>
                            {statuses.map((status) => (
                                <option key={status.value} value={status.value}>
                                    {status.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {batches.data.length === 0 ? (
                    <EmptyState />
                ) : (
                    <>
                        {/* Mobile: stacked cards */}
                        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:hidden">
                            {batches.data.map((batch) => (
                                <BatchCard key={batch.id} batch={batch} />
                            ))}
                        </div>

                        {/* Desktop: table */}
                        <div className="mt-6 hidden xl:block overflow-x-auto">
                            <table className="w-full text-left text-sm text-slate-700">
                                <thead className="border-b border-[#eadcc8] text-xs uppercase tracking-wide text-slate-500">
                                    <tr>
                                        <th scope="col" className="px-4 py-3 font-semibold">
                                            Batch
                                        </th>
                                        <th scope="col" className="px-4 py-3 font-semibold">
                                            Status
                                        </th>
                                        <th
                                            scope="col"
                                            className="hidden px-4 py-3 font-semibold md:table-cell"
                                        >
                                            Schedule
                                        </th>
                                        <th
                                            scope="col"
                                            className="hidden px-4 py-3 font-semibold lg:table-cell"
                                        >
                                            Capacity
                                        </th>
                                        <th scope="col" className="px-4 py-3 font-semibold">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#f0e6d2]">
                                    {batches.data.map((batch) => (
                                        <BatchRow key={batch.id} batch={batch} />
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <Pagination batches={batches} />
                    </>
                )}
            </section>
        </UstadzLayout>
    );
}
