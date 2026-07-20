/* ═══════════════════════════════════════════════
   Facebook Graph API — data layer
   Revalidation: page info 1h, posts 15min
═══════════════════════════════════════════════ */

// ── Types ──────────────────────────────────────

export interface FacebookPost {
  id: string;
  message?: string;
  story?: string;
  created_time: string;
  full_picture?: string;
  permalink_url: string;
  reactions?: { summary: { total_count: number } };
  comments?: { summary: { total_count: number } };
  shares?: { count: number };
}

export interface FacebookPage {
  id: string;
  name: string;
  fan_count: number;
  followers_count?: number;
  picture?: { data: { url: string } };
  cover?: { source: string };
  phone?: string;
  about?: string;
}

export type FeedResult =
  | { ok: true; page: FacebookPage; posts: FacebookPost[] }
  | { ok: false; error: string };

// ── Formatting utilities ────────────────────────

export function formatRelativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(
    new Date(iso)
  );
}

export function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

// ── Graph API fetch ─────────────────────────────

const PAGE_ID = process.env.FACEBOOK_PAGE_ID ?? '61591429964266';
const GRAPH_BASE = 'https://graph.facebook.com/v19.0';

function buildUrl(path: string, params: Record<string, string>): string {
  const url = new URL(`${GRAPH_BASE}${path}`);
  url.searchParams.set('access_token', process.env.FACEBOOK_PAGE_ACCESS_TOKEN ?? '');
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  return url.toString();
}

async function apiFetch<T>(
  path: string,
  params: Record<string, string>,
  revalidate: number
): Promise<T> {
  const res = await fetch(buildUrl(path, params), { next: { revalidate } });
  const json = (await res.json()) as Record<string, unknown>;

  if (!res.ok || json['error']) {
    const fb = json['error'] as { message?: string } | undefined;
    throw new Error(fb?.message ?? `HTTP ${res.status}`);
  }
  return json as T;
}

// ── Public API ──────────────────────────────────

export async function fetchFeedData(postLimit = 6): Promise<FeedResult> {
  if (!process.env.FACEBOOK_PAGE_ACCESS_TOKEN) {
    return { ok: false, error: 'FACEBOOK_PAGE_ACCESS_TOKEN is not configured' };
  }

  try {
    const [page, postsEnvelope] = await Promise.all([
      apiFetch<FacebookPage>(
        `/${PAGE_ID}`,
        { fields: 'id,name,fan_count,followers_count,picture,cover,phone,about' },
        3_600
      ),
      apiFetch<{ data: FacebookPost[] }>(
        `/${PAGE_ID}/posts`,
        {
          fields: [
            'id',
            'message',
            'story',
            'created_time',
            'full_picture',
            'permalink_url',
            'reactions.summary(true)',
            'comments.summary(true)',
            'shares',
          ].join(','),
          limit: String(postLimit),
        },
        900
      ),
    ]);

    return { ok: true, page, posts: postsEnvelope.data };
  } catch (err) {
    const error = err instanceof Error ? err.message : 'Unknown Facebook API error';
    console.error('[FacebookFeed]', error);
    return { ok: false, error };
  }
}
