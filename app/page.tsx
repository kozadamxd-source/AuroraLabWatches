import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="h-14 border-b border-gray-100 flex items-center justify-between px-6 lg:px-10">
        <h1 className="text-base font-semibold tracking-tight text-black">AuroraLab</h1>
        <nav className="flex gap-6 text-sm text-gray-500">
          <a href="#" className="hover:text-black transition-colors">O nas</a>
          <a href="#" className="hover:text-black transition-colors">Galeria</a>
          <Link href="/configurator" className="hover:text-black transition-colors">Konfigurator</Link>
        </nav>
      </header>

      <main className="flex-1 grid grid-cols-1 lg:grid-cols-2">
        {/* Left — full-height visual */}
        <div className="bg-[#f5f5f5] flex items-center justify-center p-12 lg:p-20 min-h-[60vw] lg:min-h-0">
          <div className="relative w-full max-w-sm aspect-square">
            {/* Placeholder ring — will be replaced with a real photo */}
            <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-gray-300">
              <circle cx="100" cy="100" r="78" stroke="currentColor" strokeWidth="0.75"/>
              <circle cx="100" cy="100" r="58" stroke="currentColor" strokeWidth="0.5"/>
              <line x1="100" y1="100" x2="100" y2="50" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <line x1="100" y1="100" x2="128" y2="115" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
              {[...Array(12)].map((_, i) => {
                const angle = (i * 30 - 90) * (Math.PI / 180);
                const x1 = 100 + 72 * Math.cos(angle);
                const y1 = 100 + 72 * Math.sin(angle);
                const x2 = 100 + 65 * Math.cos(angle);
                const y2 = 100 + 65 * Math.sin(angle);
                return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="1"/>;
              })}
            </svg>
          </div>
        </div>

        {/* Right — copy */}
        <div className="flex flex-col justify-center px-10 lg:px-16 py-14 space-y-8">
          <div className="space-y-4">
            <p className="text-[10px] text-gray-400 uppercase tracking-widest">Seiko NH35 · Custom Build</p>
            <h2 className="text-4xl lg:text-5xl font-light text-black leading-snug">
              Twój zegarek,<br />Twoje zasady.
            </h2>
          </div>

          <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
            Wybierz kopertę, tarczę i bransoletę. Na żywo podgląd w konfiguratorze. Każda sztuka składana ręcznie.
          </p>

          <div className="space-y-1.5 text-sm text-gray-600">
            <p>— 3 warianty kopert</p>
            <p>— 4 kolory tarcz</p>
            <p>— 5 stylów bransolet President</p>
            <p>— Mechanizm Seiko NH35</p>
          </div>

          <Link
            href="/configurator"
            className="inline-flex items-center gap-2 bg-black text-white text-sm font-medium tracking-wide px-7 py-3 hover:bg-gray-900 transition-colors w-fit"
          >
            Konfiguruj
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </main>

      <footer className="h-12 border-t border-gray-100 flex items-center px-6 lg:px-10">
        <p className="text-[11px] text-gray-400">© 2024 AuroraLab</p>
      </footer>
    </div>
  );
}
