import { Suspense } from 'react';
import { SITE } from '@/lib/seo';
import FacebookSkeleton from './Skeleton';
import Feed from './Feed';

export default function FacebookSection() {
  return (
    <section
      id="facebook"
      aria-labelledby="fb-section-heading"
      className="bg-zinc-900 py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#1877F2]">
              Social · Stay Connected
            </p>
            <h2
              id="fb-section-heading"
              className="text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl"
            >
              Latest from Facebook
            </h2>
          </div>
          <a
            href={SITE.socialLinks.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 self-start rounded-md border border-zinc-700 px-4 py-2 text-sm font-semibold text-zinc-300 transition-colors hover:border-[#1877F2]/50 hover:text-white sm:self-auto"
          >
            <FbIcon />
            View all posts
            <ArrowRight />
          </a>
        </div>

        {/* Streaming feed */}
        <Suspense fallback={<FacebookSkeleton />}>
          <Feed />
        </Suspense>
      </div>
    </section>
  );
}

function FbIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 fill-[#1877F2]">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5">
      <path
        fillRule="evenodd"
        d="M1 8a.5.5 0 01.5-.5h11.793l-3.147-3.146a.5.5 0 01.708-.708l4 4a.5.5 0 010 .708l-4 4a.5.5 0 01-.708-.708L13.293 8.5H1.5A.5.5 0 011 8z"
      />
    </svg>
  );
}
