export default function NotFound() {
  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center text-center px-6">
      <p className="text-[9px] tracking-[6px] text-racing-red mb-4">404</p>
      <h1 className="text-6xl font-black uppercase mb-6">Off Track</h1>
      <p className="text-white/40 text-sm mb-10">This page doesn&apos;t exist. Let&apos;s get you back on the circuit.</p>
      <a href="/" className="text-[9px] tracking-[4px] text-white border border-racing-red px-8 py-4 hover:bg-racing-red transition-all duration-300">
        BACK TO HOME
      </a>
    </main>
  );
}
