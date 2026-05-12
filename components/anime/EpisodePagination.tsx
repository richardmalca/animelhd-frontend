'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface EpisodePaginationProps {
    activeChunk: number;
    setActiveChunk: (chunk: number) => void;
    pages: (string | number)[];
    nextPage: () => void;
    prevPage: () => void;
    totalPages: number;
}

export function EpisodePagination({
    activeChunk,
    setActiveChunk,
    pages,
    nextPage,
    prevPage,
    totalPages,
}: EpisodePaginationProps) {
    if (totalPages <= 1) return null;

    return (
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 border-t border-border/40 pt-8 md:justify-start">
            <button
                onClick={prevPage}
                disabled={activeChunk === 0}
                className="flex items-center gap-2 rounded-xl bg-muted/30 px-4 py-2.5 text-[10px] font-black tracking-widest text-muted-foreground uppercase transition-all hover:bg-muted/60 hover:text-foreground disabled:opacity-30"
            >
                <ChevronLeft className="h-3.5 w-3.5" />
                <span className="hidden md:block">Anterior</span>
            </button>

            <div className="flex items-center gap-1.5">
                {pages.map((page, i) => {
                    if (page === '...') {
                        return (
                            <span
                                key={`sep-${i}`}
                                className="flex h-10 w-8 items-center justify-center text-[10px] font-black tracking-widest text-muted-foreground"
                            >
                                •••
                            </span>
                        );
                    }
                    return (
                        <button
                            key={page}
                            onClick={() => setActiveChunk(Number(page))}
                            className={`flex h-10 min-w-[40px] items-center justify-center rounded-xl px-3 text-[11px] font-black tracking-tight transition-all ${
                                activeChunk === page
                                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                                    : 'bg-muted/30 text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                            }`}
                        >
                            {Number(page) + 1}
                        </button>
                    );
                })}
            </div>

            <button
                onClick={nextPage}
                disabled={activeChunk === totalPages - 1}
                className="flex items-center gap-2 rounded-xl bg-muted/30 px-4 py-2.5 text-[10px] font-black tracking-widest text-muted-foreground uppercase transition-all hover:bg-muted/60 hover:text-foreground disabled:opacity-30"
            >
                <span className="hidden md:block">Siguiente</span>
                <ChevronRight className="h-3.5 w-3.5" />
            </button>
        </div>
    );
}
