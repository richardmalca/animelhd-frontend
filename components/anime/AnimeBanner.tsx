'use client';

import { getTmdbImageUrl } from '@/lib/tmdb';
import { getAnimeTypeStyles, getAnimeTypeLabel } from '@/lib/anime-utils';

interface AnimeBannerProps {
    anime: {
        name: string;
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
    getBroadcastDay: (broadcast: string | number) => string;
}

export function AnimeBanner({ anime, getBroadcastDay }: AnimeBannerProps) {
    const typeStyles = getAnimeTypeStyles(anime.type);
    const displayType = getAnimeTypeLabel(anime.type);
    const genres = anime.genres?.split(',').filter(Boolean) || [];

    return (
        <div className="relative h-[40vh] w-full lg:h-[50vh]">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-background via-background/40 to-transparent" />
                <img
                    src={getTmdbImageUrl(anime.banner || anime.poster, 'w1280')}
                    alt={anime.name}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover object-top opacity-30"
                />
            </div>
        </div>
    );
}
