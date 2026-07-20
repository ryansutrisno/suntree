import { Link } from '@inertiajs/react';
import SantriLayout from '@/Layouts/santri-layout';

interface BatchProgram {
    id: number;
    title: string;
    category: string;
    level: string;
}

interface Batch {
    id: number;
    program_id: number;
    name: string;
    starts_at: string;
    ends_at: string;
    status: string;
    program: BatchProgram;
}

interface Enrollment {
    id: number;
    user_id: number;
    batch_id: number;
    status: string;
    payment_status: string;
    amount: number;
    payment_method: string | null;
    created_at: string;
    batch: Batch;
}

type SantriDashboardProps = {
    enrollments: Enrollment[];
};

const paymentStatusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-700',
    paid: 'bg-emerald-100 text-emerald-700',
    rejected: 'bg-red-100 text-red-700',
};

const enrollmentStatusColors: Record<string, string> = {
    pending_payment: 'bg-yellow-100 text-yellow-700',
    confirmed: 'bg-emerald-100 text-emerald-700',
    cancelled: 'bg-red-100 text-red-700',
};

function PaymentBadge({ status }: { status: string }) {
    const colorClass = paymentStatusColors[status] ?? 'bg-slate-100 text-slate-600';

    return (
        <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${colorClass}`}>
            {status === 'paid' ? 'Lunas' : status === 'pending' ? 'Pending' : status === 'rejected' ? 'Ditolak' : status}
        </span>
    );
}

function StatusBadge({ status }: { status: string }) {
    const colorClass = enrollmentStatusColors[status] ?? 'bg-slate-100 text-slate-600';

    return (
        <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${colorClass}`}>
            {status === 'pending_payment' ? 'Pending Payment' : status === 'confirmed' ? 'Dikonfirmasi' : status === 'cancelled' ? 'Dibatalkan' : status}
        </span>
    );
}

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

export default function SantriDashboard({ enrollments }: SantriDashboardProps) {
    return (
        <SantriLayout
            title="Dashboard"
            description="Selamat datang di panel santri."
        >
            <section className="rounded-3xl border border-[#eadcc8] bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-slate-900">Enrollment Saya</h3>
                    <Link
                        href="/santri/batches"
                        className="rounded-xl bg-[#0f766e] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#0c6358]"
                    >
                        Lihat Batch Tersedia
                    </Link>
                </div>

                {enrollments.length > 0 ? (
                    <div className="mt-4 overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="border-b border-[#eadcc8]">
                                    <th className="pb-3 pr-4 font-semibold text-slate-700">Program</th>
                                    <th className="pb-3 pr-4 font-semibold text-slate-700">Batch</th>
                                    <th className="pb-3 pr-4 font-semibold text-slate-700">Status</th>
                                    <th className="pb-3 pr-4 font-semibold text-slate-700">Pembayaran</th>
                                    <th className="pb-3 pr-4 font-semibold text-slate-700">Jumlah</th>
                                    <th className="pb-3 pr-4 font-semibold text-slate-700">Tanggal</th>
                                    <th className="pb-3 font-semibold text-slate-700">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {enrollments.map((enrollment) => (
                                    <tr key={enrollment.id} className="border-b border-[#eadcc8] last:border-b-0">
                                        <td className="py-3 pr-4 text-slate-900">
                                            {enrollment.batch?.program?.title ?? '-'}
                                        </td>
                                        <td className="py-3 pr-4 text-slate-900">
                                            {enrollment.batch?.name ?? '-'}
                                        </td>
                                        <td className="py-3 pr-4">
                                            <StatusBadge status={enrollment.status} />
                                        </td>
                                        <td className="py-3 pr-4">
                                            <PaymentBadge status={enrollment.payment_status} />
                                        </td>
                                        <td className="py-3 pr-4 text-slate-900">
                                            {formatCurrency(enrollment.amount)}
                                        </td>
                                        <td className="py-3 pr-4 text-slate-500">
                                            {formatDate(enrollment.created_at)}
                                        </td>
                                        <td className="py-3">
                                            {enrollment.payment_status === 'pending' ? (
                                                <Link
                                                    href={`/santri/enrollments/${enrollment.id}/payment`}
                                                    className="rounded-xl bg-[#f7d27a] px-3 py-1.5 text-xs font-medium text-[#0f766e] transition hover:bg-[#ecc46a]"
                                                >
                                                    Bayar
                                                </Link>
                                            ) : (
                                                <span className="text-xs text-slate-400">-</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="mt-6 rounded-2xl border border-dashed border-[#eadcc8] px-6 py-12 text-center">
                        <p className="text-sm text-slate-500">
                            Kamu belum memiliki enrollment. Yuk, daftar program tersedia!
                        </p>
                        <Link
                            href="/santri/batches"
                            className="mt-4 inline-block rounded-xl bg-[#0f766e] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#0c6358]"
                        >
                            Lihat Batch Tersedia
                        </Link>
                    </div>
                )}
            </section>
        </SantriLayout>
    );
}
