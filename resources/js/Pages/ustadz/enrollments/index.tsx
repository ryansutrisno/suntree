import { router } from '@inertiajs/react';
import { useCallback } from 'react';
import type { ChangeEvent } from 'react';
import AppHead from '@/Components/AppHead';
import UstadzLayout from '@/Layouts/ustadz-layout';

type EnrollmentSantri = {
    id: number;
    name: string;
    email: string;
};

type EnrollmentBatch = {
    id: number;
    name: string;
    status: string;
};

type EnrollmentProgram = {
    id: number;
    title: string;
};

type Enrollment = {
    id: number;
    status: string;
    status_label: string;
    payment_status: string;
    payment_status_label: string;
    amount: number;
    amount_formatted: string;
    enrolled_at: string | null;
    santri: EnrollmentSantri;
    batch: EnrollmentBatch;
    program: EnrollmentProgram;
};

type PaginatedLinks = Array<{
    url: string | null;
    label: string;
    active: boolean;
}>;

type EnrollmentsPayload = {
    data: Enrollment[];
    links: PaginatedLinks;
    current_page: number;
    last_page: number;
    from: number | null;
    to: number | null;
    total: number;
};

type EnrollmentsIndexProps = {
    enrollments: EnrollmentsPayload;
    filters: {
        status: string | null;
        payment_status: string | null;
    };
    statuses: Array<{
        value: string;
        label: string;
    }>;
    paymentStatuses: Array<{
        value: string;
        label: string;
    }>;
};

const statusBadgeClasses: Record<string, string> = {
    pending_payment: 'bg-amber-100 text-amber-700',
    enrolled: 'bg-teal-100 text-teal-800',
    confirmed: 'bg-emerald-100 text-emerald-700',
    cancelled: 'bg-red-100 text-red-700',
    rejected: 'bg-red-100 text-red-700',
};

const paymentBadgeClasses: Record<string, string> = {
    pending: 'bg-amber-100 text-amber-700',
    paid: 'bg-emerald-100 text-emerald-700',
    confirmed: 'bg-emerald-100 text-emerald-700',
    rejected: 'bg-red-100 text-red-700',
};

function getInitials(name: string): string {
    return name
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part.charAt(0).toUpperCase())
        .join('');
}

function formatEnrolledAt(enrolledAt: string | null): string {
    if (!enrolledAt) {
        return 'Not recorded';
    }

    return new Intl.DateTimeFormat('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(new Date(enrolledAt));
}

function StatusBadge({ enrollment }: { enrollment: Enrollment }) {
    const colorClass =
        statusBadgeClasses[enrollment.status] ?? 'bg-slate-100 text-slate-600';

    return (
        <span
            className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${colorClass}`}
        >
            {enrollment.status_label}
        </span>
    );
}

function PaymentStatusBadge({ enrollment }: { enrollment: Enrollment }) {
    const colorClass =
        paymentBadgeClasses[enrollment.payment_status] ??
        'bg-slate-100 text-slate-600';

    return (
        <span
            className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${colorClass}`}
        >
            {enrollment.payment_status_label}
        </span>
    );
}

function SantriAvatar({ name }: { name: string }) {
    const initials = getInitials(name);

    return (
        <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#f8f3eb] text-sm font-bold text-[#0f766e]"
            aria-hidden="true"
        >
            {initials || '?'}
        </span>
    );
}

function EnrollmentRow({ enrollment }: { enrollment: Enrollment }) {
    return (
        <tr className="transition hover:bg-[#f8f3eb]/60">
            <td className="px-4 py-4">
                <div className="flex items-center gap-3">
                    <SantriAvatar name={enrollment.santri.name} />
                    <div className="min-w-0">
                        <p className="truncate font-medium text-slate-900">
                            {enrollment.santri.name}
                        </p>
                        <p className="truncate text-xs text-slate-500">
                            {enrollment.santri.email}
                        </p>
                    </div>
                </div>
            </td>
            <td className="hidden px-4 py-4 md:table-cell">
                <p className="font-medium text-slate-800">{enrollment.program.title}</p>
                <p className="text-xs text-slate-500">{enrollment.batch.name}</p>
            </td>
            <td className="px-4 py-4 text-right font-semibold text-slate-900">
                {enrollment.amount_formatted}
            </td>
            <td className="hidden px-4 py-4 text-slate-600 lg:table-cell">
                {formatEnrolledAt(enrollment.enrolled_at)}
            </td>
            <td className="px-4 py-4">
                <div className="flex flex-wrap items-center gap-1.5">
                    <StatusBadge enrollment={enrollment} />
                    <PaymentStatusBadge enrollment={enrollment} />
                </div>
            </td>
        </tr>
    );
}

