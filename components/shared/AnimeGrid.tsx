import React from 'react';

interface AnimeGridProps {
    children: React.ReactNode;
    className?: string;
}

export function AnimeGrid({ children, className = 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 2xl:grid-cols-8' }: AnimeGridProps) {
    return (
        <div className={`grid gap-4 md:gap-8 ${className}`}>

            {children}
        </div>
    );
}
