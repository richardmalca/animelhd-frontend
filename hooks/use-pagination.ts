'use client';

import { useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export function usePagination(baseUrl: string) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();

    const currentPage = Number(searchParams.get('page')) || 1;

    const navigatePage = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', page.toString());
        
        startTransition(() => {
            router.push(`${baseUrl}?${params.toString()}`, { scroll: true });
        });
    };

    return {
        currentPage,
        navigatePage,
        isPending,
    };
}
