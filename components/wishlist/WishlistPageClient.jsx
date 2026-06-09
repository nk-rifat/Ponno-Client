"use client";

import { addToCart, cartItems } from "@/store/cartSlice";
import { toggleFav, wishlistItems } from "@/store/wishlistSlice";
import Image from "next/image";
import Link from "next/link";
import { FaHeart, FaTrashAlt, FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

const WishlistPageClient = () => {
  const dispatch = useDispatch();
  const items = useSelector(wishlistItems);
  const allCartItems = useSelector(cartItems);

  const handleRemove = (item) => {
    dispatch(toggleFav(item));
  };

  const handleAddToCart = (item) => {
    dispatch(addToCart({ ...item, quantity: 1 }));
    dispatch(toggleFav(item));
  };

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
        <h1 className="text-2xl font-bold text-gray-900">
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
      <div className="divide-y divide-gray-100">
        {items.map((item) => {
          const isInCart = allCartItems.some((c) => c._id === item._id);

          return (
            <div
              key={item._id}
              className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center py-6 px-4 hover:bg-gray-50/50 transition-colors"
            >
              {/* Column 1: Image & Name */}
              <div className="col-span-1 md:col-span-6 flex items-center gap-4">
                <div className="relative w-20 h-20 shrink-0 bg-gray-50 rounded-lg overflow-hidden border border-gray-100">
                  <Link href={`/products/${item._id}`} prefetch={false}>
                    <Image
                      src={item.images?.[0]}
                      alt={item.productName}
                      fill
                      sizes="80px"
                      quality={75}
                      className="object-cover"
                    />
                  </Link>
                </div>
                <div className="flex-1 min-w-0">
                  <Link href={`/products/${item._id}`} prefetch={false}>
                    <h3 className="font-medium text-gray-900 text-base hover:text-green-600 transition-colors truncate">
                      {item.productName}
                    </h3>
                  </Link>
                  {/* Mobile-only price display */}
                  <div className="flex items-center gap-2 mt-1 md:hidden">
                    <span className="font-bold text-green-600 text-sm">
                      TK {item.discountPrice || item.price}
                    </span>
                    {item.discountPrice && (
                      <span className="text-xs text-gray-400 line-through">
                        TK {item.price}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Column 2: Price (Desktop Only) */}
              <div className="hidden md:block col-span-2 text-center">
                <div className="flex flex-col items-center justify-center">
                  <span className="font-semibold text-gray-900">
                    TK {item.discountPrice || item.price}
                  </span>
                  {item.discountPrice && (
                    <span className="text-xs text-gray-400 line-through">
                      TK {item.price}
                    </span>
                  )}
                </div>
              </div>

              {/* Column 3: Stock Status */}
              <div className="col-span-1 md:col-span-2 text-left md:text-center">
                {item.stock === 0 ? (
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-red-50 text-red-700 border border-red-100">
                    Out of Stock
                  </span>
                ) : item.stock < 5 ? (
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-amber-50 text-amber-700 border border-amber-100">
                    Low Stock ({item.stock})
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-green-50 text-green-700 border border-green-100">
                    In Stock
                  </span>
                )}
              </div>

              {/* Column 4: Action Buttons */}
              <div className="col-span-1 md:col-span-2 flex items-center justify-between md:justify-end gap-3 mt-2 md:mt-0">
                {/* Remove button (Trash Icon on desktop for clean looks) */}
                <button
                  onClick={() => handleRemove(item)}
                  className="flex items-center gap-1.5 text-sm text-red-500 hover:text-red-700 font-medium transition-colors p-2 md:p-1"
                  aria-label="Remove from wishlist"
                >
                  <FaTrashAlt className="w-4 h-4" />
                  <span className="md:hidden">Remove</span>
                </button>

                {/* Cart Action */}
                {item.stock === 0 ? (
                  <button
                    disabled
                    className="bg-gray-100 text-gray-400 font-medium px-4 py-2 rounded-lg cursor-not-allowed text-xs transition-colors"
                  >
                    Unavailable
                  </button>
                ) : isInCart ? (
                  <Link
                    href="/cart"
                    className="inline-flex items-center justify-center bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-lg font-medium text-xs transition-colors"
                  >
                    View Cart
                  </Link>
                ) : (
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="inline-flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium text-xs transition-colors shadow-sm"
                  >
                    <FaShoppingCart className="w-3 h-3" />
                    <span>Add</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WishlistPageClient;