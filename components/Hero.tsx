'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Play, Star, Info } from 'lucide-react';
import { getTmdbImageUrl } from '@/lib/tmdb';

interface HeroProps {
    anime: {
        name: string;
        slug: string;
        overview?: string;
        banner?: string;
        poster?: string;
        vote_average?: number;
    } | null;
}

export function Hero({ anime }: HeroProps) {
    if (!anime || !anime.name) return null;

    const bannerUrl = getTmdbImageUrl(anime.banner || anime.poster || '', 'original');
    const voteAverage = anime.vote_average || 0;

    return (
        <section className="relative h-[75vh] w-full overflow-hidden lg:h-[85vh]">
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-background via-background/40 to-transparent" />
            <div className="absolute inset-0 z-10 hidden bg-gradient-to-r from-background/80 via-transparent to-transparent lg:block" />

            <div className="relative h-full w-full">
                <Image
                    src={bannerUrl}
                    alt={anime.name}
                    fill
                    priority
                    className="object-cover object-top transition-transform duration-1000 group-hover:scale-105"
                    sizes="100vw"
                />
            </div>


            <div className="absolute bottom-0 z-20 w-full px-6 pb-6 lg:px-20 lg:pb-6">
                <div className="mx-auto max-w-[1600px]">
                    <div className="flex flex-col gap-2 lg:max-w-3xl lg:gap-6">
                        <div className="flex items-center gap-4">
                            <span className="rounded-full bg-red-600 px-4 py-1.5 text-[10px] font-black tracking-[0.2em] text-white uppercase">
                                Destacado
                            </span>
                            <div className="flex items-center gap-2 text-[13px] font-bold text-white">
                                <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                                {voteAverage.toFixed(1)}
                            </div>
                        </div>

                        <h2 className="line-clamp-2 text-3xl font-black tracking-tighter text-white md:text-5xl lg:text-6xl">
                            {anime.name}
                        </h2>

                        <p className="line-clamp-3 max-w-2xl text-[15px] leading-relaxed text-white/80 md:text-[17px]">
                            {anime.overview || 'Explora este increíble anime en AnimeLHD.'}
                        </p>

                        <div className="mt-6 flex flex-wrap items-center gap-4">
                            <Link
                                href={`/anime/${anime.slug}`}
                                className="group flex items-center gap-3 rounded-full bg-white px-6 py-3 text-[11px] font-black tracking-widest text-black uppercase transition-all hover:scale-105 active:scale-95 lg:px-10 lg:py-4 lg:text-[13px]"
                            >
                                <Play className="h-3 w-3 fill-black transition-transform group-hover:scale-110 lg:h-4 lg:w-4" />
                                Ver Ahora
                            </Link>
                            <Link
                                href={`/anime/${anime.slug}`}
                                className="group flex items-center gap-3 rounded-full bg-muted/80 px-6 py-3 text-[11px] font-black tracking-widest text-foreground uppercase ring-1 ring-border/50 backdrop-blur-md transition-all hover:scale-105 hover:bg-muted active:scale-95 lg:px-10 lg:py-4 lg:text-[13px]"
                            >
                                <Info className="h-3 w-3 text-muted-foreground group-hover:text-foreground lg:h-4 lg:w-4" />
                                Detalles
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
