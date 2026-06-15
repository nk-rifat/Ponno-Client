"use client";

import { addToCart, cartItems } from "@/store/cartSlice";
import { toggleFav, wishlistItems } from "@/store/wishlistSlice";
import Image from "next/image";
import Link from "next/link";
import { FaHeart, FaTrashAlt, FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import WishlistCard from "./WishlistCard";

const WishlistPageClient = () => {
  const dispatch = useDispatch();
  const items = useSelector(wishlistItems);
  const allCartItems = useSelector(cartItems);
  // remove from cart
  const handleRemove = (item) => {
    dispatch(toggleFav(item));
  };

  // add to cart
  const handleAddToCart = (item) => {
    dispatch(addToCart({ ...item, quantity: 1 }));
    dispatch(toggleFav(item));
  };

  // If no products
  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <FaHeart className="text-gray-200 text-6xl mx-auto mb-4" />
        <p className="text-gray-500 text-lg mb-2">Your wishlist is empty.</p>
        <p className="text-gray-400 text-sm mb-6">
          Save items you love and come back to them later.
        </p>
        <Link
          href="/products"
          className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-emerald-800">
          My Wishlist{" "}
          <span className="text-base font-normal text-gray-500">
            ({items.length} {items.length === 1 ? "item" : "items"})
          </span>
        </h1>
      </div>

      {/* Desktop Table Header - Hidden on Mobile */}
      <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-gray-200 text-sm font-semibold text-gray-500 px-4">
        <div className="col-span-6">Product Details</div>
        <div className="col-span-2 text-center">Price</div>
        <div className="col-span-2 text-center">Stock Status</div>
        <div className="col-span-2 text-right">Actions</div>
      </div>

      {/* Wishlist Items List */}
      <div className="space-y-4">
        {items.map((item) => {
          const isInCart = allCartItems.some((c) => c._id === item._id);

          return (
            <WishlistCard
              key={item._id}
              item={item}
              isInCart={isInCart}
              onRemove={handleRemove}
              onAddToCart={handleAddToCart}
            />
          );
        })}
      </div>
    </div>
  );
};

export default WishlistPageClient;
