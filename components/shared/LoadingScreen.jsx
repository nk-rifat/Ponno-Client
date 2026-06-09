export default function LoadingScreen({ pageName = "" }) {
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

        {/* Dynamic Text */}
        <h2 className="text-xl font-bold text-base-content">Hang tight...</h2>
        <p className="mt-2 text-sm text-base-content/50">
          We are loading the <span className="capitalize">{pageName}</span> page
          for you.
        </p>
      </div>
    </main>
  );
}
