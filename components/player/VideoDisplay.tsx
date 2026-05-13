'use client';

import React from 'react';
import { Loader2, Star, MonitorPlay } from 'lucide-react';

import { Player } from '@/types/anime';

interface VideoDisplayProps {
    activePlayer: Player | null;
    isSwitching: boolean;
    isBot: boolean;
    hasPlayers: boolean;
}

export function VideoDisplay({
    activePlayer,
    isSwitching,
    isBot,
    hasPlayers,
}: VideoDisplayProps) {
    return (
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-lg ring-1 ring-white/5">
            {activePlayer ? (
                <>
                    {isSwitching && (
                        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-background/90 backdrop-blur-md">
                            <div className="relative mb-4">
                                <Loader2 className="h-10 w-10 animate-spin text-primary" />
                                <div className="absolute inset-0 h-10 w-10 animate-ping rounded-full bg-primary/20" />
                            </div>
                            <span className="text-[11px] font-black tracking-[0.3em] text-white uppercase drop-shadow-sm">
                                Cambiando servidor...
                            </span>
                            <span className="mt-2 text-[9px] font-bold text-muted-foreground uppercase opacity-60">
                                Preparando tu vídeo
                            </span>
                        </div>
                    )}
                    {!isBot ? (
                        <iframe
                            key={activePlayer.id}
                            src={activePlayer.bridge_url}
                            className="h-full w-full"
                            allowFullScreen
                            scrolling="no"
                            frameBorder="0"
                        />
                    ) : (
                        <div className="flex h-full w-full flex-col items-center justify-center bg-muted/5 p-8 text-center">
                            <Star className="mb-4 h-16 w-16 animate-pulse text-primary/20" />
                            <h3 className="text-lg font-black tracking-tighter text-foreground">
                                Verificación Humana
                            </h3>
                            <p className="mt-1 max-w-[200px] text-[10px] leading-relaxed font-bold tracking-widest text-muted-foreground uppercase">
                                Por favor, accede desde un navegador real para
                                ver este contenido.
                            </p>
                        </div>
                    )}
                </>
            ) : (
                <div className="flex h-full w-full flex-col items-center justify-center bg-muted/5 p-8 text-center">
                    <MonitorPlay className="mb-4 h-16 w-16 text-muted-foreground" />
                    {!hasPlayers ? (
                        <>
                            <h3 className="text-lg font-black tracking-tighter text-foreground">
                                Sin servidores disponibles
                            </h3>
                            <p className="mt-1 text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                                Este episodio aún no tiene opciones de
                                reproducción.
                            </p>
                        </>
                    ) : (
                        <p className="text-[10px] font-black tracking-[0.3em] text-muted-foreground uppercase">
                            Selecciona un servidor para comenzar
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}
