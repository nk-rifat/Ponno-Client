"use client";

import Image from "next/image";
import { useState } from "react";

const ProductGallery = ({ images = [] }) => {
  const [activeImage, setActiveImage] = useState(images?.[0]);

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative w-full h-100 overflow-hidden">
        <Image
          src={activeImage}
          alt="Product image"
          fill
          className="object-cover px-3"
        />
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 overflow-x-auto px-3">
        {images?.map((img, index) => (
          <button
            key={index}
            onClick={() => setActiveImage(img)}
            className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 ${
              activeImage === img ? "border-green-500" : "border-transparent"
            }`}
          >
            <Image src={img} alt="thumb" fill className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
