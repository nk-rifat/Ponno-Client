"use client";

import { useCallback, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { categories } from "@/data/categories";

const ProductFilters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [search, setSearch] = useState(searchParams.get("search") || "");

  const updateParams = useCallback(
    (key, value) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      params.delete("page");
      router.push(`${pathname}?${params.toString()}`);
    },
    [searchParams, pathname, router],
  );

  const debouncedSearch = useDebouncedCallback((value) => {
    updateParams("search", value);
  }, 400);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    debouncedSearch(e.target.value);
  };

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Search
          </label>
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={handleSearchChange}
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-600 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
            <i className="fas fa-search absolute left-3 top-3 text-gray-500" />
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Category
          </label>
          <select
            value={searchParams.get("category") || ""}
            onChange={(e) => updateParams("category", e.target.value)}
            className="w-full px-3 py-2 bg-slate-900 border border-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="">All Categories</option>
            {Object.entries(categories).map(([slug, label]) => (
              <option key={slug} value={label}>
                {label}
              </option>
            ))}
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Status
          </label>
          <select
            value={searchParams.get("status") || ""}
            onChange={(e) => updateParams("status", e.target.value)}
            className="w-full px-3 py-2 bg-slate-900 border border-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="">All Status</option>
            <option value="out-of-stock">Out of Stock</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;
