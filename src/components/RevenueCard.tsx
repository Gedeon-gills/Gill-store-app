import { FaDollarSign, FaShoppingCart, FaUsers, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { SimpleLineChart } from './SimpleLineChart';

export const RevenueCard = () => {
  const stats = [
    {
      title: 'Total Revenue',
      value: '$75,000',
      change: '+12.5%',
      positive: true,
      icon: FaDollarSign,
      color: 'bg-green-100 text-green-600'
    },
    {
      title: 'Total Orders',
      value: '1,250',
      change: '+8.2%',
      positive: true,
      icon: FaShoppingCart,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'New Customers',
      value: '890',
      change: '-2.1%',
      positive: false,
      icon: FaUsers,
      color: 'bg-purple-100 text-purple-600'
    }
  ];

  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    data: [12000, 19000, 15000, 25000, 22000, 30000, 28000]
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-800">Revenue Overview</h3>
        <select className="text-sm text-slate-500 bg-transparent border-none focus:outline-none cursor-pointer">
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option>Last 90 days</option>
        </select>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className={`inline-flex p-3 rounded-2xl ${stat.color} mb-3`}>
              <stat.icon className="text-xl" />
            </div>
            <div className="space-y-1">
              <h4 className="text-2xl font-bold text-slate-800">{stat.value}</h4>
              <p className="text-slate-500 text-sm">{stat.title}</p>
              <div className={`flex items-center justify-center gap-1 text-sm font-medium ${
                stat.positive ? 'text-green-500' : 'text-red-500'
              }`}>
                {stat.positive ? <FaArrowUp className="text-xs" /> : <FaArrowDown className="text-xs" />}
                <span>{stat.change}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue Chart */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-4">
        <h4 className="text-sm font-medium text-slate-700 mb-3">Weekly Revenue Trend</h4>
        <SimpleLineChart data={chartData} color="#8b5cf6" height={100} />
      </div>
    </div>
  );
};