'use client';

import { AdsterraBanner } from './AdsterraBanner';

interface AdsterraRectangleProps {
    className?: string;
}

export function AdsterraRectangle({ className }: AdsterraRectangleProps) {
    return (
        <div className={`flex justify-center ${className ?? ''}`}>
            <AdsterraBanner
                dataKey="2cdfd99bd23dd580e8967fbcedd13ee2"
                width={300}
                height={250}
            />
        </div>
    );
}
