"use client";

import RouteError from "@/components/shared/RouteError";

export default function VerifyEmailError({ error, reset }) {
  return (
    <RouteError
      badgeText="Verification Failed"
      heading="Could not verify your email"
      message="We had trouble verifying your email. The link may have expired or already been used. Please request a new verification link."
      error={error}
      onRetry={reset}
    />
  );
}
