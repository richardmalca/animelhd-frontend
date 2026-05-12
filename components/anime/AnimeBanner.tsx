'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, Clock, Calendar } from 'lucide-react';
import { getTmdbImageUrl } from '@/lib/tmdb';
import { getAnimeTypeStyles, getAnimeTypeLabel } from '@/lib/anime-utils';


interface AnimeBannerProps {
    anime: {
        name: string;
        poster: string;
        banner?: string;
        type: string;
        genres?: string;
        name_alternative?: string;
        vote_average: number;
        status: string | number;
        premiered?: string;
        broadcast?: string | number;
    };
    getBroadcastDay: (broadcast: string | number) => string;
}

export function AnimeBanner({ anime, getBroadcastDay }: AnimeBannerProps) {
    const typeStyles = getAnimeTypeStyles(anime.type);
    const displayType = getAnimeTypeLabel(anime.type);
    const genres = anime.genres?.split(',').filter(Boolean) || [];

    return (
        <div className="relative h-[70vh] w-full overflow-hidden lg:h-[75vh]">
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-background via-background/40 to-transparent" />
            
            <Image
                src={getTmdbImageUrl(anime.banner || anime.poster, 'original')}
                alt={anime.name}
                fill
                priority
                className="object-cover object-top opacity-30"
                sizes="100vw"
            />

            <div className="absolute bottom-0 z-20 w-full px-6 pb-12 lg:px-10 lg:pb-16">
                <div className="mx-auto max-w-[1600px]">
                    <div className="flex flex-col gap-8 lg:flex-row lg:items-end">
                        <div className="hidden w-44 shrink-0 lg:block">
                            <div className="relative aspect-[2/3] w-full overflow-hidden rounded-xl ring-1 ring-border">
                                <Image
                                    src={getTmdbImageUrl(anime.poster)}
                                    alt={anime.name}
                                    fill
                                    className="object-cover"
                                    sizes="176px"
                                />
                            </div>
                        </div>


                        <div className="flex flex-1 flex-col gap-3">
                            <div className="flex flex-wrap items-center gap-2">
                                <span className={`rounded-md border px-2 py-1 text-[9px] font-black tracking-widest uppercase ${typeStyles}`}>
                                    {displayType}
                                </span>
                                <div className="mx-1 h-4 w-px bg-border" />
                                {genres.map((genre) => (
                                    <Link
                                        key={genre}
                                        href={`/directorio?genre=${genre.trim()}`}
                                        className="rounded-md bg-accent/50 px-2 py-1 text-[9px] font-bold tracking-widest text-muted-foreground uppercase ring-1 ring-border transition-colors hover:bg-primary hover:text-primary-foreground"
                                    >
                                        {genre}
                                    </Link>
                                ))}
                            </div>

                            <div>
                                <h1 className="line-clamp-2 text-3xl font-black leading-[0.95] tracking-tighter text-foreground md:text-5xl lg:text-6xl">
                                    {anime.name}
                                </h1>
                                {anime.name_alternative && (
                                    <h2 className="mt-2 line-clamp-2 text-[10px] font-bold tracking-widest text-muted-foreground leading-relaxed lg:text-base">
                                        {anime.name_alternative}
                                    </h2>
                                )}
                            </div>

                            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-3 text-[10px] font-black tracking-widest text-muted-foreground uppercase md:gap-x-6 md:text-[11px]">
                                <div className="flex items-center gap-2">
                                    <Star className="h-3.5 w-3.5 fill-primary text-primary opacity-80" />
                                    <span className="text-foreground">{anime.vote_average.toFixed(1)}</span>
                                </div>
                                <div className="flex items-center gap-2 border-l border-border pl-4 md:pl-6">
                                    <Clock className="h-3.5 w-3.5 text-primary" />
                                    <span className={Number(anime.status) === 1 ? 'text-primary' : 'text-muted-foreground'}>
                                        {Number(anime.status) === 1 ? 'En emision' : 'Finalizado'}
                                    </span>
                                </div>
                                {anime.premiered && (
                                    <div className="flex items-center gap-2 border-l border-border pl-4 md:pl-6">
                                        <Calendar className="h-3.5 w-3.5" />
                                        <span>{anime.premiered}</span>
                                    </div>
                                )}
                            </div>

                            {Number(anime.status) === 1 && anime.broadcast && (
                                <div className="mt-2 flex w-fit items-center gap-2 rounded-lg bg-primary/10 px-3 py-1.5 ring-1 ring-primary/20">
                                    <span className="text-[10px] font-black tracking-widest text-primary uppercase">
                                        Estreno: <span className="ml-1 text-foreground">{getBroadcastDay(anime.broadcast)}</span>
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
