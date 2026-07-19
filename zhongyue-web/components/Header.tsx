"use client";
import Link from "next/link";
import { useState } from "react";
import { SITE } from "@/lib/seo";

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const NAV = [
  { href: "/products", label: "Products" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <span className="text-lg font-bold text-white leading-none">
            ZY<span className="text-amber-400">Steel</span>
          </span>
          <span className="hidden text-xs text-zinc-600 sm:block">中粤铁网</span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Main navigation" className="hidden items-center gap-7 md:flex">
          {NAV.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-zinc-400 transition-colors hover:text-white"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Right: Facebook + CTA + mobile trigger */}
        <div className="flex items-center gap-3">
          <a
            href={SITE.socialLinks.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow ZY Steel on Facebook"
            className="hidden text-zinc-500 transition-colors hover:text-[#1877F2] sm:block"
          >
            <FacebookIcon />
          </a>
          <Link
            href="/contact"
            className="rounded-full bg-amber-400 px-5 py-1.5 text-sm font-semibold text-zinc-950 transition-colors hover:bg-amber-300"
          >
            Get Quote
          </Link>

          {/* Hamburger (mobile only) */}
          <button
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="rounded-md p-1.5 text-zinc-400 hover:text-white md:hidden"
          >
            {open ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="border-t border-zinc-800 bg-zinc-950 px-6 py-5 md:hidden">
          <nav className="flex flex-col gap-5" aria-label="Mobile navigation">
            {NAV.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-zinc-300 transition-colors hover:text-white"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <a
              href={SITE.socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-zinc-400 transition-colors hover:text-[#1877F2]"
              onClick={() => setOpen(false)}
            >
              <FacebookIcon />
              Follow on Facebook
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
