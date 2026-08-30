'use client';

import { usePathname } from 'next/navigation';
import { AdsterraBanner } from './AdsterraBanner';

const HIDDEN_ON_PREFIXES = ['/anime/'];

export function GlobalAdBanners() {
    const pathname = usePathname();
    const hidden = HIDDEN_ON_PREFIXES.some((prefix) =>
        pathname?.startsWith(prefix),
    );

    if (hidden) return null;

    return (
        <>
            <div className="hidden justify-center lg:flex">
                <AdsterraBanner
                    dataKey="134fa3f5d54c3691f4ade42c61f9e0f9"
                    width={728}
                    height={90}
                    className="mt-20 -mb-16"
                />
            </div>
            <div className="flex justify-center overflow-hidden lg:hidden">
                <AdsterraBanner
                    dataKey="c4ab9f9ccf07b26e86fbece692431b70"
                    width={320}
                    height={50}
                    className="mt-20 -mb-16"
                />
            </div>
        </>
    );
}
