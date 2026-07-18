import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, SITE } from "@/lib/seo";
import { productSchema, faqSchema, webPageSchema } from "@/lib/structured-data";

export const metadata: Metadata = buildMetadata({
  title: "Custom Shape Wire Mesh Cambodia — L/T/Curved/Stepped Panels | ZY Steel",
  description:
    "Factory-bent custom wire mesh panels from Cambodia. L-shape, T-shape, curved, and stepped profiles. Tolerance ±5mm. 7–15 day lead time. Free quote — ZY Steel.",
  path: "/products/custom-mesh",
  keywords: [
    "custom wire mesh Cambodia",
    "custom shape mesh",
    "L-shape mesh panel",
    "bent wire mesh Cambodia",
    "structural custom mesh manufacturer",
    "BIM-ready mesh Cambodia",
  ],
});

const FAQS = [
  {
    q: "What custom shapes can ZY Steel produce?",
    a: "We produce L-shape, T-shape, U-shape, curved, stepped, and any combination profile. Complex 3D shapes are reviewed on a case-by-case basis — send your drawing.",
  },
  {
    q: "What are the dimensional tolerances for custom mesh?",
    a: "Standard tolerance is ±5mm on all dimensions. Tighter tolerances of ±2mm are available for critical structural applications — specify in your drawing.",
  },
  {
    q: "Can I send BIM or CAD files?",
    a: "Yes. We accept DWG, DXF, PDF, and STEP files. Our engineering team extracts bar schedules from BIM models and converts them to production files.",
  },
  {
    q: "What is the lead time for custom mesh?",
    a: "Standard custom profiles ship within 7–15 days of drawing approval. Complex or very large orders may require 20–30 days. Confirm at time of enquiry.",
  },
  {
    q: "What is the minimum order for custom mesh?",
    a: "Minimum order is 3 tons per profile shape. For multiple shapes in one order, total order minimum is 5 tons.",
  },
];

const RELATED = [
  { href: "/products/wire-mesh", name: "Welded Rebar Mesh" },
  { href: "/products/floor-mesh", name: "Floor Slab Mesh" },
  { href: "/products/fence-mesh", name: "Welded Fence Mesh" },
  { href: "/products/wire-rod", name: "Cold-Drawn Wire & Rod" },
];

export default function CustomMeshPage() {
  return (
    <main id="main-content" className="min-h-screen bg-zinc-950 px-6 py-16">
      <JsonLd
        schema={[
          webPageSchema({ title: "Custom Shape Wire Mesh Cambodia", description: "Factory-bent custom wire mesh panels from Cambodia", path: "/products/custom-mesh" }),
          productSchema({
            name: "Custom-Shape Wire Mesh",
            description: "Factory-bent custom wire mesh panels including L-shape, T-shape, curved, and stepped profiles. Tolerance ±5mm. 7–15 day lead time.",
            image: "/images/product-4.webp",
            sku: "ZY-CSM",
            material: "HRB400 deformed steel bar",
            specs: {
              Profiles: "L / T / U / curved / stepped (custom)",
              Tolerance: "±5mm standard, ±2mm precision",
              "Wire Diameter": "4–12mm",
              "Lead Time": "7–15 days from drawing approval",
              "File Formats": "DWG / DXF / PDF / STEP",
            },
          }),
          faqSchema(FAQS),
        ]}
      />
      <div className="mx-auto max-w-4xl">
        <Breadcrumb items={[{ name: "Home", href: "/" }, { name: "Products", href: "/products" }, { name: "Custom-Shape Mesh", href: "/products/custom-mesh" }]} />
        <header className="mb-12">
          <div className="mb-3 flex flex-wrap gap-2">
            {["Custom", "Factory-bent", "BIM-ready", "±5mm tolerance"].map((c) => (
              <span key={c} className="rounded-full bg-amber-400/10 px-3 py-0.5 text-xs font-medium text-amber-400">{c}</span>
            ))}
          </div>
          <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl">Custom-Shape Mesh</h1>
          <p className="text-lg leading-relaxed text-zinc-400">
            Factory-bent custom wire mesh panels from Cambodia. L-shape, T-shape, curved, stepped
            — manufactured to your structural drawings. Tolerance ±5mm. Send your DWG or PDF for
            a free evaluation within 24 hours.
          </p>
        </header>

        <section aria-labelledby="how-heading" className="mb-12">
          <h2 id="how-heading" className="mb-6 text-2xl font-bold text-white">How It Works</h2>
          <ol className="space-y-4">
            {[
              { step: "01", text: "Send your structural drawings (DWG, DXF, PDF, or STEP)" },
              { step: "02", text: "Our engineering team reviews and prepares a bar bending schedule" },
              { step: "03", text: "You approve the schedule and we start production" },
              { step: "04", text: "Panels delivered to site in placement sequence, labelled by zone" },
            ].map(({ step, text }) => (
              <li key={step} className="flex gap-4 rounded-xl border border-zinc-800 bg-zinc-900 p-5">
                <span className="text-2xl font-bold text-amber-400">{step}</span>
                <p className="text-zinc-300">{text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="specs-heading" className="mb-12">
          <h2 id="specs-heading" className="mb-6 text-2xl font-bold text-white">Specifications</h2>
          <div className="overflow-x-auto rounded-xl border border-zinc-800">
            <table className="w-full text-sm">
              <thead className="bg-zinc-900">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-zinc-300">Parameter</th>
                  <th className="px-4 py-3 text-left font-semibold text-zinc-300">Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800 text-zinc-400">
                {[
                  ["Wire Diameter", "4–12mm"],
                  ["Profiles Available", "L / T / U / curved / stepped / 3D compound"],
                  ["Dimensional Tolerance", "±5mm standard · ±2mm precision"],
                  ["Mesh Spacing", "100–200mm (as per design)"],
                  ["Steel Grade", "HRB400 / HRB500"],
                  ["Lead Time", "7–15 days from drawing approval"],
                  ["Min. Order", "3 tons per profile"],
                  ["CAD Formats", "DWG / DXF / PDF / STEP / IFC"],
                ].map(([p, v]) => (
                  <tr key={p}><td className="px-4 py-3 font-medium text-zinc-300">{p}</td><td className="px-4 py-3">{v}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section aria-labelledby="faq-heading" className="mb-12">
          <h2 id="faq-heading" className="mb-6 text-2xl font-bold text-white">FAQ — Custom Mesh</h2>
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
          <h2 className="mb-3 text-2xl font-bold text-zinc-950">Send Your Drawing for a Free Evaluation</h2>
          <p className="mb-6 text-zinc-800">Upload your DWG or PDF and our engineering team will confirm feasibility and pricing within 24 hours — no obligation.</p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <a href={`tel:${SITE.phone}`} className="rounded-full bg-zinc-950 px-8 py-3 font-semibold text-white hover:bg-zinc-800">{SITE.phoneDisplay}</a>
            <Link href="/contact" className="rounded-full border-2 border-zinc-950 px-8 py-3 font-semibold text-zinc-950 hover:bg-zinc-950 hover:text-white">Send Drawing</Link>
          </div>
        </section>
      </div>
    </main>
  );
}
