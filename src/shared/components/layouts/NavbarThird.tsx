import { FaBars } from "react-icons/fa";

export default function ThirdNavBar() {
  return (
    <nav className="bg-white border-t border-b border-gray-200">
      <ul className="max-w-7xl mx-auto px-4 flex items-center gap-8 h-14 text-sm font-semibold text-gray-800">
        {/* SHOP BY DEPARTMENT */}
        <li className="flex items-center gap-2 text-white px-4 h-full cursor-pointer">
          <FaBars className="text-sm" />
          SHOP BY DEPARTMENT
        </li>

        {/* NAV LINKS */}
        <li className="cursor-pointer hover:text-blue-600">HOME</li>
        <li className="cursor-pointer hover:text-blue-600">SHOP</li>
        <li className="cursor-pointer hover:text-blue-600">PAGES</li>
        <li className="cursor-pointer hover:text-blue-600">BLOGS</li>
        <li className="cursor-pointer hover:text-blue-600">ELEMENTS</li>
        <li className="cursor-pointer bg-blue-600  text-white m-6 p-3 rounded-2xl font-bold">
          BUY NOW
        </li>
      </ul>
    </nav>
  );
}
