import { Head } from '@inertiajs/react';
import type { ReactNode } from 'react';

type AppHeadProps = {
    /**
     * Judul halaman tanpa nama aplikasi. Inertia menambahkan nama aplikasi
     * secara otomatis melalui callback `title` di resources/js/app.tsx.
     */
    title: string;

    /**
     * Ringkasan halaman untuk mesin pencari. Usahakan 110-160 karakter.
     */
    description?: string;

    /**
     * Tandai true untuk halaman internal (dashboard, admin, auth) yang tidak
     * perlu muncul di hasil pencarian.
     */
    noindex?: boolean;

    /**
     * Tipe Open Graph. Gunakan "article" untuk halaman detail yang bersifat
     * konten, "website" untuk sisanya.
     */
    type?: 'website' | 'article';

    /**
     * Tag tambahan bila diperlukan (mis. canonical atau og:image).
     */
    children?: ReactNode;
};

const APP_NAME = 'PojokSantri';

export default function AppHead({
    title,
    description,
    noindex = false,
    type = 'website',
    children,
}: AppHeadProps) {
    return (
        <Head title={title}>
            {description ? (
                <meta name="description" content={description} />
            ) : null}

            <meta
                name="robots"
                content={noindex ? 'noindex, nofollow' : 'index, follow'}
            />

            <meta property="og:site_name" content={APP_NAME} />
            <meta property="og:title" content={title} />
            {description ? (
                <meta property="og:description" content={description} />
            ) : null}
            <meta property="og:type" content={type} />

            <meta name="twitter:card" content="summary_large_image" />

            {children}
        </Head>
    );
}
