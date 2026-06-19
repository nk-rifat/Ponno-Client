"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ORDER_STATUSES = [
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

const OrdersFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const status = searchParams.get("status") || "all";

  const updateParams = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "all") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.set("page", "1");
    router.push(`/admin/dashboard/orders?${params.toString()}`);
  };

  const debouncedSearch = useDebouncedCallback((value) => {
    updateParams("search", value);
  }, 400);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    debouncedSearch(e.target.value);
  };

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
      <Input
        placeholder="Search by name or phone..."
        value={search}
        onChange={handleSearchChange}
        className="sm:w-72 bg-slate-800 border-slate-600 text-white placeholder:text-slate-500"
      />

      <Select
        value={status}
        onValueChange={(val) => updateParams("status", val)}
      >
        <SelectTrigger className="sm:w-48 bg-slate-800 border-slate-600 text-white">
          <SelectValue placeholder="All status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All status</SelectItem>
          {ORDER_STATUSES.map((s) => (
            <SelectItem key={s} value={s} className="capitalize">
              {s}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default OrdersFilters;
