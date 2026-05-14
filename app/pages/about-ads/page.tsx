import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldAlert, Heart, PlayCircle } from 'lucide-react';

export default function AboutAdsPage() {
    return (
        <main className="min-h-screen py-20">
            <div className="mx-auto max-w-5xl px-6">
                <Link
                    href="/"
                    className="group mb-12 inline-flex items-center gap-2 text-[10px] font-black tracking-widest text-muted-foreground uppercase transition-colors hover:text-primary"
                >
                    <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-1" />
                    Volver al inicio
                </Link>

                <header className="mb-8">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <ShieldAlert className="h-6 w-6" />
                    </div>
                    <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
                        Sobre la Publicidad
                    </h1>
                    <div className="mt-3 h-1 w-12 bg-primary" />
                </header>

                <article className="space-y-8 text-muted-foreground">
                    <section className="max-w-3xl">
                        <p className="text-base leading-relaxed sm:text-lg">
                            Nuestra plataforma actúa como una interfaz de
                            búsqueda y organización de contenido. No almacenamos
                            archivos de video en nuestros propios servidores; en
                            su lugar, utilizamos infraestructuras de terceros
                            para garantizar una transmisión fluida y global.
                        </p>
                    </section>

                    <div className="grid grid-cols-1 gap-12 border-t border-white/5 pt-6 md:grid-cols-2 md:gap-16">
                        <section className="space-y-6">
                            <div className="flex gap-5">
                                <div className="mt-1 shrink-0">
                                    <PlayCircle className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <h3 className="mb-3 text-xs font-black tracking-[0.2em] text-white uppercase">
                                        Servidores de Video
                                    </h3>
                                    <p className="text-sm leading-relaxed sm:text-base">
                                        Los proveedores externos gestionan su
                                        propia publicidad para cubrir los costes
                                        de ancho de banda. Estos anuncios, que
                                        suelen aparecer al pulsar "Play", son
                                        independientes de la programación de
                                        AnimeLatinoHD.
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section className="space-y-6">
                            <div className="flex gap-5">
                                <div className="mt-1 shrink-0">
                                    <Heart className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <h3 className="mb-3 text-xs font-black tracking-[0.2em] text-white uppercase">
                                        Sostenibilidad
                                    </h3>
                                    <div className="mb-4 inline-flex items-center rounded-md bg-primary/10 px-3 py-1.5 ring-1 ring-primary/20 ring-inset">
                                        <span className="text-[10px] font-black tracking-[0.2em] text-primary uppercase">
                                            Libre de publicidad propia
                                        </span>
                                    </div>
                                    <p className="text-base font-bold text-white sm:text-lg">
                                        Disfruta tu anime aquí y con eso ya nos
                                        ayudas.
                                    </p>
                                    <p className="mt-2 text-sm leading-relaxed sm:text-base">
                                        Al utilizar nuestra plataforma, generas
                                        el tráfico necesario para mantener los
                                        servidores activos y el servicio
                                        gratuito para todos.
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>

                    <footer className="flex items-center justify-center gap-4 border-t border-white/5 pt-12">
                        <span className="h-px w-8 bg-white/10" />
                        <p className="text-center text-[9px] font-bold tracking-[0.3em] text-muted-foreground/40 uppercase">
                            AnimeLatinoHD • 2026
                        </p>
                        <span className="h-px w-8 bg-white/10" />
                    </footer>
                </article>
            </div>
        </main>
    );
}
