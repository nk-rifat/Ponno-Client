import ProductCard from "./ProductCard";

const ProductGrid = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3 lg:gap-6">
      {!products || products.length === 0 ? (
        <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
          <h2 className="text-2xl font-semibold text-gray-700">
            No Products Found
          </h2>
          <p className="text-gray-500 mt-2">
            Try changing your category or price filter
          </p>
        </div>
      ) : (
        products?.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))
      )}
    </div>
  );
};

export default ProductGrid;
