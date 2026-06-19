"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Link from "next/link";
import { FaArrowLeft, FaSpinner } from "react-icons/fa";
import ProductFormFields from "./ProductFormFields";
import ProductImageUpload from "./ProductImageUpload";
import { createProduct, updateProduct } from "@/lib/api/admin-products";

const ProductForm = ({ product }) => {
  const isEditing = !!product;
  const router = useRouter();

  const [existingImages, setExistingImages] = useState(product?.images || []);
  const [newImages, setNewImages] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (product) {
      reset({
        productName: product.productName,
        description: product.description,
        price: product.price,
        discountPrice: product.discountPrice || "",
        stock: product.stock,
        category: product.category,
        subCategory: product.subCategory,
        material: product.material,
        size: product.size || "",
        color: product.color || "",
        shape: product.shape || "",
      });
      setExistingImages(product.images || []);
    }
  }, [product, reset]);

  const handleAddImages = (files) => {
    setNewImages((prev) => [...prev, ...files]);
  };

  const handleRemoveExisting = (index) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveNew = (index) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data) => {
    const totalImages = existingImages.length + newImages.length;

    if (totalImages === 0) {
      Swal.fire({
        icon: "error",
        title: "Image required",
        text: "Please upload at least one product image.",
        background: "#fff",
        color: "#18181b",
        confirmButtonColor: "#111827",
      });
      return;
    }

    setSubmitting(true);

    try {
      const formData = new FormData();

      // Append all text fields
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== "") {
          formData.append(key, value);
        }
      });

      // Append new image files
      newImages.forEach((file) => {
        formData.append("images", file);
      });

      // Append existing image URLs (for edit)
      if (isEditing) {
        formData.append("existingImages", JSON.stringify(existingImages));
      }

      if (isEditing) {
        await updateProduct(product._id, formData);
      } else {
        await createProduct(formData);
      }

      Swal.fire({
        icon: "success",
        title: isEditing ? "Product updated!" : "Product created!",
        background: "#fff",
        color: "#18181b",
        confirmButtonColor: "#111827",
        timer: 2000,
        showConfirmButton: false,
      });

      router.push("/admin/dashboard/products");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: error?.response?.data?.message || "Please try again.",
        background: "#fff",
        color: "#18181b",
        confirmButtonColor: "#111827",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/dashboard/products"
          className="text-gray-400 hover:text-white transition"
        >
          <FaArrowLeft />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">
            {isEditing ? "Edit Product" : "Add New Product"}
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            {isEditing
              ? "Update product details"
              : "Fill in the details to add a new product"}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 space-y-8">
          {/* Image Upload */}
          <ProductImageUpload
            existingImages={existingImages}
            newImages={newImages}
            onAddImages={handleAddImages}
            onRemoveExisting={handleRemoveExisting}
            onRemoveNew={handleRemoveNew}
          />

          <hr className="border-slate-700" />

          {/* Form Fields */}
          <ProductFormFields register={register} errors={errors} />
        </div>

        {/* Submit */}
        <div className="flex items-center justify-end gap-4 mt-6">
          <Link
            href="/admin/dashboard/products"
            className="px-6 py-2 border border-slate-600 text-gray-400 hover:bg-slate-800 rounded-lg transition"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="px-8 py-2 bg-green-600 hover:bg-green-800 text-white rounded-lg font-medium transition disabled:opacity-50 flex items-center gap-2"
          >
            {submitting && <FaSpinner className="animate-spin" />}
            {isEditing ? "Update Product" : "Create Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
