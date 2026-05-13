'use client';

import { useEffect } from 'react';

export function ZoomLock() {
    useEffect(() => {
        
        const handleGestureStart = (e: Event) => {
            e.preventDefault();
        };

        
        const handleTouchStart = (e: TouchEvent) => {
            if (e.touches.length > 1) {
                e.preventDefault();
            }
        };

        document.addEventListener('gesturestart', handleGestureStart);
        document.addEventListener('touchstart', handleTouchStart, { passive: false });

        return () => {
            document.removeEventListener('gesturestart', handleGestureStart);
            document.removeEventListener('touchstart', handleTouchStart);
        };
    }, []);

    return null;
}
