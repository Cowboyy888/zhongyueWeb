import Link from "next/link";
import { SITE } from "@/lib/seo";

const FacebookIcon = ({ className = "h-5 w-5" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const WhatsAppIcon = ({ className = "h-5 w-5" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const PRODUCTS = [
  { href: "/products/wire-mesh", name: "Welded Rebar Mesh" },
  { href: "/products/floor-mesh", name: "Floor Slab Mesh" },
  { href: "/products/fence-mesh", name: "Welded Fence Mesh" },
  { href: "/products/custom-mesh", name: "Custom-Shape Mesh" },
  { href: "/products/wire-rod", name: "Cold-Drawn Wire & Rod" },
];

export default function Footer() {
  return (
    <footer className="bg-zinc-900 px-6 pb-8 pt-12 text-zinc-500">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand + social */}
          <div>
            <Link href="/" className="mb-3 block text-lg font-bold text-white leading-none">
              ZY<span className="text-amber-400">Steel</span>
            </Link>
            <p className="mb-4 text-sm leading-relaxed">{SITE.tagline}</p>
            <div className="space-y-1 text-sm">
              <p>
                <a href={`tel:${SITE.phone}`} className="hover:text-white">
                  {SITE.phoneDisplay}
                </a>
              </p>
              <p>
                <a href={`mailto:${SITE.email}`} className="hover:text-white">
                  {SITE.email}
                </a>
              </p>
            </div>

            {/* Social icons */}
            <div className="mt-5 flex items-center gap-4">
              <a
                href={SITE.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="ZY Steel on Facebook"
                className="transition-colors hover:text-[#1877F2]"
              >
                <FacebookIcon />
              </a>
              <a
                href={SITE.socialLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="ZY Steel on WhatsApp"
                className="transition-colors hover:text-[#25D366]"
              >
                <WhatsAppIcon />
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="mb-3 font-semibold text-white">Products</h3>
            <ul className="space-y-1.5 text-sm">
              {PRODUCTS.map((p) => (
                <li key={p.href}>
                  <Link href={p.href} className="hover:text-white">
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Blog */}
          <div>
            <h3 className="mb-3 font-semibold text-white">Blog</h3>
            <ul className="space-y-1.5 text-sm">
              <li>
                <Link href="/blog/what-is-welded-wire-mesh" className="hover:text-white">
                  What Is Welded Wire Mesh?
                </Link>
              </li>
              <li>
                <Link href="/blog/wire-mesh-vs-rebar" className="hover:text-white">
                  Wire Mesh vs Rebar
                </Link>
              </li>
              <li>
                <Link href="/blog/how-to-choose-wire-mesh" className="hover:text-white">
                  How to Choose Wire Mesh
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white">
                  All Articles →
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-3 font-semibold text-white">Company</h3>
            <ul className="space-y-1.5 text-sm">
              <li>
                <Link href="/contact" className="hover:text-white">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-white">
                  All Products
                </Link>
              </li>
              <li className="pt-1">
                <address className="not-italic leading-relaxed">
                  {SITE.address.street}
                  <br />
                  {SITE.address.city}, {SITE.address.country}
                </address>
              </li>
              <li>Mon–Sat 08:00–17:00 (ICT)</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-zinc-800 pt-6 text-xs sm:flex-row">
          <p>© {new Date().getFullYear()} {SITE.legalName}. All rights reserved.</p>
          <p>Wire mesh manufacturer in Cambodia · ISO 9001:2015</p>
        </div>
      </div>
    </footer>
  );
}
