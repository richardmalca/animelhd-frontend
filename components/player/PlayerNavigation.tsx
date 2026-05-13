import Link from 'next/link';
import { ChevronLeft, ChevronRight, List } from 'lucide-react';
import { getTmdbImageUrl } from '@/lib/tmdb';
import type { Anime } from '@/types/anime';

interface PlayerNavigationProps {
    anime: Anime;
    episodeNumber: string | number;
    prev: number | null;
    next: number | null;
}

export function PlayerNavigation({
    anime,
    episodeNumber,
    prev,
    next,
}: PlayerNavigationProps) {
    const navButton =
        'flex h-9 w-full items-center justify-center gap-2 rounded-md border border-white/10 bg-white/5 px-2 text-[11px] font-bold text-white transition-all hover:bg-white/10 sm:h-10 sm:px-3 sm:text-base';

    const disabled = 'pointer-events-none opacity-40';

    return (
        <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4 border-b border-white/5 pb-6 lg:border-0 lg:pb-0">
                <div className="relative h-14 w-10 shrink-0 overflow-hidden rounded-md bg-muted ring-1 ring-white/10 lg:h-16 lg:w-12">
                    <img
                        src={getTmdbImageUrl(anime.poster, 'w154')}
                        alt={anime.name}
                        loading="lazy"
                        className="h-full w-full object-cover"
                    />
                </div>

                <div className="min-w-0">
                    <h3 className="line-clamp-1 text-sm font-black tracking-tight text-foreground lg:text-lg">
                        {anime.name}
                    </h3>

                    <span className="mt-1 block text-[10px] font-black tracking-[0.2em] text-primary uppercase lg:text-xs">
                        Episodio {episodeNumber}
                    </span>
                </div>
            </div>

            <div className="grid w-full grid-cols-3 gap-2 lg:w-auto">
                <Link
                    href={prev ? `/ver/${anime.slug}/${prev}` : '#'}
                    className={`${navButton} ${!prev && disabled}`}
                    aria-disabled={!prev}
                >
                    <ChevronLeft className="h-4 w-4 shrink-0" />
                    <span className="truncate">Anterior</span>
                </Link>

                <Link
                    href={`/anime/${anime.slug}`}
                    title="Lista de episodios"
                    className={navButton}
                >
                    <List className="h-5 w-5 text-white" />
                </Link>

                <Link
                    href={next ? `/ver/${anime.slug}/${next}` : '#'}
                    className={`${navButton} ${!next && disabled}`}
                    aria-disabled={!next}
                >
                    <span className="truncate">Siguiente</span>
                    <ChevronRight className="h-4 w-4 shrink-0" />
                </Link>
            </div>
        </div>
    );
}
