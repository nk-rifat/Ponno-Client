"use client";

import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Swal from "sweetalert2";
import { FaShoppingCart } from "react-icons/fa";

import {
  totalItemQty,
  totalPrice,
  removeFromCart,
  updateQuantity,
  clearFullCart,
  loadCart,
} from "@/store/cartSlice";
import { setCheckoutItems } from "@/store/checkoutSlice";
import CartSummary from "./CartSummary";
import CartItem from "./CartItem";
const { saveCartItem } = await import("@/lib/api/cart");

const CartPageClient = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    dispatch(loadCart());
    setIsMounted(true);
  }, [dispatch]);

  const items = useSelector((state) => state.cart.items);
  const loading = useSelector((state) => state.cart.loading);
  const totalQty = useSelector(totalItemQty);
  const total = useSelector(totalPrice);

  const debounceTimeouts = useRef({});

  const handleQtyChange = (id, quantity) => {
    if (quantity < 1) return;

    dispatch(updateQuantity({ id, quantity }));

    if (debounceTimeouts.current[id]) {
      clearTimeout(debounceTimeouts.current[id]);
    }

    const newTimeout = setTimeout(async () => {
      try {
        await saveCartItem(id, quantity);
      } catch (error) {
        console.error("Debounced API sync failed:", error);
        dispatch(loadCart());
      }

      delete debounceTimeouts.current[id];
    }, 500);

    debounceTimeouts.current[id] = newTimeout;
  };

  // cleanup on unmount — ref is stable, no deps needed
  useEffect(() => {
    return () => {
      Object.values(debounceTimeouts.current).forEach(clearTimeout);
    };
  }, []);

  const handleRemove = (productId) => {
    if (debounceTimeouts.current[productId]) {
      clearTimeout(debounceTimeouts.current[productId]);
      delete debounceTimeouts.current[productId];
    }

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
        Object.values(debounceTimeouts.current).forEach(clearTimeout);
        debounceTimeouts.current = {};
        dispatch(clearFullCart());
      }
    });
  };

  const handleProceedToCheckout = () => {
    if (items.length === 0) return;
    dispatch(setCheckoutItems({ items, source: "cart" }));
    router.push("/checkout");
  };

  if (!isMounted || loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center text-gray-500 font-medium">
        Loading your cart items...
      </div>
    );
  }

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

      <ul className="space-y-4">
        {items.map((item) => (
          <CartItem
            key={item._id}
            item={item}
            onQtyChange={(id, qty) => handleQtyChange(id, qty)}
            onRemove={(id) => handleRemove(id)}
          />
        ))}
      </ul>

      <CartSummary
        totalQty={totalQty}
        total={total}
        onCheckout={handleProceedToCheckout}
      />
    </div>
  );
};

export default CartPageClient;
