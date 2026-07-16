import { Link } from '@inertiajs/react';
import UstadzLayout from '@/layouts/ustadz-layout';

type DashboardStats = {
    active_programs: number;
    open_ongoing_batches: number;
    confirmed_participants: number;
};

type ProgramItem = {
    id: number;
    title: string;
    status: string;
    category: string;
    level: string;
};

type BatchItem = {
    id: number;
    program_id: number;
    name: string;
    status: string;
    starts_at: string;
    ends_at: string;
    program: { id: number; title: string };
};

type UstadzDashboardProps = {
    stats: DashboardStats;
    programs: ProgramItem[];
    recentBatches: BatchItem[];
};

const statusColors: Record<string, string> = {
    draft: 'bg-slate-100 text-slate-600',
    published: 'bg-emerald-100 text-emerald-700',
    archived: 'bg-amber-100 text-amber-700',
    open: 'bg-blue-100 text-blue-700',
    closed: 'bg-slate-100 text-slate-600',
    ongoing: 'bg-teal-100 text-teal-700',
    completed: 'bg-emerald-100 text-emerald-700',
    cancelled: 'bg-red-100 text-red-700',
};

function StatusBadge({ status }: { status: string }) {
    const colorClass = statusColors[status] ?? 'bg-slate-100 text-slate-600';

    return (
        <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${colorClass}`}>
            {status}
        </span>
    );
}

export default function UstadzDashboard({ stats, programs, recentBatches }: UstadzDashboardProps) {
    return (
        <UstadzLayout
            title="Dashboard Ustadz"
            description="Ringkasan program dan aktivitas pengelolaan ustadz."
        >
            <section className="grid gap-4 md:grid-cols-3">
                {[
                    { label: 'Program Aktif', value: stats.active_programs },
                    { label: 'Batch Open/Ongoing', value: stats.open_ongoing_batches },
                    { label: 'Peserta Terkonfirmasi', value: stats.confirmed_participants },
                ].map((card) => (
                    <article
                        key={card.label}
                        className="rounded-3xl border border-[#eadcc8] bg-white p-5 shadow-sm"
                    >
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#0f766e]">
                            {card.label}
                        </p>
                        <p className="mt-3 text-3xl font-semibold text-slate-900">{card.value}</p>
                    </article>
                ))}
            </section>

            <div className="mt-6 grid gap-6 lg:grid-cols-2">
                <section className="rounded-3xl border border-[#eadcc8] bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-slate-900">Program Saya</h3>
                        <Link
                            href="/ustadz/programs"
                            className="rounded-xl bg-[#0f766e] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#0c6358]"
                        >
                            Buat Program
                        </Link>
                    </div>
                    {programs.length > 0 ? (
                        <ul className="mt-4 space-y-2">
                            {programs.map((program) => (
                                <li key={program.id}>
                                    <Link
                                        href={`/ustadz/programs/${program.id}`}
                                        className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 transition hover:border-[#0f766e]"
                                    >
                                        <div>
                                            <p className="text-sm font-medium text-slate-900">{program.title}</p>
                                            <p className="text-xs text-slate-500">
                                                {program.category} · {program.level}
                                            </p>
                                        </div>
                                        <StatusBadge status={program.status} />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="mt-4 text-sm text-slate-500">Belum ada program.</p>
                    )}
                </section>

                <section className="rounded-3xl border border-[#eadcc8] bg-white p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-slate-900">Batch Terbaru</h3>
                    {recentBatches.length > 0 ? (
                        <ul className="mt-4 space-y-2">
                            {recentBatches.map((batch) => (
                                <li key={batch.id}>
                                    <Link
                                        href={`/ustadz/programs/${batch.program_id}/batches/${batch.id}/participants`}
                                        className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 transition hover:border-[#0f766e]"
                                    >
                                        <div>
                                            <p className="text-sm font-medium text-slate-900">{batch.name}</p>
                                            <p className="text-xs text-slate-500">{batch.program.title}</p>
                                        </div>
                                        <StatusBadge status={batch.status} />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="mt-4 text-sm text-slate-500">Belum ada batch.</p>
                    )}
                </section>
            </div>
        </UstadzLayout>
    );
}