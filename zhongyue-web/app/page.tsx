export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center min-h-screen bg-zinc-950 text-white px-6 text-center">
      <p className="text-sm font-semibold tracking-widest text-amber-400 uppercase mb-4">
        Since 2002
      </p>
      <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6">
        Zhongyue Steel
        <span className="block text-zinc-400 text-2xl sm:text-3xl font-normal mt-2">
          中粤铁网公司
        </span>
      </h1>
      <p className="max-w-xl text-zinc-400 text-lg leading-relaxed mb-10">
        Professional welded rebar mesh manufacturer in Cambodia. ISO 9001
        certified — serving 60+ countries since 2002.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <a
          href="tel:+85576497618"
          className="px-8 py-3 rounded-full bg-amber-400 text-zinc-950 font-semibold hover:bg-amber-300 transition-colors"
        >
          +855 76 497 6187
        </a>
        <a
          href="https://wa.me/855764976187"
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-3 rounded-full border border-zinc-600 text-zinc-300 hover:border-zinc-400 hover:text-white transition-colors"
        >
          WhatsApp Inquiry
        </a>
      </div>
    </main>
  );
}
