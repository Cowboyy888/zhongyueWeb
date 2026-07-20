import { fetchFeedData } from '@/lib/facebook';
import ErrorState from './ErrorState';
import PageCard from './PageCard';
import PostCard from './PostCard';

export default async function Feed() {
  const result = await fetchFeedData(6);

  if (!result.ok) {
    return <ErrorState error={result.error} />;
  }

  const { page, posts } = result;

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[340px_1fr]">
      {/* Page card — left column */}
      <PageCard page={page} />

      {/* Posts grid — right column */}
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center rounded-xl border border-zinc-800 bg-zinc-950 p-8 text-center text-sm text-zinc-500">
          No posts yet — check back soon.
        </div>
      )}
    </div>
  );
}
