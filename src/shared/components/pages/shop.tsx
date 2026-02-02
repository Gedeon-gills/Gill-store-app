import { Link, useParams } from "react-router-dom";

import ShopSidebar from "../layouts/ShopSidebar";
import Header from "../forms/Headers";
import Products from "../ui/products";
import Footer from "../forms/Footer";

export default function Shop() {

  // GET CATEGORY FROM URL → /shop/:category
  const { category } = useParams<{ category?: string }>();

  return (
    <div>
      <Header />

      <header className="py-12 text-center bg-[#f9f9f9] border-b mb-10">
        <h1 className="text-5xl font-bold text-gray-700 mb-2 capitalize">
          {category || "Shop"}
        </h1>

        <nav className="text-xs text-gray-400 uppercase tracking-widest">
          <Link to="/" className="hover:text-blue-500">
            Home
          </Link>{" "}
          / <span>{category || "Shop"}</span>
        </nav>
      </header>

      <div className="flex flex-col lg:flex-row gap-4 lg:gap-0 px-4 lg:px-0">
        <ShopSidebar />

        <div className="flex-1">
          <Products />
        </div>
      </div>

      <Footer />
    </div>
  );
}
