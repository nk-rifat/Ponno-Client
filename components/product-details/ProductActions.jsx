"use client";

import { isInCart } from "@/store/cartSlice";
import { useState } from "react";
import { useSelector } from "react-redux";
import AddToCartButton from "../shared/AddToCartButton";
import AddToWishlistButton from "../shared/AddToFavButton";

const ProductActions = ({ product }) => {
  const [qty, setQty] = useState(1);

  const stock = product?.stock || 0;
  const inCart = useSelector(isInCart(product._id));

  const isDecrementDisabled = inCart || stock <= 1 || qty <= 1;
  const isIncrementDisabled = inCart || stock <= 1 || qty >= stock;

  const increase = () => {
    if (qty < stock) setQty(qty + 1);
  };
  const decrease = () => {
    if (qty > 1) setQty(qty - 1);
  };

  return (
    <div className="space-y-4 mt-6">
      {/* Quantity */}
      <div className="flex items-center gap-4">
        <button
          onClick={decrease}
          disabled={isDecrementDisabled}
          className="w-10 h-10 border rounded-lg hover:bg-green-400 disabled:opacity-20 disabled:cursor-not-allowed"
        >
          -
        </button>

        <span className="text-lg font-medium">{qty}</span>

        <button
          onClick={increase}
          disabled={isIncrementDisabled}
          className="w-10 h-10 border rounded-lg hover:bg-green-400 disabled:opacity-20 disabled:cursor-not-allowed "
        >
          +
        </button>
      </div>

      {/* Add to Cart */}
      <AddToCartButton
        product={product}
        quantity={qty}
        className="w-full py-3"
      />

      {/* Buy Now */}
      <button
        disabled={stock === 0}
        className="w-full py-3 rounded-lg border border-green-600 text-green-600 font-semibold hover:bg-green-50"
      >
        Buy Now
      </button>
      {/* Fav Button */}
      <AddToWishlistButton product={product} className="w-full py-3 text-sm" />
    </div>
  );
};

export default ProductActions;
