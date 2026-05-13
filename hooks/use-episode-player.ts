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
    preferredLanguage?: string;
    preferredServer?: string;
}

export function useEpisodePlayer({
    players,
    episodes,
    currentEpisodeNumber,
    isMobileDevice,
    preferredLanguage,
    preferredServer,
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

    
    const initialLang = useMemo(() => {
        if (preferredLanguage && languages.includes(preferredLanguage)) {
            return preferredLanguage;
        }
        return languages.length > 0 ? languages[0] : '';
    }, [languages, preferredLanguage]);

    const initialPlayer = useMemo(() => {
        const playersInLang = groupedPlayers[initialLang] || [];
        if (playersInLang.length > 0) {
            const preferredPlayer = playersInLang.find(p => p.server_name === preferredServer);
            return preferredPlayer || playersInLang[0];
        }
        return null;
    }, [groupedPlayers, initialLang, preferredServer]);

    const [selectedLanguage, setSelectedLanguage] = useState<string>(initialLang);
    const [activePlayer, setActivePlayer] = useState<Player | null>(initialPlayer);
    const [isSwitching, setIsSwitching] = useState(false);
    const [isServerDropdownOpen, setIsServerDropdownOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const activeEpisodeRef = useRef<HTMLAnchorElement>(null);

    

    const setPreferenceCookie = (name: string, value: string) => {
        const expires = new Date();
        expires.setTime(expires.getTime() + 365 * 24 * 60 * 60 * 1000); 
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
        localStorage.setItem(name, value); 
    };

    const filteredEpisodes = useMemo(() => {
        if (!searchTerm) return episodes;
        return episodes.filter((ep) =>
            ep.number.toString().includes(searchTerm),
        );
    }, [episodes, searchTerm]);

    const handleServerChange = useCallback(
        (player: Player) => {
            if (player.id === activePlayer?.id) return;
            setIsSwitching(true);
            setActivePlayer(player);
            
            setPreferenceCookie('preferred_server', player.server_name);
            
            setTimeout(() => setIsSwitching(false), 300);
        },
        [activePlayer],
    );

    const handleLanguageChange = useCallback(
        (lang: string) => {
            if (lang === selectedLanguage) return;
            setIsSwitching(true);
            setSelectedLanguage(lang);
            
            const savedServer = preferredServer || localStorage.getItem('preferred_server');
            const playersInLang = groupedPlayers[lang] || [];
            const preferredPlayer = playersInLang.find(p => p.server_name === savedServer);
            
            setActivePlayer(preferredPlayer || playersInLang[0] || null);
            
            setPreferenceCookie('preferred_language', lang);
            
            setTimeout(() => setIsSwitching(false), 300);
        },
        [selectedLanguage, groupedPlayers, preferredServer],
    );

    useEffect(() => {
        if (activeEpisodeRef.current && !searchTerm) {
            const element = activeEpisodeRef.current;
            const container = element.offsetParent as HTMLDivElement;
            if (container) {
                const containerHeight = container.clientHeight;
                const elementTop = element.offsetTop;
                const elementHeight = element.clientHeight;

                container.scrollTo({
                    top: elementTop - containerHeight / 2 + elementHeight / 2,
                    behavior: 'smooth',
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
        filteredPlayers,
    };
}
