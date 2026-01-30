import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaTachometerAlt, FaShoppingCart, FaBox, FaUsers, FaBullhorn, FaSearch, FaBell, FaCalendar, FaPlus, FaChevronDown, FaSignOutAlt, FaCog } from 'react-icons/fa';
import UserAvatar from '../shared/components/ui/UserAvatar';

interface SidebarItemProps {
  icon: React.ComponentType<any>;
  label: string;
  active?: boolean;
  hasChild?: boolean;
  to?: string;
}

const SidebarItem = ({ icon: Icon, label, active = false, hasChild = false, to }: SidebarItemProps) => {
  const content = (
    <div className={`flex items-center justify-between px-4 py-3 cursor-pointer rounded-lg transition-all duration-200 ${
      active ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-slate-600 hover:bg-blue-50 hover:text-blue-700'
    }`}>
      <div className="flex items-center gap-3">
        <Icon className="text-lg" />
        <span className="font-medium text-sm">{label}</span>
      </div>
      {hasChild && <FaChevronDown className="text-sm" />}
    </div>
  );

  return to ? <Link to={to}>{content}</Link> : content;
};

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [notifications] = useState([
    { id: 1, message: 'New order received', time: '2 min ago', unread: true },
    { id: 2, message: 'Product stock low', time: '1 hour ago', unread: true },
    { id: 3, message: 'Customer review posted', time: '3 hours ago', unread: false }
  ]);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData && userData !== 'undefined') {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/admin/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/');
  };

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-100 flex flex-col p-4 gap-2">
        <div className="flex items-center gap-2 px-2 mb-8">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
            B
          </div>
          <span className="text-xl font-bold text-slate-800">B-DIFFERENT</span>
        </div>

        <nav className="flex flex-col gap-1">
          <SidebarItem 
            icon={FaTachometerAlt} 
            label="Dashboard" 
            active={pathname === '/admin/dashboard'} 
            to="/admin/dashboard"
          />
          <SidebarItem icon={FaBox} label="Products" hasChild />
          <div className="pl-12 flex flex-col gap-2 mt-2 mb-4">
            <Link to="/admin/products">
              <span className="text-sm text-blue-600 font-medium cursor-pointer hover:text-blue-700 transition-colors">
                Product List
              </span>
            </Link>
            <span className="text-sm text-slate-400 cursor-pointer hover:text-slate-600 transition-colors">
              Product Categories
            </span>
          </div>
          <SidebarItem 
            icon={FaUsers} 
            label="Customers" 
            active={pathname === '/admin/customers'} 
            to="/admin/customers"
          />
          <SidebarItem 
            icon={FaBullhorn} 
            label="Campaign" 
            active={pathname === '/admin/campaign'} 
            to="/admin/campaign"
          />
          <SidebarItem 
            icon={FaShoppingCart} 
            label="Orders" 
            active={pathname === '/admin/orders'} 
            to="/admin/orders"
          />
          <SidebarItem 
            icon={FaTachometerAlt} 
            label="Analytics" 
            active={pathname === '/admin/analytics'} 
            to="/admin/analytics"
          />
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-8">
          <form onSubmit={handleSearch} className="relative w-96">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search products, orders, customers..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border-none rounded-xl py-2 pl-10 pr-4 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
            />
          </form>

          <div className="flex items-center gap-4">
            <Link 
              to="/admin/products/add"
              className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
              title="Add new product"
            >
              <FaPlus />
            </Link>
            
            <button 
              className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg relative transition-colors"
              title="Calendar"
            >
              <FaCalendar />
            </button>
            
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg relative transition-colors"
                title="Notifications"
              >
                <FaBell />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>
              
              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-lg border border-slate-200 z-50">
                  <div className="p-4 border-b border-slate-100">
                    <h3 className="font-semibold text-slate-800">Notifications</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div key={notification.id} className={`p-4 border-b border-slate-50 hover:bg-slate-50 ${
                        notification.unread ? 'bg-blue-50' : ''
                      }`}>
                        <p className="text-sm text-slate-800">{notification.message}</p>
                        <p className="text-xs text-slate-500 mt-1">{notification.time}</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 text-center border-t border-slate-100">
                    <button className="text-sm text-blue-600 hover:text-blue-700">View all notifications</button>
                  </div>
                </div>
              )}
            </div>
            
            <div className="relative">
              <div 
                onClick={() => setShowProfile(!showProfile)}
                className="flex items-center gap-2 ml-4 cursor-pointer hover:bg-slate-50 rounded-lg p-2 transition-colors"
              >
                {user ? (
                  <UserAvatar user={user} size="md" />
                ) : (
                  <img 
                    src="https://i.pinimg.com/1200x/ee/20/db/ee20db6bf136b7f2b4c101a994af9329.jpg" 
                    alt="Avatar" 
                    className="w-10 h-10 rounded-full bg-slate-100 object-cover"
                  />
                )}
                <FaChevronDown className="text-slate-400 text-sm" />
              </div>
              
              {/* Profile Dropdown */}
              {showProfile && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 z-50">
                  <div className="p-3 border-b border-slate-100">
                    <p className="font-medium text-slate-800">{user?.username || 'Admin'}</p>
                    <p className="text-sm text-slate-500">{user?.email || 'admin@example.com'}</p>
                  </div>
                  <div className="py-2">
                    <Link 
                      to="/profile" 
                      className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                    >
                      <FaCog className="text-slate-400" />
                      Settings
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                    >
                      <FaSignOutAlt className="text-red-400" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8 overflow-y-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-800">Welcome Back {user?.username || 'Admin'}</h1>
            <p className="text-slate-500 text-sm">Here is a summary of your store</p>
          </div>
          {children}
        </div>
      </main>
      
      {/* Click outside to close dropdowns */}
      {(showNotifications || showProfile) && (
        <div 
          className="fixed inset-0 z-30" 
          onClick={() => {
            setShowNotifications(false);
            setShowProfile(false);
          }}
        />
      )}
    </div>
  );
};