type Program = {
    id: number;
    title: string;
    description: string | null;
    price: number;
};

type Ustadz = {
    id: number;
    display_name: string;
    bio: string | null;
};

type Batch = {
    id: number;
    name: string;
    starts_at: string | null;
    ends_at: string | null;
    capacity: number;
};

type PublicProgramDetailProps = {
    program: Program;
    ustadz: Ustadz;
    batches: Batch[];
};

export default function PublicProgramDetailShow({ program, ustadz, batches }: PublicProgramDetailProps) {
    return (
        <div className="min-h-screen bg-[#f8f5ef] px-6 py-12 text-slate-900">
            <div className="mx-auto max-w-5xl space-y-8">
                <section className="rounded-3xl border border-[#eadcc8] bg-white p-8 shadow-sm">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#0f766e]">
                        Detail Program
                    </p>
                    <h1 className="mt-3 text-4xl font-semibold">{program.title}</h1>
                    <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
                        {program.description ?? 'Deskripsi program akan ditambahkan kemudian.'}
                    </p>
                    <p className="mt-6 text-sm font-semibold text-[#0f766e]">
                        Rp {program.price.toLocaleString('id-ID')}
                    </p>
                </section>

                <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                    <article className="rounded-3xl border border-[#eadcc8] bg-white p-6 shadow-sm">
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#0f766e]">
                            Ustadz Pengampu
                        </p>
                        <h2 className="mt-3 text-2xl font-semibold">{ustadz.display_name}</h2>
                        <p className="mt-4 text-sm leading-6 text-slate-600">
                            {ustadz.bio ?? 'Profil ustadz ini belum memiliki bio publik.'}
                        </p>
                    </article>

                    <article className="rounded-3xl border border-[#eadcc8] bg-white p-6 shadow-sm">
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#0f766e]">
                            Langkah Berikutnya
                        </p>
                        <h2 className="mt-3 text-2xl font-semibold">Pendaftaran akan dibuka berikutnya</h2>
                        <p className="mt-4 text-sm leading-6 text-slate-600">
                            Flow enrollment publik akan disambungkan pada task berikutnya. Untuk saat ini,
                            gunakan halaman ini sebagai referensi detail program.
                        </p>
                    </article>
                </section>

                <section className="space-y-4">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#0f766e]">
                            Batch Tersedia
                        </p>
                        <h2 className="mt-2 text-2xl font-semibold">Ringkasan batch program</h2>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        {batches.map((batch) => (
                            <article
                                key={batch.id}
                                className="rounded-3xl border border-[#eadcc8] bg-white p-6 shadow-sm"
                            >
                                <h3 className="text-xl font-semibold">{batch.name}</h3>
                                <p className="mt-3 text-sm leading-6 text-slate-600">
                                    Kapasitas {batch.capacity} santri
                                </p>
                                <p className="mt-2 text-sm text-slate-500">
                                    {batch.starts_at ?? '-'} — {batch.ends_at ?? '-'}
                                </p>
                            </article>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
