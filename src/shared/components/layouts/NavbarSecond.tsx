import { FaSearch, FaShoppingBag, FaUser, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
export default function SecondNavBar() {
  return (
    <nav className="bg-blue-600 py-4">
      <ul className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-6">
        {/* LOGO */}
        <li className="text-white text-2xl font-bold tracking-wide">
          B-DIFFERENT
        </li>

        {/* SEARCH BAR */}
        <li className="flex items-center bg-white rounded-full px-5 py-2 flex-1 max-w-xl">
          <input
            type="text"
            placeholder="clothes..."
            className="flex-1 outline-none text-sm text-gray-700"
          />
          <FaSearch className="text-gray-500 text-sm cursor-pointer" />
        </li>

        {/* SIGN IN */}
        <li className="flex items-center gap-1 text-white text-sm font-medium cursor-pointer hover:opacity-80">
          <FaUser className="text-sm" />
          <Link to={"/RegisterLogin"}>SIGN IN</Link>
        </li>

        {/* FAVS */}
        <li className="flex items-center gap-1 text-white text-sm font-medium cursor-pointer hover:opacity-80">
          <FaHeart className="text-sm" />
          <Link to={"/Favourites"}>FAVS</Link>
        </li>

        {/* CARTS */}
        <li className="flex items-center gap-1 text-white text-sm font-medium cursor-pointer hover:opacity-80">
          <FaShoppingBag className="text-sm" />
          <Link to={"/Carts"}>CARTS</Link>
        </li>
      </ul>
    </nav>
  );
}
