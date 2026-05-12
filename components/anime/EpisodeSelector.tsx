'use client';

import React from 'react';
import { Search, X, ArrowUpDown, AlertCircle } from 'lucide-react';
import { EpisodeGrid } from './EpisodeGrid';
import { EpisodePagination } from './EpisodePagination';

interface Episode {
    id: number;
    number: string;
}

interface EpisodeSelectorProps {
    animeSlug: string;
    animeStatus: string | number;
    episodesCount: number;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    isAsc: boolean;
    toggleOrder: () => void;
    filteredEpisodes: Episode[];
    chunkedEpisodes: Episode[][];
    activeChunk: number;
    setActiveChunk: (chunk: number) => void;
    pages: (string | number)[];
    nextPage: () => void;
    prevPage: () => void;
    handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function EpisodeSelector({
    animeSlug,
    animeStatus,
    episodesCount,
    searchTerm,
    setSearchTerm,
    isAsc,
    toggleOrder,
    filteredEpisodes,
    chunkedEpisodes,
    activeChunk,
    setActiveChunk,
    pages,
    nextPage,
    prevPage,
    handleSearchChange,
}: EpisodeSelectorProps) {
    return (
        <section id="episodes" className="mb-16">
            <div className="mb-10 flex flex-col gap-4 border-b border-border pb-8 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-col">
                    <h2 className="text-2xl font-black tracking-tighter text-foreground">Episodios</h2>
                    <p className="mt-1 text-[10px] font-bold tracking-[0.3em] text-muted-foreground uppercase">
                        Lista de capítulos ({episodesCount})
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative">
                        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="N°"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="w-28 rounded-2xl bg-muted/50 py-2.5 pr-8 pl-10 text-[12px] text-foreground ring-1 ring-border transition-all outline-none focus:ring-primary/40"
                        />
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm('')}
                                className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        )}
                    </div>
                    <button
                        onClick={toggleOrder}
                        className={`flex h-10 w-10 items-center justify-center rounded-2xl transition-all ${isAsc ? 'bg-primary text-primary-foreground shadow-lg ring-2 shadow-primary/20 ring-primary/50' : 'bg-muted/50 text-muted-foreground ring-1 ring-border hover:bg-accent hover:text-foreground'}`}
                    >
                        <ArrowUpDown className={`h-4 w-4 transition-transform duration-300 ${isAsc ? 'rotate-180' : ''}`} />
                    </button>
                </div>
            </div>

            {filteredEpisodes.length > 0 ? (
                <EpisodeGrid 
                    episodes={chunkedEpisodes[activeChunk] || []}
                    animeSlug={animeSlug}
                    animeStatus={animeStatus}
                    isAsc={isAsc}
                    activeChunk={activeChunk}
                />
            ) : (
                <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-muted/20 py-20">
                    <AlertCircle className="mb-4 h-12 w-12 text-muted-foreground" />
                    <p className="text-sm font-bold text-muted-foreground">
                        No se encontró el episodio <span className="text-foreground">{searchTerm}</span>
                    </p>
                    <button 
                        onClick={() => setSearchTerm('')} 
                        className="mt-4 text-[10px] font-black tracking-[0.2em] text-primary uppercase transition-colors hover:text-foreground"
                    >
                        Ver todos los episodios
                    </button>
                </div>
            )}

            <EpisodePagination 
                activeChunk={activeChunk}
                setActiveChunk={setActiveChunk}
                pages={pages}
                nextPage={nextPage}
                prevPage={prevPage}
                totalPages={chunkedEpisodes.length}
            />
        </section>
    );
}
