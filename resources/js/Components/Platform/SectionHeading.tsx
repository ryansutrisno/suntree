import type { ReactNode } from 'react';

type SectionHeadingProps = {
    eyebrow?: string;
    title: ReactNode;
    description?: ReactNode;
    align?: 'left' | 'center';
};

export function SectionHeading({
    eyebrow,
    title,
    description,
    align = 'left',
}: SectionHeadingProps) {
    const alignment = align === 'center' ? 'mx-auto items-center text-center' : 'items-start text-left';

    return (
        <div className={`flex max-w-2xl flex-col gap-3 ${alignment}`}>
            {eyebrow && (
                <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-teal">
                    <span className="h-1 w-6 bg-brand-gold" />
                    {eyebrow}
                </span>
            )}
            <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-brand-dark sm:text-[34px]">
                {title}
            </h2>
            {description && (
                <p className="text-[15px] leading-relaxed text-brand-mid">{description}</p>
            )}
        </div>
    );
}
