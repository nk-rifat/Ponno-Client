"use client";

import RouteError from "@/components/shared/RouteError";



export default function ManageCustomerError({ error, reset }) {
  return (
    <RouteError
      badgeText="Customer's list Unavailable"
      heading="Can not load customer's list"
      message="We had trouble fetching customer's list. It might be temporarily offline, or the link may have changed."
      error={error}
      onRetry={reset}
    />
  );
}
