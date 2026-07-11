import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import UstadzLayout from '@/layouts/ustadz-layout';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function CreateProgram() {
    const { data, setData, post, errors, processing } = useForm({
        title: '',
        category: '',
        level: '',
        description: '',
        price: '',
        status: 'draft',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('ustadz.programs.store'));
    };

    return (
        <UstadzLayout
            title="Buat Program"
            description="Tambahkan program baru untuk santri Anda."
        >
            <Head title="Buat Program" />

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
                            placeholder="Contoh: Program Tahsin Pemula"
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
                            <option value="">Pilih kategori</option>
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
                            <option value="">Pilih level</option>
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
                            placeholder="Deskripsi program..."
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
                            placeholder="150000"
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
                            Simpan Program
                        </PrimaryButton>
                    </div>
                </form>
            </section>
        </UstadzLayout>
    );
}
