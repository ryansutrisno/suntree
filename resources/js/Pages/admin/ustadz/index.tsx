import { Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/admin-layout';
import type {AdminShellProps} from '@/Pages/admin/shell-page';

type UstadzProfile = {
    id: number;
    display_name: string;
    is_verified: boolean;
    approved_at: string | null;
    approved_by: number | null;
    status_label: string;
    approve_url: string;
    revoke_url: string;
};

type AdminUstadzProps = AdminShellProps & {
    ustadzProfiles: UstadzProfile[];
};

export default function UstadzIndex({ shell, ustadzProfiles }: AdminUstadzProps) {
    return (
        <AdminLayout title={shell.title} description={shell.description}>
            {ustadzProfiles.length === 0 ? (
                <section className="rounded-3xl border border-dashed border-[#d8c7ae] bg-white p-8 text-center shadow-sm">
                    <h3 className="text-xl font-semibold text-slate-900">{shell.emptyState.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{shell.emptyState.description}</p>
                </section>
            ) : (
                <section className="rounded-3xl border border-[#eadcc8] bg-white p-6 shadow-sm">
                    <div className="space-y-4">
                        {ustadzProfiles.map((ustadzProfile) => (
                            <article
                                key={ustadzProfile.id}
                                className="flex flex-col gap-4 rounded-2xl border border-slate-200 p-4 md:flex-row md:items-center md:justify-between"
                            >
                                <div>
                                    <h3 className="text-lg font-semibold text-slate-900">{ustadzProfile.display_name}</h3>
                                    <p className="mt-1 text-sm text-slate-600">
                                        Status: <span className="font-medium text-[#0f766e]">{ustadzProfile.status_label}</span>
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-3">
                                    <Link
                                        href={ustadzProfile.approve_url}
                                        method="patch"
                                        as="button"
                                        className="rounded-full bg-[#0f766e] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#115e59]"
                                    >
                                        Approve
                                    </Link>

                                    <Link
                                        href={ustadzProfile.revoke_url}
                                        method="patch"
                                        as="button"
                                        className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-900"
                                    >
                                        Revoke
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
            )}
        </AdminLayout>
    );
}
