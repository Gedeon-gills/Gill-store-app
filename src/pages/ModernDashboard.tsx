import { useState, useEffect } from "react";
import { DashboardLayout } from "../components/DashboardLayout";
import { TargetCard } from "../components/TargetCard";
import { RevenueCard } from "../components/RevenueCard";
import { TopProducts } from "../components/TopProducts";
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

  return (
    <DashboardLayout>
      <div className="grid grid-cols-12 gap-6">
        {/* Left Section: Target & Revenue */}
        <div className="col-span-8 flex flex-col gap-6">
          <div className="flex gap-6">
            <TargetCard />
            <div className="flex-1 space-y-6">
              <div className="h-32 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-6 text-white flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Quick Stats</h3>
                  <p className="text-purple-100 text-sm">Real-time business metrics</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">{stats.orders}</div>
                  <div className="text-purple-100 text-sm">Total Orders</div>
                </div>
              </div>
            </div>
          </div>
          <RevenueCard />
        </div>

        {/* Right Section: Top Products */}
        <div className="col-span-4">
          <TopProducts />
        </div>
      </div>
    </DashboardLayout>
  );
}