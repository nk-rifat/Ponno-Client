"use client";

import { useAuth } from "@/hooks/useAuth";
import { addToCart, isInCart } from "@/store/cartSlice";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

const showWarningToast = (title) => {
  Swal.fire({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    title,
    background: "#ffffff",
    color: "#18181b",
    icon: "warning",
    iconColor: "#d97706",
  });
};

const AddToCartButton = ({ product, quantity = 1, className = "" }) => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const inCart = useSelector(isInCart(product._id));

  const handleAddToCart = () => {
    if (!user) return showWarningToast("Please login to add to cart");
    if (user.role === "admin")
      return showWarningToast("Admins cannot add to cart");

    dispatch(addToCart({ ...product, quantity }));
    Swal.fire({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      title: "Added to cart",
      background: "#ffffff",
      color: "#18181b",
      icon: "success",
      iconColor: "#16a34a",
    });
  };

  if (product.stock === 0) {
    return (
      <button
        disabled
        className={`bg-red-500 text-white font-semibold rounded-lg cursor-not-allowed ${className}`}
      >
        Stock Out
      </button>
    );
  }

  if (inCart) {
    return (
      <Link
        href="/cart"
        className={`block text-center bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-lg transition-colors ${className}`}
      >
        View in Cart
      </Link>
    );
  }

  return (
    <button
      onClick={handleAddToCart}
      className={`relative overflow-hidden bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all duration-300 group/btn ${className}`}
    >
      <span className="flex items-center justify-center transition-all duration-300 group-hover/btn:-translate-y-8 group-hover/btn:opacity-0">
        Add to Cart
      </span>
      <span className="absolute inset-0 flex items-center justify-center transition-all duration-300 translate-y-8 opacity-0 group-hover/btn:translate-y-0 group-hover/btn:opacity-100">
        <FaShoppingCart className="text-xl" />
      </span>
    </button>
  );
};

export default AddToCartButton;
