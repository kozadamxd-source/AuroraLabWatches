"use client";

import { useEffect, useState } from "react";
import WatchPreview from "@/components/WatchPreview";
import ConfigPanel from "@/components/ConfigPanel";
import CartSummary from "@/components/CartSummary";

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
  const [cartItems, setCartItems] = useState(0);

  useEffect(() => {
    fetch("/pricing.json")
      .then((res) => res.json())
      .then((data) => setPricing(data));
  }, []);

  if (!pricing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-[#d4af37] font-mono">Loading configurator...</p>
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

  const caseOptions = Object.entries(pricing.cases).map(([key, value]) => ({
    key,
    name: value.name,
    image: value.image,
    price: value.price,
  }));

  const dialOptions = Object.entries(pricing.dials).map(([key, value]) => ({
    key,
    name: value.name,
    image: value.image,
    price: value.price,
  }));

  const braceletOptions = Object.entries(pricing.bracelets).map(
    ([key, value]) => ({
      key,
      name: value.name,
      image: value.image,
      price: value.price,
    })
  );

  const handleAddToCart = async () => {
    setCartLoading(true);
    setTimeout(() => {
      setCartLoading(false);
      setCartItems((prev) => prev + 1);
      alert(
        `Custom watch added to cart! Total items: ${cartItems + 1}`
      );
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] via-[#0a1428] to-[#1a1a1a] text-[#f5f1e8]">
      {/* Header */}
      <header className="border-b border-[#d4af37] border-opacity-30 py-6 sticky top-0 z-50 bg-[#1a1a1a] bg-opacity-95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-[#d4af37]">
                AuroraLab
              </h1>
              <p className="text-xs sm:text-sm text-[#c0c0c0] opacity-60 mt-2 font-mono tracking-widest uppercase">
                Interactive Watch Configurator
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs font-mono text-[#d4af37] opacity-75">NH35 MOVEMENT</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16">
          {/* Left: Watch Preview */}
          <div className="lg:col-span-1 flex flex-col justify-center">
            <div className="sticky top-24">
              <div className="relative">
                {/* Glow effect behind watch */}
                <div className="absolute -inset-8 bg-gradient-to-b from-[#d4af37] to-transparent opacity-10 blur-2xl rounded-full"></div>
                <WatchPreview
                  caseImage={currentCase.image}
                  dialImage={currentDial.image}
                  braceletImage={currentBracelet.image}
                />
              </div>
            </div>
          </div>

          {/* Middle: Configuration Options */}
          <div className="lg:col-span-1">
            <div className="space-y-8">
              <div>
                <p className="text-xs font-mono text-[#d4af37] tracking-widest uppercase mb-6 opacity-75">
                  Step 1 of 3: Select Components
                </p>
                <ConfigPanel
                  title="Case"
                  options={caseOptions}
                  selected={selectedCase}
                  onSelect={setSelectedCase}
                />
              </div>
              <ConfigPanel
                title="Dial"
                options={dialOptions}
                selected={selectedDial}
                onSelect={setSelectedDial}
              />
              <ConfigPanel
                title="Bracelet"
                options={braceletOptions}
                selected={selectedBracelet}
                onSelect={setSelectedBracelet}
              />
            </div>
          </div>

          {/* Right: Cart Summary */}
          <div className="lg:col-span-1 flex flex-col justify-start">
            <div className="sticky top-24">
              <CartSummary
                caseName={currentCase.name}
                dialName={currentDial.name}
                braceletName={currentBracelet.name}
                totalPrice={totalPrice}
                onAddToCart={handleAddToCart}
                loading={cartLoading}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
