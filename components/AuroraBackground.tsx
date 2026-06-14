"use client";

export default function AuroraBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {/* Warstwa 1 — zielona smuga */}
      <div
        className="aurora-blob"
        style={{
          background: "radial-gradient(ellipse 80% 40% at 50% 60%, rgba(52,211,153,0.18) 0%, transparent 70%)",
          animation: "aurora1 12s ease-in-out infinite",
        }}
      />
      {/* Warstwa 2 — fioletowa smuga */}
      <div
        className="aurora-blob"
        style={{
          background: "radial-gradient(ellipse 60% 35% at 30% 50%, rgba(139,92,246,0.12) 0%, transparent 70%)",
          animation: "aurora2 16s ease-in-out infinite",
        }}
      />
      {/* Warstwa 3 — turkusowa smuga */}
      <div
        className="aurora-blob"
        style={{
          background: "radial-gradient(ellipse 70% 30% at 70% 40%, rgba(20,184,166,0.10) 0%, transparent 70%)",
          animation: "aurora3 20s ease-in-out infinite",
        }}
      />
      {/* Delikatny vignette z góry i dołu żeby model 3D wyróżniał się */}
      <div
        style={{
          background: "linear-gradient(to bottom, rgba(10,10,10,0.6) 0%, transparent 30%, transparent 70%, rgba(10,10,10,0.8) 100%)",
          position: "absolute",
          inset: 0,
        }}
      />
    </div>
  );
}
