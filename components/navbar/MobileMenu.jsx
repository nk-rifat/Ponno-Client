"use client";

import Link from "next/link";
import {
  FaBars,
  FaTimes,
  FaUser,
  FaSignOutAlt,
  FaBoxOpen,
  FaTachometerAlt,
} from "react-icons/fa";
import { NavActions } from "./ShopActions";
import { CategoryLinks } from "./CategoryLinks";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export const MobileMenu = ({ pathname, menuOpen, setMenuOpen, navLinks }) => {
  const [catOpen, setCatOpen] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();
  const handleLogOut = async () => {
    try {
      await logout();
      setMenuOpen(false);
    } finally {
      router.replace("/");
    }
  };
  return (
    <>
      {/* MOBILE HEADER BUTTONS */}
      <div className="flex md:hidden items-center gap-2">
        <NavActions cartCount={2} />

        <button
          className="text-lg p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors ml-1"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* MOBILE DRAWER SYSTEM */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full md:hidden border-t border-gray-100 bg-white/95 backdrop-blur-md px-4 pt-3 pb-6 flex flex-col gap-4 shadow-inner animate-in fade-in slide-in-from-top-1 duration-200">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              // Categories accordion
              if (link.type === "dropdown") {
                return (
                  <div key={link.label}>
                    <button
                      onClick={() => setCatOpen(!catOpen)}
                      className="w-full flex justify-between px-3 py-2.5 font-medium rounded-lg text-gray-700 hover:bg-gray-50"
                    >
                      Categories
                      <span>{catOpen ? "−" : "+"}</span>
                    </button>

                    {catOpen && (
                      <div className="ml-3 mt-1 flex flex-col gap-1">
                        <CategoryLinks onClick={() => setMenuOpen(false)} />
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  prefetch={false}
                  className={`px-3 py-2.5 font-medium rounded-lg transition-all ${
                    isActive
                      ? "bg-green-50 text-green-600"
                      : "text-gray-700 hover:bg-gray-50 hover:text-green-600"
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <hr className="border-gray-100" />

          <div className="grid grid-cols-2 gap-2">
            {user?.isVerified ? (
              <>
                <Link
                  href="/profile"
                  prefetch={false}
                  className="flex items-center justify-center gap-2 py-2.5 border border-gray-200 text-gray-700 rounded-xl text-sm font-medium hover:bg-green-100"
                  onClick={() => setMenuOpen(false)}
                >
                  <FaUser /> Profile
                </Link>

                {user.role === "admin" ? (
                  <Link
                    href="/admin/dashboard"
                    prefetch={false}
                    className="flex items-center justify-center gap-2 py-2.5 border border-gray-200 text-gray-700 rounded-xl text-sm font-medium hover:bg-green-100"
                    onClick={() => setMenuOpen(false)}
                  >
                    <FaTachometerAlt /> Dashboard
                  </Link>
                ) : (
                  <Link
                    href="/orders/my-orders"
                    prefetch={false}
                    className="flex items-center justify-center gap-2 py-2.5 border border-gray-200 text-gray-700 rounded-xl text-sm font-medium hover:bg-green-100"
                    onClick={() => setMenuOpen(false)}
                  >
                    <FaBoxOpen /> My Orders
                  </Link>
                )}

                <button
                  className="col-span-2 flex items-center justify-center gap-2 py-2.5 border border-red-100 text-red-600 bg-red-50/50 rounded-xl text-sm font-medium hover:bg-red-50"
                  onClick={handleLogOut}
                >
                  <FaSignOutAlt /> Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="col-span-2 flex items-center justify-center gap-2 py-2.5 border border-green-300 text-gray-800 bg-white/8 rounded-xl text-sm font-medium hover:bg-green-50"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
};
