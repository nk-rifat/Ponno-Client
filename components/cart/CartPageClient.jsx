"use client";
import { FaTrashCan } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";
import {
  totalItemQty,
  totalPrice,
  removeFromCart,
  updateQuantity,
  clearFullCart,
} from "@/store/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { FaShoppingCart } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { setCheckoutItems } from "@/store/checkoutSlice";

const CartPageClient = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const items = useSelector((state) => state.cart.items);
  const totalQty = useSelector(totalItemQty);
  const total = useSelector(totalPrice);
 

  const handleQtyChange = (id, quantity) => {
    if (quantity < 1) return;
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));
    Swal.fire({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      title: "Product removed from cart",
      icon: "info",
      iconColor: "#EF4444",
      customClass: {
        popup:
          "!bg-white !rounded-xl !shadow-md !border !border-zinc-100 dark:!border-zinc-800",
        title: "text-sm font-medium text-zinc-800",
        timerProgressBar: "!bg-red-400 !h-[2px]",
      },
    });
  };

  const handleClearCart = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will lose all the items currently in your cart!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Delete All!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(clearFullCart());
      }
    });
  };

  const handleProceedToCheckout = () => {
    if (items.length === 0) return;
    dispatch(setCheckoutItems({ items, source: "cart" }));
    router.push("/checkout");
  };

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <FaShoppingCart className="text-gray-200 text-6xl mx-auto mb-4" />
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
        <h1 className="text-2xl text-emerald-800 font-bold">
          Your Cart{" "}
          <span className="text-base font-normal text-gray-500">
            ({items.length} {items.length === 1 ? "item" : "items"})
          </span>
        </h1>
        <button
          onClick={handleClearCart}
          className="text-sm text-red-500 hover:underline"
        >
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
            </div>

            {/* Quantity controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleQtyChange(item._id, item.quantity - 1)}
                disabled={item.quantity <= 1}
                className="w-10 h-10 border rounded-lg hover:bg-green-400 disabled:opacity-20 disabled:cursor-not-allowed"
              >
                -
              </button>
              <span className="w-6 text-center font-medium">
                {item.quantity}
              </span>
              <button
                onClick={() => handleQtyChange(item._id, item.quantity + 1)}
                disabled={item.quantity >= item.stock}
                className="w-10 h-10 border rounded-lg hover:bg-green-400 disabled:opacity-20 disabled:cursor-not-allowed "
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
              onClick={() => handleRemove(item._id)}
              className="text-red-400 hover:text-red-600 transition-colors ml-2"
            >
              <FaTrashCan />
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

        <button
          onClick={handleProceedToCheckout}
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
    </div>
  );
};

export default CartPageClient;
