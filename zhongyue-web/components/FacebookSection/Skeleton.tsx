export default function FacebookSkeleton() {
  return (
    <div
      className="grid grid-cols-1 gap-8 lg:grid-cols-[340px_1fr]"
      aria-busy="true"
      aria-label="Loading Facebook feed"
    >
      {/* Page card skeleton */}
      <div className="animate-pulse overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950">
        <div className="h-32 bg-zinc-800" />
        <div className="px-5 pb-5">
          <div className="-mt-8 mb-4">
            <div className="h-16 w-16 rounded-full border-2 border-zinc-950 bg-zinc-700" />
          </div>
          <div className="h-5 w-3/4 rounded bg-zinc-800" />
          <div className="mt-2 h-3 w-1/2 rounded bg-zinc-800" />
          <div className="mt-4 h-7 w-24 rounded bg-zinc-800" />
          <div className="mt-5 space-y-2">
            <div className="h-10 rounded-md bg-zinc-800" />
            <div className="h-10 rounded-md bg-zinc-800" />
          </div>
          <div className="mt-5 space-y-3 border-t border-zinc-800 pt-4">
            <div className="h-3.5 w-2/3 rounded bg-zinc-800" />
            <div className="h-3.5 w-1/2 rounded bg-zinc-800" />
            <div className="h-3.5 w-3/4 rounded bg-zinc-800" />
          </div>
        </div>
      </div>

      {/* Posts grid skeleton */}
      <div className="grid gap-4 sm:grid-cols-2">
        {Array.from({ length: 6 }, (_, i) => (
          <div
            key={i}
            className="animate-pulse overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="h-44 bg-zinc-800" />
            <div className="space-y-2 p-4">
              <div className="h-3 w-16 rounded bg-zinc-800" />
              <div className="h-3 w-full rounded bg-zinc-800" />
              <div className="h-3 w-4/5 rounded bg-zinc-800" />
              <div className="h-3 w-3/5 rounded bg-zinc-800" />
              <div className="mt-3 flex justify-between border-t border-zinc-800 pt-3">
                <div className="h-3 w-20 rounded bg-zinc-800" />
                <div className="h-3 w-10 rounded bg-zinc-800" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
