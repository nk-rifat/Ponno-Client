"use client";
import Pagination from "@/components/shared/Pagination";
import axiosInstance from "@/lib/axiosInstance";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import OrderCard from "./OrderCard";

const STATUS_OPTIONS = [
  { label: "All Orders", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Confirmed", value: "confirmed" },
  { label: "Shipped", value: "shipped" },
  { label: "Delivered", value: "delivered" },
  { label: "Cancelled", value: "cancelled" },
];
const OrdersPageClient = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page") || 1);
  const status = searchParams.get("status") || "all";

  const [orders, setOrders] = useState([]);
  const [totalPages, setTotalPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await axiosInstance.get("/api/orders/my-orders", {
          params: {
            page,
            limit: 5,
            status,
          },
        });

        setOrders(res.data.orders || []);
        setTotalPage(res.data.totalPages || 1);
      } catch (error) {
        setError(
          error?.response?.data?.message || "Failed to load your orders",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [page, status]);

  const handleStatusChange = (e) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("status", e.target.value);
    params.set("page", "1");
    router.push(`/orders/my-orders?${params.toString()}`);
  };

  const handleCancelled = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o._id === orderId ? { ...o, status: newStatus } : o)),
    );
  };

  return (
    <>
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 px-2">
          <div>
            <h1 className="text-2xl font-bold text-emerald-800">My Orders</h1>
            <p className="text-gray-600 mt-1 text-sm">
              Track and manage your orders
            </p>
          </div>
          <div className="mt-2 sm:mt-1 flex space-x-3">
            <select
              value={status}
              onChange={handleStatusChange}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading && (
          <div className="text-center py-16 text-gray-500 dark:text-gray-400">
            Loading your orders...
          </div>
        )}

        {!loading && error && (
          <div className="text-center py-16 text-red-500">{error}</div>
        )}

        {!loading && !error && orders.length === 0 && (
          <div className="text-center py-16">
            <i className="fas fa-box-open text-4xl text-gray-300 dark:text-gray-600 mb-4"></i>
            <p className="text-gray-600 dark:text-gray-400">
              No orders found for this filter.
            </p>
          </div>
        )}

        {!loading && !error && orders.length > 0 && (
          <div className="space-y-6">
            {orders.map((order) => (
              <OrderCard
                key={order._id}
                order={order}
                onCancelled={handleCancelled}
              />
            ))}
          </div>
        )}

        <Pagination totalPages={totalPages} basePath="/orders/my-orders" />
      </div>
    </>
  );
};

export default OrdersPageClient;
