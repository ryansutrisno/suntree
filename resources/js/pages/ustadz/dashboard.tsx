import UstadzLayout from '@/layouts/ustadz-layout';

type DashboardStats = {
    total_programs: number;
    active_batches: number;
    total_enrollments: number;
    pending_payments: number;
};

type QuickLink = {
    label: string;
    href: string;
};

type UstadzDashboardProps = {
    stats: DashboardStats;
    quickLinks: QuickLink[];
};

export default function UstadzDashboard({ stats, quickLinks }: UstadzDashboardProps) {
    return (
        <UstadzLayout
            title="Dashboard Ustadz"
            description="Ringkasan program dan aktivitas pengelolaan ustadz."
        >
            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {[
                    { label: 'Total Programs', value: stats.total_programs },
                    { label: 'Active Batches', value: stats.active_batches },
                    { label: 'Total Enrollments', value: stats.total_enrollments },
                    { label: 'Pending Payments', value: stats.pending_payments },
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

            <section className="rounded-3xl border border-[#eadcc8] bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">Quick Links</h3>
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                    {quickLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-[#0f766e] hover:text-[#0f766e]"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>
            </section>
        </UstadzLayout>
    );
}