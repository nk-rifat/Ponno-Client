"use client";

import Link from "next/link";
import { FaBars, FaTimes, FaUser, FaSignOutAlt } from "react-icons/fa";
import { NavActions } from "./ShopActions";

export const MobileMenu = ({ pathname, menuOpen, setMenuOpen, navLinks }) => {
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
              return (
                <Link 
                  key={link.label}
                  href={link.href}
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
            <Link 
              href="/profile" 
              className="flex items-center justify-center gap-2 py-2.5 border border-gray-200 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50"
              onClick={() => setMenuOpen(false)}
            >
              <FaUser /> Profile
            </Link>
            <button 
              className="flex items-center justify-center gap-2 py-2.5 border border-red-100 text-red-600 bg-red-50/50 rounded-xl text-sm font-medium hover:bg-red-50"
              onClick={() => setMenuOpen(false)}
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>
      )}
    </>
  );
};