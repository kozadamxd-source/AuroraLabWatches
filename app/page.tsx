import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-200 py-4 sticky top-0 bg-white z-40">
        <div className="max-w-full px-4 sm:px-6 lg:px-8">
          <h1 className="text-lg font-semibold text-black">AuroraLab</h1>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1 flex items-center justify-center px-4 py-16 sm:py-24">
        <div className="max-w-5xl w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Image */}
            <div>
              <div className="w-full aspect-square bg-gray-50 flex items-center justify-center border border-gray-200">
                <svg className="w-32 h-32 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="9" strokeWidth="0.5" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.5" d="M12 7v5l4 2" />
                </svg>
              </div>
            </div>

            {/* Right: Content */}
            <div className="space-y-8">
              <div className="space-y-3">
                <p className="text-xs text-gray-500 uppercase tracking-widest font-medium">Premium Custom Watches</p>
                <h2 className="text-4xl lg:text-5xl font-light text-black leading-tight">
                  Stwórz swój<br />zegarek
                </h2>
              </div>

              <p className="text-base text-gray-600 leading-relaxed max-w-sm">
                Skonfiguruj unikalny zegarek, wybierając spośród starannie wybranych komponentów. Każda kombinacja jest handcraftowana z precyzją.
              </p>

              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex gap-4">
                  <span className="font-medium min-w-fit text-black">3 koperty</span>
                  <span>Gold, Rose Gold, Two-Tone</span>
                </div>
                <div className="flex gap-4">
                  <span className="font-medium min-w-fit text-black">4 tarcze</span>
                  <span>Blue, Green, Pink, Sky Blue</span>
                </div>
                <div className="flex gap-4">
                  <span className="font-medium min-w-fit text-black">5 bransolet</span>
                  <span>President style variants</span>
                </div>
              </div>

              <Link
                href="/configurator"
                className="inline-block bg-black text-white px-8 py-3 text-sm font-medium tracking-wide hover:bg-gray-800 transition-colors"
              >
                Przejdź do konfiguratora
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-6 bg-white">
        <div className="max-w-full px-4 sm:px-6 lg:px-8 text-center text-xs text-gray-500">
          <p>© 2024 AuroraLab. Seiko NH35 • 36mm • 28,800 bph</p>
        </div>
      </footer>
    </div>
  );
}
