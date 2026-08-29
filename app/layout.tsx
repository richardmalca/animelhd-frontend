import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono, Roboto_Condensed } from 'next/font/google';
import { AdsterraBanner } from '@/components/ads/AdsterraBanner';

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

                <div className="hidden justify-center py-2 sm:flex">
                    <AdsterraBanner
                        dataKey="7723dc29c5f31d2ab4bb247cb19c97cf"
                        width={468}
                        height={60}
                    />
                </div>
                <div className="flex justify-center py-2 sm:hidden">
                    <AdsterraBanner
                        dataKey="c4ab9f9ccf07b26e86fbece692431b70"
                        width={320}
                        height={50}
                    />
                </div>

                <div className="hidden 2xl:fixed 2xl:top-1/3 2xl:left-2 2xl:z-10 2xl:block">
                    <AdsterraBanner
                        dataKey="7a1fa381f196b6b0837bc31caf758497"
                        width={160}
                        height={300}
                    />
                </div>
                <div className="hidden 2xl:fixed 2xl:top-1/4 2xl:right-2 2xl:z-10 2xl:block">
                    <AdsterraBanner
                        dataKey="3b75523d76c3fd85472ce3adc2b6e811"
                        width={160}
                        height={600}
                    />
                </div>

                <main className="min-h-screen">{children}</main>
                <BottomBar />
                <Chatbro />
                <GoogleAnalytics />
            </body>
        </html>
    );
}
