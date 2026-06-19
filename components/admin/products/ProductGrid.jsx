"use client";

import { useEffect, useState } from "react";
import { getAdminProducts } from "@/lib/api/admin-products";
import Pagination from "@/components/shared/Pagination";
import ProductCard from "./ProductCard";
import { useSearchParams } from "next/navigation";
import ProductCardSkeleton from "./ProductCardSkeleton";

const ProductGrid = () => {
  const searchParams = useSearchParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = {
          search: searchParams.get("search") || undefined,
          category: searchParams.get("category") || undefined,
          status: searchParams.get("status") || undefined,
          page: searchParams.get("page") || 1,
          limit: 9,
        };

        // remove undefined keys
        Object.keys(params).forEach(
          (k) => params[k] === undefined && delete params[k],
        );

        const result = await getAdminProducts(params);
        setData(result);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!data?.products?.length) {
    return (
      <div className="text-center py-20 text-gray-500">
        <i className="fas fa-box-open text-5xl mb-4 block" />
        <p>No products found.</p>
      </div>
    );
  }
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      <Pagination
        totalPages={data.totalPages}
        basePath="/admin/dashboard/products"
      />
    </>
  );
};

export default ProductGrid;
