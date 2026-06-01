import Link from "next/link";
import ProductCard from "@/components/products/ProductCard";
import { getFeaturedProducts } from "@/lib/products";

const FeaturedProducts = async () => {
  const { data: products } = await getFeaturedProducts();

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-emerald-800">New Products</h2>
          <p className="text-gray-500 max-w-50 md:max-w-2xl mt-2">
            Explore our latest handcrafted collections.
          </p>
        </div>

        <Link href="/products" className="font-semibold text-emerald-600 hover:text-emerald-800">
          View All Products →
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
