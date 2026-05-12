import React from 'react';
import { Search } from 'lucide-react';

interface EmptyStateProps {
    title: string;
    description: string;
    onClear?: () => void;
    clearText?: string;
}

export function EmptyState({
    title,
    description,
    onClear,
    clearText = 'Limpiar Filtros',
}: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-40 text-center">
            <div className="mb-6 rounded-full bg-muted/30 p-8 ring-1 ring-border/50">
                <Search className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="mb-2 text-2xl font-black tracking-tighter text-foreground">
                {title}
            </h3>
            <p className="max-w-xs text-xs leading-relaxed tracking-[0.2em] text-muted-foreground uppercase">
                {description}
            </p>
            {onClear && (
                <button
                    onClick={onClear}
                    className="mt-8 rounded-full bg-primary px-6 py-2 text-[10px] font-black tracking-widest text-white transition-all hover:opacity-80"
                >
                    {clearText}
                </button>
            )}
        </div>
    );
}
