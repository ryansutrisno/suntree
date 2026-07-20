import { Link, usePage } from '@inertiajs/react';
import AdminLayout from '@/Layouts/admin-layout';
import type { AdminShellProps } from '@/Pages/admin/shell-page';

type PaymentUser = {
    id: number;
    name: string;
};

type PaymentProgram = {
    id: number;
    title: string;
};

type PaymentBatch = {
    id: number;
    program_id: number;
    name: string;
    program: PaymentProgram;
};

type Payment = {
    id: number;
    user_id: number;
    batch_id: number;
    amount: number;
    payment_method: string | null;
    payment_notes: string | null;
    created_at: string;
    user: PaymentUser;
    batch: PaymentBatch;
};

type AdminPaymentsProps = AdminShellProps & {
    payments: Payment[];
};

function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
}

function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

export default function PaymentsIndex({ shell, payments }: AdminPaymentsProps) {
    const { props } = usePage();
    const flashStatus = props.status as string | undefined;

    return (
        <AdminLayout title={shell.title} description={shell.description}>
            {flashStatus ? (
                <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-medium text-emerald-800 shadow-sm">
                    {flashStatus}
                </div>
            ) : null}

            {payments.length === 0 ? (
                <section className="rounded-3xl border border-dashed border-[#d8c7ae] bg-white p-8 text-center shadow-sm">
                    <h3 className="text-xl font-semibold text-slate-900">{shell.emptyState.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{shell.emptyState.description}</p>
                </section>
            ) : (
                <section className="rounded-3xl border border-[#eadcc8] bg-white p-6 shadow-sm">
                    <div className="space-y-4">
                        {payments.map((payment) => (
                            <article
                                key={payment.id}
                                className="flex flex-col gap-4 rounded-2xl border border-slate-200 p-4 md:flex-row md:items-center md:justify-between"
                            >
                                <div className="space-y-1">
                                    <h3 className="text-lg font-semibold text-slate-900">
                                        {payment.user.name}
                                    </h3>
                                    <p className="text-sm text-slate-600">
                                        {payment.batch.program.title} &middot; {payment.batch.name}
                                    </p>
                                    <p className="text-sm font-semibold text-[#0f766e]">
                                        {formatCurrency(payment.amount)}
                                    </p>
                                    {payment.payment_method ? (
                                        <p className="text-xs text-slate-500">
                                            Metode: {payment.payment_method}
                                        </p>
                                    ) : null}
                                    {payment.payment_notes ? (
                                        <p className="text-xs text-slate-500">
                                            Catatan: {payment.payment_notes}
                                        </p>
                                    ) : null}
                                    <p className="text-xs text-slate-400">
                                        Didaftarkan: {formatDate(payment.created_at)}
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-3">
                                    <Link
                                        href={`/admin/payments/${payment.id}/confirm`}
                                        method="patch"
                                        as="button"
                                        className="rounded-full bg-[#0f766e] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#115e59]"
                                    >
                                        Konfirmasi
                                    </Link>

                                    <Link
                                        href={`/admin/payments/${payment.id}/reject`}
                                        method="patch"
                                        as="button"
                                        className="rounded-full border border-red-300 px-4 py-2 text-sm font-semibold text-red-700 transition hover:border-red-400 hover:text-red-900"
                                    >
                                        Tolak
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
            )}
        </AdminLayout>
    );
}
