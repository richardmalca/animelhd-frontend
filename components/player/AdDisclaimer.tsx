import React from 'react';
import Link from 'next/link';

interface AdDisclaimerProps {
    onDismiss: () => void;
    dubbingBadge?: React.ReactNode;
}

export function AdDisclaimer({ onDismiss, dubbingBadge }: AdDisclaimerProps) {
    return (
        <div className="flex flex-row items-center justify-between gap-2 rounded-t-lg border-x border-t border-white/5 bg-white/5 px-3 py-2 sm:px-4">
            <div className="flex items-center gap-2 overflow-hidden sm:gap-3">
                {dubbingBadge}
                {dubbingBadge && <div className="hidden h-3 w-px bg-white/10 sm:block" />}
                <p className="truncate text-[10px] font-medium text-muted-foreground sm:text-xs">
                    ¿Te aparecen anuncios?
                </p>
            </div>
            <div className="flex shrink-0 items-center gap-3 sm:gap-4">
                <Link
                    href="/pages/about-ads"
                    className="text-[10px] font-black text-primary hover:underline uppercase tracking-tight sm:text-xs"
                >
                    Saber más
                </Link>
                <button
                    onClick={onDismiss}
                    className="text-[10px] font-black text-muted-foreground/60 hover:text-white uppercase tracking-tight sm:text-xs"
                >
                    Cerrar
                </button>
            </div>
        </div>
    );
}
