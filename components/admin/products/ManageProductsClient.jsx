"use client";
import Link from "next/link";
import ProductFilters from "./ProductFilters";
import ProductGrid from "./ProductGrid";
import { FaPlus } from "react-icons/fa";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { Suspense } from "react";

const ManageProductsClient = () => {
  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-3 lg:px-4 py-4">
      {/* Breadcrumb */}
      <nav className="flex mb-6" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2 text-sm">
          <li>
            <Link href="/" className="text-gray-400 hover:text-green-500">
              Home
            </Link>
          </li>

          <li className="text-white text-xs">&gt;</li>

          <li className="text-gray-200">Manage Products</li>
        </ol>
      </nav>

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold md:text-3xl text-white">
            Manage Products
          </h1>
          <p className="text-gray-400 mt-1">
            Manage your product listings and inventory
          </p>
        </div>
        <Link
          href="/admin/products/create"
          className="mt-4 sm:mt-0 inline-flex items-center gap-2 px-3 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 text-white rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-lg"
        >
          <FaPlus className="text-sm" />
          Add New Product
        </Link>
      </div>

      {/* Filters */}
      <ProductFilters />

      {/* Grid */}
      <ProductGrid />
    </div>
  );
};

export default ManageProductsClient;