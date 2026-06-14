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
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 py-4 sticky top-0 z-40 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between">
            <div>
              <h1 className="text-2xl font-bold text-black">AuroraLab</h1>
              <p className="text-xs text-gray-600 mt-1">Konfigurator zegarków</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Watch Preview */}
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
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
              <ConfigPanel
                title="Koperta"
                options={caseOptions}
                selected={selectedCase}
                onSelect={setSelectedCase}
              />
              <ConfigPanel
                title="Tarcza"
                options={dialOptions}
                selected={selectedDial}
                onSelect={setSelectedDial}
              />
              <ConfigPanel
                title="Bransoleta"
                options={braceletOptions}
                selected={selectedBracelet}
                onSelect={setSelectedBracelet}
              />
            </div>
          </div>

          {/* Right: Cart Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-20">
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
