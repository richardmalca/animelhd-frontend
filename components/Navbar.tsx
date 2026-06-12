'use client';

import React from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { useNavbarSearch } from '@/hooks/use-navbar-search';
import { useBanner } from '@/hooks/use-banner';
import { NavLinks } from '@/components/navbar/NavLinks';
import { SearchResults } from '@/components/navbar/SearchResults';

export function Navbar() {
    const {
        search,
        setSearch,
        results,
        isLoading,
        showResults,
        dropdownRef,
        handleSearchSubmit,
        handleResultClick,
    } = useNavbarSearch();

    return (
        <nav className="fixed top-0 z-50 w-full border-b border-border bg-black">
            <div className="flex h-14 w-full items-center justify-between px-4 sm:px-6 lg:px-10">
                <div className="flex items-center gap-4 sm:gap-10">
                    <Link href="/" className="flex shrink-0 items-center">
                        <span className="text-xl font-black tracking-tighter text-foreground sm:text-2xl">
                            ANIME<span className="text-primary">LHD</span>
                        </span>
                    </Link>

                    <NavLinks />
                </div>

                <div className="flex items-center gap-2 sm:gap-4">
                    <div className="relative" ref={dropdownRef}>
                        <form onSubmit={handleSearchSubmit} suppressHydrationWarning>
                            <Search className="absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Buscar anime..."
                                autoComplete="off"
                                spellCheck={false}
                                suppressHydrationWarning
                                className="h-9 w-44 rounded-full bg-white/5 pr-4 pl-9 text-base font-bold text-white ring-1 ring-white/10 transition-all outline-none focus:bg-white/10 focus:ring-primary/50 sm:w-64 sm:text-sm sm:focus:w-80"
                            />
                        </form>

                        {showResults && (
                            <SearchResults 
                                isLoading={isLoading}
                                results={results}
                                search={search}
                                onResultClick={handleResultClick}
                            />
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}