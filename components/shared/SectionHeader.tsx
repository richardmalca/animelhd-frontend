import React from 'react';

interface SectionHeaderProps {
    title: string;
    highlight?: string;
    description?: string;
    className?: string;
}

export function SectionHeader({
    title,
    highlight,
    description,
    className = 'mb-12',
}: SectionHeaderProps) {
    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            <h1 className="text-4xl font-black tracking-tighter text-foreground md:text-5xl">
                {title} {highlight && <span className="text-primary">{highlight}</span>}
            </h1>
            {description && (
                <p className="max-w-2xl text-xs leading-relaxed font-medium tracking-widest text-muted-foreground uppercase">
                    {description}
                </p>
            )}
        </div>
    );
}
