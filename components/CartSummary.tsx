"use client";

interface CartSummaryProps {
  caseName: string;
  dialName: string;
  braceletName: string;
  totalPrice: number;
  onAddToCart: () => void;
  loading?: boolean;
}

export default function CartSummary({
  caseName,
  dialName,
  braceletName,
  totalPrice,
  onAddToCart,
  loading = false,
}: CartSummaryProps) {
  return (
    <div className="bg-[#0a1428] bg-opacity-50 rounded p-4 sm:p-6 border border-[#d4af37] border-opacity-30 backdrop-blur">
      <h3 className="text-sm font-mono text-[#c0c0c0] mb-4 opacity-75">
        YOUR CUSTOM WATCH
      </h3>

      <div className="space-y-2 mb-6 text-sm">
        <div className="flex justify-between">
          <span className="text-[#c0c0c0] opacity-75">Case:</span>
          <span className="text-[#f5f1e8]">{caseName}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#c0c0c0] opacity-75">Dial:</span>
          <span className="text-[#f5f1e8]">{dialName}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#c0c0c0] opacity-75">Bracelet:</span>
          <span className="text-[#f5f1e8]">{braceletName}</span>
        </div>
      </div>

      <div className="border-t border-[#c0c0c0] border-opacity-20 pt-4 mb-6">
        <div className="flex justify-between items-baseline">
          <span className="text-sm font-mono text-[#c0c0c0]">Total</span>
          <span className="text-3xl font-bold text-[#d4af37]">${totalPrice}</span>
        </div>
        <p className="text-xs text-[#c0c0c0] opacity-50 mt-2 font-mono">
          Movement: NH35 | 28,800 bph | Diameter: 36mm
        </p>
      </div>

      <button
        onClick={onAddToCart}
        disabled={loading}
        className="w-full bg-[#d4af37] text-[#1a1a1a] py-3 rounded font-bold text-sm tracking-wider hover:bg-[#e5bf47] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Adding..." : "Add to Cart"}
      </button>
    </div>
  );
}
