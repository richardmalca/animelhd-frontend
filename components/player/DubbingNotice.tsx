import React from 'react';
import { Mic2 } from 'lucide-react';
import { LanguageBadge } from './LanguageBadge';

interface DubbingNoticeProps {
    dubbingType: 'none' | 'latino' | 'spain' | 'multi';
    label: string;
}

export function DubbingNotice({ dubbingType, label }: DubbingNoticeProps) {
    if (dubbingType === 'none') return null;

    const descriptions = {
        latino: 'Este episodio está disponible con doblaje al Español Latino. ¡Disfrútalo en tu idioma!',
        spain: 'Este episodio está disponible con doblaje de España (Castellano).',
        multi: '¡Múltiples opciones disponibles! Este episodio cuenta con doblaje Latino y de España.',
    };

    return (
        <div className="flex flex-col gap-3 rounded-xl border border-white/5 bg-white/5 p-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:p-5">
            <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary sm:h-10 sm:w-10 sm:rounded-xl">
                    <Mic2 className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-black text-muted-foreground uppercase md:text-xl">
                            {label} Detectado
                        </span>
                        <div className="flex h-1.5 w-1.5 items-center justify-center">
                            <span className="h-1 w-1 animate-pulse rounded-full bg-primary" />
                        </div>
                    </div>
                    <p className="text-xs leading-tight font-medium text-foreground/80 sm:text-sm sm:leading-relaxed">
                        {
                            descriptions[
                                dubbingType === 'multi'
                                    ? 'multi'
                                    : dubbingType === 'spain'
                                      ? 'spain'
                                      : 'latino'
                            ]
                        }
                        <span className="hidden sm:ml-1 sm:inline sm:text-muted-foreground">
                            — Selecciona tu preferencia abajo.
                        </span>
                    </p>
                </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:shrink-0 sm:gap-2.5">
                {(dubbingType === 'latino' || dubbingType === 'multi') && (
                    <LanguageBadge language="latino" />
                )}
                {(dubbingType === 'spain' || dubbingType === 'multi') && (
                    <LanguageBadge language="spain" />
                )}
            </div>
        </div>
    );
}
