import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-200 py-4 sticky top-0 bg-white z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-black">AuroraLab</h1>
          <p className="text-xs text-gray-600 mt-1">Custom Watch Configurator</p>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1 flex items-center justify-center px-4 py-16 sm:py-24">
        <div className="max-w-4xl w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left: Image placeholder */}
            <div className="flex items-center justify-center">
              <div className="w-full aspect-square bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
                <svg className="w-24 h-24 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>

            {/* Right: Content */}
            <div className="space-y-6">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Seiko NH35</p>
                <h2 className="text-4xl font-bold text-black leading-tight">
                  Stwórz swój<br />zegarek
                </h2>
              </div>

              <p className="text-lg text-gray-700 leading-relaxed">
                Wybierz koperty, tarczę i branzoletę, aby stworzyć swój unikalny zegarek. Real-time preview pokazuje dokładnie, jak będzie wyglądać.
              </p>

              <div className="space-y-3 pt-4 border-t border-gray-200">
                <div className="flex items-start gap-3">
                  <span className="text-sm font-semibold text-black min-w-fit">Kopertura:</span>
                  <span className="text-sm text-gray-600">3 warianty (Gold, Rose Gold, Two-Tone)</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-sm font-semibold text-black min-w-fit">Tarcza:</span>
                  <span className="text-sm text-gray-600">4 kolory (Blue, Green, Pink, Sky Blue)</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-sm font-semibold text-black min-w-fit">Bransoleta:</span>
                  <span className="text-sm text-gray-600">5 stylów President</span>
                </div>
              </div>

              <Link
                href="/configurator"
                className="inline-block bg-black text-white px-8 py-3 font-semibold hover:bg-gray-800 transition-colors mt-6 w-full text-center sm:w-auto"
              >
                Przejdź do konfiguratora
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-6 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-600">
          <p>© 2024 AuroraLab. Seiko NH35 • 36mm • 28,800 bph</p>
        </div>
      </footer>
    </div>
  );
}
