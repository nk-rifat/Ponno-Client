"use client";

import OrdersFilters from "./OrdersFilters";
import OrdersTable from "./OrdersTable";

const ManageOrdersClient = () => {
  return (
    <div className="max-w-7xl mx-auto px-1 lg:px-4 py-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold md:text-3xl text-white">
          Manage Orders
        </h1>
        <p className="text-gray-400 mt-1">Track and update customer orders</p>
      </div>

      {/* Filters */}

      <OrdersFilters />

      {/* Table */}

      <OrdersTable />
    </div>
  );
};

export default ManageOrdersClient;
