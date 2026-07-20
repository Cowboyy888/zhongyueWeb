import { SITE } from '@/lib/seo';

interface Props {
  error: string;
}

export default function ErrorState({ error }: Props) {
  const isDev = process.env.NODE_ENV === 'development';

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[340px_1fr]">
      {/* Static page card — always looks good */}
      <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950">
        <div
          className="h-32"
          style={{
            backgroundImage: [
              'repeating-linear-gradient(0deg,rgba(255,255,255,0.03) 0,rgba(255,255,255,0.03) 1px,transparent 1px,transparent 24px)',
              'repeating-linear-gradient(90deg,rgba(255,255,255,0.03) 0,rgba(255,255,255,0.03) 1px,transparent 1px,transparent 24px)',
              'linear-gradient(135deg,#09152B,#1A2B42)',
            ].join(','),
          }}
        />
        <div className="px-5 pb-5">
          <div className="-mt-8 mb-3">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full border-2 border-zinc-950 bg-[#E31E24] text-xl font-black text-white">
              ZY
            </div>
          </div>
          <h3 className="text-lg font-bold leading-snug text-white">{SITE.legalName}</h3>
          <p className="mt-0.5 text-sm text-zinc-500">Manufacturing Company · Phnom Penh, Cambodia</p>

          <div className="mt-5 flex flex-col gap-2">
            <a
              href={SITE.socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-md bg-[#1877F2] py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#166FE5]"
            >
              <FbIcon />
              Follow our page
            </a>
            <a
              href={SITE.socialLinks.messenger}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-md py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-85"
              style={{ background: 'linear-gradient(135deg,#00c6ff,#0078ff)' }}
            >
              <MessengerIcon />
              Message us
            </a>
          </div>

          <div className="mt-5 space-y-2.5 border-t border-zinc-800 pt-4">
            <Row icon="📞">
              <a href={`tel:${SITE.phone}`} className="transition-colors hover:text-white">
                {SITE.phoneDisplay}
              </a>
            </Row>
            <Row icon="🕐">Mon–Sat 08:00–17:00</Row>
            <Row icon="📍">Phnom Penh, Cambodia</Row>
          </div>
        </div>
      </div>

      {/* Right — follow prompt */}
      <div className="flex flex-col items-center justify-center rounded-xl border border-zinc-800 bg-zinc-950 p-8 text-center">
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#1877F2]/10 ring-1 ring-[#1877F2]/20">
          <FbIcon large />
        </div>
        <h3 className="mb-2 text-xl font-bold text-white">See Our Latest Updates</h3>
        <p className="mb-6 max-w-sm text-sm leading-relaxed text-zinc-400">
          Follow ZY Steel on Facebook for factory news, new product announcements, and direct
          access to our sales team.
        </p>
        <a
          href={SITE.socialLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-md bg-[#1877F2] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#166FE5]"
        >
          <FbIcon />
          Visit our Facebook page
        </a>

        {isDev && (
          <p className="mt-8 max-w-sm rounded-md border border-amber-400/30 bg-amber-400/5 px-4 py-3 text-left font-mono text-xs text-amber-300">
            <span className="font-bold">Dev:</span> {error}
            <br />
            <br />
            Add <code className="text-amber-200">FACEBOOK_PAGE_ACCESS_TOKEN</code> to{' '}
            <code className="text-amber-200">.env.local</code> to enable live posts.
          </p>
        )}
      </div>
    </div>
  );
}

function Row({ icon, children }: { icon: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2.5 text-sm text-zinc-400">
      <span className="text-base leading-none">{icon}</span>
      <span>{children}</span>
    </div>
  );
}

function FbIcon({ large = false }: { large?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={large ? 'h-7 w-7 fill-[#1877F2]' : 'h-4 w-4 flex-shrink-0'}
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function MessengerIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 flex-shrink-0">
      <path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.654V24l4.088-2.242c1.092.3 2.246.464 3.443.464 6.627 0 12-4.975 12-11.111C24 4.974 18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26L10.732 8.1l3.131 3.26 5.887-3.26-6.559 6.863z" />
    </svg>
  );
}
