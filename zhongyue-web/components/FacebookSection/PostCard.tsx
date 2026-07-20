import type { FacebookPost } from '@/lib/facebook';
import { formatCount, formatRelativeTime } from '@/lib/facebook';

interface Props {
  post: FacebookPost;
}

export default function PostCard({ post }: Props) {
  const text = post.message ?? post.story ?? '';
  const reactions = post.reactions?.summary.total_count ?? 0;
  const comments = post.comments?.summary.total_count ?? 0;
  const shares = post.shares?.count ?? 0;
  const hasEngagement = reactions > 0 || comments > 0 || shares > 0;

  return (
    <a
      href={post.permalink_url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 transition-colors hover:border-[#1877F2]/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1877F2]"
    >
      {/* Post image */}
      {post.full_picture && (
        <div className="relative h-44 w-full flex-shrink-0 overflow-hidden bg-zinc-900">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.full_picture}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          {/* Subtle gradient at bottom to blend into card */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-12"
            style={{ background: 'linear-gradient(to top,#09090b,transparent)' }}
            aria-hidden="true"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col p-4">
        {/* Date + source badge */}
        <div className="mb-2.5 flex items-center gap-2">
          <FbDot />
          <time
            dateTime={post.created_time}
            className="text-xs font-medium text-zinc-500"
          >
            {formatRelativeTime(post.created_time)}
          </time>
        </div>

        {/* Post text */}
        {text ? (
          <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-zinc-300">{text}</p>
        ) : (
          <p className="flex-1 text-sm italic text-zinc-600">Photo post</p>
        )}

        {/* Footer: engagement + view link */}
        <div className="mt-3 flex items-center justify-between border-t border-zinc-800 pt-3">
          {hasEngagement ? (
            <div className="flex items-center gap-3 text-xs text-zinc-500">
              {reactions > 0 && (
                <span className="flex items-center gap-1">
                  <LikeIcon />
                  {formatCount(reactions)}
                </span>
              )}
              {comments > 0 && (
                <span className="flex items-center gap-1">
                  <CommentIcon />
                  {comments}
                </span>
              )}
              {shares > 0 && (
                <span className="flex items-center gap-1">
                  <ShareIcon />
                  {shares}
                </span>
              )}
            </div>
          ) : (
            <span />
          )}

          <span className="text-xs font-semibold text-[#1877F2] transition-colors group-hover:text-[#4299FF]">
            View →
          </span>
        </div>
      </div>
    </a>
  );
}

function FbDot() {
  return (
    <span className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-[#1877F2]">
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="white" className="h-2.5 w-2.5">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    </span>
  );
}

function LikeIcon() {
  return (
    <svg aria-label="Reactions" viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5">
      <path d="M4.5 11.5a.5.5 0 01-.5-.5V5a.5.5 0 011 0v6a.5.5 0 01-.5.5zm2-9A.5.5 0 016 2h4a.5.5 0 01.354.146l2 2A.5.5 0 0112.5 4H10v1.5A.5.5 0 0110 6H6.5a.5.5 0 010-1H9.5V4H6a.5.5 0 01-.5-.5zM2 5.5A1.5 1.5 0 013.5 4h.5v7h-.5A1.5 1.5 0 012 9.5v-4zm10 0v4A1.5 1.5 0 0110.5 11H6V4h4.5A1.5 1.5 0 0112 5.5z" />
    </svg>
  );
}

function CommentIcon() {
  return (
    <svg aria-label="Comments" viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5">
      <path d="M2.678 11.894a1 1 0 01.287.801 10.97 10.97 0 01-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 01.71-.074A8.06 8.06 0 008 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 01-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 00.244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 01-2.347-.306c-.52.263-1.639.742-3.468 1.105z" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg aria-label="Shares" viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5">
      <path d="M13.5 1a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM11 2.5a2.5 2.5 0 11.603 1.628l-6.718 3.12a2.499 2.499 0 010 1.504l6.718 3.12a2.5 2.5 0 11-.488.876l-6.718-3.12a2.5 2.5 0 110-3.256l6.718-3.12A2.5 2.5 0 0111 2.5zm-8.5 4a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm11 5.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
    </svg>
  );
}
