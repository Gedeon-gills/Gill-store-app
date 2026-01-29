import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
export default function ThirdNavBar() {
  return (
    <nav className="bg-white border-t border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        {/* Mobile Menu Button */}
        <div className="flex items-center justify-between h-12 sm:h-14 lg:hidden">
          <button className="flex items-center gap-2 px-3 py-2 text-xs sm:text-sm font-semibold text-gray-800">
            MENU
            <FaBars className="text-xs sm:text-sm" />
          </button>
          <Link 
            to="/" 
            className="bg-blue-600 text-white px-3 py-1.5 rounded-lg font-bold text-xs"
          >
            BUY NOW
          </Link>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center gap-4 xl:gap-8 h-14 text-sm font-semibold text-gray-800">
          <li className="flex items-center gap-2 px-4 h-full cursor-pointer hover:bg-gray-50">
            SHOP BY DEPARTMENT
            <FaBars className="text-sm" />
          </li>

          {/* NAV LINKS */}
          <li className="cursor-pointer hover:text-blue-600 transition-colors">
            <Link to={"/"}>HOME</Link>
          </li>
          <li className="cursor-pointer hover:text-blue-600 transition-colors">
            <Link to={"/Shop"}>SHOP</Link>
          </li>
          <li className="cursor-pointer hover:text-blue-600 transition-colors">PAGES</li>
          <li className="cursor-pointer hover:text-blue-600 transition-colors">
            <Link to={"/Blogs"}>BLOGS</Link>
          </li>
          <li className="cursor-pointer hover:text-blue-600 transition-colors">
            <Link to={"/Elements"}>ELEMENTS</Link>
          </li>
          <li className="ml-auto">
            <a
              href="https://themeforest.net//cart/configure_before_adding/24187521?license=regular&support=bundle_6month&irgwc=1&afsrc=1&clickid=S4czo%3ASHGxycTqtVCZ10BWe8UkpScXRFvxGJR00&iradid=275988&irpid=2024187&iradtype=ONLINE_TRACKING_LINK&irmptype=mediapartner&mp_value1=&utm_campaign=af_impact_radius_2024187&utm_medium=affiliate&utm_source=impact_radius"
              target="_blank"
              className="bg-blue-600 text-white px-4 py-2 rounded-xl font-bold hover:bg-blue-700 transition-colors"
            >
              BUY NOW
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
