import { FaStar, FaMapMarkerAlt } from "react-icons/fa";

const ProductInfo = ({ product }) => {
  if (!product) return null;

  const { productName, price, discountPrice, stock} =
    product;

  return (
    <div className="space-y-4 mx-3">
      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-900">
        {productName}
      </h1>

      {/* Rating */}
      <div className="flex items-center gap-2 text-yellow-500">
        <FaStar />
        <span className="text-gray-700 font-medium">
          {4.5}
        </span>
      </div>

      {/* Price */}
      <div className="flex items-end gap-3">
        <span className="text-3xl font-bold text-green-600">
          Tk {discountPrice || price}
        </span>

        {discountPrice && (
          <span className="text-gray-400 line-through">
            ৳{price}
          </span>
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