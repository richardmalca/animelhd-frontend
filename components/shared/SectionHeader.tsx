import React from 'react';

interface SectionHeaderProps {
    title: string;
    highlight?: string;
    className?: string;
}

export function SectionHeader({
    title,
    highlight,
    className = '',
}: SectionHeaderProps) {
    return (
        <div className={`mb-6 flex items-center justify-between py-[0.25em] ${className}`}>
            <div className="flex flex-col">
                <h2 className="text-base font-bold leading-[1.2857em] text-foreground uppercase tracking-normal">
                    <span className="border-b-2 border-primary pb-1">
                        {title} {highlight}
                    </span>
                </h2>
            </div>
        </div>
    );
}
