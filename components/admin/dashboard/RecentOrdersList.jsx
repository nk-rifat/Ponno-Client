import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { getStatusBadgeStyle } from "../orders/_utils/orderHelpers";

const RecentOrdersList = ({ orders }) => {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white font-medium">Recent orders</h2>
        <Link
          href="/admin/dashboard/orders"
          className="text-xs text-emerald-400 hover:underline"
        >
          View all
        </Link>
      </div>

      {orders.length === 0 ? (
        <p className="text-gray-500 text-sm text-center py-8">No orders yet.</p>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <Link
              key={order._id}
              href={`/admin/dashboard/orders/${order._id}`}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-700/50 transition"
            >
              <div className="min-w-0">
                <p className="text-white text-sm font-medium truncate">
                  {order.delivery.name}
                </p>
                <p className="text-gray-500 text-xs">{order.delivery.phone}</p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="text-white text-sm font-medium">
                  Tk {order.total}
                </span>
                <Badge
                  className={`capitalize border text-xs ${getStatusBadgeStyle(order.status)}`}
                >
                  {order.status}
                </Badge>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentOrdersList;
