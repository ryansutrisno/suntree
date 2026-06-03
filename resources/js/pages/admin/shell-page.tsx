import AdminLayout from '@/layouts/admin-layout';

type ShellState = {
    title: string;
    description: string;
};

export type AdminShellProps = {
    shell: {
        title: string;
        description: string;
        emptyState: ShellState;
    };
};

export default function AdminShellPage({ shell }: AdminShellProps) {
    return (
        <AdminLayout title={shell.title} description={shell.description}>
            <section className="rounded-3xl border border-dashed border-[#d8c7ae] bg-white p-8 text-center shadow-sm">
                <h3 className="text-xl font-semibold text-slate-900">{shell.emptyState.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{shell.emptyState.description}</p>
            </section>
        </AdminLayout>
    );
}
