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
        <p className="text-gray-400">Ładowanie...</p>
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
        `Zegarek dodany do koszyka! Razem: ${cartItems + 1}`
      );
    }, 500);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 py-4 sticky top-0 z-40 bg-white">
        <div className="max-w-full px-4 sm:px-6 lg:px-8">
          <h1 className="text-xl font-semibold text-black">AuroraLab</h1>
        </div>
      </header>

      <main className="pb-32 lg:pb-0">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 min-h-[calc(100vh-80px)]">
          {/* Left: Watch Preview - 60% on desktop, full on mobile */}
          <div className="lg:col-span-3 bg-gray-50 flex items-center justify-center p-8 lg:p-16 border-b lg:border-b-0 lg:border-r border-gray-200">
            <div className="w-full">
              <WatchPreview
                caseImage={currentCase.image}
                dialImage={currentDial.image}
                braceletImage={currentBracelet.image}
              />
            </div>
          </div>

          {/* Right: Configuration - 40% on desktop */}
          <div className="lg:col-span-2 lg:overflow-y-auto p-6 lg:p-8">
            <div className="space-y-8">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-4 font-medium">
                  Personalizuj zegarek
                </p>
              </div>

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
        </div>
      </main>

      {/* Sticky Summary - Bottom on Mobile, Side on Desktop */}
      <div className="fixed bottom-0 left-0 right-0 lg:fixed lg:right-0 lg:top-20 lg:w-auto lg:max-w-sm border-t lg:border-t lg:border-l lg:border-gray-200 bg-white lg:border-b">
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
  );
}
