'use client';

import React from 'react';
import { Smartphone, Download, ExternalLink } from 'lucide-react';

interface AppBannerProps {
    isVisible: boolean;
    isAndroid: boolean;
    appWebOfficial: string;
    appApkUrl: string;
}

export function AppBanner({
    isVisible,
    isAndroid,
    appWebOfficial,
    appApkUrl,
}: AppBannerProps) {
    if (!isVisible) return null;

    return (
        <div className="flex w-full items-center justify-between border-t border-primary/10 bg-primary/5 px-4 py-2 md:px-6">
            <div className="flex items-center gap-3">
                <Smartphone className="h-4 w-4 text-primary" />
                <div className="flex flex-col">
                    <span className="text-[11px] leading-tight font-black tracking-tight text-foreground">
                        Kawaii Animes App
                    </span>
                    <span className="text-[9px] leading-tight font-bold tracking-widest text-muted-foreground uppercase">
                        {isAndroid
                            ? 'Disponible para Android'
                            : 'Visita nuestra web oficial'}
                    </span>
                </div>
            </div>
            <div className="flex items-center gap-1.5">
                {isAndroid && (
                    <a
                        href={appApkUrl}
                        className="flex h-7 items-center gap-1.5 rounded-md bg-primary px-4 text-[9px] font-black tracking-widest text-primary-foreground uppercase transition-all hover:opacity-90"
                    >
                        <Download className="h-3.5 w-3.5" /> Descargar
                    </a>
                )}
                <a
                    href={appWebOfficial}
                    className="flex h-7 items-center gap-1.5 rounded-md border border-primary/20 bg-primary/5 px-4 text-[9px] font-black tracking-widest text-primary uppercase transition-all hover:bg-primary/10"
                >
                    <ExternalLink className="h-3.5 w-3.5" /> Web
                </a>
            </div>
        </div>
    );
}
