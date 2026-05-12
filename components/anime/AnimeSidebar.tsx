'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles } from 'lucide-react';
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
                <h2 className="mb-6 text-[10px] font-black tracking-[0.2em] text-muted-foreground uppercase">Línea del Tiempo</h2>
                <div className="flex flex-col gap-6">
                    <RelationSection title="Temporada Anterior" items={relations.prequel} emptyText="Este anime es el inicio de la historia." />
                    <RelationSection title="Próxima Temporada" items={relations.sequel} emptyText="No hay secuelas anunciadas por ahora." isNext />
                </div>
            </section>

            <section>
                <h2 className="mb-6 text-[10px] font-black tracking-[0.2em] text-muted-foreground uppercase">También te puede interesar</h2>
                {relations.related.length > 0 ? (
                    <div className="flex flex-col gap-3">
                        {relations.related.map((rel) => (
                            <Link key={rel.id} href={`/anime/${rel.slug}`} className="group flex items-center gap-4 rounded-xl bg-muted/20 p-2.5 transition-all hover:scale-102 hover:bg-muted">
                                <div className="relative h-12 w-9 shrink-0 overflow-hidden rounded-md shadow-lg">
                                    <Image
                                        src={getTmdbImageUrl(rel.poster)}
                                        alt={rel.name}
                                        fill
                                        className="object-cover"
                                        sizes="36px"
                                    />
                                </div>

                                <div className="flex flex-col gap-0.5">
                                    <span className="line-clamp-1 text-[13px] font-bold text-muted-foreground transition-colors group-hover:text-foreground">{rel.name}</span>
                                    <span className="text-[9px] font-bold tracking-widest text-muted-foreground uppercase">{getAnimeTypeLabel(rel.type)}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center rounded-2xl border border-dashed border-border bg-muted/20 p-6 text-center">
                        <Sparkles className="mb-3 h-8 w-8 text-muted-foreground" />
                        <p className="text-[11px] leading-relaxed font-bold text-muted-foreground">Estamos buscando animes similares para recomendarte pronto.</p>
                    </div>
                )}
            </section>
        </div>
    );
}

function RelationSection({ title, items, emptyText, isNext }: { title: string; items: AnimeRelation[]; emptyText: string; isNext?: boolean }) {
    return (
        <>
            {items.length > 0 ? (
                items.map((rel) => (
                    <div key={rel.id} className={`relative border-l pb-2 pl-6 ${isNext ? 'border-primary/30' : 'border-border'}`}>
                        <div className={`absolute top-0 -left-1.5 h-3 w-3 rounded-full ring-4 ring-background ${isNext ? 'bg-primary' : 'bg-muted'}`} />
                        <span className={`text-[9px] font-black tracking-[0.2em] uppercase ${isNext ? 'text-primary/80' : 'text-muted-foreground'}`}>{title}</span>
                        <Link href={`/anime/${rel.slug}`} className={`group mt-3 flex items-start gap-4 rounded-xl bg-muted/40 p-3 ring-1 transition-all hover:scale-102 hover:bg-accent ${isNext ? 'ring-primary/20' : 'ring-border'}`}>
                            <div className="relative h-14 w-10 shrink-0 overflow-hidden rounded-lg shadow-xl">
                                <Image
                                    src={getTmdbImageUrl(rel.poster)}
                                    alt={rel.name}
                                    fill
                                    className="object-cover"
                                    sizes="40px"
                                />
                            </div>

                            <div className="flex flex-col gap-0.5 pt-0.5">
                                <span className="line-clamp-1 text-[13px] font-bold text-foreground transition-colors group-hover:text-primary">{rel.name}</span>
                                <span className={`text-[10px] font-bold tracking-widest uppercase ${isNext ? 'text-primary' : 'text-muted-foreground'}`}>{getAnimeTypeLabel(rel.type)}</span>
                            </div>
                        </Link>
                    </div>
                ))
            ) : (
                <div className="relative border-l border-border/30 pb-2 pl-6">
                    <div className="absolute top-0 -left-1.5 h-3 w-3 rounded-full bg-muted/30 ring-4 ring-background" />
                    <span className="text-[9px] font-black tracking-[0.2em] text-muted-foreground uppercase">{title}</span>
                    <p className="mt-2 text-[11px] font-bold text-muted-foreground">{emptyText}</p>
                </div>
            )}
        </>
    );
}
