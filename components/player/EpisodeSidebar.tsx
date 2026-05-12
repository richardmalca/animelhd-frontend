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
    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between px-1">
                    <h2 className="text-[11px] font-bold tracking-[0.2em] text-muted-foreground uppercase">Episodios</h2>
                    <span className="text-[10px] font-bold text-muted-foreground">{episodes.length} Total</span>
                </div>

                <div className="relative">
                    <Search className="absolute top-1/2 left-3.5 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Buscar..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full rounded-xl bg-muted/30 py-2.5 pr-8 pl-10 text-[12px] text-foreground ring-1 ring-border transition-all outline-none focus:ring-primary/40"
                    />
                </div>
            </div>

            <div className="scrollbar-thin relative max-h-[500px] overflow-y-auto pr-2">
                {filteredEpisodes.length > 0 ? (
                    <div className="grid grid-cols-5 gap-2 lg:grid-cols-4">
                        {filteredEpisodes.map((ep) => {
                            const isActive = Number(ep.number) === Number(currentEpisodeNumber);
                            return (
                                <Link
                                    key={ep.id}
                                    ref={isActive ? activeEpisodeRef : null}
                                    href={`/ver/${animeSlug}/${ep.number}`}
                                    className={`flex aspect-square items-center justify-center rounded-xl text-[12px] font-bold transition-all ${
                                        isActive ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' : 'bg-muted/40 text-muted-foreground hover:bg-muted/60 hover:text-foreground'
                                    }`}
                                >
                                    {ep.number}
                                </Link>
                            );
                        })}
                    </div>
                ) : (
                    <div className="flex justify-center py-10">
                        <p className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">No encontrado</p>
                    </div>
                )}
            </div>
        </div>
    );
}
