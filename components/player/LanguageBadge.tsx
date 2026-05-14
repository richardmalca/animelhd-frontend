import React from 'react';

interface LanguageBadgeProps {
    language: 'latino' | 'spain' | 'sub';
    active?: boolean;
}

export function LanguageBadge({ language, active }: LanguageBadgeProps) {
    const config = {
        latino: {
            flag: 'https://flagcdn.com/mx.svg',
            label: 'Español Latino',
            color: 'text-blue-400',
            bg: 'bg-blue-500/10',
            ring: 'ring-blue-500/20'
        },
        spain: {
            flag: 'https://flagcdn.com/es.svg',
            label: 'Castellano',
            color: 'text-amber-400',
            bg: 'bg-amber-500/10',
            ring: 'ring-amber-500/20'
        },
        sub: {
            flag: 'https://flagcdn.com/jp.svg',
            label: 'Japonés',
            color: 'text-primary',
            bg: 'bg-primary/10',
            ring: 'ring-primary/20'
        }
    };

    const current = config[language === 'sub' ? 'sub' : language];

    return (
        <div className={`flex items-center gap-2 rounded-lg ${current.bg} px-2.5 py-1.5 ring-1 ${current.ring} sm:gap-2.5 sm:px-3 sm:py-2 ${active ? 'ring-2 ring-white/50' : ''}`}>
            <img
                src={current.flag}
                alt={current.label}
                className="h-3 w-4 rounded-[1px] object-cover sm:h-3.5 sm:w-5"
            />
            <span className={`text-[9px] font-black uppercase tracking-wider ${current.color} sm:text-[10px]`}>
                {current.label}
            </span>
        </div>
    );
}
