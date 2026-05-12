import React from 'react';
import { animeService } from '@/services/anime.service';
import { DirectoryClient } from '@/components/DirectoryClient';
import { Metadata } from 'next';

export const revalidate = 3600;

interface PageProps {
    searchParams: Promise<{ [key: string]: string | undefined }>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
    const params = await searchParams;
    const search = params.search;
    const genre = params.genre;
    const year = params.year;
    const type = params.type;

    let title = 'Directorio de Anime - Lista Completa Online';
    const description = 'Explora nuestro amplio directorio de anime. Filtra por género, año, tipo o busca tus series favoritas para ver online en HD gratis.';

    if (search) {
        title = `Resultados para "${search}" - Directorio Anime`;
    } else if (genre || year || type) {
        const parts = [];
        if (genre) parts.push(`Género ${genre}`);
        if (type) parts.push(type);
        if (year) parts.push(`Año ${year}`);
        title = `Directorio de Anime ${parts.join(' • ')}`;
    }


    return {
        title: `${title} | AnimeLHD`,
        description,
        alternates: {
            canonical: '/directorio',
        },
        openGraph: {
            title: `${title} | AnimeLHD`,
            description,
            url: '/directorio',
        },
    };
}

export default async function DirectoryPage({ searchParams }: PageProps) {
    const params = await searchParams;
    const initialAnimes = await animeService.getAnimes(params);
    const genres = await animeService.getGenres();
    const years = await animeService.getYears();

    return (
        <DirectoryClient
            initialAnimes={initialAnimes}
            genres={genres}
            years={years}
        />
    );
}
