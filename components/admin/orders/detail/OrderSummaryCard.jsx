import PriceBreakdown from "@/components/shared/PriceBreakdown";

const OrderSummaryCard = ({ order }) => {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-4 sm:p-5">
      <h2 className="text-white font-medium mb-4">Order Summary</h2>

      <PriceBreakdown
        subtotal={order.subtotal}
        deliveryCharge={order.deliveryCharge}
        total={order.total}
         variant="dark"
      />
    </div>
  );
};

export default OrderSummaryCard;
