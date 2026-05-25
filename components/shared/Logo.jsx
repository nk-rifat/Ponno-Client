"use client";

import Link from "next/link";
import Image from "next/image";

export const Logo = () => {
  return (
    <Link
      href="/"
      className="flex items-center"
      aria-label="Go to homepage"
    >
      <Image
        src="/ponno.png"
        alt="Ponno Logo"
        width={180}
        height={60}
        priority
        className="h-10 sm:h-10 md:h-12 w-auto mt-1"
      />

      <span className="sr-only">Ponno</span>
    </Link>
  );
};