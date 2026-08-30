'use client';

import { AdsterraBanner } from './AdsterraBanner';

interface InContentBannerProps {
    className?: string;
}

export function InContentBanner({ className }: InContentBannerProps) {
    return (
        <div className={className}>
            <div className="hidden justify-center lg:flex">
                <AdsterraBanner
                    dataKey="134fa3f5d54c3691f4ade42c61f9e0f9"
                    width={728}
                    height={90}
                />
            </div>
            <div className="flex justify-center overflow-hidden lg:hidden">
                <AdsterraBanner
                    dataKey="c4ab9f9ccf07b26e86fbece692431b70"
                    width={320}
                    height={50}
                />
            </div>
        </div>
    );
}
