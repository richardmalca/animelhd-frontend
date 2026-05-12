'use client';

import React from 'react';
import Link from 'next/link';

interface Episode {
    id: number;
    number: string;
}

interface EpisodeGridProps {
    episodes: Episode[];
    animeSlug: string;
    animeStatus: string | number;
    isAsc: boolean;
    activeChunk: number;
}

export function EpisodeGrid({
    episodes,
    animeSlug,
    animeStatus,
    isAsc,
    activeChunk,
}: EpisodeGridProps) {
    return (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(70px,1fr))] gap-3 md:grid-cols-[repeat(auto-fill,minmax(90px,1fr))]">
            {episodes.map((ep, index) => {
                const actualIndex = activeChunk * 50 + index;
                const isLatest = Number(animeStatus) === 1 && (!isAsc ? actualIndex === 0 : actualIndex === episodes.length - 1);
                
                return (
                    <Link
                        key={ep.id}
                        href={`/ver/${animeSlug}/${ep.number}`}
                        className={`group relative flex aspect-square flex-col items-center justify-center rounded-2xl border transition-all duration-300 ${
                            isLatest
                                ? 'border-primary/30 bg-primary/10 shadow-lg shadow-primary/10 hover:scale-105 hover:border-primary'
                                : 'border-border bg-muted/30 hover:scale-105 hover:border-primary/50 hover:bg-accent'
                        }`}
                    >
                        <span className={`text-xl font-black tracking-tighter transition-all duration-300 group-hover:scale-110 ${isLatest ? 'text-primary' : 'text-foreground group-hover:text-primary'}`}>
                            {ep.number}
                        </span>
                        <span className="mt-1 text-[8px] font-black tracking-[0.2em] text-muted-foreground uppercase transition-colors group-hover:text-primary/50">
                            CAP
                        </span>
                        {isLatest && (
                            <div className="absolute top-2 right-2 flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
                            </div>
                        )}
                    </Link>
                );
            })}
        </div>
    );
}
