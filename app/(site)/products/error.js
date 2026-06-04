"use client";

import RouteError from "@/components/shared/RouteError";


export default function ProductsError({ error, reset }) {
  return (
    <RouteError
      badgeText="Products Unavailable"
      heading="Can not load products"
      message="We had trouble fetching products. It might be temporarily offline, or the link may have changed."
      error={error}
      onRetry={reset}
    />
  );
}
