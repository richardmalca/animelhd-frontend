import { animeService } from '@/services/anime.service';
import HomeClient from '@/components/HomeClient';
import { Metadata } from 'next';

export const revalidate = 3600;

export const metadata: Metadata = {
    title: 'AnimeLHD - Ver Anime Online Gratis en HD',
    description: 'El mejor sitio para ver anime online gratis en HD. Disfruta de estrenos diarios, simulcasts y un amplio catálogo de animes clásicos y modernos.',
    alternates: {
        canonical: '/',
    },
};

export default async function Home() {
    const { hero, episodes, animes } = await animeService.getHomeData();

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'AnimeLHD',
        url: siteUrl,
        potentialAction: {
            '@type': 'SearchAction',
            target: `${siteUrl}/directorio?q={search_term_string}`,
            'query-input': 'required name=search_term_string',
        },
    };


    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <HomeClient hero={hero} episodes={episodes} animes={animes} />
        </>
    );
}
