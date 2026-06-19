"use client";

import { useEffect, useState } from "react";
import ProductForm from "../ProductForm";
import { getProductById } from "@/lib/api/admin-products";

const EditProductClient = ({ productId }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(productId);
        setProduct(data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error || !product) {
    return (
      <div className="text-center py-20 text-gray-400">
        <p>Failed to load product.</p>
      </div>
    );
  }

  return <ProductForm product={product} />;
};

export default EditProductClient;
