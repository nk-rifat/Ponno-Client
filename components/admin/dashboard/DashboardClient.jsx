"use client";

import { useEffect, useState } from "react";
import { getDashboardSummary } from "@/lib/api/admin-dashboard";
import StatsCards from "./StatsCards";
import RevenueChart from "./RevenueChart";
import RecentOrdersList from "./RecentOrdersList";
import DashboardSkeleton from "./DashboardSkeleton";

const DashboardClient = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const result = await getDashboardSummary();
        setData(result);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  if (loading) return <DashboardSkeleton />;

  if (error || !data) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-gray-400">
        Failed to load dashboard.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-3 lg:px-4 py-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold md:text-3xl text-white">Dashboard</h1>
        <p className="text-gray-400 mt-1">Overview of your store performance</p>
      </div>

      <div className="mb-6">
        <StatsCards stats={data.stats} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueChart chartData={data.chartData} />
        </div>
        <RecentOrdersList orders={data.recentOrders} />
      </div>
    </div>
  );
};

export default DashboardClient;
