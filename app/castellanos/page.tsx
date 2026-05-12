import React from 'react';
import { animeService } from '@/services/anime.service';
import { AnimeListingTemplate } from '@/components/shared/AnimeListingTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Animes Castellanos - Lista de Animes en Español España | AnimeLHD',
    description:
        'Explora nuestra colección de animes doblados al español castellano. Disfruta de tus series favoritas con el mejor doblaje de España, calidad HD y actualizaciones constantes.',
    alternates: {
        canonical: '/castellanos',
    },
};

export default async function CastellanosPage({
    searchParams,
}: {
    searchParams: Promise<{ page?: string }>;
}) {
    const params = await searchParams;
    const page = params.page ? parseInt(params.page) : 1;
    const initialData = await animeService.getCastellanos(page);

    return (
        <AnimeListingTemplate
            initialData={initialData}
            title="Animes"
            highlight="Castellanos"
            description="Catálogo exclusivo de series con doblaje al español de España oficial"
            baseUrl="/castellanos"
            categoryLabel="Doblaje Castellano"
            emptyTitle="No hay animes castellanos disponibles"
            emptyDescription="Vuelve pronto para ver las nuevas actualizaciones con doblaje oficial."
        />
    );
}
