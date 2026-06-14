"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const WatchModel3D = dynamic(() => import("@/components/WatchModel3D"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-8 h-8 border border-gray-200 rounded-full animate-spin border-t-gray-500" />
    </div>
  ),
});

const photos = [
  {
    src: "/images/photo-1649803091689-0e65c4e9581f.jpg",
    label: "Ręczny montaż",
    desc: "Każdy zegarek składany jest ręcznie przez doświadczonego zegarmistrza.",
  },
  {
    src: "/images/photo-1612263731558-bbac49f8581a.jpg",
    label: "Precyzja mechanizmu",
    desc: "Mechanizm Seiko NH35 — 28 800 drgań na godzinę.",
  },
  {
    src: "/images/photo-1633451238042-85d93d267866.jpg",
    label: "Detal i rzemiosło",
    desc: "Każdy trybik to efekt dziesiątek lat tradycji zegarmistrzostwa.",
  },
];

export default function Home() {
  return (
    <div className="bg-white text-black">

      {/* ── HEADER ── */}
      <header className="fixed top-0 inset-x-0 z-50 h-14 flex items-center justify-between px-6 lg:px-10 bg-white/90 backdrop-blur-sm border-b border-gray-100">
        <span className="text-base font-semibold tracking-tight">AuroraLab</span>
        <nav className="flex items-center gap-8 text-sm text-gray-500">
          <a href="#craft" className="hover:text-black transition-colors">Rzemiosło</a>
          <a href="#about" className="hover:text-black transition-colors">O nas</a>
          <Link
            href="/configurator"
            className="bg-black text-white text-xs font-medium px-5 py-2 rounded-full hover:bg-gray-800 transition-colors"
          >
            Konfiguruj
          </Link>
        </nav>
      </header>

      {/* ── HERO — 3D model + headline ── */}
      <section className="min-h-screen pt-14 grid grid-cols-1 lg:grid-cols-2">

        {/* LEFT — headline */}
        <div className="flex flex-col justify-center px-8 lg:px-16 py-20 lg:py-0 order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-md space-y-8"
          >
            <div className="space-y-3">
              <p className="text-[10px] text-gray-400 uppercase tracking-widest">
                Seiko NH35 · Custom Build
              </p>
              <h1 className="text-5xl lg:text-6xl font-light leading-[1.1] tracking-tight">
                Zegarek<br />szyty na<br />miarę.
              </h1>
            </div>

            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
              Wybierz każdy komponent. Złożymy go ręcznie, z precyzją, jakiej nie ma
              żaden masowy producent.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/configurator"
                className="inline-flex items-center justify-center gap-2 bg-black text-white text-sm font-medium px-7 py-3 rounded-full hover:bg-gray-800 transition-colors"
              >
                Zacznij konfigurować
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <a
                href="#craft"
                className="inline-flex items-center justify-center gap-2 text-sm text-gray-500 px-7 py-3 rounded-full border border-gray-200 hover:border-gray-400 hover:text-black transition-colors"
              >
                Dowiedz się więcej
              </a>
            </div>

            {/* Specs bar */}
            <div className="flex gap-8 pt-4 border-t border-gray-100">
              {[
                { value: "NH35", label: "Mechanizm" },
                { value: "36mm", label: "Średnica" },
                { value: "60+", label: "Kombinacji" },
              ].map(({ value, label }) => (
                <div key={label}>
                  <p className="text-lg font-medium">{value}</p>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wide mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* RIGHT — 3D model */}
        <div className="relative bg-[#f7f7f7] flex items-center justify-center order-1 lg:order-2 min-h-[50vh] lg:min-h-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="w-full h-full min-h-[50vh] lg:min-h-screen"
          >
            <WatchModel3D />
          </motion.div>

          {/* Subtle label */}
          <div className="absolute bottom-6 right-6 text-[10px] text-gray-400 uppercase tracking-widest">
            Przeciągnij aby obrócić
          </div>
        </div>
      </section>

      {/* ── CRAFT — 3 zdjęcia ── */}
      <section id="craft" className="py-24 lg:py-32 px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <div className="mb-14">
            <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-3">Rzemiosło</p>
            <h2 className="text-3xl lg:text-4xl font-light">
              Precyzja w każdym detalu
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {photos.map(({ src, label, desc }, i) => (
              <motion.div
                key={src}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.12, duration: 0.6 }}
                viewport={{ once: true }}
                className="group space-y-4"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                  <Image
                    src={src}
                    alt={label}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: "cover" }}
                    className="group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium">{label}</p>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── ABOUT — zdjęcie pełnoekranowe + tekst ── */}
      <section id="about" className="grid grid-cols-1 lg:grid-cols-2 min-h-[70vh]">
        <div className="relative min-h-[50vh] lg:min-h-0 overflow-hidden">
          <Image
            src="/images/photo-1569702948069-343ed9bf6fe2.jpg"
            alt="Mechanizm zegarka"
            fill
            sizes="50vw"
            style={{ objectFit: "cover" }}
          />
        </div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="flex flex-col justify-center px-8 lg:px-16 py-16 bg-[#fafafa]"
        >
          <div className="max-w-sm space-y-6">
            <p className="text-[10px] text-gray-400 uppercase tracking-widest">O nas</p>
            <h2 className="text-3xl lg:text-4xl font-light leading-snug">
              Tworzymy zegarki, nie produkty.
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              AuroraLab powstało z pasji do mechanicznych zegarków i frustracji brakiem
              możliwości personalizacji. Każdy zegarek, który opuszcza nasze warsztaty,
              jest unikatowy — złożony ręcznie, sprawdzony i gotowy na lata.
            </p>
            <p className="text-sm text-gray-500 leading-relaxed">
              Bazujemy na sprawdzonym mechanizmie Seiko NH35, który gwarantuje niezawodność
              i możliwość serwisowania przez dziesiątki lat.
            </p>
            <Link
              href="/configurator"
              className="inline-flex items-center gap-2 text-sm font-medium text-black border-b border-black pb-0.5 hover:opacity-60 transition-opacity w-fit"
            >
              Stwórz swój zegarek
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-24 lg:py-32 px-6 text-center bg-black text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="space-y-8 max-w-xl mx-auto"
        >
          <h2 className="text-4xl lg:text-5xl font-light leading-tight">
            Gotowy na swój<br />zegarek?
          </h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            Konfigurator zajmuje 2 minuty. Zegarek — całe życie.
          </p>
          <Link
            href="/configurator"
            className="inline-flex items-center gap-2 bg-white text-black text-sm font-medium px-8 py-4 rounded-full hover:bg-gray-100 transition-colors"
          >
            Otwórz konfigurator
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </motion.div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="h-14 border-t border-gray-100 flex items-center justify-between px-6 lg:px-10 bg-white">
        <p className="text-xs text-gray-400">© 2024 AuroraLab</p>
        <p className="text-xs text-gray-400">Seiko NH35 · Custom Watch Builds</p>
      </footer>
    </div>
  );
}
