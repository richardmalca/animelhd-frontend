export const getAnimeTypeStyles = (type: string) => {
    const t = type?.toUpperCase();
    switch (t) {
        case 'TV':
            return 'bg-primary text-primary-foreground';
        case 'MOVIE':
            return 'bg-blue-600 text-white';
        case 'OVA':
        case 'ONA':
        case 'SPECIAL':
            return 'bg-purple-600 text-white';
        default:
            return 'bg-muted text-muted-foreground';
    }
};

export const getAnimeTypeLabel = (type: string) => {
    const t = type?.toUpperCase();
    switch (t) {
        case 'TV':
            return 'Serie';
        case 'MOVIE':
            return 'Película';
        case 'SPECIAL':
            return 'Especial';
        case 'OVA':
            return 'Ova';
        case 'ONA':
            return 'Ona';
        case 'MUSIC':
            return 'Música';
        default:
            return type || 'N/A';
    }
};

export const getAnimeStatusStyles = (status: number | string) => {
    const s = String(status);
    switch (s) {
        case '1':
            return 'bg-primary/5 text-primary border-primary/10 backdrop-blur-sm font-bold';
        case '2':
            return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20 backdrop-blur-sm font-bold';
        case '0':
        case '3':
            return 'bg-muted/30 text-muted-foreground border-border/50 backdrop-blur-sm font-medium';
        default:
            return 'bg-muted/30 text-muted-foreground border-border/50 font-medium';
    }
};

export const getAnimeStatusLabel = (status: number | string) => {
    const s = String(status);
    switch (s) {
        case '1':
            return 'En Emisión';
        case '0':
            return 'Finalizado';
        case '2':
            return 'Pausado';
        case '3':
            return 'Próximamente';
        default:
            return 'Desconocido';
    }
};

export const getLanguageLabel = (lang: string | number) => {
    const code = String(lang);
    if (code === '0') return 'Japonés/Subtitulado';
    if (code === '1') return 'Español Latino';
    if (code === '2') return 'Castellano';

    const l = code.toLowerCase();
    if (l.includes('sub') || l.includes('jap')) return 'Japonés/Subtitulado';
    if (l.includes('lat')) return 'Español Latino';
    if (l.includes('cas') || l.includes('esp')) return 'Castellano';
    return lang;
};
