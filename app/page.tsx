"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

import AuroraBackground from "@/components/AuroraBackground";

const WatchModel3D = dynamic(() => import("@/components/WatchModel3D"), {
  ssr: false,
  loading: () => null,
});

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="snap-container">

      {/* ── FIXED HEADER ── */}
      <header className="fixed top-0 z-50 flex items-center justify-between h-20" style={{ left: 0, right: 0, paddingLeft: "40px", paddingRight: "40px" }}>
        <Image src="/LOGO.png" alt="AuroraLab" width={180} height={60} style={{ objectFit: "contain" }} />

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-10 text-sm text-white/50 tracking-widest uppercase">
          <a href="#craft" className="hover:text-white transition-colors">Rzemiosło</a>
          <a href="#about" className="hover:text-white transition-colors">O nas</a>
          <Link href="/configurator" className="bg-white text-black text-sm font-semibold rounded-full hover:bg-white/90 transition-all duration-300" style={{ padding: "14px 40px" }}>
            Konfiguruj
          </Link>
        </nav>

        {/* Hamburger button — mobile only */}
        <button
          className="lg:hidden flex flex-col justify-center gap-1.5 w-8 h-8"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span className={`block h-px bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block h-px bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block h-px bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-[#0a0a0a]/95 backdrop-blur-md flex flex-col items-center justify-center gap-10 lg:hidden"
          >
            <a href="#craft" onClick={() => setMenuOpen(false)} className="text-2xl font-light text-white/70 hover:text-white uppercase tracking-widest transition-colors">Rzemiosło</a>
            <a href="#about" onClick={() => setMenuOpen(false)} className="text-2xl font-light text-white/70 hover:text-white uppercase tracking-widest transition-colors">O nas</a>
            <Link href="/configurator" onClick={() => setMenuOpen(false)} className="mt-4 bg-white text-black text-sm font-semibold rounded-full uppercase tracking-widest hover:bg-white/90 transition-colors" style={{ padding: "16px 48px" }}>
              Konfiguruj
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════
          SEKCJA 1 — HERO
      ══════════════════════════════════════ */}
      <section className="snap-section bg-[#0a0a0a] flex items-center justify-center">

        {/* Aurora */}
        <AuroraBackground />

        {/* Big background text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span
            className="text-[20vw] font-black tracking-tighter text-white leading-none"
            style={{ opacity: 0.04, letterSpacing: "-0.05em" }}
          >
            AURORA
          </span>
        </div>

        {/* 3D model — full center */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <WatchModel3D />
        </motion.div>

        {/* Bottom: headline + CTA */}
        <div className="absolute bottom-12 inset-x-0 flex flex-col items-center gap-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="space-y-2"
          >
            <p className="text-xs tracking-widest text-white/40 uppercase">Seiko NH35 · Custom Build</p>
            <h1 className="text-4xl lg:text-5xl font-light text-white">
              Zegarek szyty na miarę.
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <Link
              href="/configurator"
              className="inline-flex items-center gap-3 bg-white text-black text-base font-semibold tracking-widest uppercase rounded-full hover:bg-white/90 transition-colors"
              style={{ padding: "22px 64px" }}
            >
              Stwórz swój zegarek
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="absolute right-8 bottom-12 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] text-white/30 uppercase tracking-widest rotate-90 origin-center mb-4">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/30 to-transparent" />
        </motion.div>
      </section>

      {/* ══════════════════════════════════════
          SEKCJA 2 — RZEMIOSŁO (duże zdjęcie)
      ══════════════════════════════════════ */}
      <section id="craft" className="snap-section grid grid-cols-1 lg:grid-cols-[55%_45%] gap-0">

        {/* LEFT — duże zdjęcie */}
        <div className="relative h-[50vh] lg:h-full overflow-hidden">
          <Image
            src="/images/photo-1694023769753-ab40f6aeb52a.jpg"
            alt="Zegarmistrz przy pracy"
            fill
            sizes="50vw"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0a0a0a]/80" />
          <div className="absolute inset-y-0 right-0 w-px bg-white/5" />
        </div>

        {/* RIGHT — tekst */}
        <div className="flex flex-col items-center justify-center py-16 bg-[#0a0a0a]">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="max-w-md space-y-10"
          >
            <div className="space-y-5">
              <p className="text-[10px] text-white/30 uppercase tracking-[0.2em]">Rzemiosło</p>
              <h2 className="text-4xl lg:text-5xl font-light leading-[1.15] tracking-tight">
                Precyzja<br />w każdym<br />detalu.
              </h2>
            </div>

            <p className="text-sm text-white/50 leading-[1.8]">
              Każdy zegarek AuroraLab jest składany ręcznie przez doświadczonego zegarmistrza.
              Żadnych kompromisów — tylko komponenty, które przeszły nasz rygorystyczny dobór.
            </p>

            <div className="space-y-0 border-t border-white/8">
              {[
                ["Mechanizm", "Seiko NH35 · 28 800 bph"],
                ["Koperta", "36mm stal szlachetna"],
                ["Montaż", "Ręczny, przez zegarmistrza"],
                ["Kontrola", "Jakość sprawdzona przed wysyłką"],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between py-4 border-b border-white/8">
                  <span className="text-[10px] text-white/30 uppercase tracking-widest">{label}</span>
                  <span className="text-xs text-white/70">{value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SEKCJA 3 — MECHANIZM (fullscreen foto)
      ══════════════════════════════════════ */}
      <section className="snap-section relative">
        <Image
          src="/images/photo-1612263731558-bbac49f8581a.jpg"
          alt="Mechanizm zegarka"
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
        <div className="absolute inset-0 bg-black/60" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6 max-w-lg"
          >
            <p className="text-[10px] text-white/40 uppercase tracking-widest">Mechanizm</p>
            <h2 className="text-5xl lg:text-6xl font-light text-white leading-tight">
              28 800<br />
              <span className="text-2xl font-normal text-white/60">uderzeń na godzinę</span>
            </h2>
            <p className="text-sm text-white/50 leading-relaxed max-w-xs mx-auto">
              Seiko NH35 — niezawodny, serwisowany od dekad, dobierany przez horologistów na całym świecie.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SEKCJA 4 — O NAS (2 zdjęcia)
      ══════════════════════════════════════ */}
      <section id="about" className="snap-section bg-[#0f0f0f] grid grid-cols-1 lg:grid-cols-2">

        {/* RIGHT — tekst po lewej tutaj */}
        <div className="flex flex-col items-center justify-center py-16 order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-sm space-y-8"
          >
            <div className="space-y-4">
              <p className="text-[10px] text-white/30 uppercase tracking-widest">O nas</p>
              <h2 className="text-4xl font-light leading-tight">
                Tworzymy<br />zegarki,<br />nie produkty.
              </h2>
            </div>
            <p className="text-sm text-white/50 leading-relaxed">
              AuroraLab powstało z pasji do mechanicznych zegarków. Każda sztuka jest unikatowa — zaprojektowana przez Ciebie, złożona przez nas.
            </p>
            <Link
              href="/configurator"
              className="inline-flex items-center gap-2 text-xs text-white uppercase tracking-widest border-b border-white/30 pb-1 hover:border-white transition-colors w-fit"
            >
              Stwórz swój zegarek
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </motion.div>
        </div>

        {/* Dwa zdjęcia w siatce po prawej */}
        <div className="grid grid-rows-2 order-1 lg:order-2 h-[50vh] lg:h-full">
          <div className="relative overflow-hidden">
            <Image
              src="/images/photo-1694023769753-ab40f6aeb52a.jpg"
              alt="Detal mechanizmu"
              fill
              sizes="50vw"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="relative overflow-hidden">
            <Image
              src="/images/photo-1633451238042-85d93d267866.jpg"
              alt="Tryby zegarka"
              fill
              sizes="50vw"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SEKCJA 5 — CTA KOŃCOWE
      ══════════════════════════════════════ */}
      <section className="snap-section bg-[#0a0a0a] flex flex-col items-center justify-center text-center px-6">

        {/* Aurora — delikatniejsza niż w hero */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40" aria-hidden>
          <div className="aurora-blob" style={{ background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(52,211,153,0.15) 0%, transparent 70%)", animation: "aurora1 14s ease-in-out infinite" }} />
          <div className="aurora-blob" style={{ background: "radial-gradient(ellipse 50% 30% at 40% 60%, rgba(139,92,246,0.10) 0%, transparent 70%)", animation: "aurora3 18s ease-in-out infinite" }} />
        </div>

        {/* Duży napis w tle */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span
            className="text-[22vw] font-black text-white leading-none"
            style={{ opacity: 0.03, letterSpacing: "-0.05em" }}
          >
            LAB
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="relative space-y-10 max-w-xl"
        >
          <div className="space-y-4">
            <p className="text-[10px] text-white/30 uppercase tracking-widest">Gotowy?</p>
            <h2 className="text-5xl lg:text-6xl font-light text-white leading-tight">
              Twój zegarek<br />czeka.
            </h2>
          </div>
          <p className="text-sm text-white/40 leading-relaxed">
            Konfigurator zajmuje 2 minuty.<br />Zegarek — całe życie.
          </p>
          <Link
            href="/configurator"
            className="inline-flex items-center gap-3 bg-white text-black text-xs font-semibold tracking-widest uppercase px-10 py-4 rounded-full hover:bg-white/90 transition-colors"
          >
            Otwórz konfigurator
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </motion.div>

        {/* Footer w tej sekcji */}
        <div className="absolute bottom-6 inset-x-0 flex items-center justify-between px-8 lg:px-12">
          <p className="text-[10px] text-white/20">© 2024 AuroraLab</p>
          <p className="text-[10px] text-white/20">Seiko NH35 · Custom Watch Builds</p>
        </div>
      </section>

    </div>
  );
}
