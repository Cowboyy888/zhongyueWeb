import type { FacebookPage } from '@/lib/facebook';
import { formatCount } from '@/lib/facebook';
import { SITE } from '@/lib/seo';

interface Props {
  page: FacebookPage;
}

export default function PageCard({ page }: Props) {
  const followers = page.followers_count ?? page.fan_count;

  return (
    <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950">
      {/* Cover — industrial wire-mesh gradient */}
      <div
        className="relative h-32"
        aria-hidden="true"
        style={{
          backgroundImage: [
            'repeating-linear-gradient(0deg,rgba(255,255,255,0.035) 0,rgba(255,255,255,0.035) 1px,transparent 1px,transparent 24px)',
            'repeating-linear-gradient(90deg,rgba(255,255,255,0.035) 0,rgba(255,255,255,0.035) 1px,transparent 1px,transparent 24px)',
            'linear-gradient(135deg,#09152B 0%,#1A2B42 100%)',
          ].join(','),
        }}
      >
        {/* Small verified badge top-right */}
        <span className="absolute right-3 top-3 flex items-center gap-1.5 rounded-sm border border-[#1877F2]/30 bg-[#1877F2]/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-[#1877F2]">
          <FbIcon className="h-3 w-3" />
          Official Page
        </span>
      </div>

      <div className="px-5 pb-6">
        {/* Avatar floats over cover */}
        <div className="-mt-8 mb-3">
          <div
            className="inline-flex h-16 w-16 items-center justify-center rounded-full border-2 border-zinc-950 bg-[#E31E24] text-xl font-black tracking-tight text-white shadow-lg"
            aria-hidden="true"
          >
            ZY
          </div>
        </div>

        {/* Identity */}
        <h3 className="text-base font-bold leading-snug text-white">{page.name}</h3>
        <p className="mt-0.5 text-xs text-zinc-500">Manufacturing Company · Phnom Penh, Cambodia</p>

        {/* Follower count */}
        <div className="mt-4 flex items-baseline gap-1.5">
          <span className="font-display text-3xl font-black tabular-nums text-[#1877F2]">
            {formatCount(followers)}
          </span>
          <span className="text-sm text-zinc-400">followers</span>
        </div>

        {/* Action buttons */}
        <div className="mt-4 flex flex-col gap-2">
          <a
            href={SITE.socialLinks.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-md bg-[#1877F2] py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#166FE5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1877F2]"
          >
            <FbIcon className="h-4 w-4" />
            Follow our page
          </a>
          <a
            href={SITE.socialLinks.messenger}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-md py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
            style={{ background: 'linear-gradient(135deg,#00c6ff,#0078ff)' }}
          >
            <MessengerIcon className="h-4 w-4" />
            Message us
          </a>
        </div>

        {/* Contact details */}
        <ul className="mt-5 space-y-2.5 border-t border-zinc-800 pt-4">
          <li>
            <DetailRow icon={<PhoneIcon />}>
              <a
                href={`tel:${SITE.phone}`}
                className="text-zinc-400 transition-colors hover:text-white"
              >
                {SITE.phoneDisplay}
              </a>
            </DetailRow>
          </li>
          <li>
            <DetailRow icon={<ClockIcon />}>
              <span className="text-zinc-400">Mon–Sat 08:00–17:00</span>
            </DetailRow>
          </li>
          <li>
            <DetailRow icon={<GlobeIcon />}>
              <a
                href={SITE.url}
                target="_blank"
                rel="noopener noreferrer"
                className="truncate text-zinc-400 transition-colors hover:text-white"
              >
                {SITE.url.replace('https://', '')}
              </a>
            </DetailRow>
          </li>
        </ul>
      </div>
    </div>
  );
}

function DetailRow({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2.5 text-sm">
      <span className="flex-shrink-0">{icon}</span>
      {children}
    </div>
  );
}

function FbIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function MessengerIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.654V24l4.088-2.242c1.092.3 2.246.464 3.443.464 6.627 0 12-4.975 12-11.111C24 4.974 18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26L10.732 8.1l3.131 3.26 5.887-3.26-6.559 6.863z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5 fill-[#1877F2]">
      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5 fill-[#1877F2]">
      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5 fill-[#1877F2]">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
    </svg>
  );
}
