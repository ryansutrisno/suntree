import { Head, Link } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import UstadzLayout from '@/Layouts/ustadz-layout';

type Program = {
    id: number;
    title: string;
};

type Batch = {
    id: number;
    program_id: number;
    name: string;
};

type Participant = {
    id: number;
    user_id: number;
    batch_id: number;
    status: string;
    payment_status: string;
    created_at: string;
    user: {
        id: number;
        name: string;
        email: string;
    } | null;
};

type ParticipantsProps = {
    program: Program;
    batch: Batch;
    participants: Participant[];
    statusFilter: string | null;
};

const statusLabels: Record<string, string> = {
    pending_payment: 'Pending Payment',
    enrolled: 'Enrolled',
    confirmed: 'Confirmed',
    cancelled: 'Cancelled',
};

const paymentLabels: Record<string, string> = {
    pending: 'Pending',
    paid: 'Paid',
    failed: 'Failed',
    refunded: 'Refunded',
};

const filterOptions = [
    { value: '', label: 'Semua' },
    { value: 'pending_payment', label: 'Pending Payment' },
    { value: 'enrolled', label: 'Enrolled' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'cancelled', label: 'Cancelled' },
];

export default function Participants({
    program,
    batch,
    participants,
    statusFilter,
}: ParticipantsProps) {
    return (
        <UstadzLayout
            title={`Peserta - ${batch.name}`}
            description="Daftar santri yang terdaftar di batch ini."
        >
            <Head title={`Peserta - ${batch.name}`} />

            <section className="rounded-3xl border border-[#eadcc8] bg-white p-8 shadow-sm">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-semibold text-slate-900">
                            Daftar Peserta
                        </h2>
                        <p className="mt-1 text-sm text-slate-600">
                            Program: {program.title} &middot; Batch: {batch.name}
                        </p>
                    </div>
                    <span className="rounded-full bg-[#f8f3eb] px-3 py-1 text-sm font-semibold text-[#0f766e]">
                        {participants.length} Peserta
                    </span>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                    {filterOptions.map((option) => (
                        <Link
                            key={option.value}
                            href={route('ustadz.participants.index', [program.id, batch.id])}
                            data={option.value ? { status: option.value } : {}}
                            className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
                                (statusFilter ?? '') === option.value
                                    ? 'bg-[#0f766e] text-white'
                                    : 'bg-[#f8f3eb] text-slate-600 hover:bg-[#f0e6d2]'
                            }`}
                        >
                            {option.label}
                        </Link>
                    ))}
                </div>

                {participants.length === 0 ? (
                    <p className="mt-8 text-center text-sm text-slate-500">
                        Belum ada peserta yang terdaftar di batch ini.
                    </p>
                ) : (
                    <div className="mt-6 overflow-x-auto">
                        <table className="w-full text-left text-sm text-slate-700">
                            <thead className="border-b border-[#eadcc8] text-xs uppercase tracking-wide text-slate-500">
                                <tr>
                                    <th className="py-3 pr-4 font-semibold">Nama</th>
                                    <th className="py-3 pr-4 font-semibold">Email</th>
                                    <th className="py-3 pr-4 font-semibold">Status</th>
                                    <th className="py-3 pr-4 font-semibold">Pembayaran</th>
                                    <th className="py-3 pr-4 font-semibold">Tanggal Enroll</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#f0e6d2]">
                                {participants.map((participant) => (
                                    <tr key={participant.id}>
                                        <td className="py-3 pr-4 font-medium text-slate-900">
                                            {participant.user?.name ?? '-'}
                                        </td>
                                        <td className="py-3 pr-4 text-slate-600">
                                            {participant.user?.email ?? '-'}
                                        </td>
                                        <td className="py-3 pr-4">
                                            <span className="rounded-full bg-[#f8f3eb] px-2 py-0.5 text-xs font-semibold text-[#0f766e]">
                                                {statusLabels[participant.status] ?? participant.status}
                                            </span>
                                        </td>
                                        <td className="py-3 pr-4">
                                            <span
                                                className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                                                    participant.payment_status === 'paid'
                                                        ? 'bg-green-100 text-green-700'
                                                        : 'bg-amber-100 text-amber-700'
                                                }`}
                                            >
                                                {paymentLabels[participant.payment_status] ?? participant.payment_status}
                                            </span>
                                        </td>
                                        <td className="py-3 pr-4 text-slate-600">
                                            {new Date(participant.created_at).toLocaleDateString('id-ID', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric',
                                            })}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                <div className="mt-8">
                    <PrimaryButton className="rounded-xl bg-[#0f766e] hover:bg-[#0d655d] focus:bg-[#0d655d] active:bg-[#0a544d]">
                        <Link href={route('ustadz.batches.index', program.id)}>
                            Kembali ke Daftar Batch
                        </Link>
                    </PrimaryButton>
                </div>
            </section>
        </UstadzLayout>
    );
}
