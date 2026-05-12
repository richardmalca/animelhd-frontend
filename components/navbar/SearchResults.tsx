'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Loader2, Star, Search } from 'lucide-react';
import { getTmdbImageUrl } from '@/lib/tmdb';
import { getAnimeTypeStyles, getAnimeTypeLabel } from '@/lib/anime-utils';
import { AnimeSearchItem } from '@/hooks/use-navbar-search';

interface SearchResultsProps {
    isLoading: boolean;
    results: AnimeSearchItem[];
    search: string;
    onResultClick: () => void;
}

export function SearchResults({
    isLoading,
    results,
    search,
    onResultClick,
}: SearchResultsProps) {
    return (
        <div className="animate-in fade-in zoom-in-95 absolute top-[calc(100%+12px)] right-0 z-[60] w-[320px] overflow-hidden rounded-2xl border border-white/10 bg-black/90 p-2 shadow-2xl backdrop-blur-xl duration-200 lg:w-[400px]">
            {isLoading ? (
                <div className="flex items-center justify-center py-10">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
            ) : results.length > 0 ? (
                <div className="flex flex-col">
                    <div className="no-scrollbar flex max-h-[60vh] flex-col gap-1 overflow-y-auto p-1">
                        {results.map((anime) => (
                            <Link
                                key={anime.id}
                                href={`/anime/${anime.slug}`}
                                onClick={onResultClick}
                                className="group flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-white/5"
                            >
                                <div className="relative aspect-[2/3] h-12 overflow-hidden rounded-lg">
                                    <Image
                                        src={getTmdbImageUrl(anime.poster, 'w154')}

                                        alt={anime.name}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        sizes="48px"
                                    />
                                </div>
                                <div className="flex flex-1 flex-col gap-0.5">
                                    <span className="line-clamp-1 text-[11px] font-black tracking-tight text-white transition-colors group-hover:text-primary">
                                        {anime.name}
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <span className="flex items-center gap-1 text-[9px] font-bold text-primary">
                                            <Star className="h-2.5 w-2.5 fill-primary" />
                                            {anime.vote_average.toFixed(1)}
                                        </span>
                                        <span
                                            className={`rounded px-1.5 py-0.5 text-[8px] font-black uppercase tracking-widest ${getAnimeTypeStyles(
                                                anime.type,
                                            )}`}
                                        >
                                            {getAnimeTypeLabel(anime.type)}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                    <Link
                        href={`/directorio?search=${encodeURIComponent(search)}`}
                        onClick={onResultClick}
                        className="border-t border-white/10 p-3 text-center text-[9px] font-black tracking-[0.2em] text-white/40 uppercase transition-colors hover:bg-white/5 hover:text-primary"
                    >
                        Ver todos los resultados
                    </Link>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                    <Search className="mb-2 h-5 w-5 text-muted-foreground" />
                    <p className="text-[10px] font-black tracking-widest text-white/30 uppercase">
                        No se encontraron resultados
                    </p>
                </div>
            )}
        </div>
    );
}
