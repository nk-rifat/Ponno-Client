"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { getAdminOrderById } from "@/lib/api/admin-orders";
import OrderDetailSkeleton from "./OrderDetailSkeleton";
import OrderSummaryCard from "./OrderSummaryCard";
import OrderItemsList from "./OrderItemsList";
import OrderDeliveryInfo from "./OrderDeliveryInfo";
import OrderStatusTimeline from "./OrderStatusTimeline";
import OrderStatusActions from "./OrderStatusActions";

const OrderDetailClient = ({ orderId }) => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // 1. Initialize an active flag
    let isCurrent = true;

    const fetchOrder = async () => {
      setLoading(true);
      try {
        const data = await getAdminOrderById(orderId);
        // 2. Only update state if this effect instance is still active
        if (isCurrent) {
          setOrder(data.order);
        }
      } catch (err) {
        console.error(err);
        if (isCurrent) {
          setError(true);
        }
      } finally {
        if (isCurrent) {
          setLoading(false);
        }
      }
    };

    fetchOrder();

    // 3. Cleanup function sets the flag to false when orderId changes or component unmounts
    return () => {
      isCurrent = false;
    };
  }, [orderId]);

  if (loading) return <OrderDetailSkeleton />;

  if (error || !order) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center text-gray-400">
        Failed to load order.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 sm:py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/admin/dashboard/orders"
          className="text-gray-400 hover:text-white transition"
        >
          <FaArrowLeft />
        </Link>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white">
            Order #{order._id.slice(-8)}
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Placed on{" "}
            {new Date(order.createdAt).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* Status actions */}
      <OrderStatusActions order={order} onUpdated={setOrder} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Left column: items + summary */}
        <div className="lg:col-span-2 space-y-6">
          <OrderItemsList items={order.items} />
          <OrderSummaryCard order={order} />
        </div>

        {/* Right column: delivery + timeline */}
        <div className="space-y-6">
          <OrderDeliveryInfo delivery={order.delivery} />
          <OrderStatusTimeline
            statusHistory={order.statusHistory}
            currentStatus={order.status}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderDetailClient;
