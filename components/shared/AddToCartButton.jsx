"use client";

import { addToCart, isInCart } from "@/store/cartSlice";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

const AddToCartButton = ({ product, quantity = 1, className = "" }) => {
  const dispatch = useDispatch();
  const inCart = useSelector(isInCart(product._id));

  const handleAddToCart = () => {
    if (inCart) return;
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
      className={`bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg ${className}`}
    >
      Add to Cart
    </button>
  );
};

export default AddToCartButton;
