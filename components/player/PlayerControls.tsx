'use client';

import React from 'react';
import { Globe, Server, ChevronDown } from 'lucide-react';
import { getLanguageLabel } from '@/lib/anime-utils';


import { Player } from '@/types/anime';

interface PlayerControlsProps {
    languages: string[];
    selectedLanguage: string;
    handleLanguageChange: (lang: string) => void;
    activePlayer: Player | null;
    isServerDropdownOpen: boolean;
    setIsServerDropdownOpen: (open: boolean) => void;
    groupedPlayers: Record<string, Player[]>;
    handleServerChange: (p: Player) => void;
}

export function PlayerControls({
    languages,
    selectedLanguage,
    handleLanguageChange,
    activePlayer,
    isServerDropdownOpen,
    setIsServerDropdownOpen,
    groupedPlayers,
    handleServerChange,
}: PlayerControlsProps) {
    return (
        <div className="mb-6 flex flex-wrap items-start justify-start gap-x-8 gap-y-6">
            <div className="flex flex-col gap-2.5">
                <div className="flex items-center gap-2 px-1">
                    <Globe className="h-3 w-3 text-primary/60" />
                    <span className="text-[10px] font-bold tracking-[0.1em] text-muted-foreground uppercase">Idioma</span>
                </div>
                <div className="flex h-11 items-center gap-1 rounded-2xl bg-muted/30 p-1.5 ring-1 ring-border/50">
                    {languages.map((lang) => (
                        <button
                            key={lang}
                            onClick={() => handleLanguageChange(lang)}
                            className={`flex h-full items-center gap-2 rounded-xl px-4 text-[11px] font-bold tracking-wide transition-all ${
                                selectedLanguage === lang ? 'bg-primary text-primary-foreground shadow-md' : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                            }`}
                        >
                            {lang.toLowerCase().includes('sub') && <img src="/images/flags/jp.svg" className="h-[10px] w-4 rounded-[1px] object-cover" alt="JP" />}
                            {lang.toLowerCase().includes('lat') && <img src="/images/flags/mx.svg" className="h-[10px] w-4 rounded-[1px] object-cover" alt="MX" />}
                            {(lang.toLowerCase().includes('cas') || lang.toLowerCase().includes('esp')) && <img src="/images/flags/es.svg" className="h-[10px] w-4 rounded-[1px] object-cover" alt="ES" />}

                            {getLanguageLabel(lang)}
                        </button>




                    ))}
                </div>
            </div>

            <div className="relative flex flex-1 flex-col gap-2.5 md:w-64 md:flex-none">
                <div className="flex items-center gap-2 px-1">
                    <Server className="h-3 w-3 text-primary/60" />
                    <span className="text-[10px] font-bold tracking-[0.1em] text-muted-foreground uppercase">Servidor</span>
                </div>
                <button
                    onClick={() => setIsServerDropdownOpen(!isServerDropdownOpen)}
                    className="flex h-11 w-full items-center justify-between rounded-2xl bg-muted/30 px-5 text-[11px] font-bold text-foreground ring-1 ring-border/50 transition-all hover:bg-muted/50"
                >
                    <span className="truncate">{activePlayer ? activePlayer.server_name : 'Seleccionar Servidor'}</span>
                    <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${isServerDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isServerDropdownOpen && (
                    <>
                        <div className="fixed inset-0 z-40" onClick={() => setIsServerDropdownOpen(false)} />
                        <div className="animate-in fade-in zoom-in-95 absolute top-[calc(100%+8px)] right-0 left-0 z-50 max-h-60 overflow-y-auto rounded-2xl border border-border bg-background p-1.5 shadow-2xl duration-200">
                            <div className="flex flex-col gap-0.5">
                                {selectedLanguage &&
                                    groupedPlayers[selectedLanguage]?.map((p) => (
                                        <button
                                            key={p.id}
                                            onClick={() => {
                                                handleServerChange(p);
                                                setIsServerDropdownOpen(false);
                                            }}
                                            className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-[11px] font-bold transition-all ${
                                                activePlayer?.id === p.id ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                                            }`}
                                        >
                                            {p.server_name}
                                            {activePlayer?.id === p.id && <div className="h-1.5 w-1.5 rounded-full bg-primary-foreground" />}
                                        </button>
                                    ))}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
