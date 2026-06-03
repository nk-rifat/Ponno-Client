export default function Loading() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-white">
      {/* Background blur orbs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-20 -left-20 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-300/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Top Spinner Section */}
        <div className="flex flex-col items-center justify-center mb-10">
          <div className="relative mb-6 flex h-20 w-20 items-center justify-center">
            <span className="absolute inset-0 rounded-full border-4 border-emerald-100" />
            <span className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-emerald-500" />
            <span className="h-3 w-3 animate-pulse rounded-full bg-emerald-500" />
          </div>

          <div className="flex items-center gap-4">
            <div className="h-px w-12 bg-gray-300" />
            <span className="text-xs font-medium uppercase tracking-widest text-gray-400">
              Ponno
            </span>
            <div className="h-px w-12 bg-gray-300" />
          </div>

          <h2 className="mt-4 text-xl font-bold text-gray-800">
            Loading product...
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Getting product details for you.
          </p>
        </div>

        {/* PRODUCT SKELETON */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* LEFT: IMAGE */}
          <div className="animate-pulse">
            <div className="h-105 w-full rounded-2xl bg-gray-200" />

            <div className="mt-4 flex gap-3">
              <div className="h-20 w-20 rounded-xl bg-gray-200" />
              <div className="h-20 w-20 rounded-xl bg-gray-200" />
            </div>
          </div>

          {/* RIGHT: INFO */}
          <div className="space-y-6 animate-pulse">
            {/* Title */}
            <div className="h-7 w-3/4 rounded-full bg-gray-200" />

            {/* Rating */}
            <div className="h-4 w-1/3 rounded-full bg-gray-200" />

            {/* Price */}
            <div className="h-8 w-1/2 rounded-full bg-emerald-200" />

            {/* Description */}
            <div className="space-y-2">
              <div className="h-3 w-full rounded-full bg-gray-200" />
              <div className="h-3 w-5/6 rounded-full bg-gray-200" />
              <div className="h-3 w-2/3 rounded-full bg-gray-200" />
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <div className="h-12 w-44 rounded-xl bg-emerald-200" />
              <div className="h-12 w-44 rounded-xl bg-emerald-200" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
