import React from 'react';
import { animeService } from '@/services/anime.service';
import { CalendarClient } from '@/components/CalendarClient';
import { Metadata } from 'next';

export const revalidate = 300;

export const metadata: Metadata = {
    title: 'Calendario de Estrenos Anime - Emisión Semanal | AnimeLHD',
    description: 'Consulta los horarios de emisión y estrenos de tus animes favoritos. Mantente al día con nuestro calendario semanal de episodios en HD.',
    alternates: {
        canonical: '/calendario',
    },
    openGraph: {
        title: 'Calendario de Estrenos Anime - Emisión Semanal | AnimeLHD',
        description: 'Consulta los horarios de emisión y estrenos de tus animes favoritos.',
        url: '/calendario',
    },
};

export default async function CalendarPage() {
    const calendarData = await animeService.getCalendar();
    
    const initialData = Array.isArray(calendarData) 
        ? calendarData 
        : (calendarData && typeof calendarData === 'object' && 'data' in calendarData && Array.isArray(calendarData.data))
            ? calendarData.data
            : [];

    return <CalendarClient initialData={initialData} />;
}
