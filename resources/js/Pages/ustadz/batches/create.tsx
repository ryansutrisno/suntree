import { Head, useForm } from '@inertiajs/react';
import type { FormEventHandler } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import UstadzLayout from '@/Layouts/ustadz-layout';

type Program = {
    id: number;
    title: string;
};

type CreateBatchProps = {
    program: Program;
};

export default function CreateBatch({ program }: CreateBatchProps) {
    const { data, setData, post, errors, processing } = useForm({
        name: '',
        starts_at: '',
        ends_at: '',
        capacity: '',
        schedule_summary: '',
        status: 'draft',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('ustadz.batches.store', program.id));
    };

    return (
        <UstadzLayout
            title="Buat Batch"
            description={`Tambahkan angkatan/cohort baru untuk program: ${program.title}.`}
        >
            <Head title="Buat Batch" />

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
                            placeholder="Contoh: Angkatan 1 - September 2026"
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
                            placeholder="20"
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
                            placeholder="Contoh: Setiap Senin & Rabu, 16:00 - 17:30 WIB"
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
                            Simpan Batch
                        </PrimaryButton>
                    </div>
                </form>
            </section>
        </UstadzLayout>
    );
}
