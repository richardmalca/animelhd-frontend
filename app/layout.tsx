import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono, Roboto_Condensed } from 'next/font/google';
import { GlobalAdBanners } from '@/components/ads/GlobalAdBanners';

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
};
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { BottomBar } from '@/components/BottomBar';
import { Chatbro } from '@/components/Chatbro';
import { GoogleAnalytics } from '@/components/GoogleAnalytics';
import { ZoomLock } from '@/components/shared/ZoomLock';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

const robotoCondensed = Roboto_Condensed({
    variable: '--font-roboto-condensed',
    subsets: ['latin'],
    weight: ['300', '400', '700', '900'],
});

export const metadata: Metadata = {
    metadataBase: new URL(
        process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    ),

    title: {
        default: 'AnimeLHD - Tu portal de anime favorito',
        template: '%s | AnimeLHD',
    },
    description:
        'Ver anime online gratis en HD. Disfruta de tus animes favoritos con la mejor calidad, subtitulados al español y doblaje latino en AnimeLHD.',
    keywords: [
        'anime',
        'ver anime',
        'anime online',
        'anime hd',
        'estrenos anime',
        'anime gratis',
        'animelhd',
    ],
    authors: [{ name: 'AnimeLHD' }],
    creator: 'AnimeLHD',
    publisher: 'AnimeLHD',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    openGraph: {
        type: 'website',
        locale: 'es_ES',
        url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
        siteName: 'AnimeLHD',

        title: 'AnimeLHD - Tu portal de anime favorito',
        description:
            'Ver anime online gratis en HD. Disfruta de tus animes favoritos con la mejor calidad en AnimeLHD.',
        images: [
            {
                url: '/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'AnimeLHD',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'AnimeLHD - Tu portal de anime favorito',
        description:
            'Ver anime online gratis en HD. Disfruta de tus animes favoritos con la mejor calidad en AnimeLHD.',
        images: ['/og-image.jpg'],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="es"
            className={`${geistSans.variable} ${geistMono.variable} ${robotoCondensed.variable} antialiased`}
            suppressHydrationWarning
        >
            <body>
                <ZoomLock />
                <Navbar />
                <GlobalAdBanners />
                <main className="min-h-screen">{children}</main>
                <BottomBar />
                <Chatbro />
                <GoogleAnalytics />
            </body>
        </html>
    );
}
