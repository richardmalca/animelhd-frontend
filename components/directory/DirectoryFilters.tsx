'use client';

import React from 'react';
import { X } from 'lucide-react';
import { FilterSection } from './FilterSection';

interface Genre {
    id: number;
    title: string;
    slug: string;
}

interface DirectoryFiltersProps {
    genres: Genre[];
    years: number[];
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    currentGenres: string[];
    toggleGenre: (slug: string) => void;
    setFilter: (key: string, value: string) => void;
    clearFilters: () => void;
    isPending: boolean;
    statusMapping: Record<string, string>;
    typeMapping: Record<string, string>;
    searchParams: URLSearchParams;
}

export function DirectoryFilters({
    genres,
    years,
    isOpen,
    setIsOpen,
    currentGenres,
    toggleGenre,
    setFilter,
    clearFilters,
    isPending,
    statusMapping,
    typeMapping,
    searchParams,
}: DirectoryFiltersProps) {
    const hasActiveFilters = searchParams.toString().length > 0;

    return (
        <aside
            className={`fixed inset-0 z-[60] flex flex-col bg-background p-8 transition-all lg:relative lg:inset-auto lg:z-0 lg:block lg:w-60 lg:bg-transparent lg:p-0 ${
                isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
            }`}
        >
            <div className="mb-10 flex items-center justify-between lg:hidden">
                <span className="text-sm font-black tracking-widest text-muted-foreground uppercase">
                    Filtros
                </span>
                <button
                    onClick={() => setIsOpen(false)}
                    className="rounded-full bg-muted p-2"
                >
                    <X className="h-5 w-5 text-foreground" />
                </button>
            </div>

            <div className="no-scrollbar flex flex-col gap-12 overflow-y-auto pb-10">
                {hasActiveFilters && (
                    <button
                        onClick={clearFilters}
                        className="flex items-center gap-2 text-[10px] font-black tracking-widest text-primary uppercase transition-colors hover:opacity-80"
                    >
                        <X className="h-3 w-3" />
                        Limpiar todos los filtros
                    </button>
                )}

                <FilterSection
                    title="Géneros"
                    maxHeight="max-h-[35vh]"
                    isPending={isPending}
                    onOptionClick={toggleGenre}
                    options={genres.map((g) => ({
                        key: g.slug,
                        label: g.title,
                        isActive: currentGenres.includes(g.slug),
                    }))}
                />

                <FilterSection
                    title="Año de Estreno"
                    maxHeight="max-h-[25vh]"
                    isPending={isPending}
                    onOptionClick={(key) => setFilter('year', key)}
                    options={years.map((y) => ({
                        key: y.toString(),
                        label: y,
                        isActive: searchParams.get('year') === y.toString(),
                    }))}
                />

                <FilterSection
                    title="Estado"
                    isPending={isPending}
                    onOptionClick={(key) => setFilter('status', key)}
                    options={Object.entries(statusMapping).map(([key, label]) => ({
                        key,
                        label,
                        isActive: searchParams.get('status') === key,
                    }))}
                />

                <FilterSection
                    title="Formato"
                    isPending={isPending}
                    onOptionClick={(key) => setFilter('type', key)}
                    options={Object.entries(typeMapping).map(([key, label]) => ({
                        key,
                        label,
                        isActive: searchParams.get('type') === key,
                    }))}
                />
            </div>
        </aside>
    );
}
