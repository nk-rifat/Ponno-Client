"use client";

import RouteError from "@/components/shared/RouteError";

export default function CheckoutError({ error, reset }) {
  return (
    <RouteError
      badgeText="Checkout Unavailable"
      heading="Can not load Checkout Items"
      message="We had trouble fetching checkout items. It might be temporarily offline, or the link may have changed."
      error={error}
      onRetry={reset}
    />
  );
}
