import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#1a1a1a] text-[#f5f1e8] flex flex-col">
      {/* Header */}
      <header className="border-b border-[#c0c0c0] border-opacity-20 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-[#d4af37]">AuroraLab</h1>
          <p className="text-sm text-[#c0c0c0] opacity-75 mt-1 font-mono">
            Premium Custom Watch Builds
          </p>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-2xl text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-[#d4af37]">
            Design Your Perfect Watch
          </h2>
          <p className="text-lg text-[#c0c0c0] mb-4">
            Seiko NH35 Movement • Premium Casings • Precision Crafted
          </p>
          <p className="text-base text-[#c0c0c0] opacity-75 mb-8 font-mono">
            Select your case, dial, and bracelet. Watch it come to life in real-time.
          </p>

          <Link
            href="/configurator"
            className="inline-block bg-[#d4af37] text-[#1a1a1a] px-8 py-4 rounded font-bold text-lg tracking-wider hover:bg-[#e5bf47] transition-colors duration-200"
          >
            Start Configuring
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#c0c0c0] border-opacity-20 py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-[#c0c0c0] opacity-50 font-mono">
            © 2024 AuroraLab. Handcrafted with precision.
          </p>
        </div>
      </footer>
    </div>
  );
}
