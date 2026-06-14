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
    fetch("/pricing.json")
      .then((r) => r.json())
      .then(setPricing);
  }, []);

  const scrollTo = (s: Step) => {
    setStep(s);
    sectionRefs[s].current?.scrollIntoView({ behavior: "smooth" });
  };

  const pickCase = (key: string) => {
    setSelectedCase(key);
    setTimeout(() => scrollTo("bracelet"), 400);
  };

  const pickBracelet = (key: string) => {
    setSelectedBracelet(key);
    setTimeout(() => scrollTo("dial"), 400);
  };

  const pickDial = (key: string) => {
    setSelectedDial(key);
    setTimeout(() => scrollTo("summary"), 400);
  };

  const handleAddToCart = () => {
    setCartLoading(true);
    setTimeout(() => {
      setCartLoading(false);
      alert("Zegarek dodany do koszyka!");
    }, 700);
  };

  if (!pricing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs text-gray-400 tracking-widest uppercase"
        >
          Ładowanie
        </motion.p>
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

  return (
    <div className="bg-white text-black">
      {/* ── Fixed header ── */}
      <header className="fixed top-0 inset-x-0 z-50 h-14 flex items-center justify-between px-6 lg:px-10 bg-white border-b border-gray-100">
        <Link href="/" className="text-base font-semibold tracking-tight">
          AuroraLab
        </Link>

        {/* Step indicator */}
        <div className="flex items-center gap-3">
          {(["case", "bracelet", "dial"] as Step[]).map((s, i) => (
            <button
              key={s}
              onClick={() => scrollTo(s)}
              className="flex items-center gap-2 text-xs"
            >
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-medium transition-colors ${
                  stepIndex > i
                    ? "bg-black text-white"
                    : stepIndex === i
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                {stepIndex > i ? "✓" : i + 1}
              </span>
              <span className={`hidden sm:block ${stepIndex >= i ? "text-black" : "text-gray-400"}`}>
                {s === "case" ? "Koperta" : s === "bracelet" ? "Bransoleta" : "Tarcza"}
              </span>
            </button>
          ))}
        </div>
      </header>

      {/* ── Section: KOPERTA ── */}
      <section
        ref={sectionRefs.case}
        className="min-h-screen pt-14 flex flex-col items-center justify-center px-4 py-16"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-2">Krok 1 z 3</p>
          <h2 className="text-3xl lg:text-4xl font-light">Wybierz kopertę</h2>
        </motion.div>

        {/* Watch canvas */}
        <div className="relative w-64 h-64 lg:w-80 lg:h-80 mb-12">
          <AnimatePresence mode="wait">
            {selectedCase && (
              <motion.div
                key={selectedCase}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                <Image
                  src={pricing.cases[selectedCase].image}
                  alt="Case"
                  fill
                  priority
                  style={{ objectFit: "contain", filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.15))" }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {!selectedCase && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-40 h-40 rounded-full border border-dashed border-gray-200 flex items-center justify-center">
                <span className="text-xs text-gray-300 uppercase tracking-widest">Koperta</span>
              </div>
            </motion.div>
          )}
        </div>

        {/* Options */}
        <div className="flex flex-wrap justify-center gap-4 max-w-lg">
          {caseOptions.map((opt, i) => (
            <motion.button
              key={opt.key}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              viewport={{ once: true }}
              onClick={() => pickCase(opt.key)}
              className={`group flex flex-col items-center gap-2 p-4 border transition-all duration-200 w-36 ${
                selectedCase === opt.key
                  ? "border-black bg-gray-50"
                  : "border-gray-200 hover:border-gray-400"
              }`}
            >
              <div className="relative w-24 h-24">
                <Image
                  src={opt.image}
                  alt={opt.name}
                  fill
                  sizes="96px"
                  style={{ objectFit: "contain" }}
                />
              </div>
              <p className="text-xs font-medium">{opt.name}</p>
              <p className="text-[10px] text-gray-400">+${opt.price}</p>
            </motion.button>
          ))}
        </div>

        {selectedCase && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => scrollTo("bracelet")}
            className="mt-10 flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors"
          >
            Dalej
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.button>
        )}
      </section>

      {/* ── Section: BRANSOLETA ── */}
      <section
        ref={sectionRefs.bracelet}
        className="min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-[#fafafa]"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-2">Krok 2 z 3</p>
          <h2 className="text-3xl lg:text-4xl font-light">Wybierz bransoletę</h2>
        </motion.div>

        {/* Watch canvas: case + bracelet */}
        <div className="relative w-64 h-64 lg:w-80 lg:h-80 mb-12">
          {selectedCase && (
            <div className="absolute inset-0">
              <Image
                src={pricing.cases[selectedCase].image}
                alt="Case"
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
          )}
          <AnimatePresence mode="wait">
            {selectedBracelet && (
              <motion.div
                key={selectedBracelet}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="absolute inset-0"
              >
                <Image
                  src={pricing.bracelets[selectedBracelet].image}
                  alt="Bracelet"
                  fill
                  style={{ objectFit: "contain", filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.15))" }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {!selectedBracelet && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute bottom-0 inset-x-0 flex justify-center pb-2"
            >
              <span className="text-[10px] text-gray-300 uppercase tracking-widest">Bransoleta</span>
            </motion.div>
          )}
        </div>

        <div className="flex flex-wrap justify-center gap-4 max-w-2xl">
          {braceletOptions.map((opt, i) => (
            <motion.button
              key={opt.key}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
              viewport={{ once: true }}
              onClick={() => pickBracelet(opt.key)}
              className={`group flex flex-col items-center gap-2 p-4 border bg-white transition-all duration-200 w-32 ${
                selectedBracelet === opt.key
                  ? "border-black"
                  : "border-gray-200 hover:border-gray-400"
              }`}
            >
              <div className="relative w-20 h-20">
                <Image src={opt.image} alt={opt.name} fill sizes="80px" style={{ objectFit: "contain" }} />
              </div>
              <p className="text-[11px] font-medium text-center leading-tight">{opt.name}</p>
              <p className="text-[10px] text-gray-400">+${opt.price}</p>
            </motion.button>
          ))}
        </div>

        {selectedBracelet && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => scrollTo("dial")}
            className="mt-10 flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors"
          >
            Dalej
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.button>
        )}
      </section>

      {/* ── Section: TARCZA ── */}
      <section
        ref={sectionRefs.dial}
        className="min-h-screen flex flex-col items-center justify-center px-4 py-16"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-2">Krok 3 z 3</p>
          <h2 className="text-3xl lg:text-4xl font-light">Wybierz tarczę</h2>
        </motion.div>

        {/* Full watch preview */}
        <div className="relative w-64 h-64 lg:w-80 lg:h-80 mb-12">
          {selectedBracelet && (
            <div className="absolute inset-0">
              <Image src={pricing.bracelets[selectedBracelet].image} alt="Bracelet" fill
                style={{ objectFit: "contain", filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.12))" }} />
            </div>
          )}
          {selectedCase && (
            <div className="absolute inset-0 z-10">
              <Image src={pricing.cases[selectedCase].image} alt="Case" fill style={{ objectFit: "contain" }} />
            </div>
          )}
          <AnimatePresence mode="wait">
            {selectedDial && (
              <motion.div
                key={selectedDial}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="absolute inset-0 z-20"
              >
                <Image src={pricing.dials[selectedDial].image} alt="Dial" fill style={{ objectFit: "contain" }} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex flex-wrap justify-center gap-4 max-w-lg">
          {dialOptions.map((opt, i) => (
            <motion.button
              key={opt.key}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              viewport={{ once: true }}
              onClick={() => pickDial(opt.key)}
              className={`group flex flex-col items-center gap-2 p-4 border transition-all duration-200 w-32 ${
                selectedDial === opt.key
                  ? "border-black bg-gray-50"
                  : "border-gray-200 hover:border-gray-400"
              }`}
            >
              <div className="relative w-20 h-20">
                <Image src={opt.image} alt={opt.name} fill sizes="80px" style={{ objectFit: "contain" }} />
              </div>
              <p className="text-[11px] font-medium">{opt.name}</p>
              <p className="text-[10px] text-gray-400">+${opt.price}</p>
            </motion.button>
          ))}
        </div>

        {selectedDial && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => scrollTo("summary")}
            className="mt-10 flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors"
          >
            Podsumowanie
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.button>
        )}
      </section>

      {/* ── Section: SUMMARY ── */}
      <section
        ref={sectionRefs.summary}
        className="min-h-screen flex items-center justify-center px-4 py-20 bg-white"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          {/* LEFT — large watch */}
          <div className="flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.93 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="relative w-72 h-72 lg:w-96 lg:h-96"
            >
              {selectedBracelet && (
                <div className="absolute inset-0">
                  <Image src={pricing.bracelets[selectedBracelet].image} alt="Bracelet" fill
                    style={{ objectFit: "contain", filter: "drop-shadow(0 32px 64px rgba(0,0,0,0.2))" }} />
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
          </div>

          {/* RIGHT — summary + CTA */}
          <div className="flex flex-col gap-8">
            <div>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-2">Gotowe</p>
              <h2 className="text-3xl lg:text-4xl font-light leading-snug">
                Twój zegarek<br />jest gotowy
              </h2>
            </div>

            {/* Spec rows */}
            <div className="divide-y divide-gray-100">
              {[
                { label: "Koperta", value: caseData?.name },
                { label: "Bransoleta", value: braceletData?.name },
                { label: "Tarcza", value: dialData?.name },
                { label: "Mechanizm", value: "Seiko NH35 · 28 800 bph" },
                { label: "Średnica", value: "36 mm" },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between py-3 text-sm">
                  <span className="text-gray-400">{label}</span>
                  <span className="font-medium text-black">{value ?? "—"}</span>
                </div>
              ))}
            </div>

            {/* Price */}
            <div className="flex items-baseline justify-between pt-2 border-t border-gray-200">
              <span className="text-xs text-gray-400 uppercase tracking-widest">Łączna cena</span>
              <span className="text-4xl font-light text-black">${totalPrice}</span>
            </div>

            {/* CTA */}
            <div className="flex flex-col gap-3">
              <button
                onClick={handleAddToCart}
                disabled={cartLoading || !selectedCase || !selectedBracelet || !selectedDial}
                className="w-full bg-black text-white py-4 rounded-full text-sm font-medium tracking-wide hover:bg-gray-800 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {cartLoading ? "Dodawanie…" : "Dodaj do koszyka"}
              </button>

              <button
                onClick={() => {
                  setSelectedCase(null);
                  setSelectedBracelet(null);
                  setSelectedDial(null);
                  scrollTo("case");
                }}
                className="w-full py-3 rounded-full text-sm text-gray-400 border border-gray-200 hover:border-gray-400 hover:text-black transition-all duration-200"
              >
                Zacznij od nowa
              </button>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
