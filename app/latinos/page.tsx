import React from 'react';
import { animeService } from '@/services/anime.service';
import { AnimeListingTemplate } from '@/components/shared/AnimeListingTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Animes Latinos - Lista de Animes en Español Latino | AnimeLHD',
    description:
        'Explora nuestra colección de animes doblados al español latino. Disfruta de tus series favoritas con el mejor doblaje, calidad HD y actualizaciones constantes.',
    alternates: {
        canonical: '/latinos',
    },
};

export default async function LatinosPage({
    searchParams,
}: {
    searchParams: Promise<{ page?: string }>;
}) {
    const params = await searchParams;
    const page = params.page ? parseInt(params.page) : 1;
    const initialData = await animeService.getLatinos(page);

    return (
        <AnimeListingTemplate
            initialData={initialData}
            title="Animes"
            highlight="Latinos"
            description="Catálogo exclusivo de series con doblaje al español latino oficial"
            baseUrl="/latinos"
            emptyTitle="No hay animes latinos disponibles"
            emptyDescription="Vuelve pronto para ver las nuevas actualizaciones con doblaje oficial."
        />
    );
}
