"use client";
import { addToCart, isInCart } from "@/store/cartSlice";
import Image from "next/image";
import Link from "next/link";
import { FaHeart, FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

const ProductCard = ({ product }) => {
  const { _id, images, productName, discountPrice, price, stock } = product;

  const dispatch = useDispatch();
  const inCart = useSelector(isInCart(_id));

  const handleAddToCart = () => {
    if (inCart) return;
    dispatch(addToCart({ ...product, quantity: 1 }));
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
      {/* Image */}

      <div className="relative w-full h-48">
        <Link href={`/products/${_id}`} prefetch={false}>
          <Image
            src={images?.[0]}
            alt={productName}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 25vw"
            quality={75}
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        </Link>

        {/* Wishlist */}
        <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md z-10">
          <FaHeart className="text-gray-600" />
        </button>

        {stock > 0 && stock < 5 && (
          <div className="absolute top-3 left-3 bg-amber-600 text-white text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-sm z-10">
            Low Stock
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex justify-between gap-4">
          {/* Title */}
          <h3 className="font-semibold text-emerald-900 text-[16px] mb-1 line-clamp-2 h-12">
            {productName}
          </h3>

          {/* Rating (static for now) */}
          <div className="flex items-center text-yellow-400 mb-3">
            <FaStar className="text-sm" />
            <span className="text-sm ml-1 text-gray-600">4.5</span>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between my-4">
          <div>
            <span className="text-xl font-bold text-green-600">
              TK {discountPrice || price}
            </span>

            {discountPrice && (
              <span className="text-sm text-gray-400 line-through ml-2">
                TK {price}
              </span>
            )}
          </div>

          <span className="text-sm text-gray-500">Stock: {stock}</span>
        </div>

        {/* Button */}
        {stock === 0 ? (
          <button
            disabled
            className="w-full bg-red-600 text-white font-medium py-2 rounded-lg cursor-not-allowed"
          >
            Stock Out
          </button>
        ) : inCart ? (
          <Link
            href="/cart"
            className="block w-full text-center bg-emerald-700 hover:bg-emerald-800 text-white py-2 rounded-lg font-medium transition-colors"
          >
            View in Cart
          </Link>
        ) : (
          <button
            onClick={handleAddToCart}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium"
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
