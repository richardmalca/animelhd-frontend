export interface Anime {
    id?: number;
    name: string;
    slug: string;
    poster: string;
    banner?: string;
    type: string;
    genres?: string;
    name_alternative?: string;
    vote_average: number;
    status: string | number;
    premiered?: string;
    broadcast?: string | number;
    overview?: string;
}

export interface Episode {
    id: number;
    number: string | number;
    title?: string;
    image?: string;
}

export interface Player {
    id: number;
    server_name: string;
    language: string;
    bridge_url: string;
    show_mobile: number | boolean;
    show_desktop: number | boolean;
}

export interface AnimeRelation {
    id: number;
    name: string;
    slug: string;
    poster: string;
    type: string;
}
