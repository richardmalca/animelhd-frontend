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
        <div className="min-h-screen bg-background pt-24 pb-20">
            <div className="mx-auto max-w-[1600px] px-4 md:px-8">
                <div className="flex flex-col items-center text-center">
                    <div className="mb-4 flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-[9px] font-black tracking-[0.2em] text-primary uppercase ring-1 ring-primary/20">
                        <Sparkles className="h-3 w-3" />
                        <span>Programación</span>
                    </div>
                    <SectionHeader
                        title="Calendario"
                        highlight="Semanal"
                        className="mb-8"
                    />
                </div>

                <DaySelector
                    days={days}
                    activeDay={activeDay}
                    onDayChange={setActiveDay}
                />

                <div className="space-y-16">
                    {days
                        .filter((d) => activeDay === null || d.id === activeDay)
                        .map((day) => (
                            <section key={day.id} className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                                <div className="mb-8 flex items-center gap-4 border-b border-border/40 pb-4">
                                    <h2 className="text-xl font-black tracking-tighter text-foreground md:text-2xl">
                                        {day.name}
                                    </h2>
                                    <span className="rounded-full bg-muted/50 px-2.5 py-0.5 text-[10px] font-black text-muted-foreground">
                                        {day.animes.length}
                                    </span>
                                </div>

                                {day.animes.length > 0 ? (
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                                        {day.animes.map((anime) => (
                                            <CalendarCard
                                                key={anime.id}
                                                anime={anime}
                                                isToday={isCreatedToday(anime.last_episode_at)}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border/40 bg-muted/5 py-12">
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
