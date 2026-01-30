import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaTachometerAlt, FaShoppingCart, FaBox, FaUsers, FaBullhorn, FaSearch, FaBell, FaCalendar, FaPlus, FaChevronDown } from 'react-icons/fa';

interface SidebarItemProps {
  icon: React.ComponentType<any>;
  label: string;
  active?: boolean;
  hasChild?: boolean;
  to?: string;
}

const SidebarItem = ({ icon: Icon, label, active = false, hasChild = false, to }: SidebarItemProps) => {
  const content = (
    <div className={`flex items-center justify-between px-4 py-3 cursor-pointer rounded-lg transition-all ${
      active ? 'bg-purple-600 text-white shadow-lg shadow-purple-200' : 'text-slate-500 hover:bg-slate-50'
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
  const pathname = location.pathname;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-100 flex flex-col p-4 gap-2">
        <div className="flex items-center gap-2 px-2 mb-8">
          <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
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
              <span className="text-sm text-purple-600 font-medium cursor-pointer hover:text-purple-700">
                Product List
              </span>
            </Link>
            <span className="text-sm text-slate-400 cursor-pointer hover:text-slate-600">
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
          <div className="relative w-96">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full bg-slate-50 border-none rounded-xl py-2 pl-10 pr-4 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all"
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors">
              <FaPlus />
            </button>
            <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg relative transition-colors">
              <FaCalendar />
            </button>
            <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg relative transition-colors">
              <FaBell />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-2 ml-4 cursor-pointer">
              <img 
                src="https://i.pinimg.com/1200x/ee/20/db/ee20db6bf136b7f2b4c101a994af9329.jpg" 
                alt="Avatar" 
                className="w-10 h-10 rounded-full bg-slate-100 object-cover"
              />
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8 overflow-y-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-800">Welcome Back Admin</h1>
            <p className="text-slate-500 text-sm">Here is a summary of your store</p>
          </div>
          {children}
        </div>
      </main>
    </div>
  );
};