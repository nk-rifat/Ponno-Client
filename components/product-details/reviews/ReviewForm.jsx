"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import StarRating from "./StarRating";
import { submitReview, editReview } from "@/lib/api/reviews";

const ReviewForm = ({ productId, existingReview, onSuccess, onCancel }) => {
  const isEditMode = Boolean(existingReview);
  const [rating, setRating] = useState(existingReview?.rating || 0);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { comment: existingReview?.comment || "" },
  });

  const onSubmit = async (formData) => {
    if (rating === 0) {
      Swal.fire({
        icon: "warning",
        title: "Please select a rating",
        confirmButtonColor: "#16a34a",
      });
      return;
    }

    setSubmitting(true);
    try {
      const payload = { rating, comment: formData.comment.trim() };
      const data = isEditMode
        ? await editReview(productId, existingReview._id, payload)
        : await submitReview(productId, payload);

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: isEditMode ? "Review updated" : "Review submitted",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });

      onSuccess?.(data.review);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text:
          error?.response?.data?.message ||
          "Could not submit your review. Please try again.",
        confirmButtonColor: "#16a34a",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="border border-gray-200 rounded-xl p-4 sm:p-5 bg-gray-50"
    >
      <h4 className="font-semibold text-gray-800 mb-3">
        {isEditMode ? "Edit your review" : "Write a review"}
      </h4>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Your rating
        </label>
        <StarRating
          rating={rating}
          onChange={setRating}
          readOnly={false}
          size={26}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Your review
        </label>
        <textarea
          {...register("comment", {
            required: "Please write a comment",
            minLength: { value: 5, message: "Comment is too short" },
            maxLength: { value: 1000, message: "Comment is too long" },
          })}
          rows={4}
          placeholder="Share your experience with this product..."
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        {errors.comment && (
          <p className="text-red-500 text-xs mt-1">{errors.comment.message}</p>
        )}
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={submitting}
          className="bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white text-sm font-medium px-4 py-2 rounded-lg transition"
        >
          {submitting
            ? "Submitting..."
            : isEditMode
              ? "Update Review"
              : "Submit Review"}
        </button>
        {isEditMode && (
          <button
            type="button"
            onClick={onCancel}
            className="text-sm font-medium px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default ReviewForm;
