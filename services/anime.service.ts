import { Anime } from '@/types/anime';

const API_URL = process.env.API_URL;
const SERVER_API_KEY = process.env.API_KEY;

type Filters = Record<string, string | string[] | number | boolean | undefined>;

const fetchWithSecurity = async (
    url: string | undefined,
    options: RequestInit = {},
) => {
    if (!url)
        return new Response(JSON.stringify({ error: 'URL not configured' }), {
            status: 500,
        });

    const isServer = typeof window === 'undefined';

    if (isServer) {
        const headers: Record<string, string> = {
            Accept: 'application/json',
            'X-App-Key': SERVER_API_KEY || '',
        };

        if (options.headers) {
            Object.assign(headers, options.headers);
        }

        return fetch(url, { ...options, headers });
    }

    return fetch(url, options);
};

const safeFetch = async <T>(
    url: string | undefined,
    defaultValue: T,
    options: RequestInit = {},
): Promise<T> => {
    try {
        const response = await fetchWithSecurity(url, options);

        if (!response.ok) {
            console.error(`API Error [${url}]: ${response.status} ${response.statusText}`);
            return defaultValue;
        }

        return await response.json();
    } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
            return defaultValue;
        }
        console.error(`Fetch Error [${url}]:`, error);
        return defaultValue;
    }
};

export const animeService = {
    getHomeData: () =>
        safeFetch(
            `${API_URL}/home`,
            { hero: null, episodes: [], animes: [] },
            { next: { revalidate: 60 } },
        ),

    getAnimes: (filters: Filters = {}, signal?: AbortSignal) => {
        const params = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                if (Array.isArray(value)) {
                    params.set(key, value.join(','));
                } else {
                    params.set(key, String(value));
                }
            }
        });
        return safeFetch(
            `${API_URL}/animes?${params.toString()}`,
            { data: [], current_page: 1, last_page: 1 },
            { next: { revalidate: 60 }, signal },
        );
    },

    getAnimeDetail: (slug: string) =>
        safeFetch<{ anime: Anime } | null>(`${API_URL}/animes/${slug}`, null, {
            next: { revalidate: 60 },
        }),

    getEpisodeDetail: (slug: string, number: string | number) =>
        safeFetch<{ anime: Anime } | null>(
            `${API_URL}/animes/${slug}/episodes/${number}`,
            null,
            {
                next: { revalidate: 60 },
            },
        ),

    getGenres: () =>
        safeFetch(`${API_URL}/genres`, [], { next: { revalidate: 86400 } }),

    getYears: () =>
        safeFetch(`${API_URL}/years`, [], { next: { revalidate: 86400 } }),

    getCalendar: () =>
        safeFetch(`${API_URL}/calendar`, {}, { next: { revalidate: 300 } }),

    search: (query: string, signal?: AbortSignal) => {
        const isServer = typeof window === 'undefined';
        const url = isServer
            ? `${API_URL}/animes?search=${encodeURIComponent(query)}&perPage=5`
            : `/api/anime/search?q=${encodeURIComponent(query)}`;
        return safeFetch(url, { data: [] }, { signal });
    },

    getLatinos: (page: number = 1) =>
        safeFetch(
            `${API_URL}/latinos?page=${page}`,
            { data: [], current_page: 1, last_page: 1 },
            { next: { revalidate: 300 } },
        ),

    getCastellanos: (page: number = 1) =>
        safeFetch(
            `${API_URL}/castellanos?page=${page}`,
            { data: [], current_page: 1, last_page: 1 },
            { next: { revalidate: 300 } },
        ),
};
