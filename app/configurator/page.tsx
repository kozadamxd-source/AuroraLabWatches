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
    <div className="min-h-screen bg-[#1a1a1a] text-[#f5f1e8]">
      {/* Header */}
      <header className="border-b border-[#c0c0c0] border-opacity-20 py-6 sticky top-0 z-50 bg-[#1a1a1a] bg-opacity-95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#d4af37]">
            AuroraLab
          </h1>
          <p className="text-xs sm:text-sm text-[#c0c0c0] opacity-75 mt-1 font-mono">
            Custom Watch Configurator
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left: Watch Preview */}
          <div className="lg:col-span-1 flex flex-col justify-center">
            <div className="sticky top-24">
              <WatchPreview
                caseImage={currentCase.image}
                dialImage={currentDial.image}
                braceletImage={currentBracelet.image}
              />
            </div>
          </div>

          {/* Middle: Configuration Options */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              <ConfigPanel
                title="Case"
                options={caseOptions}
                selected={selectedCase}
                onSelect={setSelectedCase}
              />
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
