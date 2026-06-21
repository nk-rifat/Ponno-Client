"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ProductDetailsContent from "./ProductDetailsContent";
import ProductReviews from "./reviews/ProductReviews";

const ProductDetailsTabs = ({ product }) => {
  const [activeTab, setActiveTab] = useState("details");
  const reviewCount = product?.totalReviews || 0;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="border-b border-gray-200 bg-transparent h-auto p-0 rounded-none w-full justify-start gap-1">
          <TabsTrigger
            value="details"
            className="rounded-t-md border-b-2 border-transparent data-[state=active]:border-green-600 data-[state=active]:text-green-600 data-[state=active]:shadow-none px-4 sm:px-5 py-2.5 text-sm font-medium text-gray-500"
          >
            Product details
          </TabsTrigger>
          <TabsTrigger
            value="reviews"
            className="rounded-t-md border-b-2 border-transparent data-[state=active]:border-green-600 data-[state=active]:text-green-600 data-[state=active]:shadow-none px-4 sm:px-5 py-2.5 text-sm font-medium text-gray-500 gap-2"
          >
            Reviews
            {reviewCount > 0 && (
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  activeTab === "reviews"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {reviewCount}
              </span>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="mt-6">
          <ProductDetailsContent product={product} />
        </TabsContent>

        <TabsContent value="reviews" className="mt-6">
          <ProductReviews productId={product._id} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductDetailsTabs;
