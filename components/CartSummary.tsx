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
    <div className="p-6 lg:p-8">
      <div className="space-y-6">
        {/* Specs */}
        <div className="space-y-4 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Koperta</span>
            <span className="text-black font-medium">{caseName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Tarcza</span>
            <span className="text-black font-medium">{dialName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Bransoleta</span>
            <span className="text-black font-medium">{braceletName}</span>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200"></div>

        {/* Price */}
        <div className="space-y-1">
          <div className="flex justify-between items-baseline">
            <span className="text-xs text-gray-500 uppercase tracking-wide font-medium">Cena</span>
            <span className="text-3xl font-light text-black">${totalPrice}</span>
          </div>
          <p className="text-xs text-gray-400">Seiko NH35 • 36mm • 28,800 bph</p>
        </div>

        {/* Button */}
        <button
          onClick={onAddToCart}
          disabled={loading}
          className="w-full bg-black text-white py-3 text-sm font-medium tracking-wide hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Dodawanie..." : "Dodaj do koszyka"}
        </button>
      </div>
    </div>
  );
}
