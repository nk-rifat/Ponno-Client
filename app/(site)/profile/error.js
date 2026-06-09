"use client";

import RouteError from "@/components/shared/RouteError";

export default function ProfileError({ error, reset }) {
  return (
    <RouteError
      badgeText="Profile Unavailable"
      heading="Can not load profile Data"
      message="We had trouble fetching Profile Data. It might be temporarily offline, or the link may have changed."
      error={error}
      onRetry={reset}
    />
  );
}
