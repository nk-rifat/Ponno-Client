import Link from "next/link";
import { HiHome } from "react-icons/hi";
import { HiShoppingBag } from "react-icons/hi2";
import { TbMapOff } from "react-icons/tb";
import { BsCart3 } from "react-icons/bs";

export default function NotFound() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-base-100">
      {/* Background blur orbs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-20 -left-20 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-300/8 blur-3xl" />
      </div>

      <div className="container mx-auto flex min-h-screen items-center justify-center px-4 py-16">
        <div className="w-full max-w-xl text-center">
          {/* Icon badge */}
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950">
            <TbMapOff
              className="h-8 w-8 text-emerald-600 dark:text-emerald-400"
              aria-hidden="true"
            />
          </div>

          {/* 404 number */}
          <h1 className="text-8xl font-black leading-none tracking-tight text-emerald-600 md:text-9xl">
            404
          </h1>

          {/* Title */}
          <h2 className="mt-4 text-2xl font-bold text-base-content md:text-4xl">
            Page not found
          </h2>

          {/* Description */}
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-base-content/60">
            This page doesn&apos;t exist or may have been moved. Let&apos;s get
            you back to something great.
          </p>

          {/* Action buttons */}
          <div className="flex flex-col items-center justify-center mt-4 gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-emerald-700 hover:shadow-md hover:shadow-emerald-200 active:scale-95 dark:hover:shadow-emerald-900"
            >
              <HiHome className="h-4 w-4" aria-hidden="true" />
              Back home
            </Link>

            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-xl border border-emerald-300 bg-white px-6 py-3 text-sm font-semibold text-emerald-700 shadow-sm transition-all duration-200 hover:bg-emerald-50 active:scale-95 dark:border-emerald-700 dark:bg-base-200 dark:text-emerald-400 dark:hover:bg-emerald-950"
            >
              <HiShoppingBag className="h-4 w-4" aria-hidden="true" />
              Shop now
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
