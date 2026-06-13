"use client";

import RouteError from "@/components/shared/RouteError";



export default function MyOrderError({ error, reset }) {
  return (
    <RouteError
      badgeText="Order Items Unavailable"
      heading="Can not load Order Items"
      message="We had trouble fetching order items. It might be temporarily offline, or the link may have changed."
      error={error}
      onRetry={reset}
    />
  );
}
