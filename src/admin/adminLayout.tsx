import  { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings, 
  LogOut, 
  Bell, 
  Search,
  Menu,
  ChevronRight
} from 'lucide-react';
import { NavLink, Outlet, Link, useNavigate } from 'react-router-dom';
import { useNotifications } from '../shared/contexts/NotificationContext';
import { adminAPI } from '../shared/services/adminAPI';

export const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [adminProfile, setAdminProfile] = useState<any>({
    name: 'Admin User',
    email: 'admin@store.com',
    photo: null
  });
  const navigate = useNavigate();
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();

  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        const response = await adminAPI.getAdminProfile();
        console.log('Admin profile response:', response);
        setAdminProfile(response.data.user);
      } catch (error) {
        console.error('Failed to fetch admin profile:', error);
        // Keep default values if API fails
      }
    };
    fetchAdminProfile();
  }, []);

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      navigate('/');
    }
  };

  const menuItems = [
    { label: 'Overview', icon: LayoutDashboard, path: '/admin' },
    { label: 'Products', icon: Package, path: '/admin/products' },
    { label: 'Orders', icon: ShoppingCart, path: '/admin/orders' },
    { label: 'Customers', icon: Users, path: '/admin/customers' },
    { label: 'Settings', icon: Settings, path: '/admin/settings' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white border-r border-slate-200 flex flex-col transition-all duration-300 fixed h-full z-50`}>
        <div className="h-16 flex items-center px-6 border-b">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-gillstore-brand p-1.5 rounded-lg shrink-0">
              <Package className="w-5 h-5 text-white" />
            </div>
            {sidebarOpen && <span className="font-bold text-xl text-slate-900">Gill<span className="text-gillstore-brand">Hub</span></span>}
          </Link>
        </div>

        <nav className="flex-1 py-6 px-4 space-y-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              end={item.path === '/admin'}
              className={({ isActive }) => `
                flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all group
                ${isActive 
                  ? 'bg-gillstore-brand/10 text-gillstore-brand' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}
              `}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {sidebarOpen && <span>{item.label}</span>}
              {sidebarOpen && <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 w-full text-slate-500 hover:text-red-600 transition-colors font-medium"
          >
            <LogOut className="w-5 h-5" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Content Area */}
      <main className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'pl-64' : 'pl-20'}`}>
        {/* Admin Header */}
        <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-40 px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-slate-50 rounded-lg text-slate-500">
              <Menu className="w-5 h-5" />
            </button>
            <div className="relative hidden md:block">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search analytics..." 
                className="bg-slate-50 border-none rounded-lg pl-10 pr-4 py-1.5 text-sm w-64 focus:ring-1 focus:ring-gillstore-brand"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-slate-500 hover:bg-slate-50 rounded-lg cursor-pointer"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
                )}
              </button>
              
              {showNotifications && (
                <div className="absolute right-0 top-12 w-80 bg-white border border-slate-200 rounded-lg shadow-lg z-50">
                  <div className="p-4 border-b flex justify-between items-center">
                    <h3 className="font-semibold">Notifications</h3>
                    {unreadCount > 0 && (
                      <button 
                        onClick={markAllAsRead}
                        className="text-sm text-purple-600 hover:text-purple-800"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.slice(0, 10).map((notification) => (
                        <div 
                          key={notification.id}
                          className={`p-3 border-b hover:bg-slate-50 cursor-pointer ${
                            !notification.read ? 'bg-blue-50' : ''
                          }`}
                          onClick={() => markAsRead(notification.id)}
                        >
                          <p className="text-sm font-medium">{notification.message}</p>
                          <p className="text-xs text-slate-500 mt-1">
                            {notification.timestamp.toLocaleString()}
                          </p>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-center text-slate-500">
                        No notifications yet
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="h-8 w-px bg-slate-200"></div>
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-900">{adminProfile?.name || 'Admin User'}</p>
                <p className="text-xs text-slate-500">{adminProfile?.email || 'admin@store.com'}</p>
              </div>
              <img 
                src={adminProfile?.photo || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=facearea&facepad=2"} 
                alt="Profile" 
                className="w-10 h-10 rounded-full border border-slate-200"
              />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
