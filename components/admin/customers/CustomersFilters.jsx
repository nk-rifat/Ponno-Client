"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

const CustomersFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const status = searchParams.get("status") || "";

  const updateParams = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "all") {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    params.set("page", "1");
    router.push(`/admin/dashboard/customers?${params.toString()}`);
  };

  const debouncedSearch = useDebouncedCallback((value) => {
    updateParams("search", value);
  }, 400);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    debouncedSearch(e.target.value);
  };
  return (
    <div className="flex items-center justify-between gap-3">
      <Input
        placeholder="Search name or email..."
        value={search}
        onChange={handleSearchChange}
        className="w-64 bg-slate-800 border-green-200 text-white placeholder:text-slate-400"
      />

      <Select
        value={status}
        onValueChange={(val) => updateParams("status", val)}
      >
        <SelectTrigger>
          <SelectValue placeholder="All status" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">All status</SelectItem>
          <SelectItem value="verified">Verified</SelectItem>
          <SelectItem value="unverified">Unverified</SelectItem>
          <SelectItem value="blocked">Blocked</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default CustomersFilters;
