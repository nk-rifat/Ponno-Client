"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import { changeOrderStatus, cancelAdminOrder } from "@/lib/api/admin-orders";
import { getNextStatus } from "@/components/admin/orders/_utils/orderHelpers";

export function useOrderStatusActions(order, onUpdated) {
  const [updating, setUpdating] = useState(false);

  const nextStatus = getNextStatus(order.status);

  const handleChangeStatus = async () => {
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

  return { nextStatus, updating, handleChangeStatus, handleCancel };
}
