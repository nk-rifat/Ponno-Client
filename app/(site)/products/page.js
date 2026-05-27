import ProductGrid from "@/components/products/ProductGrid";
import { getProducts } from "@/lib/products";

const ProductsPage = async () => {
  const products = await getProducts();

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">All Products</h1>

      <ProductGrid products={products} />
    </section>
  );
};

export default ProductsPage;
