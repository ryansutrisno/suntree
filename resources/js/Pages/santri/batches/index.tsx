import { Link, router } from '@inertiajs/react';
import SantriLayout from '@/Layouts/santri-layout';

interface Program {
    id: number;
    title: string;
    description: string;
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
    capacity: number;
    schedule_summary: string | null;
    program: Program;
}

type BatchIndexProps = {
    batches: Batch[];
    enrolledBatchIds: number[];
};

function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
}

export default function BatchIndex({ batches, enrolledBatchIds }: BatchIndexProps) {
    function handleEnroll(batchId: number) {
        router.post(
            '/santri/enrollments',
            { batch_id: batchId },
            {
                preserveScroll: true,
                onError: (errors) => {
                    alert(errors.batch_id ?? 'Terjadi kesalahan.');
                },
            },
        );
    }

    return (
        <SantriLayout
            title="Batch Tersedia"
            description="Pilih batch program yang ingin kamu ikuti."
        >
            {batches.length === 0 ? (
                <section className="rounded-3xl border border-[#eadcc8] bg-white p-6 shadow-sm">
                    <div className="rounded-2xl border border-dashed border-[#eadcc8] px-6 py-12 text-center">
                        <p className="text-sm text-slate-500">
                            Belum ada batch yang tersedia saat ini.
                        </p>
                    </div>
                </section>
            ) : (
                <div className="grid gap-4 md:grid-cols-2">
                    {batches.map((batch) => {
                        const isEnrolled = enrolledBatchIds.includes(batch.id);

                        return (
                            <article
                                key={batch.id}
                                className="rounded-3xl border border-[#eadcc8] bg-white p-6 shadow-sm"
                            >
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="text-lg font-semibold text-slate-900">
                                            {batch.program.title}
                                        </h3>
                                        <p className="mt-0.5 text-xs font-medium text-[#0f766e]">
                                            {batch.program.category} &middot; {batch.program.level}
                                        </p>
                                    </div>
                                    {isEnrolled ? (
                                        <span className="inline-block rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
                                            Sudah Terdaftar
                                        </span>
                                    ) : null}
                                </div>

                                <div className="mt-4 space-y-2 text-sm text-slate-600">
                                    <p>
                                        <span className="font-medium text-slate-700">Batch:</span>{' '}
                                        {batch.name}
                                    </p>
                                    {batch.schedule_summary ? (
                                        <p>
                                            <span className="font-medium text-slate-700">
                                                Jadwal:
                                            </span>{' '}
                                            {batch.schedule_summary}
                                        </p>
                                    ) : null}
                                    <p>
                                        <span className="font-medium text-slate-700">Mulai:</span>{' '}
                                        {formatDate(batch.starts_at)}
                                    </p>
                                    <p>
                                        <span className="font-medium text-slate-700">Selesai:</span>{' '}
                                        {formatDate(batch.ends_at)}
                                    </p>
                                    <p>
                                        <span className="font-medium text-slate-700">
                                            Kapasitas:
                                        </span>{' '}
                                        {batch.capacity} peserta
                                    </p>
                                    <p>
                                        <span className="font-medium text-slate-700">Biaya:</span>{' '}
                                        {batch.program.price > 0
                                            ? formatCurrency(batch.program.price)
                                            : 'Gratis'}
                                    </p>
                                </div>

                                {!isEnrolled ? (
                                    <button
                                        type="button"
                                        onClick={() => handleEnroll(batch.id)}
                                        className="mt-5 w-full rounded-xl bg-[#0f766e] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#0c6358]"
                                    >
                                        Daftar Sekarang
                                    </button>
                                ) : null}
                            </article>
                        );
                    })}
                </div>
            )}

            <section className="rounded-3xl border border-[#eadcc8] bg-white p-6 shadow-sm">
                <Link
                    href="/santri/dashboard"
                    className="text-sm font-semibold text-[#0f766e] hover:underline"
                >
                    &larr; Kembali ke Dashboard
                </Link>
            </section>
        </SantriLayout>
    );
}
