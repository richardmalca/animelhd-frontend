import React from 'react';
import { getLanguageLabel } from '@/lib/anime-utils';
import { Player } from '@/types/anime';

interface PlayerSourceSelectorProps {
    languages: string[];
    selectedLanguage: string;
    handleLanguageChange: (lang: string) => void;
    activePlayer: Player | null;
    groupedPlayers: Record<string, Player[]>;
    handleServerChange: (p: Player) => void;
}

export function PlayerSourceSelector({
    languages,
    selectedLanguage,
    handleLanguageChange,
    activePlayer,
    groupedPlayers,
    handleServerChange,
}: PlayerSourceSelectorProps) {
    return (
        <div className="mb-6 grid grid-cols-2 gap-3 sm:flex sm:flex-row sm:items-center sm:gap-x-10">
            <div className="flex flex-1 items-center gap-2 sm:flex-none sm:gap-3">
                <span className="shrink-0 text-sm font-bold text-muted-foreground sm:text-base">
                    Idioma:
                </span>
                <select
                    value={selectedLanguage}
                    onChange={(e) => handleLanguageChange(e.target.value)}
                    suppressHydrationWarning
                    className="h-9 w-full rounded-md border border-white/10 bg-white/5 px-2 text-[11px] font-bold text-white [color-scheme:dark] outline-none transition-all focus:border-primary/50 sm:h-10 lg:w-56 sm:px-3 sm:text-base"
                >
                    {languages.map((lang) => (
                        <option key={lang} value={lang} className="bg-[#1a1a1a] text-white">
                            {getLanguageLabel(lang)}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex flex-1 items-center gap-2 sm:flex-none sm:gap-3">
                <span className="shrink-0 text-sm font-bold text-muted-foreground sm:text-base">
                    Servidor:
                </span>
                <select
                    value={activePlayer?.id || ''}
                    onChange={(e) => {
                        const player = groupedPlayers[
                            selectedLanguage
                        ]?.find((p) => p.id === parseInt(e.target.value));
                        if (player) handleServerChange(player);
                    }}
                    suppressHydrationWarning
                    className="h-9 w-full rounded-md border border-white/10 bg-white/5 px-2 text-[11px] font-bold text-white [color-scheme:dark] outline-none transition-all focus:border-primary/50 sm:h-10 lg:w-56 sm:px-3 sm:text-base"
                >
                    {selectedLanguage &&
                        groupedPlayers[selectedLanguage]?.map((p) => (
                            <option key={p.id} value={p.id} className="bg-[#1a1a1a] text-white">
                                {p.server_name}
                            </option>
                        ))}
                </select>
            </div>
        </div>
    );
}
