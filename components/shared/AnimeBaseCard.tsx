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
    showOverlay?: boolean;
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
    showOverlay = true,
}: AnimeBaseCardProps) {
    return (
        <Link href={href} className={cn('group block', className)}>
            <div
                className={cn(
                    'relative overflow-hidden rounded-lg bg-muted ring-1 ring-border transition-all duration-500',
                    aspectRatio === '3/4' ? 'aspect-[3/4]' : 'aspect-video',
                )}
            >
                <img
                    src={image}
                    alt={title}
                    className={cn(
                        'absolute inset-0 h-full w-full object-cover transition-transform',
                        imageClassName,
                    )}
                />
                {/* Overlays */}
                {showOverlay && (
                    <>
                        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/50 via-black/5 to-black/80" />
                        <div className="absolute inset-0 z-20 transition-opacity duration-500 group-hover:bg-black/20" />
                    </>
                )}

                <div className="relative z-30 h-full w-full">
                    {overlay}
                    {children}
                </div>
            </div>

            {footer || (
                <div className="mt-3 px-1">
                    <h3 className="truncate text-[13px] font-bold tracking-normal text-foreground transition-colors group-hover:text-primary">
                        {title}
                    </h3>
                </div>
            )}
        </Link>
    );
}
