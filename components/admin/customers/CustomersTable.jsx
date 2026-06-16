"use client";
import Pagination from "@/components/shared/Pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getCustomers } from "@/lib/api/customers";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import Swal from "sweetalert2";
import CustomersRow from "./CustomersRow";
import CustomersFilters from "./CustomersFilters";

const LIMIT = 10;

const CustomersTable = () => {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") || 1);
  const search = searchParams.get("search") || "";
  const status = searchParams.get("status") || "";

  const [customers, setCustomers] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchCustomers = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page, limit: LIMIT };
      if (search) params.search = search;
      if (status !== "all") params.status = status;

      const { users, total, totalPages } = await getCustomers(params);

      setCustomers(users);
      setTotal(total);
      setTotalPages(totalPages);
    } catch {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: "Failed to fetch customers",
        showConfirmButton: false,
        timer: 1500,
      });
    } finally {
      setLoading(false);
    }
  }, [page, search, status]);

  useEffect(() => {
    const delay = setTimeout(fetchCustomers, 400);

    return () => clearTimeout(delay);
  }, [fetchCustomers]);
  return (
    <div className="space-y-6 max-w-7xl mx-auto ">
      <h1 className="text-2xl font-medium text-white">
        Customers <span>({total})</span>
      </h1>

      {/* Filters */}

      <CustomersFilters />

      {/* Table */}
      <div className="rounded-xl border border-slate-800 overflow-hidden">
        <Table>
          <TableHeader className="text-base">
            <TableRow className="border-slate-800 hover:bg-transparent">
              <TableHead className="text-white w-[40%]">Customer</TableHead>
              <TableHead className="text-white w-[20%]">Status</TableHead>
              <TableHead className="text-white hidden md:table-cell w-[20%]">Joined</TableHead>
              <TableHead className="text-white w-auto text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center text-slate-400 py-10"
                >
                  Loading...
                </TableCell>
              </TableRow>
            ) : customers.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center text-slate-400 py-10"
                >
                  No customers found
                </TableCell>
              </TableRow>
            ) : (
              customers.map((customer) => (
                <CustomersRow
                  key={customer._id}
                  customer={customer}
                  onRefresh={fetchCustomers}
                />
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          basePath="/admin/dashboard/customers"
        />
      )}
    </div>
  );
};

export default CustomersTable;
