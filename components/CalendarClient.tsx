'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';
import { useCalendar, CalendarAnime } from '@/hooks/use-calendar';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { EmptyState } from '@/components/shared/EmptyState';
import { CalendarCard } from './calendar/CalendarCard';
import { DaySelector } from './calendar/DaySelector';

interface CalendarClientProps {
    initialData: CalendarAnime[];
}



export function CalendarClient({ initialData }: CalendarClientProps) {
    const {
        activeDay,
        setActiveDay,
        days,
        isCreatedToday,
        safeData,
    } = useCalendar(initialData);

    if (safeData.length === 0) {
        return (
            <EmptyState
                title="Calendario vacío"
                description="No hay estrenos programados para esta semana. Vuelve más tarde."
                onClear={() => window.location.reload()}
                clearText="Reintentar"
            />
        );
    }

    return (
        <div className="min-h-screen bg-background pt-20 pb-20">
            <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
                <SectionHeader
                    title="Calendario"
                    highlight="De Animes"
                />

                <div className="mt-8 space-y-10">
                    {days.map((day) => (
                            <section key={day.id} className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                                <div className="mb-4 flex items-center gap-4">
                                    <h2 className="text-xl font-bold tracking-tight text-foreground md:text-2xl">
                                        {day.name}
                                    </h2>
                                </div>

                                {day.animes.length > 0 ? (
                                    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-6">
                                        {day.animes.map((anime) => (
                                            <CalendarCard
                                                key={anime.id}
                                                anime={anime}
                                                isToday={isCreatedToday(anime.last_episode_at)}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border/40 bg-muted/5 py-12">
                                        <p className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                                            Sin estrenos para este día
                                        </p>
                                    </div>
                                )}
                            </section>
                        ))}
                </div>
            </div>
        </div>
    );
}
