import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { webPageSchema } from "@/lib/structured-data";

export const metadata: Metadata = buildMetadata({
  title: "Wire Mesh Blog — Construction & Steel Guides Cambodia | ZY Steel",
  description:
    "Expert guides on welded wire mesh, steel reinforcement, and construction in Cambodia. Buying guides, technical comparisons, and industry news from ZY Steel.",
  path: "/blog",
  keywords: [
    "wire mesh guide Cambodia",
    "welded mesh vs rebar",
    "construction steel Cambodia",
    "wire mesh buying guide",
    "steel mesh specification guide",
  ],
});

const ARTICLES = [
  {
    href: "/blog/what-is-welded-wire-mesh",
    title: "What Is Welded Wire Mesh? A Complete Guide",
    excerpt: "Welded wire mesh explained — types, standards, applications, and how to specify it for your project in Cambodia.",
    date: "2026-07-01",
    readTime: "8 min",
    tags: ["Guide", "Wire Mesh"],
  },
  {
    href: "/blog/wire-mesh-vs-rebar",
    title: "Wire Mesh vs. Rebar: Which Is Right for Your Project?",
    excerpt: "A practical comparison of welded wire mesh and traditional cut-and-bend rebar for concrete reinforcement — cost, speed, and structural performance.",
    date: "2026-07-05",
    readTime: "6 min",
    tags: ["Comparison", "Structural"],
  },
  {
    href: "/blog/how-to-choose-wire-mesh",
    title: "How to Choose the Right Wire Mesh for Construction",
    excerpt: "Step-by-step guide to selecting wire diameter, mesh spacing, and standard for your slab, wall, or pavement project.",
    date: "2026-07-10",
    readTime: "10 min",
    tags: ["Buying Guide", "Technical"],
  },
  {
    href: "/blog/construction-guide-cambodia",
    title: "Construction Steel in Cambodia: A Buyer's Guide",
    excerpt: "Everything you need to know about sourcing construction steel in Cambodia — standards, suppliers, import vs. local, and quality checks.",
    date: "2026-07-12",
    readTime: "12 min",
    tags: ["Cambodia", "Buying Guide"],
  },
  {
    href: "/blog/steel-mesh-buying-guide",
    title: "Steel Mesh Buying Guide: MOQ, Pricing, and Specifications",
    excerpt: "Factory vs. trading company pricing, minimum order quantities, and how to read a wire mesh specification sheet.",
    date: "2026-07-15",
    readTime: "7 min",
    tags: ["Pricing", "Sourcing"],
  },
];

export default function BlogPage() {
  return (
    <main id="main-content" className="min-h-screen bg-zinc-950 px-6 py-16">
      <JsonLd schema={webPageSchema({ title: "Wire Mesh Blog", description: "Steel and wire mesh guides for construction professionals", path: "/blog" })} />
      <div className="mx-auto max-w-4xl">
        <Breadcrumb items={[{ name: "Home", href: "/" }, { name: "Blog", href: "/blog" }]} />
        <header className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl">Wire Mesh & Steel Guides</h1>
          <p className="text-lg text-zinc-400">Expert articles on construction steel, wire mesh specification, and buying guides for Cambodia projects.</p>
        </header>
        <div className="space-y-6">
          {ARTICLES.map((a) => (
            <Link
              key={a.href}
              href={a.href}
              className="group block rounded-2xl border border-zinc-800 bg-zinc-900 p-7 transition-all hover:border-amber-400/50"
            >
              <div className="mb-3 flex flex-wrap items-center gap-2">
                {a.tags.map((t) => (
                  <span key={t} className="rounded-full bg-amber-400/10 px-2.5 py-0.5 text-xs font-medium text-amber-400">{t}</span>
                ))}
                <span className="ml-auto text-xs text-zinc-500">{a.date} · {a.readTime} read</span>
              </div>
              <h2 className="mb-2 text-xl font-bold text-white group-hover:text-amber-400">{a.title}</h2>
              <p className="text-sm leading-relaxed text-zinc-400">{a.excerpt}</p>
              <span className="mt-4 inline-block text-sm font-medium text-amber-400">Read article →</span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
