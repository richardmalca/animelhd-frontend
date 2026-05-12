'use client';

import React from 'react';
import Link from 'next/link';
import { Search, Home, Ghost, Compass } from 'lucide-react';

export function AnimeNotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center px-6 pt-32 pb-20 text-center md:pt-40">
            <div className="mb-8 rounded-full bg-muted/30 p-8 ring-1 ring-border/50">
                <Ghost className="h-16 w-16 text-muted-foreground animate-bounce" />
            </div>
            
            <h1 className="mb-4 text-4xl font-black tracking-tighter text-foreground md:text-5xl">
                Anime no <span className="text-primary">encontrado</span>
            </h1>
            
            <p className="max-w-md text-lg font-medium text-muted-foreground">
                Parece que el anime que buscas no existe en nuestra base de datos o ha cambiado de dirección.
            </p>
            
            <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
                <Link
                    href="/directorio"
                    className="flex items-center gap-2 rounded-2xl bg-primary px-8 py-4 text-sm font-black uppercase tracking-widest text-primary-foreground shadow-xl shadow-primary/20 transition-all hover:scale-105 hover:opacity-90 active:scale-95"
                >
                    <Compass className="h-4 w-4" />
                    Ir al Directorio
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
                    ¿Buscas algo específico?
                </p>
                <div className="relative w-full max-w-xs">
                    <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input 
                        type="text" 
                        readOnly
                        placeholder="Usa el buscador arriba..."
                        className="w-full rounded-2xl bg-muted/20 py-3 pl-10 pr-4 text-xs font-bold text-muted-foreground ring-1 ring-border/50 outline-none cursor-default"
                    />
                </div>
            </div>
        </div>
    );
}
