import AdminLayout from '@/layouts/admin-layout';

export default function AdminDashboard() {
    return (
        <AdminLayout
            title="Dashboard Admin"
            description="Pondasi akses admin sudah aktif. Task berikutnya tinggal menambahkan statistik, CRUD utama, dan approval flow di atas shell ini."
        >
            <section className="grid gap-4 md:grid-cols-3">
                {[
                    {
                        label: 'Access Guard',
                        value: 'Aktif',
                        note: 'Guest diarahkan ke login, non-admin ditolak.',
                    },
                    {
                        label: 'Admin Namespace',
                        value: '/admin',
                        note: 'Route group siap dipakai task dashboard dan CRUD.',
                    },
                    {
                        label: 'Shell Layout',
                        value: 'Siap',
                        note: 'Sidebar + content header mengikuti ritme mockup.',
                    },
                ].map((card) => (
                    <article
                        key={card.label}
                        className="rounded-3xl border border-[#eadcc8] bg-white p-5 shadow-sm"
                    >
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#0f766e]">
                            {card.label}
                        </p>
                        <p className="mt-3 text-3xl font-semibold text-slate-900">{card.value}</p>
                        <p className="mt-3 text-sm leading-6 text-slate-600">{card.note}</p>
                    </article>
                ))}
            </section>
        </AdminLayout>
    );
}
