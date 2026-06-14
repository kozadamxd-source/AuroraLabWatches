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
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="mb-6 pb-6 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-black">
          Twój zegarek
        </h3>
        <p className="text-xs text-gray-600 mt-2">
          Seiko NH35 • 36mm • 28,800 bph
        </p>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Koperta</span>
          <span className="text-black font-medium">{caseName}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Tarcza</span>
          <span className="text-black font-medium">{dialName}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Bransoleta</span>
          <span className="text-black font-medium">{braceletName}</span>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6 mb-6">
        <div className="flex justify-between items-baseline">
          <span className="text-sm text-gray-600">Razem</span>
          <span className="text-3xl font-bold text-black">${totalPrice}</span>
        </div>
      </div>

      <button
        onClick={onAddToCart}
        disabled={loading}
        className="w-full bg-black text-white py-3 font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Dodawanie..." : "Dodaj do koszyka"}
      </button>

      <p className="text-xs text-gray-500 text-center mt-4">
        Darmowa dostawa na całym świecie
      </p>
    </div>
  );
}
