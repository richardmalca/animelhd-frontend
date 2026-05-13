'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, Sparkles } from 'lucide-react';
import { getTmdbImageUrl } from '@/lib/tmdb';
import { getAnimeTypeLabel } from '@/lib/anime-utils';

interface AnimeRelation {
    id: number;
    name: string;
    slug: string;
    poster: string;
    type: string;
}

interface AnimeSidebarProps {
    relations: {
        prequel: AnimeRelation[];
        sequel: AnimeRelation[];
        related: AnimeRelation[];
    };
}

export function AnimeSidebar({ relations }: AnimeSidebarProps) {
    return (
        <div className="flex flex-col gap-12">
            <section>
                <div className="mb-6 pb-2">
                    <h2 className="text-sm font-bold text-foreground uppercase tracking-normal">
                        <span className="border-b-2 border-primary pb-1">
                            Línea del Tiempo
                        </span>
                    </h2>
                </div>
                <div className="flex flex-col gap-6">
                    <RelationSection
                        title="Temporada Anterior"
                        items={relations.prequel}
                        emptyText="Este anime es el inicio de la historia."
                    />
                    <RelationSection
                        title="Próxima Temporada"
                        items={relations.sequel}
                        emptyText="No hay secuelas anunciadas por ahora."
                        isNext
                    />
                </div>
            </section>

            <section>
                <div className="mb-6 pb-2">
                    <h2 className="text-sm font-bold text-foreground uppercase tracking-normal">
                        <span className="border-b-2 border-primary pb-1">
                            También te puede interesar
                        </span>
                    </h2>
                </div>
                {relations.related.length > 0 ? (
                    <div className="flex flex-col gap-3">
                        {relations.related.map((rel) => (
                            <Link
                                key={rel.id}
                                href={`/anime/${rel.slug}`}
                                className="group flex items-start gap-4 rounded-xl bg-white/5 p-3 ring-1 ring-white/10 transition-all hover:bg-white/10"
                            >
                                <div className="relative h-14 w-10 shrink-0 overflow-hidden rounded-lg shadow-2xl">
                                    <Image
                                        src={getTmdbImageUrl(rel.poster)}
                                        alt={rel.name}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        sizes="40px"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                </div>

                                <div className="flex flex-col gap-1 pt-0.5">
                                    <span className="line-clamp-1 text-[13px] font-black text-foreground transition-colors group-hover:text-primary">
                                        {rel.name}
                                    </span>
                                    <div className="flex w-fit items-center rounded-full bg-white/5 px-2 py-0.5 text-[8px] font-black tracking-widest text-muted-foreground/60 uppercase ring-1 ring-white/10">
                                        {getAnimeTypeLabel(rel.type)}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center rounded-2xl border border-dashed border-border bg-muted/20 p-6 text-center">
                        <Sparkles className="mb-3 h-8 w-8 text-muted-foreground" />
                        <p className="text-[11px] leading-relaxed font-bold text-muted-foreground">
                            Estamos buscando animes similares para recomendarte
                            pronto.
                        </p>
                    </div>
                )}
            </section>
        </div>
    );
}

function RelationSection({
    title,
    items,
    emptyText,
    isNext,
}: {
    title: string;
    items: AnimeRelation[];
    emptyText: string;
    isNext?: boolean;
}) {
    return (
        <>
            {items.length > 0 ? (
                items.map((rel) => (
                    <div
                        key={rel.id}
                        className={`relative border-l pb-4 pl-6 transition-colors ${isNext ? 'border-primary/30' : 'border-white/10'}`}
                    >
                        <div
                            className={`absolute top-0 -left-1.5 h-3 w-3 rounded-full ring-4 ring-black ${isNext ? 'animate-pulse bg-primary' : 'bg-muted-foreground/20'}`}
                        />

                        <div
                            className={`flex items-center gap-1.5 text-[9px] font-black tracking-[0.2em] uppercase ${isNext ? 'text-primary' : 'text-muted-foreground'}`}
                        >
                            <Clock className="h-2.5 w-2.5" />
                            {title}
                        </div>

                        <Link
                            href={`/anime/${rel.slug}`}
                            className={`group mt-3 flex items-start gap-4 rounded-xl bg-white/5 p-3 ring-1 transition-all hover:bg-white/10 ${isNext ? 'ring-primary/20' : 'ring-white/10'}`}
                        >
                            <div className="relative h-14 w-10 shrink-0 overflow-hidden rounded-lg shadow-2xl">
                                <Image
                                    src={getTmdbImageUrl(rel.poster)}
                                    alt={rel.name}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    sizes="40px"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            </div>

                            <div className="flex flex-col gap-1 pt-0.5">
                                <span className="line-clamp-1 text-[13px] font-black text-foreground transition-colors group-hover:text-primary">
                                    {rel.name}
                                </span>
                                <div
                                    className={`flex w-fit items-center rounded-full bg-white/5 px-2 py-0.5 text-[8px] font-black tracking-widest uppercase ring-1 ${isNext ? 'text-primary ring-primary/20' : 'text-muted-foreground ring-white/10'}`}
                                >
                                    {getAnimeTypeLabel(rel.type)}
                                </div>
                            </div>
                        </Link>
                    </div>
                ))
            ) : (
                <div className="relative border-l border-white/5 pb-2 pl-6">
                    <div className="absolute top-0 -left-1.5 h-3 w-3 rounded-full bg-white/5 ring-4 ring-black" />
                    <div className="flex items-center gap-1.5 text-[9px] font-black tracking-[0.2em] text-muted-foreground uppercase">
                        <Clock className="h-2.5 w-2.5" />
                        {title}
                    </div>
                    <p className="mt-2 text-[11px] font-bold text-muted-foreground">
                        {emptyText}
                    </p>
                </div>
            )}
        </>
    );
}
