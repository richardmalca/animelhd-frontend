'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
    { name: 'Inicio', href: '/' },
    { name: 'Directorio', href: '/directorio' },
    { name: 'Calendario', href: '/calendario' },
    { name: 'Latinos', href: '/latinos' },
    { name: 'Castellanos', href: '/castellanos' },
];

export function NavLinks() {
    const pathname = usePathname();

    return (
        <div className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={`relative text-[11px] font-black tracking-widest uppercase transition-all duration-300 ${
                            isActive
                                ? 'text-primary'
                                : 'text-white/70 hover:text-white'
                        }`}
                    >
                        {link.name}
                        {isActive && (
                            <span className="animate-in fade-in zoom-in absolute -bottom-[21px] left-0 h-[2px] w-full bg-primary duration-300" />
                        )}
                    </Link>
                );
            })}
        </div>
    );
}
