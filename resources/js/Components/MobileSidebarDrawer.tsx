import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import type { PropsWithChildren } from 'react';

type MobileSidebarDrawerProps = PropsWithChildren<{
    show: boolean;
    onClose: () => void;
    panelId: string;
}>;

export default function MobileSidebarDrawer({
    show,
    onClose,
    panelId,
    children,
}: MobileSidebarDrawerProps) {
    return (
        <Transition show={show} leave="duration-200">
            <Dialog
                as="div"
                id={panelId}
                className="fixed inset-0 z-50 transform lg:hidden"
                onClose={onClose}
            >
                <TransitionChild
                    enter="ease-out duration-200"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                        aria-hidden="true"
                    />
                </TransitionChild>

                <TransitionChild
                    enter="transition-transform duration-300 ease-out"
                    enterFrom="-translate-x-full"
                    enterTo="translate-x-0"
                    leave="transition-transform duration-200 ease-in"
                    leaveFrom="translate-x-0"
                    leaveTo="-translate-x-full"
                >
                    <DialogPanel className="absolute inset-y-0 left-0 flex w-72 max-w-[86vw] transform flex-col rounded-r-3xl border-r border-[#d6c3a5] bg-[#0f766e] p-6 text-white shadow-xl transition-transform">
                        <button
                            type="button"
                            onClick={onClose}
                            aria-label="Tutup menu navigasi"
                            className="absolute right-4 top-4 inline-flex items-center justify-center rounded-full p-1.5 text-white/70 transition hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f7d27a]"
                        >
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-4 w-4"
                                aria-hidden="true"
                            >
                                <path d="M18 6 6 18M6 6l12 12" />
                            </svg>
                        </button>
                        {children}
                    </DialogPanel>
                </TransitionChild>
            </Dialog>
        </Transition>
    );
}
