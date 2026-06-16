"use client";

import { Button } from "@/components/ui/button";
import { FaBan, FaEye, FaTrash } from "react-icons/fa";

const CustomersActions = ({ customer, onRefresh }) => {
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
