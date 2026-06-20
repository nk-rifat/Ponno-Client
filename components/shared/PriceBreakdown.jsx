const PriceBreakdown = ({
  subtotal,
  deliveryCharge,
  total,
  deliveryNote,
  variant = "light",
}) => {
  const isDark = variant === "dark";

  const labelColor = isDark ? "text-gray-400" : "text-slate-600";
  const valueColor = isDark ? "text-gray-200" : "text-slate-800";
  const totalLabelColor = isDark ? "text-emerald-400" : "text-indigo-600";
  const totalValueColor = isDark ? "text-emerald-400" : "text-indigo-600";
  const borderColor = isDark ? "border-slate-700" : "border-slate-200/60";
  const noteStyle = isDark
    ? "bg-emerald-500/10 text-emerald-400"
    : "bg-emerald-50 text-emerald-700";

  return (
    <div className="space-y-2.5">
      <div className={`flex justify-between text-sm ${labelColor}`}>
        <span>Subtotal</span>
        <span className={`font-medium ${valueColor}`}>
          Tk {subtotal.toLocaleString()}
        </span>
      </div>

      <div className={`flex justify-between text-sm ${labelColor}`}>
        <span>Delivery charge</span>
        <span className={`font-medium ${valueColor}`}>
          {deliveryCharge != null
            ? `Tk ${deliveryCharge.toLocaleString()}`
            : "—"}
        </span>
      </div>

      {deliveryNote && (
        <div
          className={`inline-block rounded-md px-2 py-1 text-[11px] font-medium mt-0.5 ${noteStyle}`}
        >
          {deliveryNote}
        </div>
      )}

      <div
        className={`flex justify-between text-base font-bold pt-3 border-t ${borderColor}`}
      >
        <span className={totalLabelColor}>Total</span>
        <span className={totalValueColor}>Tk {total.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default PriceBreakdown;
