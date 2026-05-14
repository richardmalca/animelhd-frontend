import { useMemo } from 'react';
import { Player } from '@/types/anime';

export function useDubbing(players: Player[]) {
    return useMemo(() => {
        const langs = players.map(p => p.language?.toString().toLowerCase().trim() || '');
        const hasLatino = langs.includes('latino') || langs.includes('1') || langs.includes('lat');
        const hasSpain = langs.includes('spain') || langs.includes('2') || langs.includes('castellano') || langs.includes('españa') || langs.includes('esp');

        let dubbingType: 'none' | 'latino' | 'spain' | 'multi' = 'none';
        let label = '';

        if (hasLatino && hasSpain) {
            dubbingType = 'multi';
            label = 'Doblaje Latino y España';
        } else if (hasLatino) {
            dubbingType = 'latino';
            label = 'Doblaje Latino';
        } else if (hasSpain) {
            dubbingType = 'spain';
            label = 'Doblaje España';
        }

        return {
            hasLatino,
            hasSpain,
            dubbingType,
            label,
            hasDubbing: dubbingType !== 'none'
        };
    }, [players]);
}
