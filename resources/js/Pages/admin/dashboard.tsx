import AdminLayout from '@/Layouts/admin-layout';

type DashboardStats = {
    total_users: number;
    verified_ustadz: number;
    total_programs: number;
    pending_payments: number;
};

type QuickLink = {
    label: string;
    href: string;
};

type AdminDashboardProps = {
    stats: DashboardStats;
    quickLinks: QuickLink[];
};

export default function AdminDashboard({ stats, quickLinks }: AdminDashboardProps) {
    return (
        <AdminLayout
            title="Dashboard Admin"
            description="Ringkasan akses dan akses cepat untuk pengelolaan admin."
        >
            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {[
                    { label: 'Total Users', value: stats.total_users },
                    { label: 'Verified Ustadz', value: stats.verified_ustadz },
                    { label: 'Total Programs', value: stats.total_programs },
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
        </AdminLayout>
    );
}
