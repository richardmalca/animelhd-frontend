'use client';

import React from 'react';
import { getTmdbImageUrl } from '@/lib/tmdb';
import { Play } from 'lucide-react';
import { formatRelativeTime } from '@/lib/date-utils';
import { AnimeBaseCard } from './shared/AnimeBaseCard';

interface EpisodeCardProps {
    episode: {
        number: number;
        anime_title: string;
        anime_image: string;
        anime_slug: string;
        languages: string[];
        created_at?: string;
    };
    priority?: boolean;
}

export function EpisodeCard({ episode, priority = false }: EpisodeCardProps) {
    return (
        <AnimeBaseCard
            title={episode.anime_title}
            image={getTmdbImageUrl(episode.anime_image, 'w300')}
            href={`/ver/${episode.anime_slug}/${episode.number}`}
            priority={priority}
            aspectRatio="16/9"
            imageClassName="group-hover:opacity-50"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            overlay={
                <>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary shadow-xl shadow-primary/20">
                            <Play className="h-6 w-6 translate-x-0.5 fill-primary-foreground text-primary-foreground" />
                        </div>
                    </div>

                    <div className="absolute top-2 left-2 z-10 text-[0.65rem] font-bold text-white uppercase [text-shadow:1px_1px_1px_#000] transition-opacity duration-200 ease-out">
                        {episode.created_at
                            ? formatRelativeTime(episode.created_at)
                            : 'RECIENTE'}
                    </div>

                    <div className="absolute bottom-3 left-3 flex gap-1.5">
                        {episode.languages.map((lang) => {
                            const flagMap: Record<string, string> = {
                                sub: '/images/flags/jp.svg',
                                lat: '/images/flags/mx.svg',
                                cas: '/images/flags/es.svg',
                                esp: '/images/flags/es.svg',
                            };
                            const flagUrl = flagMap[lang.toLowerCase()] || null;
                            if (!flagUrl) return null;

                            return (
                                <div
                                    key={lang}
                                    className="relative h-3 w-4.5 overflow-hidden rounded-[2px] shadow-sm ring-1 ring-white/20"
                                >
                                    <img
                                        src={flagUrl}
                                        alt={lang}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                            );
                        })}
                    </div>
                </>
            }
            footer={
                <div className="mt-2 flex items-center justify-between gap-2 px-1">
                    <h3 className="truncate text-[13px] font-bold tracking-normal text-foreground/90 transition-colors group-hover:text-primary">
                        {episode.anime_title}
                    </h3>
                    <span className="shrink-0 pl-2 text-[0.65rem] font-normal uppercase text-muted-foreground">
                        EP. {episode.number}
                    </span>
                </div>
            }
        />
    );
}
