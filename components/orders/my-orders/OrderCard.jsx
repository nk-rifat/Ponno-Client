"use client";

import Image from "next/image";
import { useState } from "react";
import Swal from "sweetalert2";
import OrderStatusFlow from "./OrderStatusFlow";
import axiosInstance from "@/lib/axiosInstance";
import { FaDownload } from "react-icons/fa";

export default function OrderCard({ order, onCancelled }) {
  const [cancelling, setCancelling] = useState(false);
  const [downloadingReceipt, setDownloadingReceipt] = useState(false);

  const canCancel = ["pending", "confirmed"].includes(order.status);

  const handleDownloadReceipt = async () => {
    try {
      setDownloadingReceipt(true);
      const res = await axiosInstance.get(`/api/orders/${order._id}/receipt`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `receipt-${order._id.slice(-8).toUpperCase()}.pdf`,
      );
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to download receipt",
        text: "Something went wrong. Please try again.",
      });
    } finally {
      setDownloadingReceipt(false);
    }
  };
  const handleCancel = async () => {
    const result = await Swal.fire({
      title: "Cancel Order?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it",
      confirmButtonColor: "#dc2626",
    });

    if (!result.isConfirmed) return;

    try {
      setCancelling(true);

      const res = await axiosInstance.patch(`/api/orders/${order._id}/cancel`);

      Swal.fire({
        icon: "success",
        title: "Order cancelled",
        text: res.data.message,
        timer: 1500,
        showConfirmButton: false,
      });

      onCancelled(order._id, "cancelled");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to cancel order",
        text:
          error?.response?.data?.message ||
          "Something went wrong. Please try again.",
      });
    } finally {
      setCancelling(false);
    }
  };

  return (
    <div className="bg-white px-3 rounded-2xl border border-emerald-100 shadow-lg overflow-hidden">
      <div className="p-2 space-y-2">
        {/* HEADER */}

        <div className="lg:flex justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Order #{order._id.slice(-8).toUpperCase()}
            </h3>
            <p className="text-sm text-gray-600">
              Placed on {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="inline-flex items-center px-1 py-1 text-emerald-600 rounded-full text-normal font-medium">
              {order.status}
            </p>

            <p className="text-lg font-bold text-gray-900">Tk {order.total}</p>
          </div>
        </div>

        {/* ITEMS */}
        <div className="border-t border-gray-200 pt-4 space-y-4">
          {order.items.map((item) => (
            <div key={item.productId} className="flex items-center gap-4">
              <Image
                src={item.image}
                alt={item.name}
                width={64}
                height={64}
                className="w-16 h-16 rounded-lg object-cover"
              />

              <div className="flex-1">
                <h4 className="font-medium text-emerald-800">{item.name}</h4>
                <p className="text-sm text-gray-600">
                  {item.quantity} x {item.price}
                </p>
              </div>

              <div className="text-right font-medium text-gray-900">
                Tk {item.price * item.quantity}
              </div>
            </div>
          ))}
        </div>

        {/* ORDER FLOW */}
        <OrderStatusFlow
          status={order.status}
          statusHistory={order.statusHistory}
        />

        {/* ACTIONS */}
        <div className="border-t border-gray-200 pt-4 flex flex-wrap gap-3">
          <button
            onClick={handleDownloadReceipt}
            disabled={downloadingReceipt}
            className="flex items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition disabled:opacity-50"
          >
            <FaDownload className="mr-2" />
            {downloadingReceipt ? "Generating..." : "Download Receipt"}
          </button>

          {canCancel && (
            <button
              onClick={handleCancel}
              disabled={cancelling}
              className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition disabled:opacity-50"
            >
              {cancelling ? "Cancelling..." : "Cancel Order"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
