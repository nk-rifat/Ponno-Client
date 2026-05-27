"use client";

const categories = [
  "Home Decor",
  "Lamps & Lighting",
  "Basket & Storage",
  "Birds Nest",
  "Gifts & Crafts",
  "Wall Decor",
  "Fashion Accessories",
  "Others",
];

const priceRanges = [
  "Under TK 200",
  "TK 200 - TK 500",
  "TK 500 - TK 1500",
  "Over TK 1500",
];

export default function FilterSidebar() {
  return (
    <aside>
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sticky top-24">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-stone-900">
            Filters
          </h3>

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
            {categories.map((category) => (
              <label
                key={category}
                className="flex items-center cursor-pointer"
              >
                <input
                  type="checkbox"
                  className="rounded border-stone-300 text-green-600 focus:ring-green-500 w-4 h-4"
                />

                <span className="ml-3 text-sm text-stone-600">
                  {category}
                </span>
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
                key={range}
                className="flex items-center cursor-pointer"
              >
                <input
                  type="radio"
                  name="price-range"
                  className="border-stone-300 text-green-600 focus:ring-green-500 w-4 h-4"
                />

                <span className="ml-3 text-sm text-stone-600">
                  {range}
                </span>
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