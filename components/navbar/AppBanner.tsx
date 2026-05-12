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
        <div className="flex w-full items-center justify-between border-t border-primary/10 bg-primary/5 px-6 py-3 lg:px-10">
            <div className="flex items-center gap-4">
                <Smartphone className="h-5 w-5 text-primary" />
                <div className="flex flex-col">
                    <span className="text-[13px] leading-tight font-bold tracking-tight text-foreground">
                        Kawaii Animes App
                    </span>
                    <span className="text-[11px] leading-tight font-normal tracking-wide text-muted-foreground uppercase">
                        {isAndroid
                            ? 'Disponible para Android'
                            : 'Visita nuestra web oficial'}
                    </span>
                </div>
            </div>
            <div className="flex items-center gap-2">
                {isAndroid && (
                    <a
                        href={appApkUrl}
                        className="flex h-8 items-center gap-2 rounded-md bg-primary px-5 text-[11px] font-bold tracking-widest text-primary-foreground uppercase transition-all hover:opacity-90"
                    >
                        <Download className="h-4 w-4" /> Descargar
                    </a>
                )}
                <a
                    href={appWebOfficial}
                    className="flex h-8 items-center gap-2 rounded-md border border-primary/20 bg-primary/5 px-5 text-[11px] font-bold tracking-widest text-primary uppercase transition-all hover:bg-primary/10"
                >
                    <ExternalLink className="h-4 w-4" /> Web
                </a>
            </div>
        </div>
    );
}
