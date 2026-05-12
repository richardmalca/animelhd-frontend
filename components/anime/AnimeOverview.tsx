'use client';

import React from 'react';

interface AnimeOverviewProps {
    overview: string | undefined;
}

export function AnimeOverview({ overview }: AnimeOverviewProps) {
    return (
        <section className="mb-16">
            <h2 className="mb-4 text-[10px] font-bold tracking-[0.3em] text-muted-foreground uppercase">
                Sinopsis
            </h2>
            <p className="text-[16px] leading-relaxed font-medium text-muted-foreground">
                {overview || 'Sin descripción disponible.'}
            </p>
        </section>
    );
}
