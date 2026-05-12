'use client';

import { AnimeCard } from '@/components/AnimeCard';
import { EpisodeCard } from '@/components/EpisodeCard';
import { AnimeGrid } from '@/components/shared/AnimeGrid';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { EmptyState } from '@/components/shared/EmptyState';
import { getTmdbImageUrl } from '@/lib/tmdb';

interface HomeAnime {
    id: number;
    name: string;
    slug: string;
    poster: string;
    vote_average: number;
    type: string;
}

interface HomeEpisode {
    id: number;
    number: number;
    anime_title: string;
    anime_image: string;
    anime_slug: string;
    languages: string[];
}

interface HomeClientProps {
    episodes: HomeEpisode[];
    animes: HomeAnime[];
}

export default function HomeClient({ episodes, animes }: HomeClientProps) {
    const safeEpisodes = Array.isArray(episodes) ? episodes : [];
    const safeAnimes = Array.isArray(animes) ? animes : [];
    const hasData = safeEpisodes.length > 0 || safeAnimes.length > 0;

    if (!hasData) {
        return (
            <EmptyState
                title="No hay contenido disponible"
                description="Estamos trabajando para traer el mejor contenido. Por favor, vuelve a intentarlo más tarde."
                onClear={() => window.location.reload()}
                clearText="Reintentar"
            />
        );
    }

    return (
        <div className="flex flex-col pb-20">
            <h1 className="sr-only">
                AnimeLHD - Ver Anime Online Gratis en HD
            </h1>

            <div className="mx-auto max-w-[1600px] pt-32 px-6 lg:px-10">
                {safeEpisodes.length > 0 && (
                    <section className="mb-16">
                        <SectionTitle
                            title="Episodios Recientes"
                            href="/directorio"
                        />
                        <AnimeGrid className="grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-6">
                            {safeEpisodes.map((episode, index) => (
                                <EpisodeCard
                                    key={episode.id}
                                    episode={episode}
                                    priority={index < 12}
                                />
                            ))}
                        </AnimeGrid>
                    </section>
                )}

                {safeAnimes.length > 0 && (
                    <section>
                        <SectionTitle
                            title="Animes Agregados"
                            href="/directorio"
                        />
                        <AnimeGrid className="grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 2xl:grid-cols-7">
                            {safeAnimes.map((anime, index) => (
                                <AnimeCard
                                    key={anime.id}
                                    title={anime.name}
                                    image={getTmdbImageUrl(anime.poster, 'w300')}
                                    vote_average={anime.vote_average}
                                    slug={anime.slug}
                                    type={anime.type}
                                    priority={
                                        safeEpisodes.length === 0 && index < 12
                                    }
                                />
                            ))}
                        </AnimeGrid>
                    </section>
                )}
            </div>
        </div>
    );
}
