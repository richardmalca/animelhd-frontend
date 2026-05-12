'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, ChevronRight } from 'lucide-react';
import { getTmdbImageUrl } from '@/lib/tmdb';
import { getAnimeTypeLabel } from '@/lib/anime-utils';


interface CalendarAnime {
    id: number;
    name: string;
    slug: string;
    poster: string;
    type: string;
    broadcast_time?: string;
    last_episode_number: number;
}

interface CalendarCardProps {
    anime: CalendarAnime;
    isToday: boolean;
}

export function CalendarCard({ anime, isToday }: CalendarCardProps) {
    const displayEp = isToday ? anime.last_episode_number : anime.last_episode_number + 1;

    return (
        <div className="group relative overflow-hidden rounded-2xl bg-muted/20 p-3 ring-1 ring-border/50 transition-all duration-300 hover:bg-muted/40 hover:ring-primary/30">
            <div className="flex gap-4">
                <Link href={`/anime/${anime.slug}`} className="relative aspect-[2/3] w-20 shrink-0 overflow-hidden rounded-xl shadow-lg">
                    <Image
                        src={getTmdbImageUrl(anime.poster)}
                        alt={anime.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="80px"
                    />
                </Link>


                <div className="flex flex-1 flex-col justify-between py-1">
                    <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                            <span className="text-[8px] font-black tracking-wider text-primary uppercase">
                                {getAnimeTypeLabel(anime.type)}
                            </span>
                            {anime.broadcast_time && (
                                <div className="flex items-center gap-1 text-[8px] font-bold text-muted-foreground">
                                    <Clock className="h-2.5 w-2.5" />
                                    <span>{anime.broadcast_time}</span>
                                </div>
                            )}
                        </div>
                        <Link href={`/anime/${anime.slug}`} className="line-clamp-2 text-[14px] font-black leading-tight tracking-tight text-foreground transition-colors hover:text-primary">
                            {anime.name}
                        </Link>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-0.5">
                            <span className={`text-[8px] font-black uppercase tracking-widest ${isToday ? 'text-primary' : 'text-muted-foreground'}`}>
                                {isToday ? 'Emitido' : 'Próximo'}
                            </span>
                            <span className="text-xs font-black text-foreground/80">
                                Capítulo {displayEp}
                            </span>
                        </div>

                        <Link
                            href={isToday ? `/ver/${anime.slug}/${anime.last_episode_number}` : `/anime/${anime.slug}`}
                            className={`flex h-8 w-8 items-center justify-center rounded-xl transition-all ${isToday ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-muted text-muted-foreground hover:bg-primary hover:text-white'}`}
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
