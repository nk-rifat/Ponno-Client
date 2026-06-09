"use client";

import RouteError from "@/components/shared/RouteError";

export default function CartError({ error, reset }) {
  return (
    <RouteError
      badgeText="Cart Items Unavailable"
      heading="Can not load Cart Items"
      message="We had trouble fetching cart items. It might be temporarily offline, or the link may have changed."
      error={error}
      onRetry={reset}
    />
  );
}
