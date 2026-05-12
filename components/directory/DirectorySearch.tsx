'use client';

import React from 'react';
import { Search, Filter, X } from 'lucide-react';

interface DirectorySearchProps {
    value: string;
    onChange: (value: string) => void;
    onOpenFilters: () => void;
    isPending: boolean;
}

export function DirectorySearch({
    value,
    onChange,
    onOpenFilters,
    isPending,
}: DirectorySearchProps) {
    return (
        <div className="mb-10 flex items-center gap-4">
            <div className="relative flex-1">
                <Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                    type="text"
                    placeholder="Buscar por nombre o estudio..."
                    value={value}
                    disabled={isPending}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full rounded-2xl bg-muted/30 py-3 pr-12 pl-12 text-[14px] font-medium text-foreground ring-1 ring-border/50 transition-all outline-none focus:bg-muted/50 focus:ring-primary/50 disabled:opacity-50"
                />
                {value && (
                    <button
                        onClick={() => onChange('')}
                        className="absolute top-1/2 right-4 -translate-y-1/2 rounded-full bg-muted p-1 text-muted-foreground hover:text-foreground"
                    >
                        <X className="h-3 w-3" />
                    </button>
                )}
            </div>
            <button
                onClick={onOpenFilters}
                className="flex items-center gap-2 rounded-2xl bg-muted/30 px-5 py-3 text-[11px] font-black tracking-widest text-foreground ring-1 ring-border/50 transition-all hover:bg-muted/50 lg:hidden"
            >
                <Filter className="h-4 w-4" /> FILTROS
            </button>
        </div>
    );
}
