import ProductGrid from "@/components/products/ProductGrid";
import { getProducts } from "@/lib/products";

const ProductsPage = async () => {
  const products = await getProducts();

  return (
    <main>
      <div className="w-full bg-[#16A34A] text-white py-12 md:py14 px-2 text-center border-b border-green-700/30">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
          All Products
        </h1>
        <p className="text-sm md:text-lg text-green-100/90 font-light leading-relaxed">
          Discover beautiful, locally-sourced bamboo, cane, and jute heritage
          crafts handmade with precision by our trusted traditional artisans.
        </p>
      </div>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <ProductGrid products={products} />
      </section>
    </main>
  );
};

export default ProductsPage;
