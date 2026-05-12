'use client';

import React from 'react';
import { Star, Play } from 'lucide-react';
import { getAnimeTypeStyles, getAnimeTypeLabel } from '@/lib/anime-utils';
import { AnimeBaseCard } from './shared/AnimeBaseCard';

interface AnimeCardProps {
    title: string;
    image: string;
    slug: string;
    vote_average?: number;
    type?: string;
    compact?: boolean;
    priority?: boolean;
}

export function AnimeCard({ title, image, slug, vote_average = 0, type, compact = false, priority = false }: AnimeCardProps) {

    const displayType = getAnimeTypeLabel(type || '');
    const typeStyles = getAnimeTypeStyles(type || '');

    if (compact) {
        return (
            <AnimeBaseCard
                title={title}
                image={image}
                href={`/anime/${slug}`}
                priority={priority}
                sizes="(max-width: 640px) 33vw, (max-width: 1024px) 20vw, 15vw"

                footer={
                    <div className="mt-1.5">
                        <h3 className="line-clamp-2 h-8 text-[9px] font-bold leading-tight text-muted-foreground group-hover:text-foreground transition-colors">
                            {title}
                        </h3>

                    </div>
                }
            />
        );
    }

    return (
        <AnimeBaseCard
            title={title}
            image={image}
            href={`/anime/${slug}`}
            priority={priority}
            imageClassName="group-hover:opacity-40"

            overlay={

                <>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary shadow-xl shadow-primary/20">
                            <Play className="h-6 w-6 fill-primary-foreground text-primary-foreground translate-x-0.5" />
                        </div>
                    </div>

                    {vote_average > 0 && (
                        <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-lg bg-black/80 px-2 py-1 text-[10px] font-black text-white ring-1 ring-white/10 shadow-xl">
                            <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                            {vote_average.toFixed(1)}
                        </div>
                    )}




                    {displayType && (
                        <div className="absolute top-3 left-3">
                            <span className={`rounded-[4px] px-2 py-1 text-[7px] font-black uppercase tracking-[0.2em] ${typeStyles}`}>
                                {displayType}
                            </span>
                        </div>
                    )}
                </>
            }
        />
    );
}
