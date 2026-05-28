import Link from "next/link";
import Image from "next/image";
import { homeCategories } from "./categoryData";

const CategoryGrid = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-stone-900">
      
      <div className="border-b border-stone-200 pb-3 mb-8 text-center">
        <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-amber-800">
          Handcrafted Collections
        </span>
        <h2 className="text-3xl sm:text-4xl md:5xl lg:6xl font-semibold text-stone-950 tracking-tight mt-0.5">
          Shop by Category
        </h2>
      </div>

      {/* Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[190px]">
        {homeCategories.map((category) => (
          <Link
            key={category.id}
            href={`/products?category=${category?.slug}`}
           
            className={`group relative w-full overflow-hidden rounded-xl border flex items-center justify-center transition-all duration-500 hover:border-amber-500/30 hover:shadow-[0_10px_25px_rgba(139,92,26,0.06)] md:row-span-1 ${category.gridClass}`}
          >
            <div className="absolute inset-0 z-0 w-full h-full">
              <Image
                src={category?.imageUrl}
                alt={category?.name}
                fill
                sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-stone-900/10 transition-opacity duration-500 group-hover:bg-stone-900/5" />
            </div>

            <div className="relative z-10 px-5 py-3 mx-4 rounded-lg border border-green-950/40 bg-white/60 backdrop-blur-md text-center max-w-[85%] shadow-xs transition-all duration-500 ease-out group-hover:bg-white/95 group-hover:border-amber-600/40 group-hover:scale-105 group-hover:shadow-sm">
              <h3 className="text-base sm:text-lg font-light tracking-wide text-stone-900 transition-colors duration-300 group-hover:text-amber-900">
                {category?.name}
              </h3>
              <div className="h-px w-0 bg-amber-600 mx-auto mt-1 transition-all duration-500 ease-out group-hover:w-full" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;