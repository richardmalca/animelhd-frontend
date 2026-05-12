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
import { SectionTitle } from '@/components/shared/SectionTitle';

interface Anime {
    id: number;
    name: string;
    slug: string;
    poster: string;
    vote_average: number;
    type: string;
    aired?: string;
}

interface DirectoryClientProps {
    initialAnimes: {
        data: Anime[];
        current_page: number;
        last_page: number;
    };
}

export function DirectoryClient({ initialAnimes }: DirectoryClientProps) {
    const {
        searchTerm,
        setSearchTerm,
        setFilter,
        clearFilters,
        isPending,
        typeMapping,
        statusMapping,
        yearsList,
        genresList,
        searchParams,
    } = useDirectory();

    const { navigatePage } = usePagination('/directorio');

    return (
        <div className="min-h-screen bg-background pt-20 pb-20">
            <div className="w-full px-6 lg:px-10">
                <LoadingOverlay isVisible={isPending} text="Buscando..." />

                <SectionTitle title="LISTADO ANIMES" />

                <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    <div className="grid flex-1 grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
                        <div className="flex items-center gap-2">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Tipo</label>
                            <select
                                value={searchParams.get('type') || ''}
                                onChange={(e) => setFilter('type', e.target.value)}
                                className="h-9 w-full max-w-[110px] rounded-md border border-white/10 bg-white/5 px-3 text-[11px] font-bold text-white outline-none transition-all focus:border-primary/50 lg:max-w-none"
                            >
                                <option value="" className="bg-[#181818]">Todos</option>
                                {Object.entries(typeMapping).map(([key, label]) => (
                                    <option key={key} value={key} className="bg-[#181818]">{label}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex items-center gap-2">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Estado</label>
                            <select
                                value={searchParams.get('status') || ''}
                                onChange={(e) => setFilter('status', e.target.value)}
                                className="h-9 w-full max-w-[110px] rounded-md border border-white/10 bg-white/5 px-3 text-[11px] font-bold text-white outline-none transition-all focus:border-primary/50 lg:max-w-none"
                            >
                                <option value="" className="bg-[#181818]">Todos</option>
                                {Object.entries(statusMapping).map(([key, label]) => (
                                    <option key={key} value={key} className="bg-[#181818]">{label}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex items-center gap-2">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Año</label>
                            <select
                                value={searchParams.get('year') || ''}
                                onChange={(e) => setFilter('year', e.target.value)}
                                className="h-9 w-full max-w-[110px] rounded-md border border-white/10 bg-white/5 px-3 text-[11px] font-bold text-white outline-none transition-all focus:border-primary/50 lg:max-w-none"
                            >
                                <option value="" className="bg-[#181818]">Todos</option>
                                {yearsList.map((year) => (
                                    <option key={year} value={year} className="bg-[#181818]">{year}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex items-center gap-2">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Género</label>
                            <select
                                value={searchParams.get('genre') || ''}
                                onChange={(e) => setFilter('genre', e.target.value)}
                                className="h-9 w-full max-w-[110px] rounded-md border border-white/10 bg-white/5 px-3 text-[11px] font-bold text-white outline-none transition-all focus:border-primary/50 lg:max-w-none"
                            >
                                <option value="" className="bg-[#181818]">Todos</option>
                                {genresList.map((genre) => (
                                    <option key={genre.slug} value={genre.slug} className="bg-[#181818]">{genre.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {(searchParams.get('type') || searchParams.get('status') || searchParams.get('year') || searchParams.get('genre')) && (
                        <button
                            onClick={clearFilters}
                            className="flex items-center justify-center gap-2 self-end text-[10px] font-bold uppercase tracking-widest text-primary transition-colors hover:text-white lg:self-center"
                        >
                            <span className="flex h-4 w-4 items-center justify-center rounded-full border border-primary/30 bg-primary/5 text-[10px]">×</span>
                            Limpiar
                        </button>
                    )}
                </div>

                {initialAnimes.data.length > 0 ? (
                    <>
                        <AnimeGrid className="grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 2xl:grid-cols-7">
                            {initialAnimes.data.map((anime) => (
                                <AnimeCard
                                    key={anime.id}
                                    title={anime.name}
                                    image={getTmdbImageUrl(anime.poster)}
                                    vote_average={anime.vote_average}
                                    slug={anime.slug}
                                    type={anime.type}
                                    aired={anime.aired}
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
            </div>
        </div>
    );
}
