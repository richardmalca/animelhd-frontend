'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface SectionTitleProps {
    title: string;
    subtitle: string;
    href?: string;
    linkText?: string;
}

export function SectionTitle({
    title,
    subtitle,
    href,
    linkText = 'Ver Todo',
}: SectionTitleProps) {
    return (
        <div className="mb-8 flex items-center justify-between">
            <div className="flex flex-col gap-1">
                <h2 className="text-xl font-black tracking-tighter text-foreground md:text-2xl">
                    {title}
                </h2>
                <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                    {subtitle}
                </span>
            </div>
            {href && (
                <Link
                    href={href}
                    className="group flex items-center gap-2 text-[11px] font-black tracking-widest text-muted-foreground uppercase transition-colors hover:text-foreground"
                >
                    {linkText}
                    <ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </Link>
            )}
        </div>
    );
}
