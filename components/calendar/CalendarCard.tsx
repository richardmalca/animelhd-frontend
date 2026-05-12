'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, ChevronRight } from 'lucide-react';
import { getTmdbImageUrl } from '@/lib/tmdb';
import { getAnimeTypeLabel } from '@/lib/anime-utils';
import { CalendarAnime } from '@/hooks/use-calendar';

interface CalendarCardProps {
    anime: CalendarAnime;
    isToday: boolean;
}

export function CalendarCard({ anime, isToday }: CalendarCardProps) {
    const displayEp = isToday
        ? anime.last_episode_number
        : anime.last_episode_number + 1;

    return (
        <div className="group flex flex-col gap-2.5">
            <Link
                href={`/anime/${anime.slug}`}
                className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted/20 shadow-lg ring-1 ring-white/5 transition-all duration-500 hover:ring-primary/40"
            >
                <Image
                    src={getTmdbImageUrl(anime.banner || anime.poster, 'w300')}
                    alt={anime.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                    loading="lazy"
                />

                <div className="absolute inset-0 bg-black/60" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                <div className="absolute inset-0 flex flex-col items-start justify-end p-4 pb-3">
                    <div className="flex flex-col items-start gap-2 text-left drop-shadow-[0_4px_8px_rgba(0,0,0,1)]">
                        <span className="text-[10px] font-bold tracking-[0.1em] uppercase">
                            <span className="text-white/50">
                                EPISODIO {displayEp} -{' '}
                            </span>
                            <span className="text-white">
                                {' '}
                                {isToday ? 'EMITIDO' : 'PRÓXIMAMENTE'}
                            </span>
                        </span>
                        <span className="line-clamp-1 text-[13px] font-bold text-white transition-colors group-hover:text-primary">
                            {anime.name}
                        </span>
                    </div>
                </div>
            </Link>
        </div>
    );
}
