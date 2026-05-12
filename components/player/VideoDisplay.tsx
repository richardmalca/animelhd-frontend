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

export function VideoDisplay({ activePlayer, isSwitching, isBot, hasPlayers }: VideoDisplayProps) {
    return (
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-lg ring-1 ring-white/5">
            {activePlayer ? (
                <>
                    {isSwitching && (
                        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-background/95 backdrop-blur-sm">
                            <Loader2 className="mb-3 h-8 w-8 animate-spin text-primary" />
                            <span className="text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase">Cargando...</span>
                        </div>
                    )}
                    {!isBot ? (
                        <iframe key={activePlayer.id} src={activePlayer.bridge_url} className="h-full w-full" allowFullScreen scrolling="no" frameBorder="0" />
                    ) : (
                        <div className="flex h-full w-full flex-col items-center justify-center bg-muted/5 p-8 text-center">
                            <Star className="mb-4 h-16 w-16 animate-pulse text-primary/20" />
                            <h3 className="text-lg font-black tracking-tighter text-foreground">Verificación Humana</h3>
                            <p className="mt-1 max-w-[200px] text-[10px] leading-relaxed font-bold tracking-widest text-muted-foreground uppercase">
                                Por favor, accede desde un navegador real para ver este contenido.
                            </p>
                        </div>
                    )}
                </>
            ) : (
                <div className="flex h-full w-full flex-col items-center justify-center bg-muted/5 p-8 text-center">
                    <MonitorPlay className="mb-4 h-16 w-16 text-muted-foreground" />
                    {!hasPlayers ? (
                        <>
                            <h3 className="text-lg font-black tracking-tighter text-foreground">Sin servidores disponibles</h3>
                            <p className="mt-1 text-[10px] font-bold tracking-widest text-muted-foreground uppercase">Este episodio aún no tiene opciones de reproducción.</p>
                        </>
                    ) : (
                        <p className="text-[10px] font-black tracking-[0.3em] text-muted-foreground uppercase">Selecciona un servidor para comenzar</p>
                    )}
                </div>
            )}
        </div>
    );
}
