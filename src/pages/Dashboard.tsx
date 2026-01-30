import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import TopProducts from "../components/TopProducts";
import RecentOrders from "../components/RecentOrders";
import { adminAPI } from "../shared/services/adminAPI";

export default function Dashboard() {
  const [stats, setStats] = useState({
    revenue: "$0",
    orders: "0",
    target: "0%"
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await adminAPI.getDashboardStats();
        setStats({
          revenue: data.revenue || "$0",
          orders: data.orders || "0", 
          target: data.target || "0%"
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
        // Keep default values on error
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 lg:ml-56">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-48 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 p-6 lg:ml-56">
        <h2 className="text-3xl font-bold text-gray-900">Welcome Back John</h2>
        <p className="text-gray-600 mb-6">Here is a summary of your store</p>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <StatCard title="Revenue" value={stats.revenue} trend="+10%" />
          <StatCard title="Orders" value={stats.orders} trend="-5%" />
          <StatCard title="Target" value={stats.target} trend="+7.5%" />
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <TopProducts />
          <div className="lg:col-span-2">
            <RecentOrders />
          </div>
        </div>
      </main>
    </div>
  );
}