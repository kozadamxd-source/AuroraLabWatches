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
    <div className="bg-gradient-to-br from-[#0a1428] via-[#0a1428] to-[#1a1a1a] rounded-sm p-6 sm:p-8 border border-[#d4af37] border-opacity-40 backdrop-blur-md shadow-2xl shadow-[#d4af37]/10">
      <div className="mb-6 pb-6 border-b border-[#d4af37] border-opacity-20">
        <h3 className="text-xs font-mono text-[#d4af37] tracking-widest uppercase opacity-75">
          Your Timepiece
        </h3>
        <p className="text-[#c0c0c0] opacity-60 text-xs mt-2">
          Seiko NH35 • 36mm • 28,800 bph
        </p>
      </div>

      <div className="space-y-3 mb-8 text-sm">
        <div className="flex justify-between items-center">
          <span className="text-[#c0c0c0] opacity-70 font-mono text-xs">CASE</span>
          <span className="text-[#f5f1e8] font-medium">{caseName}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[#c0c0c0] opacity-70 font-mono text-xs">DIAL</span>
          <span className="text-[#f5f1e8] font-medium">{dialName}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[#c0c0c0] opacity-70 font-mono text-xs">BRACELET</span>
          <span className="text-[#f5f1e8] font-medium">{braceletName}</span>
        </div>
      </div>

      <div className="border-t border-[#d4af37] border-opacity-30 pt-6 mb-8">
        <div className="flex justify-between items-baseline mb-4">
          <span className="text-xs font-mono text-[#c0c0c0] opacity-75 tracking-wide">PRICE</span>
          <span className="text-4xl font-bold text-[#d4af37]">${totalPrice}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-[#c0c0c0] opacity-50">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1V3a1 1 0 011-1h5a1 1 0 011 1v1h1V3a1 1 0 011 1v2h1.5a1 1 0 110 2H17v2h1.5a1 1 0 110 2H17v2h1.5a1 1 0 110 2H17v2a1 1 0 01-1 1h-1v1a1 1 0 11-2 0v-1h-5v1a1 1 0 11-2 0v-1H7v1a1 1 0 01-2 0v-1H4a1 1 0 01-1-1v-2H1.5a1 1 0 010-2H3v-2H1.5a1 1 0 010-2H3V7H1.5a1 1 0 010-2H3V4H2a1 1 0 01-1-1V2z" clipRule="evenodd" />
            </svg>
          Each watch is handcrafted with precision
        </div>
      </div>

      <button
        onClick={onAddToCart}
        disabled={loading}
        className="w-full bg-gradient-to-r from-[#d4af37] to-[#e5bf47] text-[#1a1a1a] py-4 rounded-sm font-bold text-sm tracking-widest uppercase hover:shadow-lg hover:shadow-[#d4af37]/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
      >
        {loading ? "Adding to Cart..." : "Add to Cart"}
      </button>

      <p className="text-xs text-[#c0c0c0] opacity-50 text-center mt-4 font-mono">
        Free shipping worldwide
      </p>
    </div>
  );
}
