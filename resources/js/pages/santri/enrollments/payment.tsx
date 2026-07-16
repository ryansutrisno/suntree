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

interface BankInstructions {
    bank_name: string;
    account_number: string;
    account_holder: string;
}

type PaymentProps = {
    enrollment: EnrollmentData;
    bankInstructions: BankInstructions;
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

export default function Payment({ enrollment, bankInstructions }: PaymentProps) {
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

                {enrollment.payment_status === 'paid' ? (
                    <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-6 py-8 text-center">
                        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
                            <svg className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                            </svg>
                        </div>
                        <h4 className="text-base font-semibold text-emerald-800">Pembayaran Telah Dikonfirmasi</h4>
                        <p className="mt-1 text-sm text-emerald-600">
                            Pembayaran sebesar {formatCurrency(enrollment.amount)} telah dikonfirmasi.
                        </p>
                    </div>
                ) : enrollment.payment_status === 'rejected' ? (
                    <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-6 py-8 text-center">
                        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                            <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <h4 className="text-base font-semibold text-red-800">Pembayaran Ditolak</h4>
                        <p className="mt-1 text-sm text-red-600">
                            Pembayaran Anda tidak dapat diverifikasi. Silakan hubungi ustadz pengelola program untuk informasi lebih lanjut.
                        </p>
                    </div>
                ) : (
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold text-slate-900">
                            Instruksi Pembayaran Transfer Bank
                        </h3>

                        <div className="mt-4 rounded-2xl border border-[#eadcc8] bg-white p-5 shadow-sm">
                            <div className="space-y-4 text-sm text-slate-600">
                                <p className="text-base font-semibold text-slate-900">
                                    Total yang harus dibayar:{' '}
                                    <span className="text-[#0f766e]">{formatCurrency(enrollment.amount)}</span>
                                </p>

                                <div className="border-t border-[#eadcc8] pt-4">
                                    <p className="text-xs uppercase tracking-wide text-slate-400">Rekening Tujuan</p>
                                    <p className="mt-1.5 text-base font-semibold text-slate-900">{bankInstructions.bank_name}</p>
                                    <p className="mt-1 text-lg font-bold text-[#0f766e]">{bankInstructions.account_number}</p>
                                    <p className="text-sm text-slate-500">a.n. {bankInstructions.account_holder}</p>
                                </div>

                                <p className="text-xs leading-relaxed text-slate-400">
                                    Silakan transfer sesuai jumlah di atas ke rekening berikut, lalu konfirmasi pembayaran Anda akan diverifikasi oleh ustadz pengelola program.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

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
