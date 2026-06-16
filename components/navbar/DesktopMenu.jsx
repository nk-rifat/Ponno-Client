"use client";

import Link from "next/link";
import {
  FaSignOutAlt,
  FaShoppingBag,
  FaUserCircle,
  FaTachometerAlt,
} from "react-icons/fa";
import { SearchAction } from "./SearchAction";
import { NavActions } from "./ShopActions";
import { CategoryLinks } from "./CategoryLinks";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getInitials } from "@/utils/getInitials";

export const DesktopMenu = ({ pathname, userOpen, setUserOpen, navLinks }) => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const menuItemClass =
    "flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-green-100 transition-colors";

  const fullName = `${user?.firstName} ${user?.lastName}`;

  const closeUserMenu = () => {
    setUserOpen(false);
  };

  const handleLogOut = async () => {
    try {
      await logout();
      closeUserMenu();
    } finally {
      router.replace("/");
    }
  };
  return (
    <>
      {/* CENTER LINKS */}
      <div className="hidden md:flex items-center gap-4 lg:gap-8 font-medium text-base">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;

          // Categories dropdown

          if (link.type === "dropdown") {
            return (
              <div key={link.label} className="relative group">
                <span className="cursor-pointer py-2 text-gray-700 hover:text-green-600 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-green-600 after:transition-all after:duration-300 after:w-0 group-hover:after:w-full">
                  Categories
                </span>

                <div className="absolute left-0 top-full mt-3 w-80 bg-white rounded-xl  p-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="grid grid-cols-2 gap-2">
                    <CategoryLinks />
                  </div>
                </div>
              </div>
            );
          }

          return (
            <Link
              key={link.label}
              href={link.href}
              prefetch={false}
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

        {user?.isVerified ? (
          <div className="relative">
            <button
              onClick={() => setUserOpen(!userOpen)}
              className={`p-2 rounded-full transition-all duration-200 ${
                userOpen
                  ? "bg-gray-100 text-green-600"
                  : "text-gray-600 hover:text-green-600 hover:bg-gray-50"
              }`}
            >
              {user?.profilePic ? (
                <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-gray-200 hover:ring-gray-400 transition-all duration-200">
                  <Image
                    src={user?.profilePic}
                    alt="Profile"
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-full h-full bg-emerald-800 flex items-center justify-center text-white font-bold text-base px-2 py-1.5 rounded-full  hover:bg-emerald-700 ">
                  {getInitials(fullName)}
                </div>
              )}
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

                {user.role === "admin" ? (
                  <Link
                    href="/admin/dashboard"
                    className={menuItemClass}
                    onClick={closeUserMenu}
                  >
                    <FaTachometerAlt className="text-gray-400 text-lg" />{" "}
                    Dashboard
                  </Link>
                ) : (
                  <Link
                    href="/orders/my-orders"
                    className={menuItemClass}
                    onClick={closeUserMenu}
                  >
                    <FaShoppingBag className="text-gray-400 text-lg" /> My
                    Orders
                  </Link>
                )}

                <hr className="my-1 border-gray-100" />
                <button
                  onClick={handleLogOut}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors text-left"
                >
                  <FaSignOutAlt className="text-lg" /> Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            href="/login"
            className="flex items-center justify-center gap-2 py-2 px-5 border text-white bg-green-600 rounded-xl text-sm font-semibold"
          >
            Login
          </Link>
        )}
      </div>
    </>
  );
};
