"use client";

import { Button } from "@/components/ui/button";
import { blockCustomer } from "@/lib/api/customers";
import { FaBan, FaEye, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

const CustomersActions = ({ customer, onRefresh }) => {
  const handleToggleBlock = async () => {
    const result = await Swal.fire({
      title: customer.isBlocked ? "Unblock this user ? " : "Block this user",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#111827",
      cancelButtonColor: "#6b7280",
      confirmButtonText: customer.isBlocked ? "Yes, unblock" : "Yes, block",
    });
    if (!result.isConfirmed) return;

    try {
      const data = await blockCustomer(customer._id);

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: data.message,
        showConfirmButton: false,
        timer: 1500,
        background: "#ffffff",
        color: "#18181b",
      });
      onRefresh();
    } catch {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: "Action failed",
        showConfirmButton: false,
        timer: 1500,
        background: "#ffffff",
        color: "#18181b",
      });
    }
  };
  return (
    <div className="flex items-center justify-end gap-2">
      <Button
        size="icon"
        variant="ghost"
        className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-700"
        title="View"
      >
        <FaEye className="text-sm" />
      </Button>

      <Button
        size="icon"
        variant="ghost"
        className="h-8 w-8 text-yellow-400 hover:text-yellow-300 hover:bg-slate-700"
        title={customer.isBlocked ? "Unblock" : "Block"}
        onClick={handleToggleBlock}
      >
        <FaBan className="text-sm" />
      </Button>

      <Button
        size="icon"
        variant="ghost"
        className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-slate-700"
        title="Delete"
      >
        <FaTrash className="text-sm" />
      </Button>
    </div>
  );
};

export default CustomersActions;
