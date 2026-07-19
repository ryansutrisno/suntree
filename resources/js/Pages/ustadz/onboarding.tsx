import { Transition } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import type { FormEventHandler } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

type UstadzProfile = {
    display_name: string;
    bio: string | null;
    location: string | null;
    whatsapp: string | null;
    youtube_link: string | null;
    is_verified: boolean;
};

type OnboardingProps = {
    profile: UstadzProfile;
    status?: string;
};

export default function UstadzOnboarding({ profile, status }: OnboardingProps) {
    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            display_name: profile.display_name,
            bio: profile.bio ?? '',
            location: profile.location ?? '',
            whatsapp: profile.whatsapp ?? '',
            youtube_link: profile.youtube_link ?? '',
        });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        patch(route('ustadz.onboarding.update'));
    };

    return (
        <>
            <Head title="Lengkapi Profil Ustadz" />
            <div className="min-h-screen bg-[#f8f5ef] px-6 py-12 text-slate-900">
                <div className="mx-auto max-w-2xl space-y-8">
                    <header className="text-center">
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#0f766e]">
                            Onboarding Ustadz
                        </p>
                        <h1 className="mt-3 text-3xl font-semibold">
                            Lengkapi Profil Anda
                        </h1>
                        <p className="mt-2 text-sm text-slate-600">
                            Silakan lengkapi data profil ustadz Anda untuk mulai
                            mengajar di Pojok Santri ID.
                        </p>
                    </header>

                    <section className="rounded-3xl border border-[#eadcc8] bg-white p-8 shadow-sm">
                        <div className="mb-6 flex items-center gap-3">
                            <span
                                className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${profile.is_verified ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}
                            >
                                {profile.is_verified ? '✓ Terverifikasi' : '⏳ Menunggu Verifikasi'}
                            </span>
                        </div>

                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <InputLabel
                                    htmlFor="display_name"
                                    value="Nama Lengkap"
                                />
                                <TextInput
                                    id="display_name"
                                    className="mt-1 block w-full rounded-xl"
                                    value={data.display_name}
                                    onChange={(e) =>
                                        setData('display_name', e.target.value)
                                    }
                                    required
                                    isFocused
                                    autoComplete="name"
                                    placeholder="Nama lengkap ustadz"
                                />
                                <InputError
                                    className="mt-2"
                                    message={errors.display_name}
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="bio"
                                    value="Bio / Deskripsi"
                                />
                                <textarea
                                    id="bio"
                                    rows={4}
                                    className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-teal-600 focus:ring-teal-600 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                                    value={data.bio}
                                    onChange={(e) => setData('bio', e.target.value)}
                                    placeholder="Ceritakan tentang diri Anda, pendidikan, dan pengalaman mengajar..."
                                />
                                <InputError className="mt-2" message={errors.bio} />
                            </div>

                            <div>
                                <InputLabel htmlFor="location" value="Lokasi" />
                                <TextInput
                                    id="location"
                                    className="mt-1 block w-full rounded-xl"
                                    value={data.location}
                                    onChange={(e) => setData('location', e.target.value)}
                                    placeholder="Contoh: Jakarta, Indonesia"
                                />
                                <InputError
                                    className="mt-2"
                                    message={errors.location}
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="whatsapp"
                                    value="Nomor WhatsApp"
                                />
                                <TextInput
                                    id="whatsapp"
                                    className="mt-1 block w-full rounded-xl"
                                    value={data.whatsapp}
                                    onChange={(e) => setData('whatsapp', e.target.value)}
                                    placeholder="Contoh: 628123456789"
                                />
                                <p className="mt-1 text-xs text-slate-500">
                                    Nomor ini akan digunakan untuk komunikasi
                                    dengan santri.
                                </p>
                                <InputError
                                    className="mt-2"
                                    message={errors.whatsapp}
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="youtube_link"
                                    value="Link YouTube (Opsional)"
                                />
                                <TextInput
                                    id="youtube_link"
                                    type="url"
                                    className="mt-1 block w-full rounded-xl"
                                    value={data.youtube_link}
                                    onChange={(e) =>
                                        setData('youtube_link', e.target.value)
                                    }
                                    placeholder="https://www.youtube.com/@channel_ustadz"
                                />
                                <p className="mt-1 text-xs text-slate-500">
                                    Link channel YouTube untuk menampilkan video
                                    pengajian Anda.
                                </p>
                                <InputError
                                    className="mt-2"
                                    message={errors.youtube_link}
                                />
                            </div>

                            <div className="flex items-center gap-4 pt-4">
                                <PrimaryButton
                                    disabled={processing}
                                    className="rounded-xl bg-[#0f766e] hover:bg-[#0d655d] focus:bg-[#0d655d] active:bg-[#0a544d]"
                                >
                                    Simpan Profil
                                </PrimaryButton>

                                <Transition
                                    show={recentlySuccessful || !!status}
                                    enter="transition ease-in-out"
                                    enterFrom="opacity-0"
                                    leave="transition ease-in-out"
                                    leaveTo="opacity-0"
                                >
                                    <p className="text-sm font-medium text-[#0f766e]">
                                        {status || 'Tersimpan.'}
                                    </p>
                                </Transition>
                            </div>

                            {!profile.is_verified && (
                                <div className="mt-4 rounded-xl bg-yellow-50 p-4 text-sm">
                                    <p className="font-medium text-yellow-800">
                                        ℹ️ Catatan:
                                    </p>
                                    <p className="mt-1 text-yellow-700">
                                        Setelah menyimpan profil, tim admin akan
                                        memverifikasi data Anda. Status
                                        verifikasi akan muncul di halaman ini.
                                    </p>
                                </div>
                            )}
                        </form>
                    </section>
                </div>
            </div>
        </>
    );
}
