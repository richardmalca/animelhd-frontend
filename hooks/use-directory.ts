'use client';

import { useState, useEffect, useTransition, useMemo, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export function useDirectory() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');

    const currentGenresSlugs = useMemo(
        () => searchParams.get('genre')?.split(',').filter(Boolean) || [],
        [searchParams]
    );

    const typeMapping = {
        TV: 'Serie',
        Movie: 'Película',
        Special: 'Especial',
        OVA: 'Ova',
        ONA: 'Ona',
    };

    const statusMapping = {
        '0': 'Finalizado',
        '1': 'En Emisión',
        '2': 'Pausado',
        '3': 'Próximamente',
    };

    const yearsList = useMemo(() => {
        const currentYear = new Date().getFullYear();
        return Array.from({ length: currentYear - 1970 + 1 }, (_, i) => currentYear - i);
    }, []);

    const genresList = [
        { label: 'Acción', slug: 'accion' },
        { label: 'Artes Marciales', slug: 'artes-marciales' },
        { label: 'Aventura', slug: 'aventura' },
        { label: 'Ciencia Ficción', slug: 'ciencia-ficcion' },
        { label: 'Comedia', slug: 'comedia' },
        { label: 'Deportes', slug: 'deportes' },
        { label: 'Detectives', slug: 'detectives' },
        { label: 'Drama', slug: 'drama' },
        { label: 'Ecchi', slug: 'ecchi' },
        { label: 'Escolar', slug: 'escolar' },
        { label: 'Espacio', slug: 'espacio' },
        { label: 'Fantasía', slug: 'fantasia' },
        { label: 'Gore', slug: 'gore' },
        { label: 'Harem', slug: 'harem' },
        { label: 'Histórico', slug: 'historico' },
        { label: 'Horror', slug: 'horror' },
        { label: 'Isekai', slug: 'isekai' },
        { label: 'Josei', slug: 'josei' },
        { label: 'Juegos', slug: 'juegos' },
        { label: 'Mahou Shoujo', slug: 'mahou-shoujo' },
        { label: 'Mecha', slug: 'mecha' },
        { label: 'Militar', slug: 'militar' },
        { label: 'Misterio', slug: 'misterio' },
        { label: 'Mitológico', slug: 'mitologico' },
        { label: 'Musica', slug: 'musica' },
        { label: 'Parodia', slug: 'parodia' },
        { label: 'Psicológico', slug: 'psicologico' },
        { label: 'Recuentos De La Vida', slug: 'recuentos-de-la-vida' },
        { label: 'Romance', slug: 'romance' },
        { label: 'Samurais', slug: 'samurais' },
        { label: 'Seinen', slug: 'seinen' },
        { label: 'Shoujo', slug: 'shoujo' },
        { label: 'Shoujo Ai', slug: 'shoujo-ai' },
        { label: 'Shounen', slug: 'shounen' },
        { label: 'Shounen Ai', slug: 'shounen-ai' },
        { label: 'Sobrenatural', slug: 'sobrenatural' },
        { label: 'Soft Hentai', slug: 'soft-hentai' },
        { label: 'Super Poderes', slug: 'super-poderes' },
        { label: 'Suspenso', slug: 'suspenso' },
        { label: 'Vampiros', slug: 'vampiros' },
    ];

    useEffect(() => {
        const currentSearch = searchParams.get('search') || '';
        if (searchTerm === currentSearch) return;

        const delayDebounceFn = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());
            if (searchTerm) params.set('search', searchTerm);
            else params.delete('search');

            params.set('page', '1');
            startTransition(() => {
                router.push(`/directorio?${params.toString()}`, { scroll: false });
            });
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm, searchParams, router]);

    const toggleGenre = useCallback((slug: string) => {
        const params = new URLSearchParams(searchParams.toString());
        const newGenres = currentGenresSlugs.includes(slug)
            ? currentGenresSlugs.filter((g) => g !== slug)
            : [...currentGenresSlugs, slug];

        if (newGenres.length > 0) params.set('genre', newGenres.join(','));
        else params.delete('genre');

        params.set('page', '1');
        startTransition(() =>
            router.push(`/directorio?${params.toString()}`, { scroll: false })
        );
    }, [currentGenresSlugs, searchParams, router]);

    const setFilter = useCallback((key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (params.get(key) === value) params.delete(key);
        else params.set(key, value);

        params.set('page', '1');
        startTransition(() =>
            router.push(`/directorio?${params.toString()}`, { scroll: false })
        );
    }, [searchParams, router]);

    const clearFilters = useCallback(() => {
        setSearchTerm('');
        startTransition(() => {
            router.push('/directorio', { scroll: false });
        });
    }, [router]);

    return {
        searchTerm,
        setSearchTerm,
        isFilterOpen,
        setIsFilterOpen,
        currentGenresSlugs,
        toggleGenre,
        setFilter,
        clearFilters,
        isPending,
        typeMapping,
        statusMapping,
        yearsList,
        genresList,
        searchParams,
    };
}
