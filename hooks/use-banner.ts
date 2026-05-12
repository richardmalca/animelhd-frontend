'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function useBanner() {
    const pathname = usePathname();
    const [deviceInfo, setDeviceInfo] = useState({ isAndroid: false, isIOS: false });
    const isHomePage = pathname === '/';

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const ua = window.navigator.userAgent.toLowerCase();
        const info = {
            isAndroid: /android/i.test(ua),
            isIOS: /iphone|ipad|ipod/i.test(ua)
        };
        
        Promise.resolve().then(() => {
            setDeviceInfo(info);
        });
    }, []);



    return {
        isVisible: isHomePage,
        isAndroid: deviceInfo.isAndroid,
        isIOS: deviceInfo.isIOS
    };
}
