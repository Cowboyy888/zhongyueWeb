import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, SITE } from "@/lib/seo";
import { productSchema, faqSchema, webPageSchema } from "@/lib/structured-data";

export const metadata: Metadata = buildMetadata({
  title: "Welded Fence Mesh Cambodia — Galvanised & Powder-Coated Panels",
  description:
    "Factory-direct welded fence mesh from Cambodia. 3–6mm wire, 50–100mm openings, galvanised or powder-coated. Security, agricultural, and perimeter fencing. Free quote — ZY Steel.",
  path: "/products/fence-mesh",
  keywords: [
    "fence mesh Cambodia",
    "welded fence panels Cambodia",
    "galvanised wire mesh",
    "security fence mesh",
    "agricultural fence mesh Cambodia",
    "perimeter fence manufacturer",
  ],
});

const FAQS = [
  {
    q: "What wire diameter is used for fence mesh?",
    a: "Standard fence mesh uses 3mm, 4mm, 5mm, or 6mm wire. Heavy-duty security panels use 6mm wire for maximum rigidity.",
  },
  {
    q: "What opening sizes are available?",
    a: "Common openings are 50×50mm and 100×100mm. Custom opening sizes (25×75mm, 75×150mm, etc.) are produced on request.",
  },
  {
    q: "Is the fence mesh galvanised or powder-coated?",
    a: "Both finishes are available. Hot-dip galvanised provides superior corrosion protection for coastal or humid environments. Powder-coated (RAL colours) offers aesthetic options for urban applications.",
  },
  {
    q: "What panel heights and widths do you offer?",
    a: "Standard heights are 1.0m, 1.2m, 1.5m, 1.8m, and 2.0m. Standard panel width is 2.4m. Custom heights and widths are available.",
  },
];

const RELATED = [
  { href: "/products/wire-mesh", name: "Welded Rebar Mesh" },
  { href: "/products/floor-mesh", name: "Floor Slab Mesh" },
  { href: "/products/custom-mesh", name: "Custom-Shape Mesh" },
  { href: "/products/wire-rod", name: "Cold-Drawn Wire & Rod" },
];

export default function FenceMeshPage() {
  return (
    <main id="main-content" className="min-h-screen bg-zinc-950 px-6 py-16">
      <JsonLd
        schema={[
          webPageSchema({ title: "Welded Fence Mesh Cambodia", description: "Galvanised welded fence panels from Cambodia", path: "/products/fence-mesh" }),
          productSchema({
            name: "Welded Fence Mesh",
            description: "Galvanised or powder-coated welded fence mesh panels. Wire 3–6mm, openings 50–100mm. For security, agricultural, and perimeter fencing applications.",
            image: "/images/product-3.webp",
            sku: "ZY-WFM",
            material: "Q195 / Q235 low-carbon steel, hot-dip galvanised or powder-coated",
            specs: {
              "Wire Diameter": "3 / 4 / 5 / 6mm",
              "Opening Size": "50×50 / 100×100mm (custom available)",
              "Panel Height": "1.0 / 1.2 / 1.5 / 1.8 / 2.0m",
              "Panel Width": "2.4m standard",
              Finish: "Hot-dip galvanised / Powder-coated",
              Material: "Q195 / Q235",
            },
          }),
          faqSchema(FAQS),
        ]}
      />
      <div className="mx-auto max-w-4xl">
        <Breadcrumb items={[{ name: "Home", href: "/" }, { name: "Products", href: "/products" }, { name: "Welded Fence Mesh", href: "/products/fence-mesh" }]} />
        <header className="mb-12">
          <div className="mb-3 flex flex-wrap gap-2">
            {["Galvanised", "Powder-Coated", "Security", "Agricultural"].map((c) => (
              <span key={c} className="rounded-full bg-amber-400/10 px-3 py-0.5 text-xs font-medium text-amber-400">{c}</span>
            ))}
          </div>
          <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl">Welded Fence Mesh</h1>
          <p className="text-lg leading-relaxed text-zinc-400">
            Factory-direct galvanised and powder-coated welded fence panels from Cambodia.
            Wire 3–6mm, openings 50–100mm. For security perimeters, agricultural enclosures,
            and infrastructure boundary fencing.
          </p>
        </header>

        <section aria-labelledby="specs-heading" className="mb-12">
          <h2 id="specs-heading" className="mb-6 text-2xl font-bold text-white">Specifications</h2>
          <div className="overflow-x-auto rounded-xl border border-zinc-800">
            <table className="w-full text-sm">
              <thead className="bg-zinc-900">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-zinc-300">Parameter</th>
                  <th className="px-4 py-3 text-left font-semibold text-zinc-300">Standard</th>
                  <th className="px-4 py-3 text-left font-semibold text-zinc-300">Custom</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800 text-zinc-400">
                {[
                  ["Wire Diameter", "3 / 4 / 5 / 6mm", "Any within 2.5–8mm"],
                  ["Opening Size", "50×50 / 100×100mm", "25×75, 75×150, custom"],
                  ["Panel Height", "1.0 / 1.2 / 1.5 / 1.8 / 2.0m", "Custom"],
                  ["Panel Width", "2.4m", "Custom"],
                  ["Finish", "Hot-dip galvanised", "Powder-coated (RAL)"],
                  ["Zinc Coating", "≥60 g/m²", "≥80 g/m² heavy duty"],
                  ["Material", "Q195 / Q235", "—"],
                ].map(([p, s, c]) => (
                  <tr key={p}><td className="px-4 py-3 font-medium text-zinc-300">{p}</td><td className="px-4 py-3">{s}</td><td className="px-4 py-3">{c}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section aria-labelledby="faq-heading" className="mb-12">
          <h2 id="faq-heading" className="mb-6 text-2xl font-bold text-white">FAQ — Fence Mesh</h2>
          <div className="space-y-4">
            {FAQS.map(({ q, a }) => (
              <div key={q} className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
                <h3 className="mb-2 font-semibold text-white">{q}</h3>
                <p className="text-sm leading-relaxed text-zinc-400">{a}</p>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="related-heading" className="mb-12">
          <h2 id="related-heading" className="mb-6 text-xl font-bold text-white">Related Products</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {RELATED.map((r) => (
              <Link key={r.href} href={r.href} className="rounded-lg border border-zinc-800 bg-zinc-900 p-4 text-sm font-medium text-zinc-300 transition-colors hover:border-amber-400/50 hover:text-amber-400">{r.name} →</Link>
            ))}
          </div>
        </section>

        <section aria-label="Quote CTA" className="rounded-2xl bg-amber-400 p-8 text-center">
          <h2 className="mb-3 text-2xl font-bold text-zinc-950">Get a Fence Mesh Quote</h2>
          <p className="mb-6 text-zinc-800">Specify panel dimensions, opening size, and finish — receive a factory-direct price within 24 hours.</p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <a href={`tel:${SITE.phone}`} className="rounded-full bg-zinc-950 px-8 py-3 font-semibold text-white hover:bg-zinc-800">{SITE.phoneDisplay}</a>
            <Link href="/contact" className="rounded-full border-2 border-zinc-950 px-8 py-3 font-semibold text-zinc-950 hover:bg-zinc-950 hover:text-white">Send Inquiry</Link>
          </div>
        </section>
      </div>
    </main>
  );
}
