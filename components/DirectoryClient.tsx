'use client';

import React from 'react';
import { AnimeCard } from '@/components/AnimeCard';
import { getTmdbImageUrl } from '@/lib/tmdb';
import { useDirectory } from '@/hooks/use-directory';
import { usePagination } from '@/hooks/use-pagination';
import { AnimeGrid } from '@/components/shared/AnimeGrid';
import { Pagination } from '@/components/shared/Pagination';
import { LoadingOverlay } from '@/components/shared/LoadingOverlay';
import { EmptyState } from '@/components/shared/EmptyState';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { DirectoryFilters } from './directory/DirectoryFilters';
import { DirectorySearch } from './directory/DirectorySearch';

interface Anime {
    id: number;
    name: string;
    slug: string;
    poster: string;
    vote_average: number;
    type: string;
}

interface Genre {
    id: number;
    title: string;
    slug: string;
}

interface DirectoryClientProps {
    initialAnimes: {
        data: Anime[];
        current_page: number;
        last_page: number;
    };
    genres: Genre[];
    years: number[];
}

export function DirectoryClient({
    initialAnimes,
    genres,
    years,
}: DirectoryClientProps) {
    const {
        searchTerm,
        setSearchTerm,
        isFilterOpen,
        setIsFilterOpen,
        currentGenresSlugs,
        toggleGenre,
        setFilter,
        clearFilters,
        isPending,
        typeMapping,
        statusMapping,
        searchParams,
    } = useDirectory();

    const { navigatePage } = usePagination('/directorio');

    return (
        <div className="min-h-screen bg-background pt-24 pb-20">
            <div className="mx-auto max-w-[1600px] px-4 md:px-8">
                <LoadingOverlay isVisible={isPending} text="Actualizando..." />

                <div className="flex flex-col gap-10 lg:flex-row">
                    <DirectoryFilters
                        genres={genres}
                        years={years}
                        isOpen={isFilterOpen}
                        setIsOpen={setIsFilterOpen}
                        currentGenres={currentGenresSlugs}
                        toggleGenre={toggleGenre}
                        setFilter={setFilter}
                        clearFilters={clearFilters}
                        isPending={isPending}
                        statusMapping={statusMapping}
                        typeMapping={typeMapping}
                        searchParams={searchParams}
                    />

                    <main className="flex-1">
                        <SectionHeader
                            title="Directorio"
                            highlight="Anime"
                            description={searchParams.toString() ? 'Resultados Filtrados' : 'Catálogo Completo'}
                            className="mb-10"
                        />

                        <DirectorySearch
                            value={searchTerm}
                            onChange={setSearchTerm}
                            onOpenFilters={() => setIsFilterOpen(true)}
                            isPending={isPending}
                        />

                        {initialAnimes.data.length > 0 ? (
                            <>
                                <AnimeGrid className="md:gap-6 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                                    {initialAnimes.data.map((anime) => (
                                        <AnimeCard
                                            key={anime.id}
                                            title={anime.name}
                                            image={getTmdbImageUrl(anime.poster)}
                                            vote_average={anime.vote_average}
                                            slug={anime.slug}
                                            type={anime.type}
                                        />
                                    ))}
                                </AnimeGrid>

                                <Pagination
                                    currentPage={initialAnimes.current_page}
                                    lastPage={initialAnimes.last_page}
                                    onPageChange={navigatePage}
                                    isPending={isPending}
                                />
                            </>
                        ) : (
                            <EmptyState
                                title="No se encontraron resultados"
                                description="Intenta ajustar tus filtros o realiza una búsqueda diferente."
                                onClear={clearFilters}
                            />
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}
