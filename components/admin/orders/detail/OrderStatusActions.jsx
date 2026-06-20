"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FaArrowRight, FaSpinner } from "react-icons/fa";
import { useOrderStatusActions } from "@/hooks/useOrderStatusActions";
import {
  getStatusBadgeStyle,
  canCancel,
} from "../_utils/orderHelpers";

const OrderStatusActions = ({ order, onUpdated }) => {
  const { nextStatus, updating, handleChangeStatus, handleCancel } =
    useOrderStatusActions(order, onUpdated);

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="flex items-center gap-3">
        <span className="text-gray-400 text-sm">Current status:</span>
        <Badge
          className={`capitalize border ${getStatusBadgeStyle(order.status)}`}
        >
          {order.status}
        </Badge>
      </div>

      <div className="flex items-center gap-2">
        {nextStatus && (
          <Button
            size="sm"
            onClick={handleChangeStatus}
            disabled={updating}
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            {updating ? (
              <FaSpinner className="animate-spin mr-1" />
            ) : (
              <FaArrowRight className="mr-1" />
            )}
            Mark as {nextStatus}
          </Button>
        )}
        {canCancel(order.status) && (
          <Button
            size="sm"
            variant="outline"
            onClick={handleCancel}
            disabled={updating}
            className="border-red-800 text-red-400 hover:bg-red-950"
          >
            Cancel order
          </Button>
        )}
      </div>
    </div>
  );
};

export default OrderStatusActions;
