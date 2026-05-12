'use client';

import React from 'react';
import { usePagination } from '@/hooks/use-pagination';
import { SectionHeader } from './SectionHeader';
import { LoadingOverlay } from './LoadingOverlay';
import { AnimeGrid } from './AnimeGrid';
import { Pagination } from './Pagination';
import { EmptyState } from './EmptyState';
import { AnimeListItem } from './AnimeListItem';

interface AnimeData {
    id: number;
    name: string;
    slug: string;
    poster: string;
    last_episode_number: number;
    last_episode_at: string;
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
        <div className="min-h-screen bg-background pt-24 pb-20">
            <div className="mx-auto max-w-[1600px] px-4 md:px-8">
                <LoadingOverlay isVisible={isPending} />

                <SectionHeader
                    title={title}
                    highlight={highlight}
                    description={description}
                />

                {initialData.data.length > 0 ? (
                    <>
                        <AnimeGrid>
                            {initialData.data.map((anime) => (
                                <AnimeListItem key={anime.id} anime={anime} />
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
