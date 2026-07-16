import { Link } from '@inertiajs/react';
import SantriLayout from '@/layouts/santri-layout';

interface BatchProgram {
    id: number;
    title: string;
    category: string;
    level: string;
    price: number;
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

interface EnrollmentData {
    id: number;
    user_id: number;
    batch_id: number;
    status: string;
    payment_status: string;
    amount: number;
    payment_method: string | null;
    payment_notes: string | null;
    created_at: string;
    batch: Batch;
}

type PaymentProps = {
    enrollment: EnrollmentData;
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

export default function Payment({ enrollment }: PaymentProps) {
    return (
        <SantriLayout
            title="Pembayaran"
            description="Selesaikan pembayaran untuk mengkonfirmasi pendaftaran."
        >
            <section className="rounded-3xl border border-[#eadcc8] bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">
                    Detail Pembayaran
                </h3>

                <div className="mt-4 space-y-3 text-sm text-slate-600">
                    <p>
                        <span className="font-medium text-slate-700">Program:</span>{' '}
                        {enrollment.batch?.program?.title ?? '-'}
                    </p>
                    <p>
                        <span className="font-medium text-slate-700">Batch:</span>{' '}
                        {enrollment.batch?.name ?? '-'}
                    </p>
                    <p>
                        <span className="font-medium text-slate-700">Tanggal Daftar:</span>{' '}
                        {formatDate(enrollment.created_at)}
                    </p>
                    <p>
                        <span className="font-medium text-slate-700">Status Pendaftaran:</span>{' '}
                        <span className="inline-block rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium capitalize text-yellow-700">
                            {enrollment.status === 'pending_payment'
                                ? 'Menunggu Pembayaran'
                                : enrollment.status}
                        </span>
                    </p>
                    <p>
                        <span className="font-medium text-slate-700">Status Pembayaran:</span>{' '}
                        <span className="inline-block rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium capitalize text-yellow-700">
                            {enrollment.payment_status === 'pending'
                                ? 'Pending'
                                : enrollment.payment_status}
                        </span>
                    </p>
                    <p className="text-base font-semibold text-slate-900">
                        <span className="font-medium text-slate-700">Total Bayar:</span>{' '}
                        {formatCurrency(enrollment.amount)}
                    </p>
                </div>

                <div className="mt-6 rounded-2xl border border-dashed border-[#eadcc8] bg-[#f8f3eb] px-6 py-8 text-center">
                    <p className="text-sm text-slate-500">
 Informasi petunjuk pembayaran akan ditambahkan di sini.
                    </p>
                </div>

                <div className="mt-6">
                    <Link
                        href="/santri/dashboard"
                        className="rounded-xl bg-[#0f766e] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#0c6358]"
                    >
                        Kembali ke Dashboard
                    </Link>
                </div>
            </section>
        </SantriLayout>
    );
}
