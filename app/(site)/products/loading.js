export default function Loading() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-base-100">
      {/* Background blur orbs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-20 -left-20 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-300/10 blur-3xl" />
      </div>

      <div className="container mx-auto flex min-h-screen flex-col items-center justify-center px-4 py-16">
        {/* Spinner */}
        <div className="relative mb-8 flex h-20 w-20 items-center justify-center">
          <span className="absolute inset-0 rounded-full border-4 border-emerald-100" />
          <span className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-emerald-500" />
          <span className="h-3 w-3 animate-pulse rounded-full bg-emerald-500" />
        </div>

        {/* Brand */}
        <div className="mb-6 flex items-center gap-4">
          <div className="h-px w-12 bg-base-300" />
          <span className="text-xs font-medium uppercase tracking-widest text-base-content/30">
            Ponno
          </span>
          <div className="h-px w-12 bg-base-300" />
        </div>

        {/* Text */}
        <h2 className="text-xl font-bold text-base-content">Hang tight...</h2>
        <p className="mt-2 text-sm text-base-content/50">
          We&apos;re loading the page for you.
        </p>

        {/* Skeleton cards */}
        <div className="mt-12 grid w-full max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-base-200 bg-base-200/50 p-4 backdrop-blur-sm animate-pulse"
            >
              <div className="mb-3 h-24 w-full rounded-xl bg-base-300" />
              <div className="mb-2 h-3 w-3/4 rounded-full bg-base-300" />
              <div className="h-3 w-1/2 rounded-full bg-base-300" />
              <div className="mt-3 h-4 w-1/3 rounded-full bg-emerald-200/60" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
