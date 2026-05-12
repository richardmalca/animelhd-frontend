'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { getAnimeTypeLabel, getAnimeStatusLabel, getAnimeTypeStyles, getAnimeStatusStyles } from '@/lib/anime-utils';
import { Anime } from '@/types/anime';

interface PlayerHeaderProps {
    anime: Anime;
    episodeNumber: number | string;
    prev: number | null;
    next: number | null;
}

export function PlayerHeader({ anime, episodeNumber, prev, next }: PlayerHeaderProps) {
    return (
        <div className="border-b border-white/5 pt-20 pb-6">
            <div className="mx-auto max-w-[1400px] px-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-3">
                            <Link href={`/anime/${anime.slug}`} className="flex items-center gap-2 text-[10px] font-black tracking-[0.2em] text-primary uppercase transition-colors hover:text-primary/80">
                                <ArrowLeft className="h-3 w-3" /> Detalle del Anime
                            </Link>
                            <span className="text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase">/</span>
                            <span className="text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase">Episodio {episodeNumber}</span>
                        </div>

                        <h1 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl md:text-4xl">{anime.name}</h1>

                        <div className="flex flex-wrap items-center gap-4 text-[10px] font-bold tracking-widest uppercase">
                            <span className="flex items-center gap-1.5 text-primary">
                                <Star className="h-3.5 w-3.5 fill-primary" /> {anime.vote_average}
                            </span>
                            <span className={`rounded-md border px-2 py-0.5 ${getAnimeTypeStyles(anime.type)}`}>
                                {getAnimeTypeLabel(anime.type)}
                            </span>
                            <span className={`rounded-md border px-2 py-0.5 ${getAnimeStatusStyles(anime.status)}`}>
                                {getAnimeStatusLabel(anime.status)}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        {prev && (
                            <Link href={`/ver/${anime.slug}/${prev}`} className="flex h-9 items-center gap-2 rounded-lg border border-border/40 bg-muted/20 px-3 text-[10px] font-black tracking-widest text-muted-foreground uppercase transition-all hover:bg-muted/40 md:h-10 md:px-5 md:text-[11px]">
                                <ChevronLeft className="h-4 w-4" /> <span className="hidden sm:inline">Anterior</span>
                            </Link>
                        )}
                        {next && (
                            <Link href={`/ver/${anime.slug}/${next}`} className="flex h-9 items-center gap-2 rounded-lg bg-primary px-3 text-[10px] font-black tracking-widest text-primary-foreground uppercase shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 md:h-10 md:px-5 md:text-[11px]">
                                <span className="hidden sm:inline">Siguiente</span> <ChevronRight className="h-4 w-4" />
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
