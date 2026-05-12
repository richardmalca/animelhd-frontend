'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface AnimeBaseCardProps {
    title: string;
    image: string;
    href: string;
    children?: React.ReactNode;
    overlay?: React.ReactNode;
    footer?: React.ReactNode;
    aspectRatio?: '3/4' | '16/9';
    className?: string;
    imageClassName?: string;
    sizes?: string;
    priority?: boolean;
}

export function AnimeBaseCard({
    title,
    image,
    href,
    children,
    overlay,
    footer,
    aspectRatio = '3/4',
    className,
    imageClassName,
    sizes = '(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw',
    priority = false,
}: AnimeBaseCardProps) {
    return (
        <Link href={href} className={cn('group block', className)}>
            <div
                className={cn(
                    'relative overflow-hidden rounded-2xl bg-muted ring-1 ring-border transition-all duration-500',
                    aspectRatio === '3/4' ? 'aspect-[3/4]' : 'aspect-video',
                )}
            >
                <Image
                    src={image}
                    alt={title}
                    fill
                    priority={priority}
                    className={cn(
                        'object-cover transition-transform duration-700 group-hover:scale-110',
                        imageClassName,
                    )}
                    sizes={sizes}
                />
                {/* Overlays */}
                <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/90 via-black/40 to-transparent h-2/3" />
                <div className="absolute inset-x-0 bottom-0 z-10 h-2/3 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />


                <div className="absolute inset-0 z-20 transition-opacity duration-500 group-hover:bg-black/20" />

                <div className="relative z-30 h-full w-full">
                    {overlay}
                    {children}
                </div>
            </div>

            {footer || (
                <div className="mt-3 px-1">
                    <h3 className="line-clamp-2 h-10 text-[13px] font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
                        {title}
                    </h3>
                </div>
            )}
        </Link>
    );
}
