"use client";

export default function SortSelect() {
  return (
    <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white text-gray-700">
      <option>Sort by: Featured</option>
      <option>Price: Low to High</option>
      <option>Price: High to Low</option>
      <option>Newest First</option>
      <option>Rating</option>
    </select>
  );
}
