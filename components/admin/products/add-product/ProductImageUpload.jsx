"use client";

import { useRef } from "react";
import Image from "next/image";
import { FaPlus, FaTrash } from "react-icons/fa";

const MAX_IMAGES = 3;

const ProductImageUpload = ({
  existingImages,
  newImages,
  onAddImages,
  onRemoveExisting,
  onRemoveNew,
}) => {
  const inputRef = useRef(null);

  const totalImages = existingImages.length + newImages.length;

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const remaining = MAX_IMAGES - totalImages;
    if (remaining <= 0) return;
    onAddImages(files.slice(0, remaining));
    e.target.value = "";
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-400 mb-2">
        Product Images <span className="text-red-500">*</span>{" "}
        <span className="text-gray-500 text-xs">(max {MAX_IMAGES})</span>
      </label>

      <div className="flex flex-wrap gap-4">
        {/* Existing images (edit mode) */}
        {existingImages.map((url, index) => (
          <div
            key={`existing-${index}`}
            className="relative w-28 h-28 rounded-lg overflow-hidden border border-slate-600"
          >
            <Image
              src={url}
              alt={`product-${index}`}
              fill
              className="object-cover"
            />
            <button
              type="button"
              onClick={() => onRemoveExisting(index)}
              className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white rounded-full p-1"
            >
              <FaTrash className="text-xs" />
            </button>
          </div>
        ))}

        {/* New image previews */}
        {newImages.map((file, index) => (
          <div
            key={`new-${index}`}
            className="relative w-28 h-28 rounded-lg overflow-hidden border border-slate-600"
          >
            <Image
              src={URL.createObjectURL(file)}
              alt={`new-${index}`}
              fill
              className="object-cover"
            />
            <button
              type="button"
              onClick={() => onRemoveNew(index)}
              className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white rounded-full p-1"
            >
              <FaTrash className="text-xs" />
            </button>
          </div>
        ))}

        {/* Upload button */}
        {totalImages < MAX_IMAGES && (
          <button
            type="button"
            onClick={() => inputRef.current.click()}
            className="w-28 h-28 border-2 border-dashed border-slate-600 hover:border-emerald-500 rounded-lg flex flex-col items-center justify-center text-gray-500 hover:text-emerald-400 transition"
          >
            <FaPlus className="text-xl mb-1" />
            <span className="text-xs">Add Image</span>
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default ProductImageUpload;
