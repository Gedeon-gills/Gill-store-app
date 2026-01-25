import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
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
        <li className="cursor-pointer hover:text-blue-600">
          <Link to={"/"}>HOME</Link>
        </li>
        <li className="cursor-pointer hover:text-blue-600">
          <Link to={"/Shop"}>SHOP</Link>
        </li>
        <li className="cursor-pointer hover:text-blue-600">PAGES</li>
        <li className="cursor-pointer hover:text-blue-600">
          <Link to={"/Blogs"}>BLOGS</Link>
        </li>
        <li className="cursor-pointer hover:text-blue-600">
          <Link to={"/Elements"}>ELEMENTS</Link>
        </li>
        <li className="cursor-pointer bg-blue-600  text-white m-6 p-3 rounded-2xl font-bold">
          <a
            href="https://themeforest.net//cart/configure_before_adding/24187521?license=regular&support=bundle_6month&irgwc=1&afsrc=1&clickid=S4czo%3ASHGxycTqtVCZ10BWe8UkpScXRFvxGJR00&iradid=275988&irpid=2024187&iradtype=ONLINE_TRACKING_LINK&irmptype=mediapartner&mp_value1=&utm_campaign=af_impact_radius_2024187&utm_medium=affiliate&utm_source=impact_radius"
            target="blank"
          >
            BUY NOW
          </a>
        </li>
      </ul>
    </nav>
  );
}
