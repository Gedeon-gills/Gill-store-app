import { useState, useEffect } from 'react';
import { SimpleLineChart } from '../../../components/SimpleLineChart';
import { BarChart } from '../../../components/BarChart';
import { DonutChart } from '../../../components/DonutChart';
import { FaDollarSign, FaShoppingCart, FaUsers, FaArrowUp } from 'react-icons/fa';

export const HomeDashboard = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user && user !== 'undefined') {
      try {
        const userData = JSON.parse(user);
        // Show dashboard for admin users or specific roles
        setIsVisible(userData.role === 'admin' || userData.isAdmin);
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  if (!isVisible) return null;

  const revenueData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    data: [12000, 19000, 15000, 25000, 22000, 30000, 28000]
  };

  const salesData = [
    { label: 'Jan', value: 45 },
    { label: 'Feb', value: 52 },
    { label: 'Mar', value: 48 },
    { label: 'Apr', value: 61 },
    { label: 'May', value: 55 },
    { label: 'Jun', value: 67 }
  ];

  const categoryData = [
    { label: 'Electronics', value: 45, color: '#8b5cf6' },
    { label: 'Clothing', value: 30, color: '#06b6d4' },
    { label: 'Books', value: 15, color: '#10b981' },
    { label: 'Others', value: 10, color: '#f59e0b' }
  ];

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Business Analytics</h2>
          <p className="text-gray-600">Real-time insights into your store performance</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div className="p-3 bg-green-100 rounded-xl">
                <FaDollarSign className="text-green-600 text-xl" />
              </div>
              <div className="flex items-center gap-1 text-green-500 text-sm font-medium">
                <FaArrowUp className="text-xs" />
                <span>12.5%</span>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-bold text-gray-900">$75,000</h3>
              <p className="text-gray-500 text-sm">Total Revenue</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div className="p-3 bg-blue-100 rounded-xl">
                <FaShoppingCart className="text-blue-600 text-xl" />
              </div>
              <div className="flex items-center gap-1 text-green-500 text-sm font-medium">
                <FaArrowUp className="text-xs" />
                <span>8.2%</span>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-bold text-gray-900">1,250</h3>
              <p className="text-gray-500 text-sm">Total Orders</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div className="p-3 bg-purple-100 rounded-xl">
                <FaUsers className="text-purple-600 text-xl" />
              </div>
              <div className="flex items-center gap-1 text-green-500 text-sm font-medium">
                <FaArrowUp className="text-xs" />
                <span>5.1%</span>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-bold text-gray-900">890</h3>
              <p className="text-gray-500 text-sm">New Customers</p>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue Trend */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h3>
            <SimpleLineChart data={revenueData} color="#8b5cf6" height={120} />
          </div>

          {/* Monthly Sales */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Sales</h3>
            <BarChart data={salesData} color="#06b6d4" height={120} />
          </div>

          {/* Category Distribution */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales by Category</h3>
            <div className="flex justify-center">
              <DonutChart data={categoryData} size={120} />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 text-center">
          <a 
            href="/admin/dashboard" 
            className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors font-medium"
          >
            View Full Dashboard
          </a>
        </div>
      </div>
    </div>
  );
};