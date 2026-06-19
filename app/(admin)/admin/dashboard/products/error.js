"use client";

import RouteError from "@/components/shared/RouteError";

export default function ManageProductError({ error, reset }) {
  return (
    <RouteError
      badgeText="Product's Unavailable"
      heading="Can not load product's"
      message="We had trouble fetching product's. It might be temporarily offline, or the link may have changed."
      error={error}
      onRetry={reset}
    />
  );
}
