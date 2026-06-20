"use client";

import PriceBreakdown from "../shared/PriceBreakdown";

const OrderSummary = ({
  items,
  watchedDistrictName,
  deliveryCharge,
  subtotal,
  total,
  register,
}) => {
  const deliveryNote = watchedDistrictName
    ? watchedDistrictName === "Dhaka"
      ? "✓ Dhaka city rate applied (Tk 120)"
      : "✓ Outside Dhaka rate applied (Tk 150)"
    : null;
  return (
    <div className="space-y-5">
      {/* Section Header */}
      <p className="text-[14px] font-bold text-emerald-600 uppercase tracking-widest">
        Order summary
      </p>

      {/* Main Card Wrapper */}
      <div className="border border-emerald-100 rounded-xl shadow-sm divide-y divide-slate-100">
        {/* Items List */}
        {items.map((item) => (
          <div
            key={item.productId || item._id}
            className="flex items-center justify-between p-4 hover:bg-slate-50/50 transition-colors duration-150"
          >
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-emerald-800 truncate">
                {item.productName}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Tk {(item.discountPrice || item.price).toLocaleString()} ×{" "}
                <span className="font-medium text-slate-700">
                  {item.quantity}
                </span>
              </p>
            </div>
            <p className="text-sm font-bold text-slate-900 whitespace-nowrap ml-4">
              Tk{" "}
              {(
                (item.discountPrice || item.price) * item.quantity
              ).toLocaleString()}
            </p>
          </div>
        ))}

        {/* Pricing Breakdown */}
        <div className="p-4 bg-slate-50/30">
          <PriceBreakdown
            subtotal={subtotal}
            deliveryCharge={watchedDistrictName ? deliveryCharge : null}
            total={watchedDistrictName ? total : subtotal}
            deliveryNote={deliveryNote}
          />
        </div>
      </div>

      {/* Delivery Note Input */}
      <div className="space-y-1.5">
        <label className="text-[12px] font-bold text-emerald-600 uppercase tracking-widest block">
          Delivery note{" "}
          <span className="normal-case font-normal text-gray-500 italic">
            (optional)
          </span>
        </label>
        <textarea
          {...register("note")}
          rows={3}
          placeholder="Any special instructions for your order?"
          className="w-full bg-gray-50 border border-emerald-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 resize-none transition-all duration-200 focus:outline-none focus:border-emerald-600"
        />
      </div>
    </div>
  );
};

export default OrderSummary;
