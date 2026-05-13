import { animeService } from '@/services/anime.service';
import { EpisodePlayerClient } from '@/components/EpisodePlayerClient';
import { EpisodeNotFound } from '@/components/EpisodeNotFound';
import { Metadata } from 'next';
import { headers, cookies } from 'next/headers';
import { getTmdbImageUrl } from '@/lib/tmdb';

export const revalidate = 60;

interface Props {
    params: Promise<{
        slug: string;
        number: string;
    }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug, number } = await params;
    const data = await animeService.getEpisodeDetail(slug, number);
    if (!data) return { title: 'Episodio no disponible - AnimeLHD' };

    const { anime } = data;
    const title = `Ver ${anime.name} Episodio ${number} Sub Español en HD | AnimeLHD`;
    const description = `Disfruta del episodio ${number} de ${anime.name} online en alta calidad. Mira el capítulo completo sin censura y con los mejores servidores en AnimeLHD.`;
    const imageUrl = getTmdbImageUrl(anime.banner || anime.poster, 'original');

    return {
        title,
        description,
        alternates: {
            canonical: `/ver/${slug}/${number}`,
        },
        openGraph: {
            title,
            description,
            type: 'video.episode',
            url: `/ver/${slug}/${number}`,
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: `${anime.name} Episodio ${number}`,
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

export default async function EpisodePage({ params }: Props) {
    const { slug, number } = await params;
    const data = await animeService.getEpisodeDetail(slug, number);

    if (!data) {
        return <EpisodeNotFound slug={slug} number={number} />;
    }

    const { anime } = data;

    const jsonLd = {
        '@context': 'https://schema.org ',
        '@type': 'TVEpisode',
        name: `${anime.name} Episodio ${number}`,
        episodeNumber: number,
        partOfSeries: {
            '@type': 'TVSeries',
            name: anime.name,
            url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/anime/${anime.slug}`,
        },
        image: getTmdbImageUrl(anime.banner || anime.poster, 'original'),
        description: `Ver el episodio ${number} de ${anime.name} online gratis en HD.`,
        url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/ver/${slug}/${number}`,
    };

    const headersList = await headers();
    const cookieStore = await cookies();
    
    const userAgent = (headersList.get('user-agent') || '').toLowerCase();
    const isMobileDevice =
        /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
            userAgent,
        );
    const isBot =
        /bot|spider|crawl|slurp|googlebot|bingbot|yandexbot|duckduckbot|baiduspider|ia_archiver|facebookexternalhit|whatsapp|telegrambot/i.test(
            userAgent,
        );

    
    const preferredLanguage = cookieStore.get('preferred_language')?.value || '';
    const preferredServer = cookieStore.get('preferred_server')?.value || '';

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <EpisodePlayerClient
                data={data as any}
                isMobileDevice={isMobileDevice}
                isBot={isBot}
                preferredLanguage={preferredLanguage}
                preferredServer={preferredServer}
            />
        </>
    );
}