function EnrollmentCard({ enrollment }: { enrollment: Enrollment }) {
    return (
        <article className="flex h-full flex-col gap-4 rounded-3xl border border-[#eadcc8] bg-white p-5 shadow-sm transition hover:border-[#0f766e]/50">
            <div className="flex items-center gap-3">
                <SantriAvatar name={enrollment.santri.name} />
                <div className="min-w-0">
                    <p className="truncate font-medium text-slate-900">
                        {enrollment.santri.name}
                    </p>
                    <p className="truncate text-xs text-slate-500">
                        {enrollment.santri.email}
                    </p>
                </div>
            </div>

            <dl className="space-y-2 text-sm">
                <div className="flex items-center justify-between gap-3">
                    <dt className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                        Program
                    </dt>
                    <dd className="text-right text-sm font-medium text-slate-900">
                        {enrollment.program.title}
                    </dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                    <dt className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                        Batch
                    </dt>
                    <dd className="text-right text-sm text-slate-700">
                        {enrollment.batch.name}
                    </dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                    <dt className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                        Amount
                    </dt>
                    <dd className="text-right font-semibold text-slate-900">
                        {enrollment.amount_formatted}
                    </dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                    <dt className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                        Enrolled
                    </dt>
                    <dd className="text-right text-sm text-slate-600">
                        {formatEnrolledAt(enrollment.enrolled_at)}
                    </dd>
                </div>
            </dl>

            <div className="mt-auto flex flex-wrap items-center gap-1.5 border-t border-[#f0e6d2] pt-4">
                <StatusBadge enrollment={enrollment} />
                <PaymentStatusBadge enrollment={enrollment} />
            </div>
        </article>
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
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M19 8v6M22 11h-6" />
                </svg>
            </div>
            <h3 className="mt-4 text-base font-semibold text-slate-900">
                No enrollments yet
            </h3>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
                When santri enroll in your batches, you will see their names,
                payment status, and amounts here.
            </p>
        </div>
    );
}

