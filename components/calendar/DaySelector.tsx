'use client';

import React from 'react';

interface Day {
    id: number;
    name: string;
}

interface DaySelectorProps {
    days: Day[];
    activeDay: number | null;
    onDayChange: (id: number) => void;
}

export function DaySelector({ days, activeDay, onDayChange }: DaySelectorProps) {
    const todayNum = new Date().getDay() || 7;

    return (
        <div className="no-scrollbar mb-12 flex justify-start gap-2 overflow-x-auto px-2 py-3 md:justify-center md:gap-3">
            {days.map((day) => (
                <button
                    key={day.id}
                    onClick={() => onDayChange(day.id)}
                    className={`group relative flex min-w-[75px] flex-col items-center rounded-xl px-4 py-1.5 transition-all duration-300 md:min-w-[100px] md:rounded-2xl md:px-6 md:py-2 ${
                        activeDay === day.id
                            ? 'scale-105 bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                            : 'bg-muted/40 text-muted-foreground hover:bg-muted/60 hover:text-foreground'
                    }`}
                >
                    <span className={`text-[8px] font-black tracking-widest uppercase md:text-[9px] ${activeDay === day.id ? 'opacity-80' : 'opacity-40'}`}>
                        {day.id === todayNum ? 'Hoy' : 'Día'}
                    </span>
                    <span className="text-sm font-black tracking-tighter md:text-base">
                        {day.name}
                    </span>
                </button>
            ))}
        </div>
    );
}
