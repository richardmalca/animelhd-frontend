import React from 'react';
import { Calendar, Hash } from 'lucide-react';
import { getTmdbImageUrl } from '@/lib/tmdb';
import { AnimeBaseCard } from './AnimeBaseCard';


interface AnimeData {
    id: number;
    name: string;
    slug: string;
    poster: string;
    last_episode_number: number;
    last_episode_at: string;
}

interface AnimeListItemProps {
    anime: AnimeData;
}

export function AnimeListItem({ anime }: AnimeListItemProps) {

    return (
        <AnimeBaseCard
            title={anime.name}
            image={getTmdbImageUrl(anime.poster)}
            href={`/anime/${anime.slug}`}
            overlay={
                <>

                    <div className="absolute top-3 right-3 flex items-center gap-1 text-[11px] font-black text-white drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">
                        <Hash className="h-2.5 w-2.5 text-primary drop-shadow-[0_1px_2px_rgba(0,0,0,1)]" />
                        EP {anime.last_episode_number}
                    </div>





                    <div className="absolute right-3 bottom-3 left-3 flex translate-y-4 flex-col gap-1 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                        <div className="flex items-center gap-2 text-[8px] font-black tracking-tighter text-white/70 uppercase">
                            <Calendar className="h-2.5 w-2.5" />
                            {new Date(anime.last_episode_at).toLocaleDateString('es-ES', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                            })}
                        </div>
                    </div>
                </>
            }
            footer={
                <div className="mt-4 px-1">
                    <h3 className="line-clamp-2 h-10 text-[14px] font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
                        {anime.name}
                    </h3>
                </div>

            }
        />
    );

}
