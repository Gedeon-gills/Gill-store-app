import Header from "../forms/Headers";
import Footer from "../forms/Footer";
import { Outlet } from "react-router-dom";
import FirstDivision from "../ui/firstDivision";
import Categories from "../ui/Categories";
import Divisions from "../layouts/divisions";
import DivStarter from "../ui/DivStarter";
import Products from "../ui/products";
import ContentWrapper from "../ui/contentLapup";
import { CatgoriesArr } from "../../store/Categories";

export default function Home() {
  return (
    <div>
      <Header />
      <ContentWrapper>
        <FirstDivision />
        <Categories />

        {/* FEATURED PRODUCTS */}
        <DivStarter description="FEATURED PRODUCTS" />
        <Products random limit={3} />

        {/* MEN'S FASHION */}
        <DivStarter description="MEN'S FASHION" />
        <div className="grid grid-cols-12 gap-6">
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
            <Products random limit={6} category="men" />   
          </div>
        </div>

        {/* WOMEN'S FASHION */}
        <DivStarter description="WOMEN'S FASHION" />
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-3">
            <Divisions
              title="Women"
              items={["Tops", "Dresses", "Nightwear", "Jeans", "Jewellery"]}
            />
          </div>
          <div className="col-span-9">
            <Products random limit={6} category="women" />{" "}
            {/* <-- category added */}
          </div>
        </div>

        {/* POPULAR PRODUCTS */}
        <DivStarter description="POPULAR" />
        <div className="grid grid-cols-12 gap-6">
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
            <Products random limit={6} /> {/* no category, shows all */}
          </div>
        </div>
      </ContentWrapper>
      <Footer />
      <Outlet />
    </div>
  );
}
