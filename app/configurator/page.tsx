"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface PricingData {
  cases: Record<string, { name: string; image: string; price: number }>;
  dials: Record<string, { name: string; image: string; price: number }>;
  bracelets: Record<string, { name: string; image: string; price: number }>;
  basePrices: { movement: number; labor: number };
}

const STEPS = ["case", "bracelet", "dial", "summary"] as const;
type Step = (typeof STEPS)[number];

const STEP_LABELS: Record<string, string> = {
  case: "Koperta",
  bracelet: "Bransoleta",
  dial: "Tarcza",
};

export default function ConfiguratorPage() {
  const [pricing, setPricing] = useState<PricingData | null>(null);
  const [selectedCase, setSelectedCase] = useState<string | null>(null);
  const [selectedBracelet, setSelectedBracelet] = useState<string | null>(null);
  const [selectedDial, setSelectedDial] = useState<string | null>(null);
  const [step, setStep] = useState<Step>("case");
  const [cartLoading, setCartLoading] = useState(false);

  const sectionRefs = {
    case: useRef<HTMLDivElement>(null),
    bracelet: useRef<HTMLDivElement>(null),
    dial: useRef<HTMLDivElement>(null),
    summary: useRef<HTMLDivElement>(null),
  };

  useEffect(() => {
    fetch("/pricing.json").then((r) => r.json()).then(setPricing);
  }, []);

  const scrollTo = (s: Step) => {
    setStep(s);
    sectionRefs[s].current?.scrollIntoView({ behavior: "smooth" });
  };

  const pickCase = (key: string) => { setSelectedCase(key); setTimeout(() => scrollTo("bracelet"), 400); };
  const pickBracelet = (key: string) => { setSelectedBracelet(key); setTimeout(() => scrollTo("dial"), 400); };
  const pickDial = (key: string) => { setSelectedDial(key); setTimeout(() => scrollTo("summary"), 400); };

  const handleAddToCart = () => {
    setCartLoading(true);
    setTimeout(() => { setCartLoading(false); alert("Zegarek dodany do koszyka!"); }, 700);
  };

  if (!pricing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="text-xs text-white/30 tracking-widest uppercase">Ładowanie</motion.p>
      </div>
    );
  }

  const caseOptions = Object.entries(pricing.cases).map(([key, v]) => ({ key, ...v }));
  const braceletOptions = Object.entries(pricing.bracelets).map(([key, v]) => ({ key, ...v }));
  const dialOptions = Object.entries(pricing.dials).map(([key, v]) => ({ key, ...v }));

  const caseData = selectedCase ? pricing.cases[selectedCase] : null;
  const braceletData = selectedBracelet ? pricing.bracelets[selectedBracelet] : null;
  const dialData = selectedDial ? pricing.dials[selectedDial] : null;

  const totalPrice =
    (caseData?.price ?? 0) +
    (braceletData?.price ?? 0) +
    (dialData?.price ?? 0) +
    pricing.basePrices.movement +
    pricing.basePrices.labor;

  const stepIndex = STEPS.indexOf(step);

  // Shared option card styles
  const optionCard = (selected: boolean) =>
    `flex flex-col items-center gap-2 p-3 border transition-all duration-200 cursor-pointer ${
      selected
        ? "border-white/60 bg-white/5"
        : "border-white/10 hover:border-white/30"
    }`;

  return (
    <div className="bg-[#0a0a0a] text-white">

      {/* ── Header ── */}
      <header className="fixed top-0 inset-x-0 z-50 h-20 flex items-center justify-between pl-8 pr-10 lg:pl-14 lg:pr-16 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5">
        {/* Spacer — pushes steps to the right on mobile */}
        <div className="lg:hidden w-8 shrink-0" />

        {/* Logo — absolute center on mobile, normal flow on desktop */}
        <div className="lg:hidden absolute left-1/2 -translate-x-1/2">
          <Link href="/">
            <Image src="/LOGO.png" alt="AuroraLab" width={180} height={60} style={{ objectFit: "contain" }} />
          </Link>
        </div>
        <div className="hidden lg:block">
          <Link href="/">
            <Image src="/LOGO.png" alt="AuroraLab" width={180} height={60} style={{ objectFit: "contain" }} />
          </Link>
        </div>

        {/* Step progress */}
        <div className="flex items-center gap-1" style={{ marginRight: "24px" }}>
          {(["case", "bracelet", "dial"] as Step[]).map((s, i) => {
            const done = stepIndex > i;
            const active = stepIndex === i;
            return (
              <button key={s} onClick={() => scrollTo(s)} className="flex items-center gap-2 px-2 py-1">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-medium transition-all ${
                  done ? "bg-white text-black" : active ? "bg-white/20 text-white border border-white/40" : "bg-white/5 text-white/30 border border-white/10"
                }`}>
                  {done ? "✓" : i + 1}
                </span>
                <span className={`hidden sm:block text-xs transition-colors ${active ? "text-white" : done ? "text-white/60" : "text-white/20"}`}>
                  {STEP_LABELS[s]}
                </span>
              </button>
            );
          })}
        </div>
      </header>

      {/* ══════════════════════
          KROK 1 — KOPERTA
      ══════════════════════ */}
      <section ref={sectionRefs.case}
        className="min-h-screen pt-14 flex flex-col items-center justify-center px-4 py-16 relative overflow-hidden">
        {/* Aurora accent */}
        <div className="absolute top-0 inset-x-0 h-64 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 100% at 50% 0%, rgba(52,211,153,0.06) 0%, transparent 100%)" }} />

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-10">
          <p className="text-[10px] text-white/30 uppercase tracking-widest mb-2">Krok 1 z 3</p>
          <h2 className="text-3xl lg:text-4xl font-light text-white">Wybierz kopertę</h2>
        </motion.div>

        {/* Watch preview */}
        <div className="relative w-64 h-64 lg:w-80 lg:h-80 mb-12">
          <AnimatePresence mode="wait">
            {selectedCase ? (
              <motion.div key={selectedCase} initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }} className="absolute inset-0">
                <Image src={pricing.cases[selectedCase].image} alt="Case" fill priority
                  style={{ objectFit: "contain", filter: "drop-shadow(0 20px 60px rgba(255,255,255,0.1))" }} />
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="absolute inset-0 flex items-center justify-center">
                <div className="w-40 h-40 rounded-full border border-dashed border-white/10 flex items-center justify-center">
                  <span className="text-[10px] text-white/20 uppercase tracking-widest">Koperta</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Options */}
        <div className="flex flex-wrap justify-center gap-3 max-w-lg">
          {caseOptions.map((opt, i) => (
            <motion.button key={opt.key} initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08, duration: 0.4 }}
              viewport={{ once: true }} onClick={() => pickCase(opt.key)}
              className={optionCard(selectedCase === opt.key) + " w-36"}>
              <div className="relative w-24 h-24 bg-white/3 rounded">
                <Image src={opt.image} alt={opt.name} fill sizes="96px" style={{ objectFit: "contain" }} />
              </div>
              <p className="text-xs font-medium text-white">{opt.name}</p>
              <p className="text-[10px] text-white/30">+${opt.price}</p>
            </motion.button>
          ))}
        </div>

        {selectedCase && (
          <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            onClick={() => scrollTo("bracelet")}
            className="mt-10 flex items-center gap-2 text-xs text-white/40 hover:text-white transition-colors uppercase tracking-widest">
            Dalej
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.button>
        )}
      </section>

      {/* ══════════════════════
          KROK 2 — BRANSOLETA
      ══════════════════════ */}
      <section ref={sectionRefs.bracelet}
        className="min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-[#0f0f0f] relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-64 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 100% at 50% 0%, rgba(139,92,246,0.06) 0%, transparent 100%)" }} />

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-10">
          <p className="text-[10px] text-white/30 uppercase tracking-widest mb-2">Krok 2 z 3</p>
          <h2 className="text-3xl lg:text-4xl font-light text-white">Wybierz bransoletę</h2>
        </motion.div>

        <div className="relative w-64 h-64 lg:w-80 lg:h-80 mb-12">
          {selectedCase && (
            <div className="absolute inset-0">
              <Image src={pricing.cases[selectedCase].image} alt="Case" fill style={{ objectFit: "contain" }} />
            </div>
          )}
          <AnimatePresence mode="wait">
            {selectedBracelet && (
              <motion.div key={selectedBracelet} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="absolute inset-0">
                <Image src={pricing.bracelets[selectedBracelet].image} alt="Bracelet" fill
                  style={{ objectFit: "contain", filter: "drop-shadow(0 20px 60px rgba(255,255,255,0.08))" }} />
              </motion.div>
            )}
          </AnimatePresence>
          {!selectedBracelet && (
            <div className="absolute bottom-0 inset-x-0 flex justify-center pb-2">
              <span className="text-[10px] text-white/15 uppercase tracking-widest">Bransoleta</span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap justify-center gap-3 max-w-2xl">
          {braceletOptions.map((opt, i) => (
            <motion.button key={opt.key} initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07, duration: 0.4 }}
              viewport={{ once: true }} onClick={() => pickBracelet(opt.key)}
              className={optionCard(selectedBracelet === opt.key) + " w-32"}>
              <div className="relative w-20 h-20">
                <Image src={opt.image} alt={opt.name} fill sizes="80px" style={{ objectFit: "contain" }} />
              </div>
              <p className="text-[11px] font-medium text-white text-center leading-tight">{opt.name}</p>
              <p className="text-[10px] text-white/30">+${opt.price}</p>
            </motion.button>
          ))}
        </div>

        {selectedBracelet && (
          <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            onClick={() => scrollTo("dial")}
            className="mt-10 flex items-center gap-2 text-xs text-white/40 hover:text-white transition-colors uppercase tracking-widest">
            Dalej
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.button>
        )}
      </section>

      {/* ══════════════════════
          KROK 3 — TARCZA
      ══════════════════════ */}
      <section ref={sectionRefs.dial}
        className="min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-[#0a0a0a] relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-64 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 100% at 50% 0%, rgba(20,184,166,0.06) 0%, transparent 100%)" }} />

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-10">
          <p className="text-[10px] text-white/30 uppercase tracking-widest mb-2">Krok 3 z 3</p>
          <h2 className="text-3xl lg:text-4xl font-light text-white">Wybierz tarczę</h2>
        </motion.div>

        <div className="relative w-64 h-64 lg:w-80 lg:h-80 mb-12">
          {selectedBracelet && (
            <div className="absolute inset-0">
              <Image src={pricing.bracelets[selectedBracelet].image} alt="Bracelet" fill
                style={{ objectFit: "contain", filter: "drop-shadow(0 20px 60px rgba(255,255,255,0.08))" }} />
            </div>
          )}
          {selectedCase && (
            <div className="absolute inset-0 z-10">
              <Image src={pricing.cases[selectedCase].image} alt="Case" fill style={{ objectFit: "contain" }} />
            </div>
          )}
          <AnimatePresence mode="wait">
            {selectedDial && (
              <motion.div key={selectedDial} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="absolute inset-0 z-20">
                <Image src={pricing.dials[selectedDial].image} alt="Dial" fill style={{ objectFit: "contain" }} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex flex-wrap justify-center gap-3 max-w-lg">
          {dialOptions.map((opt, i) => (
            <motion.button key={opt.key} initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08, duration: 0.4 }}
              viewport={{ once: true }} onClick={() => pickDial(opt.key)}
              className={optionCard(selectedDial === opt.key) + " w-32"}>
              <div className="relative w-20 h-20">
                <Image src={opt.image} alt={opt.name} fill sizes="80px" style={{ objectFit: "contain" }} />
              </div>
              <p className="text-[11px] font-medium text-white">{opt.name}</p>
              <p className="text-[10px] text-white/30">+${opt.price}</p>
            </motion.button>
          ))}
        </div>

        {selectedDial && (
          <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            onClick={() => scrollTo("summary")}
            className="mt-10 flex items-center gap-2 text-xs text-white/40 hover:text-white transition-colors uppercase tracking-widest">
            Podsumowanie
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.button>
        )}
      </section>

      {/* ══════════════════════
          SUMMARY
      ══════════════════════ */}
      <section ref={sectionRefs.summary}
        className="min-h-screen flex items-center justify-center px-4 py-20 bg-[#0f0f0f] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(52,211,153,0.04) 0%, rgba(139,92,246,0.04) 50%, transparent 100%)" }} />

        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }} viewport={{ once: true }}
          className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* LEFT — zegarek */}
          <motion.div initial={{ opacity: 0, scale: 0.93 }} whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }} viewport={{ once: true }}
            className="relative w-72 h-72 lg:w-96 lg:h-96 mx-auto">
            {selectedBracelet && (
              <div className="absolute inset-0">
                <Image src={pricing.bracelets[selectedBracelet].image} alt="Bracelet" fill
                  style={{ objectFit: "contain", filter: "drop-shadow(0 32px 80px rgba(255,255,255,0.12))" }} />
              </div>
            )}
            {selectedCase && (
              <div className="absolute inset-0 z-10">
                <Image src={pricing.cases[selectedCase].image} alt="Case" fill style={{ objectFit: "contain" }} />
              </div>
            )}
            {selectedDial && (
              <div className="absolute inset-0 z-20">
                <Image src={pricing.dials[selectedDial].image} alt="Dial" fill style={{ objectFit: "contain" }} />
              </div>
            )}
          </motion.div>

          {/* RIGHT — details */}
          <div className="flex flex-col gap-8">
            <div>
              <p className="text-[10px] text-white/30 uppercase tracking-widest mb-2">Gotowe</p>
              <h2 className="text-3xl lg:text-4xl font-light text-white leading-snug">
                Twój zegarek<br />jest gotowy.
              </h2>
            </div>

            {/* Spec rows */}
            <div className="divide-y divide-white/5">
              {[
                { label: "Koperta", value: caseData?.name },
                { label: "Bransoleta", value: braceletData?.name },
                { label: "Tarcza", value: dialData?.name },
                { label: "Mechanizm", value: "Seiko NH35 · 28 800 bph" },
                { label: "Średnica", value: "36 mm" },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between py-3 text-sm">
                  <span className="text-white/30">{label}</span>
                  <span className="font-medium text-white">{value ?? "—"}</span>
                </div>
              ))}
            </div>

            {/* Price */}
            <div className="flex items-baseline justify-between pt-2 border-t border-white/10">
              <span className="text-[10px] text-white/30 uppercase tracking-widest">Łączna cena</span>
              <span className="text-4xl font-light text-white">${totalPrice}</span>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-3">
              <button onClick={handleAddToCart}
                disabled={cartLoading || !selectedCase || !selectedBracelet || !selectedDial}
                className="w-full bg-white text-black py-4 rounded-full text-xs font-semibold tracking-widest uppercase hover:bg-white/90 transition-colors disabled:opacity-30 disabled:cursor-not-allowed">
                {cartLoading ? "Dodawanie…" : "Dodaj do koszyka"}
              </button>

              <button onClick={() => { setSelectedCase(null); setSelectedBracelet(null); setSelectedDial(null); scrollTo("case"); }}
                className="w-full py-3 rounded-full text-xs text-white/30 border border-white/10 hover:border-white/30 hover:text-white/60 transition-all">
                Zacznij od nowa
              </button>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
