'use client';

import React from 'react';
import { useEpisodePlayer } from '@/hooks/use-episode-player';
import { PlayerHeader } from '@/components/player/PlayerHeader';
import { PlayerSourceSelector } from '@/components/player/PlayerSourceSelector';
import { PlayerNavigation } from '@/components/player/PlayerNavigation';
import { VideoDisplay } from '@/components/player/VideoDisplay';
import { EpisodeSidebar } from '@/components/player/EpisodeSidebar';

import { Languages } from 'lucide-react';
import { useDubbing } from '@/hooks/use-dubbing';
import { DubbingBadge } from '@/components/player/DubbingBadge';
import { DubbingNotice } from '@/components/player/DubbingNotice';
import { LanguageBadge } from '@/components/player/LanguageBadge';
import { AdDisclaimer } from '@/components/player/AdDisclaimer';
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
    const {
        label: dubbingLabel,
        hasDubbing,
        dubbingType,
    } = useDubbing(players);
    const [isNoticeDismissed, setIsNoticeDismissed] = React.useState(false);

    React.useEffect(() => {
        const dismissed =
            localStorage.getItem('ad_notice_dismissed') === 'true';
        if (dismissed) setIsNoticeDismissed(true);
    }, []);

    const handleDismissNotice = () => {
        localStorage.setItem('ad_notice_dismissed', 'true');
        setIsNoticeDismissed(true);
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
                        <div className="space-y-4">
                            <DubbingNotice
                                dubbingType={dubbingType}
                                label={dubbingLabel}
                            />

                            <PlayerSourceSelector
                                languages={languages}
                                selectedLanguage={selectedLanguage}
                                handleLanguageChange={handleLanguageChange}
                                activePlayer={activePlayer}
                                groupedPlayers={groupedPlayers}
                                handleServerChange={handleServerChange}
                            />

                            <div className="flex flex-col">
                                {!isNoticeDismissed && (
                                    <AdDisclaimer
                                        onDismiss={handleDismissNotice}
                                    />
                                )}

                                <VideoDisplay
                                    activePlayer={activePlayer}
                                    isSwitching={isSwitching}
                                    isBot={isBot}
                                    hasPlayers={filteredPlayers.length > 0}
                                    className={
                                        !isNoticeDismissed
                                            ? 'rounded-t-none rounded-b-2xl'
                                            : 'rounded-2xl'
                                    }
                                />
                            </div>
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
