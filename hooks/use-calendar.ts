import { useState, useEffect, useCallback, useMemo } from 'react';


export interface CalendarAnime {
    id: number;
    name: string;
    name_alternative?: string;
    slug: string;
    poster: string;
    banner: string;
    type: string;
    broadcast: string | number;
    broadcast_time?: string;
    vote_average: number;
    last_episode_number: number;
    last_episode_at?: string;
}


interface CalendarDay {
    id: number;
    name: string;
    isToday: boolean;
    animes: CalendarAnime[];
}

export function useCalendar(initialData: CalendarAnime[]) {
    const [activeDay, setActiveDay] = useState<number | null>(() => {
        const todayIdx = new Date().getDay();
        return todayIdx === 0 ? 7 : todayIdx;
    });

    const safeData = useMemo(() => Array.isArray(initialData) ? initialData : [], [initialData]);

    const days = useMemo(() => {
        const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        const today = new Date();
        const todayIdx = today.getDay();
        const weekDays: CalendarDay[] = [];

        for (let i = 0; i < 7; i++) {
            const currentDayIdx = (todayIdx + i) % 7;
            const dayNum = currentDayIdx === 0 ? 7 : currentDayIdx;

            let displayName = dayNames[currentDayIdx];
            if (i === 0) displayName = 'Hoy';
            if (i === 1) displayName = 'Mañana';

            weekDays.push({
                id: dayNum,
                name: displayName,
                isToday: i === 0,
                animes: safeData.filter(
                    (anime) => Number(anime.broadcast) === dayNum,
                ),
            });
        }
        return weekDays;
    }, [safeData]);


    const handlePrevDay = useCallback(() => {
        const currentIndex = days.findIndex((d) => d.id === activeDay);
        if (currentIndex === -1) return;
        const prevIndex = (currentIndex - 1 + days.length) % days.length;
        setActiveDay(days[prevIndex].id);
    }, [activeDay, days]);

    const handleNextDay = useCallback(() => {
        const currentIndex = days.findIndex((d) => d.id === activeDay);
        if (currentIndex === -1) return;
        const nextIndex = (currentIndex + 1) % days.length;
        setActiveDay(days[nextIndex].id);
    }, [activeDay, days]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'ArrowLeft') {
                handlePrevDay();
            } else if (event.key === 'ArrowRight') {
                handleNextDay();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handlePrevDay, handleNextDay]);

    const isCreatedToday = (dateStr?: string) => {
        if (!dateStr) return false;
        try {
            const date = new Date(dateStr).toDateString();
            const today = new Date().toDateString();
            return date === today;
        } catch {
            return false;
        }
    };

    return {
        activeDay,
        setActiveDay,
        days,
        handlePrevDay,
        handleNextDay,
        isCreatedToday,
        safeData
    };
}
