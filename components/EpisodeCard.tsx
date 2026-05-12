'use client';

import React from 'react';
import Image from 'next/image';
import { getTmdbImageUrl } from '@/lib/tmdb';
import { Play } from 'lucide-react';
import { AnimeBaseCard } from './shared/AnimeBaseCard';

interface EpisodeCardProps {
    episode: {
        number: number;
        anime_title: string;
        anime_image: string;
        anime_slug: string;
        languages: string[];
    };
    priority?: boolean;
}

export function EpisodeCard({ episode, priority = false }: EpisodeCardProps) {
    return (
        <AnimeBaseCard
            title={episode.anime_title}
            image={getTmdbImageUrl(episode.anime_image, 'w500')}
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

                    <div className="absolute top-3 right-3 flex items-center justify-center text-[12px] font-black text-white drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">
                        EP {episode.number}
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
                                    <Image
                                        src={flagUrl}
                                        alt={lang}
                                        fill
                                        unoptimized
                                        className="h-auto object-cover"
                                    />
                                </div>
                            );
                        })}
                    </div>
                </>
            }
            footer={
                <div className="mt-4 px-1">
                    <h3 className="line-clamp-2 h-10 text-[14px] font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
                        {episode.anime_title}
                    </h3>
                </div>
            }
        />
    );
}
