"use client";

import RouteError from "@/components/shared/RouteError";

export default function ProductsError({ error, reset }) {
  return (
    <RouteError
      badgeText="Product Unavailable"
      heading="Can not load this product"
      message="We had trouble fetching this product. It might be temporarily offline, or the link may have changed."
      error={error}
      onRetry={reset}
    />
  );
}
