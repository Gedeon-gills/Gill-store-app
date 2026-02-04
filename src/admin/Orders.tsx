import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { adminAPI } from "../shared/services/adminAPI";
import { FaSearch, FaFilter, FaDownload, FaEye } from "react-icons/fa";

interface Order {
  _id: string;
  orderNumber: string;
  customer: {
    name: string;
    email: string;
  };
  products: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  status: string;
  createdAt: string;
}

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setError(null);
        const data = await adminAPI.getOrders();
        const ordersArray = data.data?.orders || data.orders || [];
        // Transform the data to match the expected structure
        const transformedOrders = ordersArray.map((order: any) => ({
          _id: order._id,
          orderNumber: order._id.slice(-6).toUpperCase(),
          customer: {
            name: order.user?.name || 'Unknown Customer',
            email: order.user?.email || 'No email'
          },
          products: order.items || [],
          total: order.totalAmount || 0,
          status: order.status || 'pending',
          createdAt: order.createdAt
        }));
        setOrders(transformedOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError('Failed to load orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const cancelOrder = async (orderId: string, order: Order) => {
    if (!confirm('Are you sure you want to cancel this order?')) return;
    
    setUpdatingStatus(orderId);
    try {
      await adminAPI.cancelOrder(orderId, {
        customer: order.customer,
        orderNumber: order.orderNumber,
        totalAmount: order.total
      });
      
      // Update local state
      setOrders(prevOrders => 
        prevOrders.map(o => 
          o._id === orderId ? { ...o, status: 'cancelled' } : o
        )
      );
    } catch (error) {
      console.error('Failed to cancel order:', error);
      setError('Failed to cancel order');
    } finally {
      setUpdatingStatus(null);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: string, order: Order) => {
    setUpdatingStatus(orderId);
    try {
      await adminAPI.updateOrderStatus(orderId, newStatus, {
        customer: order.customer,
        orderNumber: order.orderNumber
      });
      
      // Update local state
      setOrders(prevOrders => 
        prevOrders.map(o => 
          o._id === orderId ? { ...o, status: newStatus } : o
        )
      );
    } catch (error) {
      console.error('Failed to update order status:', error);
      setError('Failed to update order status');
    } finally {
      setUpdatingStatus(null);
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const exportOrders = () => {
    const csv = [
      ['Order Number', 'Customer', 'Total', 'Status', 'Date'],
      ...filteredOrders.map(order => [
        order.orderNumber,
        order.customer.name,
        `$${order.total}`,
        order.status,
        new Date(order.createdAt).toLocaleDateString()
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'orders.csv';
    a.click();
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 lg:ml-56">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-64"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
            <div className="bg-white rounded-xl p-6 space-y-4">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="h-16 bg-gray-200 rounded"></div>
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
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Orders Management</h2>
          <p className="text-gray-600 mt-1">Manage all customer orders</p>
        </div>

        {/* Filters and Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent w-full sm:w-64"
                />
              </div>
              <div className="relative">
                <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
            <button
              onClick={exportOrders}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <FaDownload /> Export CSV
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order #</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Products</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <tr key={order._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        #{order.orderNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{order.customer.name}</div>
                          <div className="text-sm text-gray-500">{order.customer.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {order.products.length} item(s)
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        ${order.total.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order._id, e.target.value, order)}
                          disabled={updatingStatus === order._id}
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border-0 ${
                            order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                            order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                            order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                            order.status === 'pending' ? 'bg-orange-100 text-orange-800' :
                            'bg-red-100 text-red-800'
                          } ${updatingStatus === order._id ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button 
                          onClick={() => cancelOrder(order._id, order)}
                          disabled={updatingStatus === order._id || order.status === 'cancelled'}
                          className="text-red-600 hover:text-red-900 mr-3 disabled:opacity-50"
                          title="Cancel Order"
                        >
                          Cancel
                        </button>
                        <button className="text-purple-600 hover:text-purple-900">
                          <FaEye />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                      {searchTerm || statusFilter !== "all" ? "No orders match your filters" : "No orders found"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination would go here */}
        {filteredOrders.length > 0 && (
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-gray-700">
              Showing {filteredOrders.length} of {orders.length} orders
            </p>
          </div>
        )}
      </main>
    </div>
  );
}