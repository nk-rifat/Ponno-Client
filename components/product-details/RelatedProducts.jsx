import ProductCard from "../products/ProductCard";

const RelatedProducts = ({ products = [] }) => {
  return (
    <div className="max-w-7xl mx-auto mt-12">
      <h2 className="text-2xl font-bold mb-6 mx-3">Related Products</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5 mx-3 mb-5">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
