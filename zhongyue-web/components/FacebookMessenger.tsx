"use client";
import { SITE } from "@/lib/seo";

// Floating Messenger chat button — links directly to m.me/[page]
// No Facebook SDK required; works without a Facebook App ID.
export default function FacebookMessenger() {
  return (
    <a
      href={SITE.socialLinks.messenger}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with ZY Steel on Facebook Messenger"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full text-white shadow-xl transition-transform duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:ring-offset-2 focus:ring-offset-zinc-950"
      style={{ background: "linear-gradient(135deg, #00c6ff 0%, #0078ff 100%)" }}
    >
      {/* Messenger lightning bolt logo */}
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7" aria-hidden="true">
        <path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.654V24l4.088-2.242c1.092.3 2.246.464 3.443.464 6.627 0 12-4.975 12-11.111C24 4.974 18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26L10.732 8.1l3.131 3.26 5.887-3.26-6.559 6.863z" />
      </svg>
      <span className="sr-only">Chat on Messenger</span>
    </a>
  );
}
