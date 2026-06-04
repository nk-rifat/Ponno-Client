"use client";

import Link from "next/link";
import { useEffect } from "react";
import { HiHome, HiArrowPath } from "react-icons/hi2";
import { BsExclamationCircle } from "react-icons/bs";

export default function RouteError({
  badgeText = "Error Details",
  heading = "Something went wrong",
  message = "We had trouble loading this page. It might be temporarily offline.",
  error,
  onRetry,
}) {
  useEffect(() => {
    if (error) {
      console.error("Application Error:", error);
    }
  }, [error]);

  return (
    <main className="relative min-h-[75vh] flex items-center justify-center overflow-hidden bg-base-100 py-16 px-4">
      <div className="w-full max-w-2xl text-center">
        {/* Subtle Dynamic Tag/Badge */}
        <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-3 py-1 text-xs font-medium text-rose-600 dark:bg-rose-950/50 dark:text-rose-400">
          <span className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-pulse" />
          {badgeText}
        </span>

        {/* Dynamic Heading */}
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-base-content sm:text-5xl">
          {heading}
        </h1>

        {/* Dynamic Description */}
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-base-content/60">
          {message}
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          {onRetry && (
            <button
              onClick={onRetry}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-rose-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-rose-600 hover:shadow-md active:scale-95 sm:w-auto"
            >
              <HiArrowPath className="h-4 w-4" aria-hidden="true" />
              Reload Page
            </button>
          )}
        </div>

        {/* Quick helpful links for shoppers */}
        <div className="mx-auto mt-10 max-w-md rounded-2xl bg-base-200/40 p-4 dark:bg-base-200/20">
          <p className="text-xs font-semibold uppercase tracking-wider text-base-content/40">
            Need help finding something else?
          </p>
          <div className="mt-3 flex justify-center gap-6 text-sm">
            <Link
              href="/"
              className="inline-flex items-center gap-1 font-medium text-rose-500 hover:underline"
            >
              <HiHome className="h-4 w-4" /> Home
            </Link>
          </div>
        </div>

        {/* Collapsible Technical Error Accordion */}
        <details className="group mt-8 text-left">
          <summary className="flex cursor-pointer select-none items-center justify-center gap-1 text-xs font-medium text-base-content/30 hover:text-base-content/50 transition-colors">
            <span>Technical diagnostics</span>
            <span className="transition-transform group-open:rotate-180">
              ▼
            </span>
          </summary>

          <div className="mt-3 rounded-xl border border-base-200 bg-base-200/30 p-4 backdrop-blur-sm dark:border-base-300/20">
            <div className="flex items-start gap-3">
              <BsExclamationCircle className="mt-0.5 h-4 w-4 shrink-0 text-base-content/40" />
              <div>
                <h4 className="text-xs font-semibold text-base-content/60">
                  Logged Error Reference
                </h4>
                <p className="mt-1 font-mono text-[11px] leading-normal text-base-content/40 break-all">
                  {error?.message || "ERR_FETCH_FAILED"}
                </p>
              </div>
            </div>
          </div>
        </details>
      </div>
    </main>
  );
}
