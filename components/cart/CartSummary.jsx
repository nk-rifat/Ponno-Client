"use client";

import Link from "next/link";

const CartSummary = ({ totalQty, total, onCheckout }) => {
  return (
    <div className="mt-8 bg-white border border-gray-100 rounded-xl shadow-sm p-6">
      <div className="flex justify-between text-sm text-gray-500 mb-2">
        <span>
          Subtotal ({totalQty} {totalQty === 1 ? "item" : "items"})
        </span>
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

      <button
        onClick={onCheckout}
        className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors"
      >
        Proceed to Checkout
      </button>

      <Link
        href="/products"
        className="block text-center mt-3 text-sm text-gray-500 hover:text-green-600 transition-colors"
      >
        ← Continue Shopping
      </Link>
    </div>
  );
};

export default CartSummary;
