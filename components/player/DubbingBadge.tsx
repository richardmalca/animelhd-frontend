import React from 'react';

interface DubbingBadgeProps {
    label: string;
}

export function DubbingBadge({ label }: DubbingBadgeProps) {
    if (!label) return null;

    return (
        <div className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 ring-1 ring-inset ring-primary/20">
            <span className="text-[9px] font-black uppercase tracking-wider text-primary">
                {label}
            </span>
        </div>
    );
}
