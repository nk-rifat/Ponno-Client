"use client";

import { uniqueItemQty } from "@/store/cartSlice";
import Link from "next/link";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";

export const NavActions = () => {
  const cartCount = useSelector(uniqueItemQty);
  return (
    <>
      {/* Wishlist */}
      <Link
        href="/wishlist"
        prefetch={false}
        className={`p-2 text-gray-600 rounded-full transition-colors hover:text-red-500`}
      >
        <FaHeart className="text-xl" />
      </Link>

      {/* Cart */}
      <Link
        href="/cart"
        prefetch={false}
        className={`p-2 text-gray-600 rounded-full transition-colors hover:text-green-600 relative`}
      >
        <FaShoppingCart className="text-xl" />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-green-600 text-white text-[10px] h-4 w-4 flex items-center justify-center rounded-full">
            {cartCount}
          </span>
        )}
      </Link>
    </>
  );
};