function Pagination({ enrollments }: { enrollments: EnrollmentsPayload }) {
    const navigate = useCallback((url: string | null) => {
        if (!url) {
            return;
        }

        router.visit(url, {
            preserveState: true,
            preserveScroll: true,
        });
    }, []);

    return (
        <nav
            className="mt-6 flex flex-col items-center gap-4 border-t border-[#f0e6d2] pt-6 sm:flex-row sm:justify-between"
            aria-label="Enrollments pagination"
        >
            <p className="text-xs text-slate-500">
                {enrollments.from ?? 0}&ndash;{enrollments.to ?? 0} of{' '}
                {enrollments.total} enrollments
            </p>
            <ul className="flex flex-wrap items-center gap-1.5">
                {enrollments.links.map((link, index) => (
                    <li key={index}>
                        <button
                            type="button"
                            onClick={() => navigate(link.url)}
                            disabled={link.url === null}
                            className={`inline-flex min-w-9 items-center justify-center rounded-xl px-3 py-2 text-xs font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f766e] ${
                                link.active
                                    ? 'bg-[#0f766e] text-white'
                                    : link.url === null
                                      ? 'cursor-not-allowed text-slate-300'
                                      : 'bg-[#f8f3eb] text-slate-600 hover:bg-[#f0e6d2]'
                            }`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default function EnrollmentsIndex({
    enrollments,
    filters,
    statuses,
    paymentStatuses,
}: EnrollmentsIndexProps) {
    const handleStatusChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const nextStatus = event.target.value;
        const nextPaymentStatus = filters.payment_status ?? '';

        router.visit('/ustadz/enrollments', {
            method: 'get',
            data: {
                ...(nextStatus ? { status: nextStatus } : {}),
                ...(nextPaymentStatus ? { payment_status: nextPaymentStatus } : {}),
            },
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handlePaymentStatusChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const nextPaymentStatus = event.target.value;
        const nextStatus = filters.status ?? '';

        router.visit('/ustadz/enrollments', {
            method: 'get',
            data: {
                ...(nextStatus ? { status: nextStatus } : {}),
                ...(nextPaymentStatus ? { payment_status: nextPaymentStatus } : {}),
            },
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <UstadzLayout
            title="Enrollments"
            description="All santri enrollments across your batches, with payment status at a glance."
        >
            <AppHead
                title="Enrollments"
                description="All santri enrollments in your batches with enrollment and payment statuses."
                noindex
            />

            <section className="rounded-3xl border border-[#eadcc8] bg-white p-6 shadow-sm sm:p-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <h2 className="text-2xl font-semibold text-slate-900">
                            All Enrollments
                        </h2>
                        <p className="mt-1 text-sm text-slate-600">
                            {enrollments.total} enrollment
                            {enrollments.total === 1 ? '' : 's'} in total
                        </p>
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
                        <div>
                            <label
                                htmlFor="enrollment-status-filter"
                                className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.24em] text-slate-500"
                            >
                                Status
                            </label>
                            <select
                                id="enrollment-status-filter"
                                value={filters.status ?? ''}
                                onChange={handleStatusChange}
                                className="block w-full rounded-xl border border-[#eadcc8] bg-[#f8f3eb] px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition focus:border-[#0f766e] focus:ring-[#0f766e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f766e] sm:w-48"
                            >
                                <option value="">All statuses</option>
                                {statuses.map((status) => (
                                    <option key={status.value} value={status.value}>
                                        {status.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label
                                htmlFor="enrollment-payment-status-filter"
                                className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.24em] text-slate-500"
                            >
                                Payment
                            </label>
                            <select
                                id="enrollment-payment-status-filter"
                                value={filters.payment_status ?? ''}
                                onChange={handlePaymentStatusChange}
                                className="block w-full rounded-xl border border-[#eadcc8] bg-[#f8f3eb] px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition focus:border-[#0f766e] focus:ring-[#0f766e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f766e] sm:w-48"
                            >
                                <option value="">All payments</option>
                                {paymentStatuses.map((paymentStatus) => (
                                    <option
                                        key={paymentStatus.value}
                                        value={paymentStatus.value}
                                    >
                                        {paymentStatus.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {enrollments.data.length === 0 ? (
                    <EmptyState />
                ) : (
                    <>
                        {/* Mobile: stacked cards */}
                        <div className="mt-6 grid gap-4 md:hidden">
                            {enrollments.data.map((enrollment) => (
                                <EnrollmentCard
                                    key={enrollment.id}
                                    enrollment={enrollment}
                                />
                            ))}
                        </div>

                        {/* Desktop: table */}
                        <div className="mt-6 hidden md:block overflow-x-auto">
                            <table className="w-full text-left text-sm text-slate-700">
                                <thead className="border-b border-[#eadcc8] text-xs uppercase tracking-wide text-slate-500">
                                    <tr>
                                        <th scope="col" className="px-4 py-3 font-semibold">
                                            Santri
                                        </th>
                                        <th
                                            scope="col"
                                            className="hidden px-4 py-3 font-semibold md:table-cell"
                                        >
                                            Program / Batch
                                        </th>
                                        <th scope="col" className="px-4 py-3 text-right font-semibold">
                                            Amount
                                        </th>
                                        <th
                                            scope="col"
                                            className="hidden px-4 py-3 font-semibold lg:table-cell"
                                        >
                                            Enrolled
                                        </th>
                                        <th scope="col" className="px-4 py-3 font-semibold">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#f0e6d2]">
                                    {enrollments.data.map((enrollment) => (
                                        <EnrollmentRow
                                            key={enrollment.id}
                                            enrollment={enrollment}
                                        />
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <Pagination enrollments={enrollments} />
                    </>
                )}
            </section>
        </UstadzLayout>
    );
}
