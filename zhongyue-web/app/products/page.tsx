import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { webPageSchema } from "@/lib/structured-data";

export const metadata: Metadata = buildMetadata({
  title: "Wire Mesh Products — Welded Mesh, Floor Mesh, Fence Mesh Cambodia",
  description:
    "Factory-direct wire mesh products from Cambodia's ISO 9001 certified manufacturer. Welded rebar mesh, floor slab mesh, fence mesh, custom shapes, and cold-drawn wire. GB/T · BS · ASTM certified.",
  path: "/products",
  keywords: [
    "wire mesh products Cambodia",
    "welded rebar mesh",
    "floor slab mesh Cambodia",
    "fence mesh manufacturer",
    "custom wire mesh Cambodia",
  ],
});

const PRODUCTS = [
  {
    href: "/products/wire-mesh",
    name: "Welded Rebar Mesh",
    sku: "ZY-WRM",
    spec: "Wire: 4–12mm · Spacing: 100–200mm · Standard: GB/T 1499.3 / BS 4483 / ASTM A1064",
    desc: "High-strength structural reinforcement mesh for concrete slabs, shear walls, pavements, and industrial floors. Most popular product for large-scale construction projects.",
    tags: ["Structural", "ISO Certified", "Custom Sizes"],
  },
  {
    href: "/products/floor-mesh",
    name: "Floor Slab Mesh",
    sku: "ZY-FSM",
    spec: "Wire: 6–10mm · Spacing: 150mm · Grade: HRB400",
    desc: "Pre-cut panels optimised for floor-slab pours. Faster placement, minimal waste, consistent quality. Standard and custom panel sizes available.",
    tags: ["Pre-cut", "Fast Install", "HRB400"],
  },
  {
    href: "/products/fence-mesh",
    name: "Welded Fence Mesh",
    sku: "ZY-WFM",
    spec: "Wire: 3–6mm · Openings: 50×50 to 100×100mm · Finish: galvanised / powder-coated",
    desc: "Galvanised or powder-coated welded panels for site perimeter, security fencing, agricultural, and infrastructure applications.",
    tags: ["Galvanised", "Security", "Agricultural"],
  },
  {
    href: "/products/custom-mesh",
    name: "Custom-Shape Mesh",
    sku: "ZY-CSM",
    spec: "L / T / curved / stepped profiles · Tolerance ±5mm · Lead time 7–15 days",
    desc: "Factory-bent to your structural drawings. Reduces site cutting, speeds up placement, eliminates measuring errors.",
    tags: ["Custom", "Factory-bent", "BIM-ready"],
  },
  {
    href: "/products/wire-rod",
    name: "Cold-Drawn Wire & Rod",
    sku: "ZY-CDW",
    spec: "Diameter: 3–12mm · Material: Q195/Q235 · Tensile strength ≥570 MPa",
    desc: "Precision cold-drawn wire for downstream mesh production, binding wire, and direct construction use.",
    tags: ["High-tensile", "Q195/Q235", "Coil/Straight"],
  },
];

export default function ProductsPage() {
  return (
    <main id="main-content" className="min-h-screen bg-zinc-950 px-6 py-16">
      <JsonLd schema={webPageSchema({ title: "Wire Mesh Products", description: "Factory-direct wire mesh from Cambodia", path: "/products" })} />
      <div className="mx-auto max-w-6xl">
        <Breadcrumb items={[{ name: "Home", href: "/" }, { name: "Products", href: "/products" }]} />

        <header className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl">
            Wire Mesh Products
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-zinc-400">
            Factory-direct from Cambodia — ISO 9001 certified welded wire mesh, rebar mesh, and
            cold-drawn wire for construction projects worldwide.
          </p>
        </header>

        <div className="grid gap-8 sm:grid-cols-2">
          {PRODUCTS.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="group rounded-2xl border border-zinc-800 bg-zinc-900 p-8 transition-all hover:border-amber-400/50 hover:bg-zinc-800"
            >
              <div className="mb-4 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-amber-400/10 px-3 py-0.5 text-xs font-medium text-amber-400"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <h2 className="mb-2 text-xl font-bold text-white group-hover:text-amber-400">
                {p.name}
              </h2>
              <p className="mb-4 text-xs font-medium text-amber-400/70">{p.spec}</p>
              <p className="mb-6 text-sm leading-relaxed text-zinc-400">{p.desc}</p>
              <span className="font-medium text-amber-400">View specifications →</span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
