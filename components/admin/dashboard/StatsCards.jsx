import {
  FaShoppingBag,
  FaClock,
  FaBoxOpen,
  FaExclamationTriangle,
  FaUsers,
  FaCoins,
} from "react-icons/fa";
import StatCard from "./StatCard";

const StatsCards = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
      <StatCard
        icon={FaCoins}
        label="Total revenue"
        value={`Tk ${stats.totalRevenue.toLocaleString()}`}
        accent="emerald"
      />
      <StatCard
        icon={FaShoppingBag}
        label="Total orders"
        value={stats.totalOrders}
        accent="blue"
      />
      <StatCard
        icon={FaClock}
        label="Pending orders"
        value={stats.pendingOrders}
        accent="yellow"
      />
      <StatCard
        icon={FaBoxOpen}
        label="Total products"
        value={stats.totalProducts}
        accent="blue"
      />
      <StatCard
        icon={FaExclamationTriangle}
        label="Out of stock"
        value={stats.outOfStockProducts}
        accent="red"
      />
      <StatCard
        icon={FaUsers}
        label="Total customers"
        value={stats.totalCustomers}
        accent="emerald"
      />
    </div>
  );
};

export default StatsCards;
