'use client';

import React from 'react';
import { usePagination } from '@/hooks/use-pagination';
import { SectionHeader } from './SectionHeader';
import { LoadingOverlay } from './LoadingOverlay';
import { AnimeGrid } from './AnimeGrid';
import { Pagination } from './Pagination';
import { EmptyState } from './EmptyState';
import { AnimeCard } from '../AnimeCard';
import { getTmdbImageUrl } from '@/lib/tmdb';

interface AnimeData {
    id: number;
    name: string;
    slug: string;
    poster: string;
    vote_average: number;
    type: string;
    aired?: string;
    last_episode_number: number;
    last_episode_at: string | null;
}

interface AnimeListingTemplateProps {
    initialData: {
        data: AnimeData[];
        current_page: number;
        last_page: number;
    };
    title: string;
    highlight?: string;
    description: string;
    baseUrl: string;
    emptyTitle: string;
    emptyDescription: string;
}

export function AnimeListingTemplate({
    initialData,
    title,
    highlight,
    description,
    baseUrl,
    emptyTitle,
    emptyDescription,
}: AnimeListingTemplateProps) {
    const { navigatePage, isPending } = usePagination(baseUrl);

    return (
        <div className="min-h-screen bg-background pt-20 pb-20">
            <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
                <LoadingOverlay isVisible={isPending} />

                <SectionHeader
                    title={title}
                    highlight={highlight}
                />

                {initialData.data.length > 0 ? (
                    <>
                        <AnimeGrid className="grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 2xl:grid-cols-7">
                            {initialData.data.map((anime) => (
                                <AnimeCard 
                                    key={anime.id} 
                                    title={anime.name}
                                    image={getTmdbImageUrl(anime.poster, 'w300')}
                                    slug={anime.slug}
                                    vote_average={anime.vote_average}
                                    type={anime.type}
                                    aired={anime.aired}
                                />
                            ))}
                        </AnimeGrid>

                        <Pagination
                            currentPage={initialData.current_page}
                            lastPage={initialData.last_page}
                            onPageChange={navigatePage}
                            isPending={isPending}
                        />
                    </>
                ) : (
                    <EmptyState
                        title={emptyTitle}
                        description={emptyDescription}
                    />
                )}
            </div>
        </div>
    );
}
