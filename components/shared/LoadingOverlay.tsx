import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingOverlayProps {
    isVisible: boolean;
    text?: string;
}

export function LoadingOverlay({ isVisible, text = 'Cargando...' }: LoadingOverlayProps) {
    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-background/20 backdrop-blur-[2px] transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        >
            <div className="flex flex-col items-center gap-2">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="text-[10px] font-black tracking-[0.2em] text-foreground uppercase">
                    {text}
                </span>
            </div>
        </div>
    );
}
