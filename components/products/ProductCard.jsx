import Image from "next/image";
import { FaHeart, FaStar } from "react-icons/fa";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
      {/* Image */}
      <div className="relative w-full h-48">
        <Image
          src={product?.images?.[0]}
          alt={product?.productName}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Wishlist */}
        <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md z-10">
          <FaHeart className="text-gray-600" />
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="font-semibold text-gray-900 text-lg mb-1">
          {product?.productName}
        </h3>

        {/* Rating (static for now) */}
        <div className="flex items-center text-yellow-400 mb-3">
          <FaStar className="text-sm" />
          <span className="text-sm ml-1 text-gray-600">4.5</span>
        </div>

        {/* Material + Size */}
        <p className="text-xs text-gray-500 mb-3">
          {product?.material} • {product?.size} • {product?.color}
        </p>

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-2xl font-bold text-green-600">
              ৳{product?.discountPrice || product?.price}
            </span>

            {product?.discountPrice && (
              <span className="text-sm text-gray-400 line-through ml-2">
                ৳{product?.price}
              </span>
            )}
          </div>

          <span className="text-sm text-gray-500">Stock: {product?.stock}</span>
        </div>

        {/* Button */}
        <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
