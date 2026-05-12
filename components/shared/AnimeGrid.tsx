import React from 'react';

interface AnimeGridProps {
    children: React.ReactNode;
    className?: string;
}

export function AnimeGrid({ children, className = 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 2xl:grid-cols-8' }: AnimeGridProps) {
    return (
        <div className={`grid gap-2 md:gap-4 ${className}`}>

            {children}
        </div>
    );
}
