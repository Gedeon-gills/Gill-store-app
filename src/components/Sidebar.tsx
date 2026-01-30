import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes, FaTachometerAlt, FaShoppingCart, FaBox, FaUsers, FaBullhorn } from "react-icons/fa";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { path: "/admin/dashboard", label: "Dashboard", icon: FaTachometerAlt },
    { path: "/admin/orders", label: "Orders", icon: FaShoppingCart },
    { path: "/admin/products", label: "Products", icon: FaBox },
    { path: "/admin/customers", label: "Customers", icon: FaUsers },
    { path: "/admin/campaign", label: "Campaign", icon: FaBullhorn },
    { path: "/admin/analytics", label: "Analytics", icon: FaTachometerAlt },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-5 left-5 z-50 bg-purple-600 text-white p-2 rounded-lg"
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 w-56 h-screen bg-purple-600 text-white p-5 z-40 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <h2 className="text-2xl font-bold mb-8">B-DIFFERENT</h2>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive ? "bg-white bg-opacity-20" : "hover:bg-white hover:bg-opacity-10"
                }`}
                onClick={() => setIsOpen(false)}
              >
                <Icon className="text-base" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}