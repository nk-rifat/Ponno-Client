"use client";

import { useState } from "react";
import Image from "next/image";
import Swal from "sweetalert2";
import StarRating from "./StarRating";
import { removeReview } from "@/lib/api/reviews";
import { getInitials } from "@/utils/getInitials";

const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const ReviewCard = ({
  review,
  productId,
  isOwner,
  isAdmin,
  onEdit,
  onDeleted,
}) => {
  const [deleting, setDeleting] = useState(false);

  const name = review.userId.firstName;
  const canDelete = isOwner || isAdmin;

  const handleDelete = async () => {
    const result = await Swal.fire({
      title:
        isAdmin && !isOwner ? "Remove this review?" : "Delete your review?",
      text: "This cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Delete",
    });

    if (!result.isConfirmed) return;

    setDeleting(true);
    try {
      await removeReview(productId, review._id);
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Review deleted",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
      onDeleted?.(review._id);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Could not delete review",
        text: error?.response?.data?.message || "Please try again.",
        confirmButtonColor: "#16a34a",
      });
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="border-b border-gray-100 py-4 last:border-none">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-200 shrink-0 relative">
            {review.userId?.profilePic ? (
              <Image
                src={review.userId.profilePic}
                alt={name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-emerald-800 flex items-center justify-center text-white font-bold text-base px-2 py-1.5 rounded-full  hover:bg-emerald-700 ">
                {getInitials(name)}
              </div>
            )}
          </div>
          <div>
            <p className="font-medium text-gray-800 text-sm">{name}</p>
            <p className="text-xs text-gray-400">
              {formatDate(review.createdAt)}
            </p>
          </div>
        </div>

        {canDelete && (
          <div className="flex gap-3 text-xs">
            {isOwner && (
              <button
                onClick={() => onEdit?.(review)}
                className="text-green-600 text-sm hover:underline"
              >
                Edit
              </button>
            )}
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="text-red-500 text-sm hover:underline disabled:opacity-50"
            >
              {deleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        )}
      </div>

      <div className="mt-2">
        <StarRating rating={review.rating} size={16} />
      </div>

      <p className="text-sm text-gray-600 mt-2 leading-relaxed">
        {review.comment}
      </p>
    </div>
  );
};

export default ReviewCard;
