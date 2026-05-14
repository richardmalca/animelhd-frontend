'use client';

import Script from 'next/script';

declare const aclib: any;

export function Adcash() {
    return (
        <Script
            id="aclib"
            src="//acscdn.com/script/aclib.js"
            strategy="afterInteractive"
            onLoad={() => {
                if (typeof aclib !== 'undefined') {
                    aclib.runInterstitial({
                        zoneId: '11310518',
                    });
                }
            }}
        />
    );
}
