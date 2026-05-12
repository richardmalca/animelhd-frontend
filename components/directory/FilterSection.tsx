'use client';

import React from 'react';

interface FilterOption {
    key: string;
    label: string | number;
    isActive: boolean;
}

interface FilterSectionProps {
    title: string;
    options: FilterOption[];
    onOptionClick: (key: string) => void;
    isPending: boolean;
    maxHeight?: string;
}

export function FilterSection({
    title,
    options,
    onOptionClick,
    isPending,
    maxHeight,
}: FilterSectionProps) {
    return (
        <section className="flex flex-col gap-5">
            <h3 className="text-[10px] font-black tracking-[0.3em] text-muted-foreground uppercase">
                {title}
            </h3>
            <div 
                className={`no-scrollbar flex flex-col gap-2 overflow-y-auto pr-2 ${maxHeight || ''}`}
            >
                {options.map((option) => (
                    <button
                        key={option.key}
                        disabled={isPending}
                        onClick={() => onOptionClick(option.key)}
                        className={`group flex items-center gap-2.5 text-left text-[13px] transition-all duration-300 disabled:opacity-50 ${
                            option.isActive 
                                ? 'font-black text-primary' 
                                : 'text-muted-foreground hover:text-foreground'
                        }`}
                    >
                        <span 
                            className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                                option.isActive 
                                    ? 'scale-125 bg-primary' 
                                    : 'bg-muted-foreground/20 group-hover:bg-primary/50'
                            }`} 
                        />
                        {option.label}
                    </button>
                ))}
            </div>
        </section>
    );
}
