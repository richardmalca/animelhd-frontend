'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, Clock, Calendar } from 'lucide-react';
import { useAnimeDetail } from '@/hooks/use-anime-detail';
import { AnimeBanner } from './anime/AnimeBanner';
import { EpisodeSelector } from './anime/EpisodeSelector';
import { AnimeSidebar } from './anime/AnimeSidebar';
import { getTmdbImageUrl } from '@/lib/tmdb';
import { getAnimeTypeStyles, getAnimeTypeLabel } from '@/lib/anime-utils';

interface AnimeRelation {
    id: number;
    name: string;
    slug: string;
    poster: string;
    type: string;
}

interface Episode {
    id: number;
    number: string;
}

interface AnimeDetailClientProps {
    data: {
        anime: {
            name: string;
            slug: string;
            poster: string;
            banner?: string;
            type: string;
            genres?: string;
            name_alternative?: string;
            vote_average: number;
            status: string | number;
            premiered?: string;
            broadcast?: string | number;
            overview?: string;
        };
        episodes: Episode[];
        relations: {
            prequel: AnimeRelation[];
            sequel: AnimeRelation[];
            related: AnimeRelation[];
        };
    };
    initialOrder?: string;
}

export function AnimeDetailClient({
    data,
    initialOrder = 'desc',
}: AnimeDetailClientProps) {
    const { anime, episodes, relations } = data;
    
    const {
        searchTerm,
        setSearchTerm,
        isAsc,
        activeChunk,
        setActiveChunk,
        toggleOrder,
        handleSearchChange,
        filteredEpisodes,
        chunkedEpisodes,
        getBroadcastDay,
        pages,
        nextPage,
        prevPage
    } = useAnimeDetail(anime, episodes, initialOrder);

    const typeStyles = getAnimeTypeStyles(anime.type);
    const displayType = getAnimeTypeLabel(anime.type);
    const genres = anime.genres?.split(',').filter(Boolean) || [];

    return (
        <div className="min-h-screen bg-background pb-20">
            <AnimeBanner anime={anime} getBroadcastDay={getBroadcastDay} />

            <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
                <div className="relative z-20 -mt-32 lg:-mt-60">
                    <div className="flex flex-col gap-8 lg:flex-row lg:items-end">
                        <div className="hidden shrink-0 lg:block lg:w-56">
                            <div className="relative aspect-[2/3] w-full overflow-hidden rounded-xl ring-2 ring-white/10 shadow-2xl">
                                <Image
                                    src={getTmdbImageUrl(anime.poster, 'w300')}
                                    alt={anime.name}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 1024px) 192px, 224px"
                                />
                            </div>
                        </div>

                        <div className="flex flex-1 flex-col gap-4">
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

                            <div className="flex flex-wrap items-center gap-x-4 gap-y-3 text-[10px] font-black tracking-widest text-muted-foreground uppercase md:gap-x-6 md:text-[11px]">
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

                            {anime.overview && (
                                <div className="mt-2 max-w-4xl">
                                    <p className="text-[14px] leading-relaxed text-muted-foreground lg:text-[15px]">
                                        {anime.overview}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-12">
                    <div className="lg:col-span-8">
                        <EpisodeSelector
                            animeSlug={anime.slug}
                            animeStatus={anime.status}
                            episodesCount={episodes.length}
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            isAsc={isAsc}
                            toggleOrder={toggleOrder}
                            filteredEpisodes={filteredEpisodes}
                            chunkedEpisodes={chunkedEpisodes}
                            activeChunk={activeChunk}
                            setActiveChunk={setActiveChunk}
                            pages={pages}
                            nextPage={nextPage}
                            prevPage={prevPage}
                            handleSearchChange={handleSearchChange}
                        />
                    </div>

                    <div className="lg:col-span-4">
                        <AnimeSidebar relations={relations} />
                    </div>
                </div>
            </div>
        </div>
    );
}
