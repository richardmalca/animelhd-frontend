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
    aired?: string;
    compact?: boolean;
    priority?: boolean;
}

export function AnimeCard({ 
    title, 
    image, 
    slug, 
    vote_average = 0, 
    type, 
    aired,
    compact = false, 
    priority = false 
}: AnimeCardProps) {

    const displayType = getAnimeTypeLabel(type || '');
    const typeStyles = getAnimeTypeStyles(type || '');
    const year = aired ? new Date(aired).getFullYear() : null;

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

            overlay={
                <>
                    {vote_average > 0 && (
                        <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-lg bg-black/65 px-2 py-1 text-[10px] font-black text-white ring-1 ring-white/10 shadow-xl">
                            <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                            {vote_average.toFixed(1)}
                        </div>
                    )}
                </>
            }
            footer={
                <div className="mt-2.5 px-1">
                    <h3 className="truncate text-[13px] font-bold tracking-normal text-foreground transition-colors group-hover:text-primary">
                        {title}
                    </h3>
                    {year && (
                        <p className="mt-0.5 text-[11px] font-medium text-muted-foreground">
                            {year}
                        </p>
                    )}
                </div>
            }
        />
    );
}
