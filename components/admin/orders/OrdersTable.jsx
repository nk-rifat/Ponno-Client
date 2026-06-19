"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getAdminOrders } from "@/lib/api/admin-orders";
import Pagination from "@/components/shared/Pagination";
import OrderRow from "./OrderRow";
import OrderRowSkeleton from "./OrderRowSkeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const OrdersTable = () => {
  const searchParams = useSearchParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const params = {
          search: searchParams.get("search") || undefined,
          status: searchParams.get("status") || undefined,
          page: searchParams.get("page") || 1,
          limit: 10,
        };

        Object.keys(params).forEach(
          (k) => params[k] === undefined && delete params[k],
        );

        const result = await getAdminOrders(params);
        setData(result);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [searchParams]);

  const handleOrderUpdated = (updatedOrder) => {
    setData((prev) => ({
      ...prev,
      orders: prev.orders.map((o) =>
        o._id === updatedOrder._id ? updatedOrder : o,
      ),
    }));
  };

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="border-b border-slate-700">
            <TableRow className="border-b border-slate-700 hover:bg-transparent">
              <TableHead className="px-4 py-3 text-xs font-medium uppercase h-auto text-green-500 hidden md:table-cell">
                Order ID
              </TableHead>
              <TableHead className="px-4 py-3 text-green-500 text-xs font-medium uppercase h-auto">
                Customer
              </TableHead>
              <TableHead className="px-4 py-3 text-green-500 text-xs font-medium uppercase h-auto hidden md:table-cell">
                Items
              </TableHead>
              <TableHead className="px-4 py-3 text-green-500 text-xs font-medium  uppercase h-auto hidden md:table-cell">
                Total
              </TableHead>
              <TableHead className="px-4 py-3 text-green-500 text-xs font-medium uppercase h-auto">
                Status
              </TableHead>
              <TableHead className="px-4 py-3 text-green-500 text-xs font-medium uppercase h-auto text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading &&
              Array.from({ length: 6 }).map((_, i) => (
                <OrderRowSkeleton key={i} />
              ))}

            {!loading && data?.orders?.length === 0 && (
              <TableRow className="hover:bg-transparent">
                <TableCell
                  colSpan={6}
                  className="text-center py-16 text-gray-500 border-none"
                >
                  No orders found.
                </TableCell>
              </TableRow>
            )}

            {!loading &&
              data?.orders?.map((order) => (
                <OrderRow
                  key={order._id}
                  order={order}
                  onUpdated={handleOrderUpdated}
                />
              ))}
          </TableBody>
        </Table>
      </div>

      {!loading && data?.totalPages > 1 && (
        <div className="p-4 border-t border-slate-700">
          <Pagination
            totalPages={data.totalPages}
            basePath="/admin/dashboard/orders"
          />
        </div>
      )}
    </div>
  );
};

export default OrdersTable;
