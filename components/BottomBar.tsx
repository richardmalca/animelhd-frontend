'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Compass, Calendar, Mic2, Headphones } from 'lucide-react';
import { cn } from '@/lib/utils';

export function BottomBar() {
    const pathname = usePathname();

    const navItems = [
        { label: 'Inicio', href: '/', icon: Home },
        { label: 'Directorio', href: '/directorio', icon: Compass },
        { label: 'Latino', href: '/latinos', icon: Mic2 },
        { label: 'Castellano', href: '/castellanos', icon: Headphones },
        { label: 'Calendario', href: '/calendario', icon: Calendar },
    ];

    return (
        <nav className="pb-safe fixed bottom-0 left-0 z-50 flex w-full items-center justify-around border-t border-border bg-background/80 pt-2 backdrop-blur-xl md:hidden">
            {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            'flex flex-col items-center gap-1 px-4 py-2 transition-colors',
                            isActive ? 'text-primary' : 'text-muted-foreground',
                        )}
                    >
                        <Icon
                            className={cn(
                                'h-5 w-5',
                                isActive && 'fill-primary/10',
                            )}
                        />
                        <span
                            className={cn(
                                'text-[9px] font-black tracking-widest uppercase',
                                isActive
                                    ? 'text-primary'
                                    : 'text-muted-foreground',
                            )}
                        >
                            {item.label}
                        </span>
                    </Link>
                );
            })}
        </nav>
    );
}
