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
    category: string;
    level: string;
    description: string | null;
    price: number;
    status: string;
};

type EditProgramProps = {
    program: Program;
};

export default function EditProgram({ program }: EditProgramProps) {
    const { data, setData, put, errors, processing } = useForm({
        title: program.title,
        category: program.category,
        level: program.level,
        description: program.description ?? '',
        price: program.price.toString(),
        status: program.status,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('ustadz.programs.update', program.id));
    };

    return (
        <UstadzLayout
            title="Edit Program"
            description="Ubah detail program Anda."
        >
            <Head title="Edit Program" />

            <section className="rounded-3xl border border-[#eadcc8] bg-white p-8 shadow-sm">
                <form onSubmit={submit} className="space-y-6">
                    <div>
                        <InputLabel htmlFor="title" value="Judul Program" />
                        <TextInput
                            id="title"
                            className="mt-1 block w-full rounded-xl"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            required
                            isFocused
                        />
                        <InputError className="mt-2" message={errors.title} />
                    </div>

                    <div>
                        <InputLabel htmlFor="category" value="Kategori" />
                        <select
                            id="category"
                            className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-teal-600 focus:ring-teal-600"
                            value={data.category}
                            onChange={(e) => setData('category', e.target.value)}
                            required
                        >
                            <option value="iqra">Iqra</option>
                            <option value="tajwid">Tajwid</option>
                            <option value="tahsin">Tahsin</option>
                            <option value="tahfidz">Tahfidz</option>
                            <option value="lainnya">Lainnya</option>
                        </select>
                        <InputError className="mt-2" message={errors.category} />
                    </div>

                    <div>
                        <InputLabel htmlFor="level" value="Level" />
                        <select
                            id="level"
                            className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-teal-600 focus:ring-teal-600"
                            value={data.level}
                            onChange={(e) => setData('level', e.target.value)}
                            required
                        >
                            <option value="pemula">Pemula</option>
                            <option value="menengah">Menengah</option>
                            <option value="lanjutan">Lanjutan</option>
                        </select>
                        <InputError className="mt-2" message={errors.level} />
                    </div>

                    <div>
                        <InputLabel htmlFor="description" value="Deskripsi" />
                        <textarea
                            id="description"
                            rows={4}
                            className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-teal-600 focus:ring-teal-600"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                        />
                        <InputError className="mt-2" message={errors.description} />
                    </div>

                    <div>
                        <InputLabel htmlFor="price" value="Harga (Rp)" />
                        <TextInput
                            id="price"
                            type="number"
                            className="mt-1 block w-full rounded-xl"
                            value={data.price}
                            onChange={(e) => setData('price', e.target.value)}
                            required
                            min="0"
                        />
                        <InputError className="mt-2" message={errors.price} />
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
                            <option value="published">Published</option>
                            <option value="archived">Archived</option>
                        </select>
                        <InputError className="mt-2" message={errors.status} />
                    </div>

                    <div className="flex items-center gap-4 pt-4">
                        <PrimaryButton
                            disabled={processing}
                            className="rounded-xl bg-[#0f766e] hover:bg-[#0d655d] focus:bg-[#0d655d] active:bg-[#0a544d]"
                        >
                            Update Program
                        </PrimaryButton>
                    </div>
                </form>
            </section>
        </UstadzLayout>
    );
}
