"use client";

import { useState } from "react";

const ProductActions = ({ product }) => {
  const [qty, setQty] = useState(1);

  const stock = product?.stock || 0;

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
      <button
        disabled={stock === 0}
        className={`w-full py-3 rounded-lg text-white font-semibold ${
          stock === 0
            ? "bg-red-500 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {stock === 0 ? "Stock Out" : "Add to Cart"}
      </button>

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
