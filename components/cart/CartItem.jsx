"use client";

import Image from "next/image";
import { FaTrashCan } from "react-icons/fa6";

const CartItem = ({ item, onQtyChange, onRemove }) => {
  const currentPrice = item.discountPrice || item.price;
  const lineTotal = currentPrice * item.quantity;

  return (
    <li className="grid grid-cols-1 md:grid-cols-12 items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
      {/* 1. Image & Product Name Block */}
      <div className="col-span-1 md:col-span-6 flex items-start md:items-center gap-4 min-w-0">
        <div className="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden border border-gray-50">
          <Image
            src={item.images?.[0] || "/placeholder.png"}
            alt={item.productName}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex-1 min-w-0 pt-1 md:pt-0">
          <p className="font-semibold text-emerald-900 text-sm md:text-base line-clamp-2 md:truncate">
            {item.productName}
          </p>
        </div>

        <div className="shrink-0 text-right pt-1 md:hidden">
          <p className="font-bold text-gray-900 text-sm whitespace-nowrap">
            TK {lineTotal.toFixed(0)}
          </p>
        </div>
      </div>

      <div className="w-full border-t border-gray-100 md:hidden" />

      {/* Quantity */}
      <div className="col-span-1 md:col-span-2 flex items-center md:justify-center">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onQtyChange(item._id, item.quantity - 1)}
            disabled={item.quantity <= 1}
            className="w-8 h-8 md:w-10 md:h-10 border rounded-lg hover:bg-green-400 disabled:opacity-20"
          >
            -
          </button>

          <span className="w-6 text-center font-medium">{item.quantity}</span>

          <button
            onClick={() => onQtyChange(item._id, item.quantity + 1)}
            disabled={item.quantity >= item.stock}
            className="w-8 h-8 md:w-10 md:h-10 border rounded-lg hover:bg-green-400 disabled:opacity-20"
          >
            +
          </button>
        </div>
      </div>

      {/* Price */}
      <div className="hidden md:block col-span-2 text-right">
        <p className="w-24 ml-auto font-semibold text-gray-800">
          TK {lineTotal.toFixed(0)}
        </p>
      </div>

      {/* Remove */}
      <div className="col-span-1 md:col-span-2 flex items-center justify-end -mt-12 md:mt-0">
        <button
          onClick={() => onRemove(item._id)}
          className="flex items-center gap-2 text-xs md:text-sm text-red-400 hover:text-red-600 font-medium"
        >
          <FaTrashCan className="w-3.5 h-3.5" />
          <span>Remove</span>
        </button>
      </div>
    </li>
  );
};

export default CartItem;
