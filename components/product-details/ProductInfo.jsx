import { FaStar } from "react-icons/fa";

const ProductInfo = ({ product }) => {
  if (!product) return null;

  const {
    productName,
    price,
    discountPrice,
    stock,
    averageRating = 0,
    totalReviews = 0,
  } = product;

  return (
    <div className="space-y-4">
      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-bold text-emerald-700">
        {productName}
      </h1>

      {/* Rating */}
      {totalReviews > 0 ? (
        <div className="flex items-center gap-2 text-yellow-500">
          <FaStar />
          <span className="text-gray-700 font-medium">{averageRating}</span>
          <span className="text-gray-400 text-sm">
            ({totalReviews} {totalReviews === 1 ? "review" : "reviews"})
          </span>
        </div>
      ) : (
        <p className="text-sm text-gray-400">No reviews yet</p>
      )}

      {/* Price */}
      <div className="flex items-end gap-2">
        <span className="text-2xl md:text-3xl font-bold text-green-600">
          Tk {discountPrice || price}
        </span>

        {discountPrice && (
          <span className="text-gray-400 line-through">Tk{price}</span>
        )}
      </div>

      {/* Stock */}
      <p className="text-sm text-gray-600 font-semibold">
        {stock > 0 ? `In Stock: ${stock}` : "Out of Stock"}
      </p>
    </div>
  );
};

export default ProductInfo;
