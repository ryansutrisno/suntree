import { Head, Link } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import UstadzLayout from '@/layouts/ustadz-layout';

type Program = {
    id: number;
    title: string;
};

type Batch = {
    id: number;
    program_id: number;
    name: string;
    starts_at: string | null;
    ends_at: string | null;
    capacity: number;
    status: string;
    schedule_summary: string | null;
};

type BatchIndexProps = {
    program: Program;
    batches: Batch[];
};

const statusLabels: Record<string, string> = {
    draft: 'Draft',
    open: 'Open',
    closed: 'Closed',
    ongoing: 'Ongoing',
    completed: 'Completed',
    cancelled: 'Cancelled',
};

export default function BatchIndex({ program, batches }: BatchIndexProps) {
    return (
        <UstadzLayout
            title={`Batch - ${program.title}`}
            description="Kelola angkatan/cohort untuk program ini."
        >
            <Head title={`Batch - ${program.title}`} />

            <section className="rounded-3xl border border-[#eadcc8] bg-white p-8 shadow-sm">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-semibold text-slate-900">
                            Daftar Batch
                        </h2>
                        <p className="mt-1 text-sm text-slate-600">
                            Program: {program.title}
                        </p>
                    </div>
                    <Link
                        href={route('ustadz.batches.create', program.id)}
                        className="rounded-xl bg-[#0f766e] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#0d655d]"
                    >
                        Tambah Batch
                    </Link>
                </div>

                {batches.length === 0 ? (
                    <p className="mt-8 text-center text-sm text-slate-500">
                        Belum ada batch untuk program ini.
                    </p>
                ) : (
                    <div className="mt-6 overflow-x-auto">
                        <table className="w-full text-left text-sm text-slate-700">
                            <thead className="border-b border-[#eadcc8] text-xs uppercase tracking-wide text-slate-500">
                                <tr>
                                    <th className="py-3 pr-4 font-semibold">Nama</th>
                                    <th className="py-3 pr-4 font-semibold">Status</th>
                                    <th className="py-3 pr-4 font-semibold">Mulai</th>
                                    <th className="py-3 pr-4 font-semibold">Selesai</th>
                                    <th className="py-3 pr-4 font-semibold">Kapasitas</th>
                                    <th className="py-3 pr-4 font-semibold">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#f0e6d2]">
                                {batches.map((batch) => (
                                    <tr key={batch.id}>
                                        <td className="py-3 pr-4 font-medium text-slate-900">
                                            {batch.name}
                                        </td>
                                        <td className="py-3 pr-4">
                                            <span className="rounded-full bg-[#f8f3eb] px-2 py-0.5 text-xs font-semibold text-[#0f766e]">
                                                {statusLabels[batch.status] ?? batch.status}
                                            </span>
                                        </td>
                                        <td className="py-3 pr-4 text-slate-600">
                                            {batch.starts_at
                                                ? new Date(batch.starts_at).toLocaleDateString('id-ID')
                                                : '-'}
                                        </td>
                                        <td className="py-3 pr-4 text-slate-600">
                                            {batch.ends_at
                                                ? new Date(batch.ends_at).toLocaleDateString('id-ID')
                                                : '-'}
                                        </td>
                                        <td className="py-3 pr-4 text-slate-600">
                                            {batch.capacity}
                                        </td>
                                        <td className="py-3 pr-4">
                                            <div className="flex items-center gap-3">
                                                <Link
                                                    href={route('ustadz.batches.edit', [program.id, batch.id])}
                                                    className="text-xs font-semibold text-[#0f766e] hover:underline"
                                                >
                                                    Edit
                                                </Link>
                                                <Link
                                                    href={route('ustadz.participants.index', [program.id, batch.id])}
                                                    className="text-xs font-semibold text-slate-500 hover:underline"
                                                >
                                                    Peserta
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                <div className="mt-8">
                    <PrimaryButton
                        className="rounded-xl bg-[#0f766e] hover:bg-[#0d655d] focus:bg-[#0d655d] active:bg-[#0a544d]"
                    >
                        <Link href={route('ustadz.dashboard')}>Kembali ke Dashboard</Link>
                    </PrimaryButton>
                </div>
            </section>
        </UstadzLayout>
    );
}
