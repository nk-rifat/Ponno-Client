"use client";

const OrderSummary = ({
  items,
  watchedDistrictName,
  deliveryCharge,
  subtotal,
  total,
  register,
}) => {

  return (
    <div className="space-y-5">
      {/* Section Header */}
      <p className="text-[11px] font-bold text-emerald-600 uppercase tracking-widest">
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
        <div className="p-4 space-y-2.5 bg-slate-50/30">
          <div className="flex justify-between text-sm text-slate-600">
            <span>Subtotal</span>
            <span className="font-medium text-slate-800">
              Tk {subtotal.toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between text-sm text-slate-600">
            <span>Delivery charge</span>
            <span className="font-medium text-slate-800">
              {watchedDistrictName ? `Tk ${deliveryCharge}` : "—"}
            </span>
          </div>

          {/* Contextual Badge Info */}
          {watchedDistrictName && (
            <div className="inline-block rounded-md bg-emerald-50 px-2 py-1 text-[11px] font-medium text-emerald-700 mt-0.5">
              {watchedDistrictName === "Dhaka"
                ? "✓ Dhaka city rate applied (Tk 120)"
                : "✓ Outside Dhaka rate applied (Tk 150)"}
            </div>
          )}

          {/* Grand Total */}
          <div className="flex justify-between text-base font-bold text-slate-900 pt-3 border-t border-slate-200/60">
            <span>Total</span>
            <span className="text-indigo-600">
              Tk {(watchedDistrictName ? total : subtotal).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Delivery Note Input */}
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold text-emerald-600 uppercase tracking-widest block">
          Delivery note{" "}
          <span className="normal-case font-normal text-gray-500 italic">
            (optional)
          </span>
        </label>
        <textarea
          {...register("note")}
          rows={3}
          placeholder="Any special instructions for your order?"
          className="w-full border border-emerald-100 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 resize-none transition-all duration-200 focus:outline-none focus:border-emerald-600"
        />
      </div>
    </div>
  );
};

export default OrderSummary;
