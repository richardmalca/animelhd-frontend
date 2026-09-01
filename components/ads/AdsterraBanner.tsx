'use client';

import { useEffect, useRef, useState } from 'react';

interface AdsterraBannerProps {
    dataKey: string;
    width: number;
    height: number;
    className?: string;
}

export function AdsterraBanner({
    dataKey,
    width,
    height,
    className,
}: AdsterraBannerProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [filled, setFilled] = useState(false);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const iframe = document.createElement('iframe');
        iframe.width = String(width);
        iframe.height = String(height);
        iframe.scrolling = 'no';
        iframe.title = 'banner';
        iframe.style.border = 'none';
        iframe.style.display = 'block';
        iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin');
        iframe.srcdoc = `<!DOCTYPE html><html><head><style>body{margin:0;padding:0;overflow:hidden;}</style></head><body>
<script>
  atOptions = {
    'key': '${dataKey}',
    'format': 'iframe',
    'height': ${height},
    'width': ${width},
    'params': {}
  };
<\/script>
<script src="https://doubtfulimpatient.com/${dataKey}/invoke.js"><\/script>
</body></html>`;

        container.appendChild(iframe);

        const checkTimer = setTimeout(() => {
            try {
                const doc = iframe.contentDocument;
                const innerIframe = doc?.querySelector('iframe');
                const hasCreative = Boolean(
                    innerIframe?.src && innerIframe.src !== 'about:blank',
                );
                setFilled(hasCreative);
            } catch {
                setFilled(false);
            }
        }, 2500);

        return () => {
            clearTimeout(checkTimer);
            container.removeChild(iframe);
        };
    }, [dataKey, width, height]);

    return (
        <div className={className}>
            <div
                className="relative overflow-hidden rounded-lg border border-white/10 bg-white/5"
                style={{ width, height }}
            >
                {!filled && (
                    <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-sm font-bold tracking-wide text-white/20 select-none">
                        {width}x{height}
                    </span>
                )}
                <div ref={containerRef} style={{ width, height }} />
            </div>
        </div>
    );
}
