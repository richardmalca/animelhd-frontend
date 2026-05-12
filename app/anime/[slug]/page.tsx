import React from 'react';
import { cookies } from 'next/headers';
import { animeService } from '@/services/anime.service';
import { AnimeDetailClient } from '@/components/AnimeDetailClient';
import { AnimeNotFound } from '@/components/AnimeNotFound';
import { Metadata } from 'next';

export const revalidate = 60;

interface PageProps {
    params: Promise<{ slug: string }>;
}

import { getTmdbImageUrl } from '@/lib/tmdb';

export async function generateMetadata({
    params,
}: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const data = await animeService.getAnimeDetail(slug);
    if (!data) return { title: 'Anime no encontrado - AnimeLHD' };

    const { anime } = data;
    const title = `${anime.name} - Ver Online en HD | AnimeLHD`;
    const description = anime.overview
        ? anime.overview.substring(0, 160) + '...'
        : `Información completa, episodios y más de ${anime.name} en AnimeLHD.`;

    const imageUrl = getTmdbImageUrl(anime.banner || anime.poster, 'original');

    return {
        title,
        description,
        alternates: {
            canonical: `/anime/${anime.slug}`,
        },
        openGraph: {
            title,
            description,
            type: 'video.tv_show',
            url: `/anime/${anime.slug}`,
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: anime.name,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [imageUrl],
        },
    };
}

export default async function AnimePage({ params }: PageProps) {
    const { slug } = await params;
    const cookieStore = await cookies();
    const episodeOrder = cookieStore.get('episodeOrder')?.value || 'desc';

    const data = await animeService.getAnimeDetail(slug);

    if (!data) {
        return <AnimeNotFound />;
    }

    const { anime } = data;

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': anime.type === 'Movie' ? 'Movie' : 'TVSeries',
        name: anime.name,
        description: anime.overview,
        image: getTmdbImageUrl(anime.poster, 'w500'),
        url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/anime/${anime.slug}`,

        genre: anime.genres?.split(',').filter(Boolean) || [],
        aggregateRating: anime.vote_average
            ? {
                  '@type': 'AggregateRating',
                  ratingValue: anime.vote_average,
                  bestRating: '10',
                  worstRating: '1',
                  ratingCount: '100',
              }
            : undefined,
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <AnimeDetailClient data={data as any} initialOrder={episodeOrder} />
        </>
    );
}
