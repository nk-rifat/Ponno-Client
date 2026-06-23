import Image from "next/image";
import Link from "next/link";
import { FaTrashAlt, FaShoppingCart } from "react-icons/fa";

const WishlistCard = ({ item, isInCart, onRemove, onAddToCart }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 items-center py-6 px-4 hover:bg-gray-50/50 transition-colors gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
      {/* Column 1: Image & Name */}
      <div className="col-span-1 md:col-span-6 flex items-center gap-4">
        <div className="relative w-20 h-20 shrink-0 bg-gray-50 rounded-lg overflow-hidden border border-gray-100">
          <Link href={`/products/${item._id}`} prefetch={false}>
            <Image
              src={item.images?.[0]}
              alt={item.productName}
              fill
              sizes="80px"
              className="object-cover"
            />
          </Link>
        </div>
        <div className="flex-1 min-w-0">
          <Link href={`/products/${item._id}`} prefetch={false}>
            <h3 className="font-medium text-gray-900 text-base hover:text-emerald-800 transition-colors truncate">
              {item.productName}
            </h3>
          </Link>
          {/* Mobile-only price display */}
          <div className="flex items-center gap-2 mt-1 md:hidden">
            <span className="font-bold text-green-600 text-sm">
              TK {item.discountPrice || item.price}
            </span>
            {item.discountPrice && (
              <span className="text-xs text-gray-400 line-through">
                TK {item.price}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Column 2: Price (Desktop Only) */}
      <div className="hidden md:block col-span-2 text-center">
        <div className="flex flex-col items-center justify-center">
          <span className="font-semibold text-gray-900">
            TK {item.discountPrice || item.price}
          </span>
          {item.discountPrice && (
            <span className="text-xs text-gray-400 line-through">
              TK {item.price}
            </span>
          )}
        </div>
      </div>

      {/* Column 3: Stock Status */}
      <div className="col-span-1 md:col-span-2 text-left md:text-center">
        {item.stock === 0 ? (
          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-red-50 text-red-700 border border-red-100">
            Out of Stock
          </span>
        ) : item.stock < 5 ? (
          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-amber-50 text-amber-700 border border-amber-100">
            Low Stock ({item.stock})
          </span>
        ) : (
          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-green-50 text-green-700 border border-green-100">
            In Stock
          </span>
        )}
      </div>

      {/* Column 4: Action Buttons */}
      <div className="col-span-1 md:col-span-2 flex items-center justify-between md:justify-end gap-3 mt-2 md:mt-0">
        {/* Remove button */}
        <button
          onClick={() => onRemove(item)}
          className="flex items-center gap-1.5 text-sm text-red-500 hover:text-red-700 font-medium transition-colors p-2 md:p-1"
          aria-label="Remove from wishlist"
        >
          <FaTrashAlt className="w-4 h-4" />
          <span className="md:hidden">Remove</span>
        </button>

        {/* Cart Action */}
        {item.stock === 0 ? (
          <button
            disabled
            className="bg-gray-100 text-gray-400 font-medium px-4 py-2 rounded-lg cursor-not-allowed text-xs transition-colors"
          >
            Unavailable
          </button>
        ) : isInCart ? (
          <Link
            href="/cart"
            className="inline-flex items-center justify-center bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-lg font-medium text-xs transition-colors"
          >
            View Cart
          </Link>
        ) : (
          <button
            onClick={() => onAddToCart(item)}
            className="inline-flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium text-xs transition-colors shadow-sm"
          >
            <FaShoppingCart className="w-3 h-3" />
            <span>Add</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default WishlistCard;
