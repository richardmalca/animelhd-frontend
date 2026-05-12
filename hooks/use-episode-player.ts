import { useState, useEffect, useMemo, useRef, useCallback } from 'react';

interface Player {
    id: number;
    server_name: string;
    language: string;
    bridge_url: string;
    show_mobile: number | boolean;
    show_desktop: number | boolean;
}

interface Episode {
    number: number | string;
    id: number;
}

interface UseEpisodePlayerProps {
    players: Player[];
    episodes: Episode[];
    currentEpisodeNumber: number | string;
    isMobileDevice: boolean;
}

export function useEpisodePlayer({
    players,
    episodes,
    currentEpisodeNumber,
    isMobileDevice,
}: UseEpisodePlayerProps) {
    const filteredPlayers = useMemo(() => {
        return players.filter((p) =>
            isMobileDevice ? !!p.show_mobile : !!p.show_desktop,
        );
    }, [players, isMobileDevice]);

    const groupedPlayers = useMemo(() => {
        const groups: { [key: string]: Player[] } = {};
        filteredPlayers.forEach((p) => {
            if (!groups[p.language]) groups[p.language] = [];
            groups[p.language].push(p);
        });
        return groups;
    }, [filteredPlayers]);

    const languages = useMemo(() => {
        const getPriority = (lang: string) => {
            const l = lang.toLowerCase();
            if (l === '0' || l.includes('sub') || l.includes('jap')) return 0;
            if (l === '1' || l.includes('lat')) return 1;
            if (l === '2' || l.includes('cas') || l.includes('esp')) return 2;
            return 99;
        };
        return Object.keys(groupedPlayers).sort(
            (a, b) => getPriority(a) - getPriority(b),
        );
    }, [groupedPlayers]);

    const [selectedLanguage, setSelectedLanguage] = useState<string>('');
    const [activePlayer, setActivePlayer] = useState<Player | null>(null);
    const [isSwitching, setIsSwitching] = useState(false);
    const [isServerDropdownOpen, setIsServerDropdownOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const activeEpisodeRef = useRef<HTMLAnchorElement>(null);

    useEffect(() => {
        if (languages.length === 0) return;

        const lang = languages.includes(selectedLanguage) ? selectedLanguage : languages[0];
        
        Promise.resolve().then(() => {
            if (lang !== selectedLanguage) {
                setSelectedLanguage(lang);
            }

            if (!activePlayer || !languages.includes(selectedLanguage)) {
                const firstPlayer = groupedPlayers[lang]?.[0] || null;
                setActivePlayer(firstPlayer);
            }
        });
    }, [languages, groupedPlayers, selectedLanguage, activePlayer]);



    const filteredEpisodes = useMemo(() => {
        if (!searchTerm) return episodes;
        return episodes.filter((ep) =>
            ep.number.toString().includes(searchTerm),
        );
    }, [episodes, searchTerm]);

    const handleServerChange = useCallback((player: Player) => {
        if (player.id === activePlayer?.id) return;
        setIsSwitching(true);
        setActivePlayer(player);
        setTimeout(() => setIsSwitching(false), 800);
    }, [activePlayer]);

    const handleLanguageChange = useCallback((lang: string) => {
        if (lang === selectedLanguage) return;
        setIsSwitching(true);
        setSelectedLanguage(lang);
        setActivePlayer(groupedPlayers[lang]?.[0] || null);
        setTimeout(() => setIsSwitching(false), 800);
    }, [selectedLanguage, groupedPlayers]);

    useEffect(() => {
        if (activeEpisodeRef.current && !searchTerm) {
            const element = activeEpisodeRef.current;
            const container = element.offsetParent as HTMLDivElement;
            if (container) {
                const containerHeight = container.clientHeight;
                const elementTop = element.offsetTop;
                const elementHeight = element.clientHeight;
                
                container.scrollTo({
                    top: elementTop - (containerHeight / 2) + (elementHeight / 2),
                    behavior: 'smooth'
                });
            }
        }
    }, [currentEpisodeNumber, searchTerm]);

    return {
        selectedLanguage,
        activePlayer,
        isSwitching,
        isServerDropdownOpen,
        setIsServerDropdownOpen,
        searchTerm,
        setSearchTerm,
        activeEpisodeRef,
        filteredEpisodes,
        languages,
        groupedPlayers,
        handleServerChange,
        handleLanguageChange,
        filteredPlayers
    };
}
