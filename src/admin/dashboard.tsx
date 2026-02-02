import {} from "react";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingBag,
  Users,
  ArrowUpRight,
} from "lucide-react";

export const Dashboard = () => {
  const stats = [
    {
      label: "Total Revenue",
      value: "$84,234.00",
      trend: "+12.5%",
      isUp: true,
      icon: DollarSign,
      color: "blue",
    },
    {
      label: "Active Orders",
      value: "142",
      trend: "+5.2%",
      isUp: true,
      icon: ShoppingBag,
      color: "orange",
    },
    {
      label: "New Customers",
      value: "891",
      trend: "-2.4%",
      isUp: false,
      icon: Users,
      color: "green",
    },
    {
      label: "Conversion Rate",
      value: "4.8%",
      trend: "+0.6%",
      isUp: true,
      icon: TrendingUp,
      color: "purple",
    },
  ];

  const recentOrders = [
    {
      id: "#ORD-7821",
      customer: "John Smith",
      product: "Noise-Cancelling Headphones",
      amount: "$349.99",
      status: "Delivered",
      date: "2 mins ago",
    },
    {
      id: "#ORD-7822",
      customer: "Sarah Brown",
      product: "Mechanical Keyboard",
      amount: "$129.50",
      status: "Processing",
      date: "15 mins ago",
    },
    {
      id: "#ORD-7823",
      customer: "Alex Johnson",
      product: "Smart Watch S8",
      amount: "$399.00",
      status: "Shipped",
      date: "1 hour ago",
    },
    {
      id: "#ORD-7824",
      customer: "Emma Wilson",
      product: "Ergonomic Chair",
      amount: "$599.00",
      status: "Processing",
      date: "3 hours ago",
    },
    {
      id: "#ORD-7825",
      customer: "Michael Lee",
      product: "Leather Bag",
      amount: "$185.00",
      status: "Delivered",
      date: "5 hours ago",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Dashboard Overview
        </h1>
        <p className="text-slate-500">
          Welcome back! Here's what's happening today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl bg-slate-50 text-slate-700`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <span
                className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${stat.isUp ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
              >
                {stat.isUp ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                {stat.trend}
              </span>
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">
                {stat.value}
              </h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Table Area */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-bold text-slate-900">Recent Orders</h3>
            <button className="text-sm font-bold text-gillstore-brand hover:underline">
              View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 text-xs uppercase tracking-wider text-slate-400">
                  <th className="px-6 py-4 font-semibold">Order ID</th>
                  <th className="px-6 py-4 font-semibold">Customer</th>
                  <th className="px-6 py-4 font-semibold">Amount</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-slate-100">
                {recentOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-slate-900">
                      {order.id}
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-slate-900">
                          {order.customer}
                        </p>
                        <p className="text-xs text-slate-500">
                          {order.product}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-900">
                      {order.amount}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                          order.status === "Delivered"
                            ? "bg-green-100 text-green-700"
                            : order.status === "Shipped"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-slate-400 hover:text-gillstore-brand">
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Categories Breakdown */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h3 className="font-bold text-slate-900 mb-6">Device Usage</h3>
          <div className="space-y-6">
            {[
              { label: "Mobile App", value: 45, color: "bg-orange-500" },
              { label: "Desktop Store", value: 35, color: "bg-blue-500" },
              { label: "Social Referral", value: 20, color: "bg-green-500" },
            ].map((device) => (
              <div key={device.label}>
                <div className="flex justify-between text-sm font-medium mb-1.5">
                  <span className="text-slate-600">{device.label}</span>
                  <span className="text-slate-900">{device.value}%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${device.color}`}
                    style={{ width: `${device.value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-slate-50 rounded-xl border border-dashed border-slate-300">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              💡 Sales Insight
            </h4>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Traffic from Mobile has increased by 12% this week. Consider
              running a mobile-exclusive promo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
