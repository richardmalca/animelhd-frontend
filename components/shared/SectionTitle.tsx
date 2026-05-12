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
    href,
    linkText = 'Ver Todo',
}: Omit<SectionTitleProps, 'subtitle'>) {
    return (
        <div className="mb-6 flex items-center justify-between py-[0.25em]">
            <div className="flex flex-col">
                <h2 className="text-base font-bold leading-[1.2857em] text-foreground uppercase tracking-normal">
                    <span className="border-b-2 border-primary pb-1">
                        {title}
                    </span>
                </h2>
            </div>
        </div>
    );
}
