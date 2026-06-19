"use client";

import { FaCheck } from "react-icons/fa6";

const STEPS = [
  { key: "pending", label: "Order Placed" },
  { key: "confirmed", label: "Confirmed" },
  { key: "processing", label: "processing" },
  { key: "shipped", label: "Shipped" },
  { key: "delivered", label: "Delivered" },
];

export default function OrderStatusFlow({ status, statusHistory = [] }) {
  if (status === "cancelled") {
    const cancelEntry = [...statusHistory]
      .reverse()
      .find((entry) => entry.status === "cancelled");

    let cancelledByLabel = "Cancelled by Admin";

    if (cancelEntry) {
      const cancelledByUser = cancelEntry.note
        ?.toLowerCase()
        .includes("customer");
      cancelledByLabel = cancelledByUser
        ? "Cancelled by User"
        : "Cancelled by Admin";
    } else {
      cancelledByLabel = "Cancelled by User";
    }

    return (
      <div className="border-t border-gray-200 pt-4">
        <h4 className="font-medium text-gray-900 mb-3">Order Status</h4>
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-red-600 bg-red-50 px-3 py-1 rounded-md border border-red-100">
            🔴 {cancelledByLabel}
          </span>
        </div>
      </div>
    );
  }

  const currentIndex = STEPS.findIndex((s) => s.key === status);

  return (
    <div className="border-t border-gray-200 pt-4">
      <h4 className="font-medium text-gray-900 mb-3">Order Status</h4>

      {/* Upper Part: Horizontal Flow */}
      <div className="flex items-center space-x-4 text-sm flex-wrap gap-y-3">
        {STEPS.map((step, i, arr) => {
          const isDone = i < currentIndex;
          const isCurrent = i === currentIndex;

          return (
            <div key={step.key} className="flex items-center">
              <div
                className={`flex items-center ${
                  isDone || isCurrent ? "text-green-600" : "text-gray-400"
                }`}
              >
                <FaCheck
                  className={`w-4 h-4 mr-1 ${isCurrent ? "animate-pulse" : ""}`}
                />

                <span className={isCurrent ? "font-semibold" : ""}>
                  {step.label}
                </span>
              </div>

              {/* Connecting Line */}
              {i < arr.length - 1 && (
                <div
                  className={`w-8 h-0.5 ml-4 ${
                    isDone ? "bg-green-500" : "bg-gray-200"
                  }`}
                ></div>
              )}
            </div>
          );
        })}
      </div>

      {/* Lower Part: Dynamic Status Badges */}
      <div className="mt-5 flex flex-wrap gap-2">
        {status === "pending" && (
          <span className="text-xs bg-blue-50 text-blue-600 px-3 py-1.5 rounded-md border border-blue-100 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            Waiting for admin review
          </span>
        )}
        {status === "confirmed" && (
          <span className="text-xs bg-green-50 text-green-600 px-3 py-1.5 rounded-md border border-green-100 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            Order confirmed — processing begins
          </span>
        )}
        {status === "processing" && (
          <span className="text-xs bg-green-50 text-green-600 px-3 py-1.5 rounded-md border border-green-100 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            Preparing your items
          </span>
        )}
        {status === "shipped" && (
          <span className="text-xs bg-blue-50 text-blue-600 px-3 py-1.5 rounded-md border border-blue-100 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            Your order is on the way
          </span>
        )}
        {status === "delivered" && (
          <span className="text-xs bg-green-50 text-green-600 px-3 py-1.5 rounded-md border border-green-100 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            Successfully delivered
          </span>
        )}
      </div>
    </div>
  );
}
