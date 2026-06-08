"use client";

import Image from "next/image";
import Link from "next/link";

const CartPageClient = () => {
  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-500 text-lg mb-4">Your cart is empty.</p>
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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">
          Your Cart{" "}
          <span className="text-base font-normal text-gray-500">
            ({totalQty} {totalQty === 1 ? "item" : "items"})
          </span>
        </h1>
        <button className="text-sm text-red-500 hover:underline">
          Clear all
        </button>
      </div>

      {/* Items */}
      <ul className="space-y-4">
        {items.map((item) => (
          <li
            key={item._id}
            className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100"
          >
            {/* Image */}
            <div className="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden">
              <Image
                src={item.images?.[0] || "/placeholder.png"}
                alt={item.productName}
                fill
                className="object-cover"
              />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-emerald-900 truncate">
                {item.productName}
              </p>
              <p className="text-sm text-green-600 font-medium mt-0.5">
                TK {item.discountPrice || item.price}
              </p>
              {item.discountPrice && (
                <p className="text-xs text-gray-400 line-through">
                  TK {item.price}
                </p>
              )}
            </div>

            {/* Quantity controls */}
            <div className="flex items-center gap-2">
              <button
                disabled={item.quantity <= 1}
                className="w-8 h-8 border rounded-lg text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                -
              </button>
              <span className="w-6 text-center font-medium">
                {item.quantity}
              </span>
              <button
                onClick={() => handleQtyChange(item._id, item.quantity + 1)}
                disabled={item.quantity >= item.stock}
                className="w-8 h-8 border rounded-lg text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                +
              </button>
            </div>

            {/* Line total */}
            <p className="w-24 text-right font-semibold text-gray-800">
              TK{" "}
              {((item.discountPrice || item.price) * item.quantity).toFixed(0)}
            </p>

            {/* Remove */}
            <button
              className="text-gray-400 hover:text-red-500 transition-colors ml-2"
              aria-label="Remove item"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      {/* Summary */}
      <div className="mt-8 bg-white border border-gray-100 rounded-xl shadow-sm p-6">
        <div className="flex justify-between text-sm text-gray-500 mb-2">
          <span>Subtotal ({totalQty} items)</span>
          <span>TK {total.toFixed(0)}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-500 mb-4">
          <span>Shipping</span>
          <span className="text-green-600">Calculated at checkout</span>
        </div>
        <div className="flex justify-between text-lg font-bold text-gray-900 border-t pt-4">
          <span>Total</span>
          <span>TK {total.toFixed(0)}</span>
        </div>

        <button className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors">
          Proceed to Checkout
        </button>

        <Link
          href="/products"
          className="block text-center mt-3 text-sm text-gray-500 hover:text-green-600 transition-colors"
        >
          ← Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default CartPageClient;
