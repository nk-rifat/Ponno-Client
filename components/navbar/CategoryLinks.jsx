import Link from "next/link";
import { categories } from "@/data/categories";

export const CategoryLinks = ({ onClick }) => {
  return (
    <>
      {Object.entries(categories).map(([slug, name]) => (
        <Link
          key={slug}
          href={`/products?category=${slug}`}
          prefetch={false}
          onClick={onClick}
          className="px-3 py-2 text-sm rounded-lg text-gray-600 hover:bg-gray-50 hover:text-green-600 transition-colors"
        >
          {name}
        </Link>
      ))}
    </>
  );
};
