'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
    currentPage: number;
    lastPage: number;
    onPageChange: (page: number) => void;
    isPending?: boolean;
}

export function Pagination({
    currentPage,
    lastPage,
    onPageChange,
    isPending = false,
}: PaginationProps) {
    if (lastPage <= 1) return null;

    return (
        <div className="mt-20 flex items-center justify-center gap-8">
            <button
                disabled={currentPage === 1 || isPending}
                onClick={() => onPageChange(currentPage - 1)}
                className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted/30 text-muted-foreground transition-all hover:bg-primary hover:text-white disabled:opacity-0"
            >
                <ChevronLeft className="h-6 w-6" />
            </button>

            <div className="flex flex-col items-center gap-0.5">
                <span className="text-[10px] font-black tracking-widest text-muted-foreground uppercase">
                    Página
                </span>
                <span className="text-sm font-black text-foreground">
                    {currentPage}
                    <span className="mx-2 text-muted-foreground">/</span>
                    {lastPage}
                </span>
            </div>

            <button
                disabled={currentPage === lastPage || isPending}
                onClick={() => onPageChange(currentPage + 1)}
                className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted/30 text-muted-foreground transition-all hover:bg-primary hover:text-white disabled:opacity-0"
            >
                <ChevronRight className="h-6 w-6" />
            </button>
        </div>
    );
}
