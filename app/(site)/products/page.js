import FilterSidebar from "@/components/products/FilterSidebar";
import ProductGrid from "@/components/products/ProductGrid";
import SortSelect from "@/components/products/SortSelect";
import { getProducts } from "@/lib/products";
import Pagination from "@/components/shared/Pagination";
import { categories } from "@/data/categories";

const ProductsPage = async ({ searchParams }) => {
  const params = await searchParams;
  const categorySlug = params?.category;
  const price = params?.price;
  const sort = params?.sort;
  const page = Number(params?.page || 1);

  const category = categorySlug ? categories[categorySlug] : null;

  const data = await getProducts({ category, price, sort, page });

  const products = data.data;
  const totalPages = data.pages;

  return (
    <main>
      <div className="w-full bg-linear-to-br from-emerald-900 via-green-950 to-stone-900 text-white py-12 md:py14 px-2 text-center border-b border-green-700/30">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
          All Products
        </h1>
        <p className="text-sm md:text-lg text-green-100/90 font-light leading-relaxed">
          Discover beautiful, locally-sourced bamboo, cane, and jute heritage <br/>
          crafts handmade with precision by our trusted traditional artisans.
        </p>
      </div>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 lg:gap-8">
          <FilterSidebar
            selectedCategory={categorySlug}
            selectedPrice={price}
          />
          <div className="md:col-span-3">
            <div className="flex justify-end mb-3">
              <SortSelect />
            </div>
            <div>
              <ProductGrid products={products} />
              <Pagination totalPages={totalPages}/>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProductsPage;
