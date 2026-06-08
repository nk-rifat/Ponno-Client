"use client";

import { addToCart, selectIsInCart } from "@/store/cartSlice";
import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ProductActions = ({ product }) => {
  const [qty, setQty] = useState(1);

  const stock = product?.stock || 0;

  const dispatch = useDispatch();
  const isInCart = useSelector(selectIsInCart(product._id));

  const increase = () => {
    if (qty < stock) setQty(qty + 1);
  };

  const decrease = () => {
    if (qty > 1) setQty(qty - 1);
  };

  const handleAddToCart = () => {
    if (isInCart) return;
    dispatch(addToCart({ ...product, quantity: qty }));
  };

  return (
    <div className="space-y-4 mt-6">
      {/* Quantity */}
      <div className="flex items-center gap-4">
        <button
          onClick={decrease}
          className="w-10 h-10 border rounded-lg hover:bg-green-400"
        >
          -
        </button>

        <span className="text-lg font-medium">{qty}</span>

        <button
          onClick={increase}
          className="w-10 h-10 border rounded-lg hover:bg-green-400"
        >
          +
        </button>
      </div>

      {/* Add to Cart */}
      {stock === 0 ? (
        <button
          disabled
          className="w-full py-3 rounded-lg text-white font-semibold bg-red-500 cursor-not-allowed"
        >
          Stock Out
        </button>
      ) : isInCart ? (
        <Link
          href="/cart"
          className="block w-full text-center py-3 rounded-lg text-white font-semibold bg-emerald-700 hover:bg-emerald-800 transition-colors"
        >
          View in Cart
        </Link>
      ) : (
        <button
          onClick={handleAddToCart}
          className="w-full py-3 rounded-lg text-white font-semibold bg-green-600 hover:bg-green-700"
        >
          Add to Cart
        </button>
      )}

      {/* Buy Now */}
      <button
        disabled={stock === 0}
        className="w-full py-3 rounded-lg border border-green-600 text-green-600 font-semibold hover:bg-green-50"
      >
        Buy Now
      </button>
      {/* Fav Button */}
      <button
        disabled={stock === 0}
        className="w-full py-3 rounded-lg border border-gray-400 text-gray-700 font-semibold hover:bg-green-50 hover:border-green-600 hover:text-green-600"
      >
        Add to Favorite
      </button>
    </div>
  );
};

export default ProductActions;
