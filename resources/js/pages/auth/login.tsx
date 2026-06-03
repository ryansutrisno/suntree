export default function LoginPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-[#f8f3eb] px-6 py-12 text-slate-900">
            <div className="w-full max-w-lg rounded-3xl border border-[#eadcc8] bg-white p-8 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#0f766e]">
                    Auth Placeholder
                </p>
                <h1 className="mt-4 text-3xl font-semibold">Login</h1>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                    Halaman login final akan diisi pada task auth UI berikutnya. Untuk sekarang,
                    route ini disediakan agar alur proteksi admin punya tujuan redirect yang valid.
                </p>
            </div>
        </div>
    );
}
