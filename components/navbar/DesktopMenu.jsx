"use client";

import Link from "next/link";
import {
  FaUser,
  FaSignOutAlt,
  FaCog,
  FaShoppingBag,
  FaUserCircle,
} from "react-icons/fa";
import { SearchAction } from "./SearchAction";
import { NavActions } from "./ShopActions";

export const DesktopMenu = ({ pathname, userOpen, setUserOpen, navLinks }) => {
  const menuItemClass =
    "flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors";

  const closeUserMenu = () => {
    setUserOpen(false);
  };
  return (
    <>
      {/* CENTER LINKS */}
      <div className="hidden md:flex items-center gap-4 lg:gap-8 font-medium text-base">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.label}
              href={link.href}
              className={`transition-all duration-200 py-2 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-green-600 after:transition-all after:duration-300 ${
                isActive
                  ? "text-green-600 font-semibold after:w-full"
                  : "text-gray-700 hover:text-green-600 after:w-0 hover:after:w-full"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>

      {/* RIGHT SIDE ACTIONS */}
      <div className="hidden md:flex items-center gap-2 lg:gap-4">
        <SearchAction />

        <NavActions cartCount={2} />

        {/* USER PROFILE DROPDOWN */}
        <div className="relative">
          <button
            onClick={() => setUserOpen(!userOpen)}
            className={`p-2 rounded-full transition-all duration-200 ${
              userOpen
                ? "bg-gray-100 text-green-600"
                : "text-gray-600 hover:text-green-600 hover:bg-gray-50"
            }`}
          >
            <FaUser className="text-lg" />
          </button>

          {userOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-100 rounded-xl shadow-xl py-1 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <Link
                href="/profile"
                className={menuItemClass}
                onClick={closeUserMenu}
              >
                <FaUserCircle className="text-gray-400 text-lg" /> My Profile
              </Link>
              <Link
                href="/orders"
                className={menuItemClass}
                onClick={closeUserMenu}
              >
                <FaShoppingBag className="text-gray-400 text-lg" /> My Orders
              </Link>
              <Link
                href="/settings"
                className={menuItemClass}
                onClick={closeUserMenu}
              >
                <FaCog className="text-gray-400 text-lg" /> Settings
              </Link>
              <hr className="my-1 border-gray-100" />
              <button
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors text-left"
                onClick={closeUserMenu}
              >
                <FaSignOutAlt className="text-lg" /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
