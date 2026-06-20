import { FaUser, FaPhone, FaMapMarkerAlt, FaStickyNote } from "react-icons/fa";

const OrderDeliveryInfo = ({ delivery }) => {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-4 sm:p-5">
      <h2 className="text-white font-medium mb-4">Delivery Information</h2>

      <div className="space-y-3 text-sm">
        <div className="flex items-start gap-3">
          <FaUser className="text-gray-500 mt-1 shrink-0" />
          <span className="text-gray-300">{delivery.name}</span>
        </div>

        <div className="flex items-start gap-3">
          <FaPhone className="text-gray-500 mt-1 shrink-0" />
          <span className="text-gray-300">{delivery.phone}</span>
        </div>

        <div className="flex items-start gap-3">
          <FaMapMarkerAlt className="text-gray-500 mt-1 shrink-0" />
          <span className="text-gray-300">
            {delivery.address},{" "}
            {delivery.upazila ? `${delivery.upazila}, ` : ""}
            {delivery.zila}, {delivery.division}
          </span>
        </div>

        {delivery.note && (
          <div className="flex items-start gap-3">
            <FaStickyNote className="text-gray-500 mt-1 shrink-0" />
            <span className="text-gray-300">{delivery.note}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDeliveryInfo;
