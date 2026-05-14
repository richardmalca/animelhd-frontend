'use client';

import React from 'react';
import { useEpisodePlayer } from '@/hooks/use-episode-player';
import { PlayerHeader } from '@/components/player/PlayerHeader';
import { PlayerSourceSelector } from '@/components/player/PlayerSourceSelector';
import { PlayerNavigation } from '@/components/player/PlayerNavigation';
import { VideoDisplay } from '@/components/player/VideoDisplay';
import { EpisodeSidebar } from '@/components/player/EpisodeSidebar';

import { Languages } from 'lucide-react';
import { useAdcash } from '@/hooks/use-adcash';
import { Anime, Episode, Player } from '@/types/anime';
import Link from 'next/link';

interface EpisodePlayerClientProps {
    data: {
        anime: Anime;
        episode: Episode;
        players: Player[];
        next: number | null;
        prev: number | null;
        episodes: Episode[];
    };
    isMobileDevice: boolean;
    isBot: boolean;
    preferredLanguage?: string;
    preferredServer?: string;
}

export function EpisodePlayerClient({
    data,
    isMobileDevice,
    isBot,
    preferredLanguage,
    preferredServer,
}: EpisodePlayerClientProps) {
    const { anime, episode, players, next, prev, episodes } = data;
    const { runPop } = useAdcash();
    const [isNoticeDismissed, setIsNoticeDismissed] = React.useState(false);

    React.useEffect(() => {
        const dismissed = localStorage.getItem('ad_notice_dismissed') === 'true';
        if (dismissed) setIsNoticeDismissed(true);
    }, []);

    const handleDismissNotice = () => {
        localStorage.setItem('ad_notice_dismissed', 'true');
        setIsNoticeDismissed(true);
    };

    const [hasTriggeredPop, setHasTriggeredPop] = React.useState(false);
    const handlePlayerInteraction = () => {
        if (!hasTriggeredPop) {
            runPop();
            setHasTriggeredPop(true);
        }
    };

    const {
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
    } = useEpisodePlayer({
        players,
        episodes,
        currentEpisodeNumber: episode.number,
        isMobileDevice,
        preferredLanguage,
        preferredServer,
    });

    return (
        <div className="min-h-screen bg-background text-muted-foreground selection:bg-primary selection:text-primary-foreground">
            <div className="mx-auto px-6 pt-20 pb-28 lg:px-10">
                <div className="grid grid-cols-1 gap-6 md:gap-10 lg:grid-cols-12">
                    <div className="lg:col-span-9">
                        {languages.some(
                            (l) => l === '1' || l.toLowerCase().includes('lat'),
                        ) &&
                            languages.some(
                                (l) =>
                                    l === '2' ||
                                    l.toLowerCase().includes('cas') ||
                                    l.toLowerCase().includes('esp'),
                            ) && (
                                <div className="mb-6 flex flex-col gap-3 overflow-hidden rounded-xl bg-white/5 p-3 ring-1 ring-white/10 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-4">
                                    <div className="flex items-center gap-3 sm:gap-4">
                                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary shadow-inner sm:h-10 sm:w-10 sm:rounded-xl">
                                            <Languages className="h-4 w-4 sm:h-5 sm:w-5" />
                                        </div>
                                        <div className="flex flex-col gap-0.5">
                                            <div className="flex items-center gap-1.5 sm:gap-2">
                                                <span className="text-[8px] font-black tracking-[0.2em] text-muted-foreground uppercase sm:text-[9px]">
                                                    Multilenguaje Detectado
                                                </span>
                                                <span className="h-1 w-1 animate-pulse rounded-full bg-primary" />
                                            </div>
                                            <span className="text-xs font-bold text-foreground sm:text-[13px]">
                                                Este episodio cuenta con doblaje
                                                dual
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-1.5 sm:shrink-0 sm:gap-2">
                                        <div className="flex items-center gap-2 rounded-lg bg-blue-500/10 px-2.5 py-1.5 ring-1 ring-blue-500/20 sm:gap-2.5 sm:px-3 sm:py-2">
                                            <img
                                                src="https://flagcdn.com/mx.svg"
                                                alt="Latino"
                                                className="h-3 w-4 rounded-[1px] object-cover sm:h-3.5 sm:w-5"
                                            />
                                            <span className="text-[9px] font-black tracking-wider text-blue-400 uppercase sm:text-[10px]">
                                                Español Latino
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 rounded-lg bg-amber-500/10 px-2.5 py-1.5 ring-1 ring-amber-500/20 sm:gap-2.5 sm:px-3 sm:py-2">
                                            <img
                                                src="https://flagcdn.com/es.svg"
                                                alt="Castellano"
                                                className="h-3 w-4 rounded-[1px] object-cover sm:h-3.5 sm:w-5"
                                            />
                                            <span className="text-[9px] font-black tracking-wider text-amber-400 uppercase sm:text-[10px]">
                                                Castellano
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}

                        <PlayerSourceSelector
                            languages={languages}
                            selectedLanguage={selectedLanguage}
                            handleLanguageChange={handleLanguageChange}
                            activePlayer={activePlayer}
                            groupedPlayers={groupedPlayers}
                            handleServerChange={handleServerChange}
                        />

                        {filteredPlayers.length > 0 && !isNoticeDismissed && (
                            <div className="flex flex-col items-center justify-between gap-3 rounded-t-lg border-x border-t border-white/5 bg-white/5 px-4 py-2 sm:flex-row sm:gap-4">
                                <p className="text-xs font-medium text-muted-foreground sm:text-sm">
                                    ¿Te salen anuncios en el reproductor?
                                </p>
                                <div className="flex items-center gap-4">
                                    <Link 
                                        href="/pages/about-ads"
                                        className="text-[11px] font-black text-primary hover:underline uppercase tracking-tight sm:text-xs"
                                    >
                                        Saber más
                                    </Link>
                                    <button 
                                        onClick={handleDismissNotice}
                                        className="text-[11px] font-black text-muted-foreground/60 hover:text-white uppercase tracking-tight sm:text-xs"
                                    >
                                        No mostrar más
                                    </button>
                                </div>
                            </div>
                        )}

                        <div 
                            className="relative" 
                            onMouseEnter={handlePlayerInteraction}
                            onTouchStart={handlePlayerInteraction}
                            onClick={handlePlayerInteraction}
                        >
                            <VideoDisplay
                                activePlayer={activePlayer}
                                isSwitching={isSwitching}
                                isBot={isBot}
                                hasPlayers={filteredPlayers.length > 0}
                                className={!isNoticeDismissed ? "rounded-b-2xl rounded-t-none" : "rounded-2xl"}
                            />
                        </div>

                        {filteredPlayers.length > 0 && (
                            <PlayerNavigation
                                anime={anime}
                                episodeNumber={episode.number}
                                prev={prev}
                                next={next}
                            />
                        )}
                    </div>

                    <div className="md:mt-0 lg:col-span-3">
                        <EpisodeSidebar
                            episodes={episodes}
                            currentEpisodeNumber={episode.number}
                            animeSlug={anime.slug}
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            filteredEpisodes={filteredEpisodes}
                            activeEpisodeRef={activeEpisodeRef}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
