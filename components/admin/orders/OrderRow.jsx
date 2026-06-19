"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FaArrowRight, FaSpinner } from "react-icons/fa";
import { changeOrderStatus, cancelAdminOrder } from "@/lib/api/admin-orders";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  getStatusBadgeStyle,
  getNextStatus,
  canCancel,
} from "./_utils/orderHelpers";

const OrderRow = ({ order, onUpdated }) => {
  const [updating, setUpdating] = useState(false);

  const nextStatus = getNextStatus(order.status);
  const itemsCount = order.items.reduce((sum, item) => sum + item.quantity, 0);

  const handleAdvance = async () => {
    const result = await Swal.fire({
      title: `Mark as ${nextStatus}?`,
      text: `Order will move from "${order.status}" to "${nextStatus}".`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      confirmButtonText: "Yes, update",
    });

    if (!result.isConfirmed) return;

    setUpdating(true);
    try {
      const data = await changeOrderStatus(order._id);
      Swal.fire("Updated!", `Order is now ${data.order.status}.`, "success");
      onUpdated(data.order);
    } catch {
      Swal.fire("Error", "Could not update order status.", "error");
    } finally {
      setUpdating(false);
    }
  };

  const handleCancel = async () => {
    const result = await Swal.fire({
      title: "Cancel this order?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      confirmButtonText: "Yes, cancel",
    });

    if (!result.isConfirmed) return;

    setUpdating(true);
    try {
      const data = await cancelAdminOrder(order._id);
      Swal.fire("Cancelled", "Order has been cancelled.", "success");
      onUpdated(data.order);
    } catch {
      Swal.fire("Error", "Could not cancel order.", "error");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <TableRow className="border-b border-slate-700 hover:bg-slate-800/50 transition">
      <TableCell className="px-4 py-4 text-sm text-gray-300 font-mono border-none hidden md:table-cell">
        {order._id.slice(-8)}
      </TableCell>
      <TableCell className="px-4 py-4 border-none">
        <div className="space-y-1">
          {/* Mobile-only Order ID Badge */}
          <span className="inline-block md:hidden px-1.5 py-0.5 bg-slate-700 text-gray-300 rounded font-mono text-[10px] uppercase tracking-wider mb-1">
            ID: #{order._id.slice(-8)}
          </span>
          <p className="text-white text-sm font-medium">{order.delivery.name}</p>
          <p className="text-gray-500 text-xs">{order.delivery.phone}</p>
          
          {/* Mobile-only Summary Data Block */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 pt-1 text-xs md:hidden">
            <span className="text-gray-400">
              {itemsCount} item{itemsCount > 1 ? "s" : ""}
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-emerald-400 font-medium">Tk {order.total}</span>
          </div>
        </div>
      </TableCell>
      <TableCell className="px-4 py-4 text-sm text-gray-300 border-none hidden md:table-cell">
        {itemsCount} item{itemsCount > 1 ? "s" : ""}
      </TableCell>
      <TableCell className="px-4 py-4 text-sm text-white font-medium border-none hidden md:table-cell">
        Tk {order.total}
      </TableCell>
      <TableCell className="px-4 py-4 border-none vertical-align-top">
        <Badge
          className={`capitalize border whitespace-nowrap ${getStatusBadgeStyle(order.status)}`}
        >
          {order.status}
        </Badge>
      </TableCell>
      <TableCell className="px-4 py-4 border-none">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 max-w-35 sm:max-w-none">
          {nextStatus && (
            <Button
              size="sm"
              onClick={handleAdvance}
              disabled={updating}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs w-full sm:w-auto justify-center"
            >
              {updating ? (
                <FaSpinner className="animate-spin" />
              ) : (
                <FaArrowRight className="mr-1 shrink-0" />
              )}
              <span className="truncate">Mark {nextStatus}</span>
            </Button>
          )}
          {canCancel(order.status) && (
            <Button
              size="sm"
              variant="outline"
              onClick={handleCancel}
              disabled={updating}
              className="border-red-300 text-red-500 hover:bg-red-500 text-xs w-full sm:w-auto justify-center"
            >
              Cancel
            </Button>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
};

export default OrderRow;