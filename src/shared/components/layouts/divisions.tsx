import HeroSlider from "./firstPageDiv";
import HomeProducts from "./Productshomepage";

export default function HomeSection() {
  return (
    <div className="max-w-7xl mx-auto px-3 mt-10 space-y-10">
      {/* TOP SECTION */}
      <div className="grid grid-cols-12 gap-6">
        {/* LEFT: Categories */}
        <aside className="col-span-3 border border-gray-200 p-4">
          <h3 className="font-semibold mb-4 text-blue-600">Men's Fashion</h3>
          <ul className="space-y-3 text-sm">
            <li className="hover:text-blue-600 cursor-pointer">Wallets</li>
            <li className="hover:text-blue-600 cursor-pointer">T-Shirts</li>
            <li className="hover:text-blue-600 cursor-pointer">Shirts</li>
            <li className="hover:text-blue-600 cursor-pointer">Jeans</li>
            <li className="hover:text-blue-600 cursor-pointer">
              Jackets & Coats
            </li>
          </ul>
        </aside>

        {/* RIGHT: Hero Slider */}
        <div className="col-span-6">
          <HeroSlider />
        </div>
      </div>

      {/* BOTTOM SECTION: PRODUCTS */}
      <div>
        <HomeProducts />
      </div>
    </div>
  );
}
