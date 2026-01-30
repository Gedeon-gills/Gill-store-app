import { BarChart } from './BarChart';
import { DonutChart } from './DonutChart';

export const SalesChart = () => {
  const salesData = [
    { label: 'Jan', value: 45000 },
    { label: 'Feb', value: 52000 },
    { label: 'Mar', value: 48000 },
    { label: 'Apr', value: 61000 },
    { label: 'May', value: 55000 },
    { label: 'Jun', value: 67000 }
  ];

  const categoryData = [
    { label: 'Electronics', value: 45, color: '#8b5cf6' },
    { label: 'Clothing', value: 30, color: '#06b6d4' },
    { label: 'Books', value: 15, color: '#10b981' },
    { label: 'Others', value: 10, color: '#f59e0b' }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Monthly Sales Bar Chart */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-800">Monthly Sales</h3>
          <span className="text-sm text-slate-500">Last 6 months</span>
        </div>
        <BarChart data={salesData} color="#8b5cf6" height={200} />
      </div>

      {/* Category Distribution Donut Chart */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-800">Sales by Category</h3>
          <span className="text-sm text-slate-500">This month</span>
        </div>
        <div className="flex justify-center">
          <DonutChart data={categoryData} size={160} />
        </div>
      </div>
    </div>
  );
};