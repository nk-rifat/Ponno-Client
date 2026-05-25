"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { DesktopMenu } from "./DesktopMenu";
import { MobileMenu } from "./MobileMenu";
import { Logo } from "../shared/Logo";

const Navbar = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Categories", href: "/categories" },
    { label: "Materials", href: "/materials" },
    { label: "About Us", href: "/about" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-100 z-50">
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16 relative">
        {/* Logo */}
        <Logo />

        <DesktopMenu
          pathname={pathname}
          userOpen={userOpen}
          setUserOpen={setUserOpen}
          navLinks={navLinks}
        />

        <MobileMenu
          pathname={pathname}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          navLinks={navLinks}
        />
      </div>
    </nav>
  );
};

export default Navbar;
