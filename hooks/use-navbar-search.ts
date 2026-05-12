'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { animeService } from '@/services/anime.service';

export interface AnimeSearchItem {
    id: number;
    name: string;
    slug: string;
    poster: string;
    type: string;
    vote_average: number;
}

export function useNavbarSearch() {
    const [search, setSearch] = useState('');
    const [results, setResults] = useState<AnimeSearchItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setShowResults(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const controller = new AbortController();

        const delayDebounceFn = setTimeout(async () => {
            if (search.trim().length >= 3) {
                setIsLoading(true);
                setShowResults(true);
                try {
                    const data = await animeService.search(search.trim(), controller.signal);
                    setResults(data.data || []);
                } catch (error) {
                    if (error instanceof Error && error.name !== 'AbortError') {
                        console.error('Search error:', error);
                    }
                } finally {
                    setIsLoading(false);
                }
            } else {
                setResults([]);
                setShowResults(false);
            }
        }, 300);

        return () => {
            clearTimeout(delayDebounceFn);
            controller.abort();
        };
    }, [search]);

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (search.trim()) {
            router.push(`/directorio?search=${encodeURIComponent(search.trim())}`);
            setShowResults(false);
            setSearch('');
        }
    };

    const handleResultClick = () => {
        setShowResults(false);
        setSearch('');
    };

    return {
        search,
        setSearch,
        results,
        isLoading,
        showResults,
        setShowResults,
        dropdownRef,
        handleSearchSubmit,
        handleResultClick,
    };
}
