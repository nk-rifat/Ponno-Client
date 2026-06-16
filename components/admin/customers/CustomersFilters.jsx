"use client";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";

const CustomersFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const search = searchParams.get("search") || "";
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
  return (
    <div className="flex flex-wrap gap-3">
      <Input
        placeholder="Search name or email..."
        value={search}
        onChange={(e) => updateParams("search", e.target.value)}
        className="w-64 bg-slate-800 border-slate-700 text-white placeholder:text-slate-400"
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
