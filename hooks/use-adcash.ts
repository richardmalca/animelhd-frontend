import { useCallback } from 'react';

declare const aclib: any;

export function useAdcash() {
    const isReady = useCallback(() => {
        return typeof aclib !== 'undefined';
    }, []);

    const runPop = useCallback((zoneId: string = '11310558') => {
        if (isReady() && typeof aclib.runPop === 'function') {
            console.log(`[Adcash] Iniciando Pop: ${zoneId}`);
            aclib.runPop({ zoneId });
        }
    }, [isReady]);

    return {
        isReady,
        runPop
    };
}
