"use client";

import { useAuth } from "@/hooks/useAuth";
import { isWishlist, toggleFav } from "@/store/wishlistSlice";
import { FaHeart, FaRegHeart } from "react-icons/fa";
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

const AddToWishlistButton = ({ product, className = "", iconOnly = false }) => {
  const { user } = useAuth();
  const dispatch = useDispatch();

  const inWishlist = useSelector(isWishlist(product._id));

  const handleToggleWishlist = () => {
    if (!user) return showWarningToast("Please login to add to cart");
    if (user.role === "admin")
      return showWarningToast("Admins cannot add to cart");
    dispatch(toggleFav(product));

    Swal.fire({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      title: inWishlist ? "Removed from wishlist" : "Added to wishlist",
      background: "#ffffff",
      color: "#18181b",
      icon: inWishlist ? "info" : "success",
      iconColor: inWishlist ? "#ef4444" : "#16a34a",
    });
  };

  if (iconOnly) {
    return (
      <button
        onClick={handleToggleWishlist}
        className={`p-2 rounded-full shadow-md transition-all duration-200 bg-white hover:scale-110 ${className}`}
        aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
      >
        {inWishlist ? (
          <FaHeart className="text-red-500 w-5 h-5" />
        ) : (
          <FaRegHeart className="text-gray-400 hover:text-red-500 w-5 h-5 transition-colors" />
        )}
      </button>
    );
  }

  return (
    <button
      onClick={handleToggleWishlist}
      className={`inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all border ${
        inWishlist
          ? "border-red-200 bg-red-50 text-red-600 hover:bg-red-100"
          : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
      } ${className}`}
    >
      {inWishlist ? (
        <>
          <FaHeart className="text-red-500" />
          <span>Wishlisted</span>
        </>
      ) : (
        <>
          <FaRegHeart />
          <span>Add to Wishlist</span>
        </>
      )}
    </button>
  );
};

export default AddToWishlistButton;
