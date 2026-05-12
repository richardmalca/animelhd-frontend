'use client';

import { useState, useMemo } from 'react';


interface Episode {
    id: number;
    number: string;
}

interface AnimeDetail {
    name: string;
    slug: string;
    name_alternative?: string;
    broadcast?: string | number;
    status: string | number;
}

export function useAnimeDetail(anime: AnimeDetail, episodes: Episode[], initialOrder: string = 'desc') {
    const [searchTerm, setSearchTerm] = useState('');
    const [isAsc, setIsAsc] = useState(initialOrder === 'asc');
    const [activeChunk, setActiveChunk] = useState(0);

    const toggleOrder = () => {
        const newOrder = !isAsc;
        setIsAsc(newOrder);
        setActiveChunk(0);
        const orderStr = newOrder ? 'asc' : 'desc';
        document.cookie = `episodeOrder=${orderStr}; path=/; max-age=31536000`;
        localStorage.setItem('episodeOrder', orderStr);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value.replace(/\D/g, '');
        setSearchTerm(val);
        setActiveChunk(0);
    };

    const filteredEpisodes = useMemo(() => {
        let result = [...episodes];
        if (searchTerm) {
            result = result.filter(
                (ep) =>
                    ep.number.toString() === searchTerm ||
                    ep.number.toString().startsWith(searchTerm),
            );
        }
        if (isAsc) result.reverse();
        return result;
    }, [episodes, searchTerm, isAsc]);

    const chunkedEpisodes = useMemo(() => {
        if (episodes.length <= 24 && !searchTerm) return [filteredEpisodes];
        
        const size = 50;
        const chunks = [];
        for (let i = 0; i < filteredEpisodes.length; i += size) {
            chunks.push(filteredEpisodes.slice(i, i + size));
        }
        return chunks;
    }, [filteredEpisodes, episodes.length, searchTerm]);

    const alternatives = useMemo(() => {
        return (
            anime.name_alternative
                ?.split(',')
                .map((s: string) => s.trim())
                .filter(Boolean)
                .join(' • ') || ''
        );
    }, [anime.name_alternative]);

    const getBroadcastDay = (day: string | number) => {
        const days: { [key: string]: string } = {
            '1': 'Lunes',
            '2': 'Martes',
            '3': 'Miércoles',
            '4': 'Jueves',
            '5': 'Viernes',
            '6': 'Sábado',
            '7': 'Domingo',
        };
        return days[day.toString()] || day.toString();
    };



    const pages = useMemo(() => {
        const total = chunkedEpisodes.length;
        if (total <= 7) return Array.from({ length: total }, (_, i) => i);
        
        const current = activeChunk;
        const items: (number | string)[] = [];
        
        items.push(0);
        
        if (current > 2) items.push('...');
        
        const start = Math.max(1, current - 1);
        const end = Math.min(total - 2, current + 1);
        
        for (let i = start; i <= end; i++) {
            items.push(i);
        }
        
        if (current < total - 3) items.push('...');
        
        items.push(total - 1);
        
        return items;
    }, [chunkedEpisodes.length, activeChunk]);

    const nextPage = () => {
        if (activeChunk < chunkedEpisodes.length - 1) {
            setActiveChunk(prev => prev + 1);
        }
    };

    const prevPage = () => {
        if (activeChunk > 0) {
            setActiveChunk(prev => prev - 1);
        }
    };

    return {
        searchTerm,
        setSearchTerm,
        isAsc,
        activeChunk,
        setActiveChunk,
        toggleOrder,
        handleSearchChange,
        filteredEpisodes,
        chunkedEpisodes,
        alternatives,
        getBroadcastDay,
        pages,
        nextPage,
        prevPage
    };
}
