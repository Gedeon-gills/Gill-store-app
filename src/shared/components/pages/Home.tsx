import FirstDivision from "../ui/firstDivision";
import Categories from "../ui/Categories";
import Divisions from "../layouts/divisions";
import DivStarter from "../ui/DivStarter";
import Header from "../forms/Headers";
import Footer from "../forms/Footer";
import { Outlet } from "react-router-dom";
import Products from "../ui/products";
export default function Home() {
  return (
    <div>
      <Header />
      <FirstDivision />
      <Categories />
      <DivStarter description="FEATURED PRODUCTS" />
      <Products limit={5} />
      <DivStarter description="MEN'S FASHION" />
      <div className="grid grid-cols-12 gap-6">
        {/* LEFT SIDEBAR */}
        <div className="col-span-3">
          <Divisions
            title="Men"
            items={[
              "Wallets",
              "T-Shirts",
              "Shirts",
              "Jeans",
              "Jackets & Coats",
            ]}
          />
        </div>
        <div className="col-span-9">
          <Products limit={6} category="men" />
        </div>
      </div>
      <DivStarter description="WOMEN'S FASHION" />
      <div className="grid grid-cols-12 gap-6">
        {/* LEFT SIDEBAR */}
        <div className="col-span-3">
          <Divisions
            title="Women"
            items={["Tops", "dresses", "Nightwear", "Jeans", "Jewellery"]}
          />
        </div>
        <div className="col-span-9">
          <Products limit={6} category="women" />
        </div>
      </div>
      <DivStarter description="POPULAR" />
      <div className="grid grid-cols-12 gap-6">
        {/* LEFT SIDEBAR */}
        <div className="col-span-3 ml-28">
          <Divisions
            title="Popular Fashion"
            items={[
              "Women",
              "Watches",
              "Shoes",
              "Others",
              "Men",
              "Jewellery",
              "Beauty & Care",
              "Bags & Backpacks",
            ]}
          />
        </div>
        <div className="col-span-9">
          <Products limit={6} />
        </div>
      </div>

      <Footer />
      <Outlet />
    </div>
  );
}
