import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, SITE } from "@/lib/seo";
import { webPageSchema } from "@/lib/structured-data";

export const metadata: Metadata = buildMetadata({
  title: "Contact ZY Steel — Wire Mesh Quote Cambodia",
  description:
    "Contact ZY Steel for a wire mesh quote. Call, WhatsApp, or email us — factory-direct pricing within 24 hours. Based in Cambodia, exporting to 60+ countries.",
  path: "/contact",
  keywords: [
    "contact ZY Steel",
    "wire mesh quote Cambodia",
    "steel mesh inquiry",
    "buy wire mesh Cambodia",
    "ZY Steel contact",
  ],
});

export default function ContactPage() {
  return (
    <main id="main-content" className="min-h-screen bg-zinc-950 px-6 py-16">
      <JsonLd schema={webPageSchema({ title: "Contact ZY Steel", description: "Wire mesh inquiry and quote", path: "/contact" })} />
      <div className="mx-auto max-w-4xl">
        <Breadcrumb items={[{ name: "Home", href: "/" }, { name: "Contact", href: "/contact" }]} />
        <header className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl">Contact Us</h1>
          <p className="text-lg text-zinc-400">
            Send your wire mesh specifications and receive a factory-direct quote within 24 hours.
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
              <h2 className="mb-4 text-xl font-bold text-white">Get in Touch</h2>
              <div className="space-y-4 text-sm text-zinc-400">
                <div>
                  <p className="mb-1 font-semibold text-zinc-300">Phone / WhatsApp</p>
                  <a href={`tel:${SITE.phone}`} className="text-amber-400 hover:underline">{SITE.phoneDisplay}</a>
                </div>
                <div>
                  <p className="mb-1 font-semibold text-zinc-300">Email</p>
                  <a href={`mailto:${SITE.email}`} className="text-amber-400 hover:underline">{SITE.email}</a>
                </div>
                <div>
                  <p className="mb-1 font-semibold text-zinc-300">WhatsApp Direct</p>
                  <a href={SITE.socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:underline">
                    Open WhatsApp Chat
                  </a>
                </div>
                <div>
                  <p className="mb-1 font-semibold text-zinc-300">Address</p>
                  <address className="not-italic">
                    {SITE.address.street}<br />
                    {SITE.address.city}, {SITE.address.country}
                  </address>
                </div>
                <div>
                  <p className="mb-1 font-semibold text-zinc-300">Office Hours</p>
                  <p>Monday – Saturday: 08:00 – 17:00 (ICT, UTC+7)</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
              <h2 className="mb-3 text-lg font-bold text-white">Service Areas</h2>
              <div className="flex flex-wrap gap-2">
                {["Phnom Penh", "Siem Reap", "Battambang", "Sihanoukville", "Southeast Asia", "Middle East", "Africa", "60+ Countries"].map((a) => (
                  <span key={a} className="rounded-full border border-zinc-700 px-3 py-1 text-xs text-zinc-300">{a}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Inquiry Form */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="mb-6 text-xl font-bold text-white">Request a Quote</h2>
            <form
              action="https://formspree.io/f/xwvdnklo"
              method="POST"
              className="space-y-4"
              aria-label="Quote request form"
            >
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-zinc-300">
                  Full Name <span aria-label="required">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-white placeholder-zinc-500 focus:border-amber-400 focus:outline-none"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-zinc-300">
                  Email <span aria-label="required">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-white placeholder-zinc-500 focus:border-amber-400 focus:outline-none"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-zinc-300">
                  Phone / WhatsApp
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-white placeholder-zinc-500 focus:border-amber-400 focus:outline-none"
                  placeholder="+1 234 567 890"
                />
              </div>
              <div>
                <label htmlFor="product" className="mb-1.5 block text-sm font-medium text-zinc-300">
                  Product Required
                </label>
                <select
                  id="product"
                  name="product"
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-zinc-300 focus:border-amber-400 focus:outline-none"
                >
                  <option value="">Select a product</option>
                  <option value="welded-rebar-mesh">Welded Rebar Mesh</option>
                  <option value="floor-slab-mesh">Floor Slab Mesh</option>
                  <option value="fence-mesh">Welded Fence Mesh</option>
                  <option value="custom-mesh">Custom-Shape Mesh</option>
                  <option value="wire-rod">Cold-Drawn Wire & Rod</option>
                  <option value="other">Other / Multiple</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-zinc-300">
                  Specifications & Quantity <span aria-label="required">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-white placeholder-zinc-500 focus:border-amber-400 focus:outline-none"
                  placeholder="Wire diameter, spacing, panel size, quantity (tons), delivery port..."
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-full bg-amber-400 py-3 font-semibold text-zinc-950 transition-colors hover:bg-amber-300"
              >
                Send Inquiry
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
