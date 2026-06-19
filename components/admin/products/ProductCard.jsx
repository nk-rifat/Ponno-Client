"use client";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import Swal from "sweetalert2";
import { useState } from "react";
import { getStatusBadge } from "./_utils/productHelpers";
import { deleteProduct } from "@/lib/api/admin-products";

const ProductCard = ({ product }) => {
  const [deleted, setDeleted] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const { label, color } = getStatusBadge(product.stock);

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Delete product?",
      text: `"${product.productName}" will be permanently removed.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete",
    });

    if (!result.isConfirmed) return;

    setDeleting(true);
    try {
      await deleteProduct(product._id);
      Swal.fire("Deleted!", "Product removed successfully.", "success");
      setDeleted(true);
    } catch {
      Swal.fire("Error", "Could not delete product.", "error");
    } finally {
      setDeleting(false);
    }
  };

  if (deleted) return null;

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Image */}
      <div className="relative">
        <Image
          src={product.images?.[0]}
          alt={product.productName}
          width={400}
          height={200}
          className="w-full h-48 object-cover"
        />
        <span
          className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium text-white ${color}`}
        >
          {label}
        </span>
      </div>

      {/* Info */}
      <div className="bg-slate-800 border border-slate-700 overflow-hidden">
        <div className="p-5">
          <h3 className="font-semibold text-white truncate mb-1">
            {product.productName}
          </h3>

          <p className="text-sm text-gray-300 mb-3 mt-2">
            {product.category} • {product.material}
          </p>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-white">
                Tk {product.discountPrice ?? product.price}
              </span>
              {product.discountPrice && (
                <span className="text-sm text-gray-500 line-through">
                  Tk {product.price}
                </span>
              )}
            </div>
            <StockLabel stock={product.stock} />
          </div>

          {/* Actions */}
          <div className="flex space-x-2">
            <Link
              href={`/admin/dashboard/products/${product._id}/edit`}
              className="flex-1 bg-green-600 hover:bg-green-800 text-white py-2.5 rounded-lg font-medium transition text-sm text-center flex items-center justify-center gap-2"
            >
              <FaEdit />
              Edit
            </Link>
            <Link
              href={`/products/${product._id}`}
              className="px-4 py-2 border border-white text-white hover:bg-slate-700 rounded-lg transition flex items-center justify-center"
            >
              <FaEye />
            </Link>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="px-4 py-2 border border-red-800 text-red-400 hover:bg-red-950 rounded-lg transition disabled:opacity-50 flex items-center justify-center"
            >
              <FaTrash />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

function StockLabel({ stock }) {
  if (stock === 0)
    return <span className="text-sm text-red-500">Stock: 0</span>;
  if (stock < 5)
    return <span className="text-sm text-yellow-500">Stock: {stock}</span>;
  return <span className="text-sm text-gray-300">Stock: {stock}</span>;
}
