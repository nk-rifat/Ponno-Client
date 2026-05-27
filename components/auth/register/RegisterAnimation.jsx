"use client";

import Lottie from "lottie-react";
import registrationAnimation from "@/components/animations/formRegistration.json";

export default function RegisterAnimation() {
  return (
    <>
      <Lottie animationData={registrationAnimation} loop />
    </>
  );
}
