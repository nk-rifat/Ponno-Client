"use client";

import { FaSearch } from "react-icons/fa";

export const SearchAction = () => {
  return (
    <div className="relative hidden  lg:flex items-center group">
      <FaSearch className="absolute left-3 text-amber-400 group-focus-within:text-green-600 transition-colors" />
      <input
        type="text"
        placeholder="Search products..."
        className="pl-9 pr-4 py-1.5 bg-gray-50 border border-amber-300 rounded-full text-sm outline-none w-36 lg:w-46 focus:w-46 lg:focus:w-56 focus:bg-white focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all duration-300"
      />
    </div>
  );
};
