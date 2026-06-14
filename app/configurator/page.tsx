"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import WatchPreview from "@/components/WatchPreview";
import ConfigPanel from "@/components/ConfigPanel";

interface PricingData {
  cases: Record<string, { name: string; image: string; price: number }>;
  dials: Record<string, { name: string; image: string; price: number }>;
  bracelets: Record<string, { name: string; image: string; price: number }>;
  basePrices: { movement: number; labor: number };
}

export default function ConfiguratorPage() {
  const [pricing, setPricing] = useState<PricingData | null>(null);
  const [selectedCase, setSelectedCase] = useState("gold");
  const [selectedDial, setSelectedDial] = useState("BLUE");
  const [selectedBracelet, setSelectedBracelet] = useState("PRESIDENT-GOLD");
  const [cartLoading, setCartLoading] = useState(false);

  useEffect(() => {
    fetch("/pricing.json")
      .then((res) => res.json())
      .then((data) => setPricing(data));
  }, []);

  if (!pricing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-sm text-gray-400 tracking-widest uppercase">Ładowanie</p>
      </div>
    );
  }

  const currentCase = pricing.cases[selectedCase];
  const currentDial = pricing.dials[selectedDial];
  const currentBracelet = pricing.bracelets[selectedBracelet];

  const totalPrice =
    currentCase.price +
    currentDial.price +
    currentBracelet.price +
    pricing.basePrices.movement +
    pricing.basePrices.labor;

  const caseOptions = Object.entries(pricing.cases).map(([key, value]) => ({ key, ...value }));
  const dialOptions = Object.entries(pricing.dials).map(([key, value]) => ({ key, ...value }));
  const braceletOptions = Object.entries(pricing.bracelets).map(([key, value]) => ({ key, ...value }));

  const handleAddToCart = () => {
    setCartLoading(true);
    setTimeout(() => {
      setCartLoading(false);
      alert("Zegarek dodany do koszyka!");
    }, 600);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* ── Header ── */}
      <header className="h-14 border-b border-gray-100 flex items-center justify-between px-6 lg:px-10 shrink-0">
        <a href="/" className="text-base font-semibold tracking-tight text-black">AuroraLab</a>
        <span className="text-xs text-gray-400 tracking-widest uppercase hidden sm:block">Custom Timepiece Builder</span>
      </header>

      {/* ── Main: split pane ── */}
      {/* On desktop: left half = watch preview, right half = options, scrollable */}
      {/* On mobile: stacked, preview first */}
      <div className="flex flex-col lg:flex-row flex-1 pb-24 lg:pb-28">

        {/* LEFT — watch preview, sticky on desktop */}
        <div className="lg:sticky lg:top-14 lg:h-[calc(100vh-3.5rem)] lg:w-1/2 flex items-center justify-center bg-[#f8f8f8] p-8 lg:p-16">
          <div className="w-full max-w-md">
            <WatchPreview
              caseImage={currentCase.image}
              dialImage={currentDial.image}
              braceletImage={currentBracelet.image}
            />
          </div>
        </div>

        {/* RIGHT — scrollable config panels */}
        <div className="lg:w-1/2 px-6 lg:px-12 py-10 space-y-10">
          <div>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Seiko NH35 · 36 mm · 28 800 bph</p>
            <h2 className="text-2xl font-light text-black">Skonfiguruj swój zegarek</h2>
          </div>

          <ConfigPanel title="Koperta" options={caseOptions} selected={selectedCase} onSelect={setSelectedCase} />
          <ConfigPanel title="Tarcza" options={dialOptions} selected={selectedDial} onSelect={setSelectedDial} />
          <ConfigPanel title="Bransoleta" options={braceletOptions} selected={selectedBracelet} onSelect={setSelectedBracelet} />

          {/* Spacer so content isn't hidden behind sticky bar */}
          <div className="h-4" />
        </div>
      </div>

      {/* ── Sticky bottom bar ── */}
      <div className="fixed bottom-0 inset-x-0 bg-white border-t border-gray-100 z-30">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10 py-4 flex items-center justify-between gap-4">
          {/* Summary */}
          <div className="flex gap-6 text-sm text-gray-500 hidden sm:flex">
            <span>{currentCase.name}</span>
            <span className="text-gray-200">|</span>
            <span>{currentDial.name}</span>
            <span className="text-gray-200">|</span>
            <span>{currentBracelet.name}</span>
          </div>

          {/* Price + CTA */}
          <div className="flex items-center gap-6 ml-auto">
            <div className="text-right">
              <p className="text-[10px] text-gray-400 uppercase tracking-widest">Cena</p>
              <p className="text-xl font-semibold text-black">${totalPrice}</p>
            </div>
            <button
              onClick={handleAddToCart}
              disabled={cartLoading}
              className="bg-black text-white text-sm font-medium tracking-wide px-8 py-3 hover:bg-gray-900 transition-colors disabled:opacity-40"
            >
              {cartLoading ? "Dodawanie…" : "Dodaj do koszyka"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
