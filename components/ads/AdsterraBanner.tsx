'use client';

import { useEffect, useRef } from 'react';

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

        return () => {
            container.removeChild(iframe);
        };
    }, [dataKey, width, height]);

    return (
        <div
            ref={containerRef}
            className={className}
            style={{ width, height, overflow: 'hidden' }}
        />
    );
}
