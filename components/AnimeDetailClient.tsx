'use client';

import React from 'react';
import { useAnimeDetail } from '@/hooks/use-anime-detail';
import { AnimeBanner } from './anime/AnimeBanner';
import { EpisodeSelector } from './anime/EpisodeSelector';
import { AnimeSidebar } from './anime/AnimeSidebar';
import { AnimeOverview } from './anime/AnimeOverview';

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

    return (
        <div className="min-h-screen bg-background pb-20">
            <AnimeBanner anime={anime} getBroadcastDay={getBroadcastDay} />

            <div className="mx-auto mt-6 max-w-[1600px] px-6 lg:px-10">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
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

                        <AnimeOverview overview={anime.overview} />
                    </div>

                    <div className="lg:col-span-4">
                        <AnimeSidebar relations={relations} />
                    </div>
                </div>
            </div>
        </div>
    );
}
