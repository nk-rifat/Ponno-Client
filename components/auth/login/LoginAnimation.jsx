"use client";

import Lottie from "lottie-react";
import loginAnimation from "@/components/animations/Login.json";

export default function LoginAnimation() {
  return (
    <>
      <Lottie animationData={loginAnimation} loop />
    </>
  );
}
