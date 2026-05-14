'use client';

import Script from 'next/script';

declare const aclib: any;

export function Adcash() {
    return (
        <Script
            id="aclib"
            src="https://acscdn.com/script/aclib.js"
            strategy="afterInteractive"
        />
    );
}
