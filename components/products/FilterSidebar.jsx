"use client";
import { categories } from "@/lib/categories";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

const priceRanges = [
  { label: "Under 200", value: "0-200" },
  { label: "200 - 500", value: "200-500" },
  { label: "500 - 1500", value: "500-1500" },
  { label: "1500+", value: "1500+" },
];

export default function FilterSidebar({ selectedCategory, selectedPrice }) {
  
  const router = useRouter();

  const [category, setCategory] = useState(selectedCategory);
  const [price, setPrice] = useState(selectedPrice);

  // price & category handle
  const handleCategory = (slug) => {
    setCategory(slug);
  };
  const handlePrice = (value) => {
    setPrice(value);
  };

  // apply filter
  const applyFilters = () => {
    const params = new URLSearchParams();

    if (category) {
      params.set("category", category);
    } else {
      params.delete("category");
    }

    if (price) {
      params.set("price", price);
    } else {
      params.delete("price");
    }

    router.push(`/products?${params.toString()}`);
  };

  return (
    <aside>
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sticky top-24">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-stone-900">Filters</h3>

          <button className="text-sm text-green-600 hover:text-green-700 font-medium transition">
            Reset
          </button>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <h4 className="text-sm font-semibold text-stone-900 mb-4">
            Categories
          </h4>

          <div className="space-y-3">
            {Object.entries(categories).map(([slug, name]) => (
              <label key={slug} className="flex items-center cursor-pointer">
                <input
                  checked={category === slug}
                  onChange={() => handleCategory(slug)}
                  type="checkbox"
                  className="rounded border-stone-300 text-green-600 focus:ring-green-500 w-4 h-4"
                />

                <span className="ml-3 text-sm text-stone-600">{name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="mb-8">
          <h4 className="text-sm font-semibold text-stone-900 mb-4">
            Price Range
          </h4>

          <div className="space-y-3">
            {priceRanges.map((range) => (
              <label
                key={range?.label}
                className="flex items-center cursor-pointer"
              >
                <input
                  checked={price === range.value}
                  onChange={() => handlePrice(range.value)}
                  type="radio"
                  name="price-range"
                  className="border-stone-300 text-green-600 focus:ring-green-500 w-4 h-4"
                />

                <span className="ml-3 text-sm text-stone-600">
                  {range?.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Apply Button */}
        <button onClick={applyFilters} className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl text-sm font-medium transition-colors">
          Apply Filters
        </button>
      </div>
    </aside>
  );
}
