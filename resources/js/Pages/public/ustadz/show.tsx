type UstadzProfile = {
    id: number;
    display_name: string;
    bio: string | null;
};

type Program = {
    id: number;
    title: string;
    description: string | null;
    price: number;
};

type PublicUstadzProfileProps = {
    ustadz: UstadzProfile;
    programs: Program[];
};

export default function PublicUstadzProfileShow({ ustadz, programs }: PublicUstadzProfileProps) {
    return (
        <div className="min-h-screen bg-[#f8f5ef] px-6 py-12 text-slate-900">
            <div className="mx-auto max-w-5xl space-y-8">
                <section className="rounded-3xl border border-[#eadcc8] bg-white p-8 shadow-sm">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#0f766e]">
                        Profil Ustadz
                    </p>
                    <h1 className="mt-3 text-4xl font-semibold">{ustadz.display_name}</h1>
                    <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
                        {ustadz.bio ?? 'Profil ustadz ini belum memiliki bio publik.'}
                    </p>
                </section>

                <section className="space-y-4">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#0f766e]">
                            Program Terkait
                        </p>
                        <h2 className="mt-2 text-2xl font-semibold">Daftar program publik</h2>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        {programs.map((program) => (
                            <article
                                key={program.id}
                                className="rounded-3xl border border-[#eadcc8] bg-white p-6 shadow-sm"
                            >
                                <h3 className="text-xl font-semibold">{program.title}</h3>
                                <p className="mt-3 text-sm leading-6 text-slate-600">
                                    {program.description ?? 'Deskripsi program akan ditambahkan kemudian.'}
                                </p>
                                <p className="mt-4 text-sm font-semibold text-[#0f766e]">
                                    Rp {program.price.toLocaleString('id-ID')}
                                </p>
                            </article>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
