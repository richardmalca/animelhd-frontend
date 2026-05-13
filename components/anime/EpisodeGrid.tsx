'use client';

import React from 'react';
import Link from 'next/link';
import { formatDistanceToNow, isValid } from 'date-fns';
import { es } from 'date-fns/locale';

interface Episode {
    id: number;
    number: string;
    created_at?: string;
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
    const formatTime = (dateStr?: string) => {
        if (!dateStr) return '';
        try {
            const date = new Date(dateStr);
            if (!isValid(date)) return '';
            return formatDistanceToNow(date, {
                addSuffix: true,
                locale: es,
            });
        } catch (e) {
            return '';
        }
    };

    return (
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-3 2xl:grid-cols-4">
            {episodes.map((ep, index) => {
                const actualIndex = activeChunk * 50 + index;
                const isLatest =
                    Number(animeStatus) === 1 &&
                    (!isAsc
                        ? actualIndex === 0
                        : actualIndex === episodes.length - 1);
                const timeAgo = formatTime(ep.created_at);

                return (
                    <Link
                        key={ep.id}
                        href={`/ver/${animeSlug}/${ep.number}`}
                        className={`group relative flex h-16 w-full items-center justify-between rounded-md border px-2 transition-all duration-300 ${
                            isLatest
                                ? 'border-primary/30 bg-primary/5 shadow-lg shadow-primary/5 hover:border-primary/50 hover:bg-primary/10'
                                : 'border-white/10 bg-white/5 hover:border-primary/30 hover:bg-white/10'
                        }`}
                    >
                        <div className="flex items-center gap-2">
                            <div
                                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md border text-[13px] font-black transition-all duration-300 ${
                                    isLatest
                                        ? 'border-primary/30 bg-primary/20 text-primary'
                                        : 'border-white/10 bg-white/10 text-muted-foreground group-hover:text-white'
                                }`}
                            >
                                {ep.number}
                            </div>
                            <div className="flex flex-col">
                                <span
                                    className={`text-[13px] leading-tight font-bold transition-colors ${isLatest ? 'text-primary' : 'text-foreground'}`}
                                >
                                    Episodio {ep.number}
                                </span>
                                {timeAgo && (
                                    <span className="mt-0.5 text-[10px] font-medium text-muted-foreground">
                                        {timeAgo}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="flex shrink-0 items-center">
                            {isLatest && (
                                <div className="flex items-center gap-1 rounded-full bg-primary/20 px-1.5 py-0 ring-1 ring-primary/30">
                                    <span className="relative flex h-1 w-1">
                                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                                        <span className="relative inline-flex h-1 w-1 rounded-full bg-primary"></span>
                                    </span>
                                    <span className="text-[8px] font-black tracking-widest text-primary uppercase">
                                        Nuevo
                                    </span>
                                </div>
                            )}
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}
