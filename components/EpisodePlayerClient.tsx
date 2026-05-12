'use client';

import React from 'react';
import { useEpisodePlayer } from '@/hooks/use-episode-player';
import { PlayerHeader } from './player/PlayerHeader';
import { PlayerControls } from './player/PlayerControls';
import { VideoDisplay } from './player/VideoDisplay';
import { EpisodeSidebar } from './player/EpisodeSidebar';

import { Anime, Episode, Player } from '@/types/anime';

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
}

export function EpisodePlayerClient({
    data,
    isMobileDevice,
    isBot,
}: EpisodePlayerClientProps) {
    const { anime, episode, players, next, prev, episodes } = data;
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
    });

    return (
        <div className="min-h-screen bg-background text-muted-foreground selection:bg-primary selection:text-primary-foreground">
            <PlayerHeader 
                anime={anime} 
                episodeNumber={episode.number} 
                prev={prev} 
                next={next} 
            />

            <div className="mx-auto max-w-[1400px] px-4 pt-6 pb-28 md:px-6 md:py-8">
                <div className="grid grid-cols-1 gap-6 md:gap-10 lg:grid-cols-12">
                    <div className="lg:col-span-9">
                        {filteredPlayers.length > 0 && (
                            <PlayerControls 
                                languages={languages}
                                selectedLanguage={selectedLanguage}
                                handleLanguageChange={handleLanguageChange}
                                activePlayer={activePlayer}
                                isServerDropdownOpen={isServerDropdownOpen}
                                setIsServerDropdownOpen={setIsServerDropdownOpen}
                                groupedPlayers={groupedPlayers}
                                handleServerChange={handleServerChange}
                            />
                        )}

                        <VideoDisplay 
                            activePlayer={activePlayer}
                            isSwitching={isSwitching}
                            isBot={isBot}
                            hasPlayers={filteredPlayers.length > 0}
                        />
                    </div>

                    <div className="lg:col-span-3">
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
