import { Head, useForm } from '@inertiajs/react';
import type { FormEventHandler } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
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

type EditBatchProps = {
    program: Program;
    batch: Batch;
};

const toInputValue = (value: string | null): string => {
    if (!value) {
        return '';
    }

    return new Date(value).toISOString().slice(0, 16);
};

export default function EditBatch({ program, batch }: EditBatchProps) {
    const { data, setData, put, errors, processing } = useForm({
        name: batch.name,
        starts_at: toInputValue(batch.starts_at),
        ends_at: toInputValue(batch.ends_at),
        capacity: batch.capacity.toString(),
        schedule_summary: batch.schedule_summary ?? '',
        status: batch.status,
    });

    const statusForm = useForm({
        status: batch.status,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('ustadz.batches.update', [program.id, batch.id]));
    };

    const submitStatus: FormEventHandler = (e) => {
        e.preventDefault();
        statusForm.post(route('ustadz.batches.status', [program.id, batch.id]));
    };

    return (
        <UstadzLayout
            title="Edit Batch"
            description={`Ubah detail batch untuk program: ${program.title}.`}
        >
            <Head title="Edit Batch" />

            <section className="rounded-3xl border border-[#eadcc8] bg-white p-8 shadow-sm">
                <form onSubmit={submit} className="space-y-6">
                    <div>
                        <InputLabel htmlFor="name" value="Nama Batch" />
                        <TextInput
                            id="name"
                            className="mt-1 block w-full rounded-xl"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                            isFocused
                        />
                        <InputError className="mt-2" message={errors.name} />
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                        <div>
                            <InputLabel htmlFor="starts_at" value="Tanggal Mulai" />
                            <TextInput
                                id="starts_at"
                                type="datetime-local"
                                className="mt-1 block w-full rounded-xl"
                                value={data.starts_at}
                                onChange={(e) => setData('starts_at', e.target.value)}
                                required
                            />
                            <InputError className="mt-2" message={errors.starts_at} />
                        </div>

                        <div>
                            <InputLabel htmlFor="ends_at" value="Tanggal Selesai" />
                            <TextInput
                                id="ends_at"
                                type="datetime-local"
                                className="mt-1 block w-full rounded-xl"
                                value={data.ends_at}
                                onChange={(e) => setData('ends_at', e.target.value)}
                                required
                            />
                            <InputError className="mt-2" message={errors.ends_at} />
                        </div>
                    </div>

                    <div>
                        <InputLabel htmlFor="capacity" value="Kapasitas" />
                        <TextInput
                            id="capacity"
                            type="number"
                            className="mt-1 block w-full rounded-xl"
                            value={data.capacity}
                            onChange={(e) => setData('capacity', e.target.value)}
                            required
                            min="1"
                        />
                        <InputError className="mt-2" message={errors.capacity} />
                    </div>

                    <div>
                        <InputLabel htmlFor="schedule_summary" value="Ringkasan Jadwal" />
                        <textarea
                            id="schedule_summary"
                            rows={3}
                            className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-teal-600 focus:ring-teal-600"
                            value={data.schedule_summary}
                            onChange={(e) => setData('schedule_summary', e.target.value)}
                        />
                        <InputError className="mt-2" message={errors.schedule_summary} />
                    </div>

                    <div>
                        <InputLabel htmlFor="status" value="Status" />
                        <select
                            id="status"
                            className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-teal-600 focus:ring-teal-600"
                            value={data.status}
                            onChange={(e) => setData('status', e.target.value)}
                            required
                        >
                            <option value="draft">Draft</option>
                            <option value="open">Open</option>
                            <option value="closed">Closed</option>
                            <option value="ongoing">Ongoing</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                        <InputError className="mt-2" message={errors.status} />
                    </div>

                    <div className="flex items-center gap-4 pt-4">
                        <PrimaryButton
                            disabled={processing}
                            className="rounded-xl bg-[#0f766e] hover:bg-[#0d655d] focus:bg-[#0d655d] active:bg-[#0a544d]"
                        >
                            Update Batch
                        </PrimaryButton>
                    </div>
                </form>
            </section>

            <section className="rounded-3xl border border-[#eadcc8] bg-white p-8 shadow-sm">
                <h2 className="text-lg font-semibold text-slate-900">
                    Transisi Status
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                    Ubah status batch secara manual (Draft, Open, Closed, Ongoing, Completed, Cancelled).
                </p>

                <form onSubmit={submitStatus} className="mt-6 space-y-4">
                    <div>
                        <InputLabel htmlFor="status-transition" value="Status Baru" />
                        <select
                            id="status-transition"
                            className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-teal-600 focus:ring-teal-600"
                            value={statusForm.data.status}
                            onChange={(e) => statusForm.setData('status', e.target.value)}
                            required
                        >
                            <option value="draft">Draft</option>
                            <option value="open">Open</option>
                            <option value="closed">Closed</option>
                            <option value="ongoing">Ongoing</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                        <InputError className="mt-2" message={statusForm.errors.status} />
                    </div>

                    <div className="flex items-center gap-4 pt-2">
                        <PrimaryButton
                            disabled={statusForm.processing}
                            className="rounded-xl bg-[#0f766e] hover:bg-[#0d655d] focus:bg-[#0d655d] active:bg-[#0a544d]"
                        >
                            Ubah Status
                        </PrimaryButton>
                    </div>
                </form>
            </section>
        </UstadzLayout>
    );
}
