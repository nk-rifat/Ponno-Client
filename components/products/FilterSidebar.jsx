"use client";
import { categories } from "@/lib/categories";
import { useSearchParams , useRouter} from "next/navigation";
const priceRanges = [
  "Under TK 200",
  "TK 200 - TK 500",
  "TK 500 - TK 1500",
  "Over TK 1500",
];

export default function FilterSidebar({ selectedCategory }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (slug) => {
    const params = new URLSearchParams(searchParams.toString());

    if (selectedCategory === slug) {
      params.delete("category");
    } else {
      params.set("category", slug);
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
                  checked={selectedCategory === slug}
                  onChange={() => handleChange(slug)}
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
              <label key={range} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="price-range"
                  className="border-stone-300 text-green-600 focus:ring-green-500 w-4 h-4"
                />

                <span className="ml-3 text-sm text-stone-600">{range}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Apply Button */}
        <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl text-sm font-medium transition-colors">
          Apply Filters
        </button>
      </div>
    </aside>
  );
}
