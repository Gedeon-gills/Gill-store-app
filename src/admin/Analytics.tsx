import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { adminAPI } from "../shared/services/adminAPI";
import { FaArrowUp, FaArrowDown, FaUsers, FaShoppingCart, FaDollarSign, FaEye } from "react-icons/fa";

interface AnalyticsData {
  revenue: {
    current: number;
    previous: number;
    change: number;
  };
  orders: {
    current: number;
    previous: number;
    change: number;
  };
  customers: {
    current: number;
    previous: number;
    change: number;
  };
  pageViews: {
    current: number;
    previous: number;
    change: number;
  };
  topProducts: Array<{
    name: string;
    sales: number;
    revenue: number;
  }>;
  salesChart: Array<{
    date: string;
    sales: number;
    revenue: number;
  }>;
}

export default function Analytics() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState("7d");

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setError(null);
        const response = await adminAPI.getAnalytics(timeRange);
        const analyticsData = response.data;
        setData({
          revenue: analyticsData.revenue,
          orders: analyticsData.orders,
          customers: analyticsData.customers,
          pageViews: { current: 15420, previous: 14200, change: 8.6 },
          topProducts: [
            { name: "Wireless Headphones", sales: 145, revenue: 28900 },
            { name: "Smart Watch", sales: 98, revenue: 24500 },
            { name: "Laptop Stand", sales: 87, revenue: 8700 }
          ],
          salesChart: analyticsData.chartData || []
        });
      } catch (error) {
        console.error('Error fetching analytics:', error);
        setError('Failed to load analytics data');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [timeRange]);

interface MetricCardProps {
  title: string;
  current: number;
  previous: number;
  change: number;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

  const MetricCard = ({ title, current, previous, change, icon: Icon, color }: MetricCardProps) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">
            {title.includes('Revenue') ? `$${current.toLocaleString()}` : current.toLocaleString()}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Previous: {title.includes('Revenue') ? `$${previous.toLocaleString()}` : previous.toLocaleString()}
          </p>
          <div className="flex items-center mt-2">
            {change >= 0 ? (
              <FaArrowUp className="text-green-500 text-sm mr-1" />
            ) : (
              <FaArrowDown className="text-red-500 text-sm mr-1" />
            )}
            <span className={`text-sm font-medium ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {Math.abs(change)}%
            </span>
            <span className="text-gray-500 text-sm ml-1">vs last period</span>
          </div>
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="text-white text-xl" />
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 lg:ml-56">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-64"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="h-80 bg-gray-200 rounded-xl"></div>
              <div className="h-80 bg-gray-200 rounded-xl"></div>
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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h2>
            <p className="text-gray-600 mt-1">Track your business performance</p>
          </div>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="mt-4 sm:mt-0 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {data && (
          <>
            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <MetricCard
                title="Total Revenue"
                current={data.revenue.current}
                previous={data.revenue.previous}
                change={data.revenue.change}
                icon={FaDollarSign}
                color="bg-green-500"
              />
              <MetricCard
                title="Total Orders"
                current={data.orders.current}
                previous={data.orders.previous}
                change={data.orders.change}
                icon={FaShoppingCart}
                color="bg-blue-500"
              />
              <MetricCard
                title="New Customers"
                current={data.customers.current}
                previous={data.customers.previous}
                change={data.customers.change}
                icon={FaUsers}
                color="bg-purple-500"
              />
              <MetricCard
                title="Page Views"
                current={data.pageViews.current}
                previous={data.pageViews.previous}
                change={data.pageViews.change}
                icon={FaEye}
                color="bg-orange-500"
              />
            </div>

            {/* Charts and Tables */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Sales Chart Placeholder */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales Overview</h3>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                  <p className="text-gray-500">Chart would be rendered here with a library like Chart.js or Recharts</p>
                </div>
              </div>

              {/* Top Products */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Products</h3>
                <div className="space-y-4">
                  {data.topProducts.map((product, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{product.name}</p>
                        <p className="text-sm text-gray-500">{product.sales} sales</p>
                      </div>
                      <p className="font-semibold text-gray-900">${product.revenue.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Additional Analytics */}
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Conversion Rate</h3>
                <div className="text-center">
                  <p className="text-3xl font-bold text-purple-600">3.2%</p>
                  <p className="text-sm text-gray-500 mt-1">+0.5% from last period</p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Average Order Value</h3>
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-600">$127</p>
                  <p className="text-sm text-gray-500 mt-1">+$12 from last period</p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Retention</h3>
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-600">68%</p>
                  <p className="text-sm text-gray-500 mt-1">+2% from last period</p>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}