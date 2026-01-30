import { useState, useEffect } from "react";
import { adminAPI } from "../shared/services/adminAPI";

interface Order {
  id: string;
  product: string;
  customer: string;
  total: string;
  status: string;
  date: string;
}

export default function RecentOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await adminAPI.getOrders();
        setOrders(data.recentOrders || [
          { id: "ORD001", product: "Ipol Pro S6", customer: "Alice", total: "$27,000", status: "Success", date: "2024-01-15" },
          { id: "ORD002", product: "Earphone G1", customer: "Alex", total: "$14,000", status: "Pending", date: "2024-01-14" },
          { id: "ORD003", product: "Mouse Logic G", customer: "Ben", total: "$14,000", status: "Success", date: "2024-01-13" },
        ]);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setOrders([
          { id: "ORD001", product: "Ipol Pro S6", customer: "Alice", total: "$27,000", status: "Success", date: "2024-01-15" },
          { id: "ORD002", product: "Earphone G1", customer: "Alex", total: "$14,000", status: "Pending", date: "2024-01-14" },
          { id: "ORD003", product: "Mouse Logic G", customer: "Ben", total: "$14,000", status: "Success", date: "2024-01-13" },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h4>
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-12 bg-gray-200 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h4 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h4>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-900">{order.product}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{order.customer}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{order.total}</td>
                <td className="px-4 py-3 text-sm">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    order.status === 'Success' ? 'bg-green-100 text-green-800' :
                    order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}