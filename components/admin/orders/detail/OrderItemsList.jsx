import Image from "next/image";

const OrderItemsList = ({ items }) => {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-4 sm:p-5">
      <h2 className="text-white font-medium mb-4">Items ({items.length})</h2>

      <div className="space-y-4">
        {items.map((item, index) => (
          <div
            key={`${item.productId}-${index}`}
            className="flex items-center gap-4 pb-4 border-b border-slate-700 last:border-0 last:pb-0"
          >
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden shrink-0">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">
                {item.name}
              </p>
              <p className="text-gray-400 text-xs mt-1">
                Tk {item.price} × {item.quantity}
              </p>
            </div>

            <p className="text-white text-sm font-medium shrink-0">
              Tk {item.price * item.quantity}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderItemsList;
