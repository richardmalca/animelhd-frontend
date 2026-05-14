'use client';

import React from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';

import { Episode } from '@/types/anime';

interface EpisodeSidebarProps {
    episodes: Episode[];
    currentEpisodeNumber: string | number;
    animeSlug: string;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    filteredEpisodes: Episode[];
    activeEpisodeRef: React.RefObject<HTMLAnchorElement | null>;
}

export function EpisodeSidebar({
    episodes,
    currentEpisodeNumber,
    animeSlug,
    searchTerm,
    setSearchTerm,
    filteredEpisodes,
    activeEpisodeRef,
}: EpisodeSidebarProps) {
    const isLongSeries = episodes.length > 100;
    const gridCols = isLongSeries ? 'grid-cols-6 sm:grid-cols-8' : 'grid-cols-4';

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col">
                <div className="mb-6 pb-2">
                    <h2 className="text-sm font-bold text-foreground uppercase tracking-normal">
                        <span className="border-b-2 border-primary pb-1">
                            Capítulos
                        </span>
                    </h2>
                </div>

                <div className="relative">
                    <Search className="absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Buscar capítulo..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        autoComplete="off"
                        spellCheck={false}
                        suppressHydrationWarning
                        className="h-9 w-full rounded-md border border-white/10 bg-white/5 pl-9 pr-3 text-[11px] font-bold text-white transition-all outline-none focus:border-primary/50 sm:h-10 sm:text-sm"
                    />
                </div>
            </div>

            <div className="scrollbar-thin relative max-h-[600px] overflow-y-auto pr-2">
                {filteredEpisodes.length > 0 ? (
                    <div className={`grid ${gridCols} gap-2`}>
                        {filteredEpisodes.map((ep) => {
                            const isActive = Number(ep.number) === Number(currentEpisodeNumber);
                            return (
                                <Link
                                    key={ep.id}
                                    ref={isActive ? activeEpisodeRef : null}
                                    href={`/ver/${animeSlug}/${ep.number}`}
                                    className={`flex aspect-square items-center justify-center rounded-md border text-[13px] font-black transition-all ${
                                        isActive 
                                            ? 'border-primary/50 bg-primary/10 text-primary' 
                                            : 'border-white/10 bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-white'
                                    }`}
                                >
                                    {ep.number}
                                </Link>
                            );
                        })}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-10 text-center">
                        <p className="text-[10px] font-black tracking-widest text-muted-foreground uppercase">No se encontró el capítulo</p>
                    </div>
                )}
            </div>
        </div>
    );
}
