import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] via-[#0a1428] to-[#1a1a1a] text-[#f5f1e8] flex flex-col overflow-hidden">
      {/* Animated gradient background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#d4af37] rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#0a1428] rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      </div>

      {/* Header */}
      <header className="relative border-b border-[#d4af37] border-opacity-20 py-8 backdrop-blur-sm bg-[#1a1a1a] bg-opacity-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline gap-3">
            <h1 className="text-4xl font-bold text-[#d4af37]">AuroraLab</h1>
            <div className="w-1 h-6 bg-gradient-to-b from-[#d4af37] to-transparent opacity-50"></div>
            <p className="text-xs tracking-widest text-[#c0c0c0] opacity-60 font-mono uppercase">
              Bespoke Horology
            </p>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="relative flex-1 flex items-center justify-center px-4 py-20 sm:py-32">
        <div className="max-w-3xl text-center space-y-8">
          {/* Accent line */}
          <div className="flex justify-center gap-2">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#d4af37] opacity-50"></div>
            <p className="text-xs font-mono text-[#d4af37] tracking-widest uppercase">Precision Crafted</p>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#d4af37] opacity-50"></div>
          </div>

          {/* Main heading */}
          <h2 className="text-5xl sm:text-7xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-[#d4af37] via-[#f5f1e8] to-[#d4af37] bg-clip-text text-transparent">
              Craft Your
            </span>
            <br />
            <span className="text-[#f5f1e8]">Signature Watch</span>
          </h2>

          {/* Description with premium styling */}
          <div className="space-y-4">
            <p className="text-lg sm:text-xl text-[#c0c0c0] leading-relaxed font-light">
              Seiko NH35 movement meets your vision. Layer premium cases, exquisite dials,
              and refined bracelets into a timepiece uniquely yours.
            </p>
            <p className="text-sm font-mono text-[#d4af37] opacity-70 tracking-wide">
              INTERACTIVE 3D CONFIGURATOR
            </p>
          </div>

          {/* CTA Button with hover effect */}
          <div className="pt-4">
            <Link
              href="/configurator"
              className="group inline-flex items-center gap-3 bg-[#d4af37] text-[#1a1a1a] px-10 py-4 rounded-sm font-bold text-lg tracking-widest hover:bg-[#f5f1e8] transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-[#d4af37]/20"
            >
              <span>CONFIGURE NOW</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>

          {/* Stats or features */}
          <div className="pt-8 grid grid-cols-3 gap-4 sm:gap-8 text-center border-t border-[#d4af37] border-opacity-20 pt-8">
            <div>
              <p className="text-2xl font-bold text-[#d4af37]">3</p>
              <p className="text-xs text-[#c0c0c0] opacity-60 font-mono mt-1 uppercase tracking-wider">Premium Cases</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#d4af37]">5</p>
              <p className="text-xs text-[#c0c0c0] opacity-60 font-mono mt-1 uppercase tracking-wider">Bracelet Styles</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#d4af37]">4</p>
              <p className="text-xs text-[#c0c0c0] opacity-60 font-mono mt-1 uppercase tracking-wider">Dial Colors</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative border-t border-[#d4af37] border-opacity-20 py-8 backdrop-blur-sm bg-[#1a1a1a] bg-opacity-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[#c0c0c0] opacity-50 font-mono">
              © 2024 AuroraLab. Handcrafted with precision.
            </p>
            <p className="text-xs text-[#d4af37] opacity-75 font-mono tracking-wider">
              SEIKO NH35 • 28,800 BPH
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
