'use client';

import React from 'react';
import Link from 'next/link';
import { AlertCircle, ArrowLeft, Home, Search } from 'lucide-react';

interface EpisodeNotFoundProps {
    slug: string;
    number: string;
}

export function EpisodeNotFound({ slug, number }: EpisodeNotFoundProps) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center px-6 pt-32 pb-20 text-center md:pt-40">
            <div className="mb-8 rounded-full bg-primary/10 p-8 ring-1 ring-primary/20 animate-pulse">
                <AlertCircle className="h-16 w-16 text-primary" />
            </div>
            
            <h1 className="mb-4 text-4xl font-black tracking-tighter text-foreground md:text-5xl">
                Episodio no <span className="text-primary">disponible</span>
            </h1>
            
            <p className="max-w-md text-lg font-medium text-muted-foreground">
                Lo sentimos, el episodio <span className="text-foreground font-bold">{number}</span> de este anime aún no está disponible o ha sido retirado temporalmente.
            </p>
            
            <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
                <Link
                    href={`/anime/${slug}`}
                    className="flex items-center gap-2 rounded-2xl bg-primary px-8 py-4 text-sm font-black uppercase tracking-widest text-primary-foreground shadow-xl shadow-primary/20 transition-all hover:scale-105 hover:opacity-90 active:scale-95"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Volver al Anime
                </Link>
                
                <Link
                    href="/"
                    className="flex items-center gap-2 rounded-2xl bg-muted/30 px-8 py-4 text-sm font-black uppercase tracking-widest text-foreground ring-1 ring-border transition-all hover:bg-muted/50 active:scale-95"
                >
                    <Home className="h-4 w-4" />
                    Inicio
                </Link>
            </div>
            
            <div className="mt-16 flex flex-col items-center gap-4 border-t border-border/40 pt-10">
                <p className="text-[10px] font-black tracking-[0.3em] text-muted-foreground uppercase">
                    ¿Buscas algo más?
                </p>
                <Link
                    href="/directorio"
                    className="group flex items-center gap-3 text-sm font-bold text-muted-foreground transition-colors hover:text-primary"
                >
                    <Search className="h-4 w-4 transition-transform group-hover:scale-110" />
                    Explorar Directorio
                </Link>
            </div>
        </div>
    );
}
