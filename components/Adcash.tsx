'use client';

import Script from 'next/script';

export function Adcash() {
    return (
        <Script id="adcash-autotag" strategy="afterInteractive">
            {`
                aclib.runAutoTag({
                    zoneId: 'l5ex59vxg9',
                });
            `}
        </Script>
    );
}
