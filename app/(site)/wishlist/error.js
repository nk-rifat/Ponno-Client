"use client";

import RouteError from "@/components/shared/RouteError";

export default function WishlistError({ error, reset }) {
  return (
    <RouteError
      badgeText="Wishlist Items Unavailable"
      heading="Can not load Wishlist Items"
      message="We had trouble fetching wishlist items. It might be temporarily offline, or the link may have changed."
      error={error}
      onRetry={reset}
    />
  );
}
