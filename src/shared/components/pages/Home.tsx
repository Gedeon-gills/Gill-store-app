import Header from "../forms/Headers";
import ScrollButton from "../ui/buttons/scrollButton";
import Footer from "../forms/Footer";
import { Outlet } from "react-router-dom";
import FirstDivision from "../ui/firstDivision";
import Categories from "../ui/Categories";
// import Divisions from "../layouts/divisions";
import DivStarter from "../ui/DivStarter";
import Products from "../ui/products";
import ContentWrapper from "../ui/contentLapup";
import { HomeDashboard } from "../ui/HomeDashboard";
import { Menfashion } from "../ui/mesFashion"

export default function Home() {
  return (
    <div>
      <Header />
      <ScrollButton />
      <ContentWrapper>
        <FirstDivision />
        <Categories />

        {/* FEATURED PRODUCTS */}
        <DivStarter description="FEATURED PRODUCTS" />
        <Products random limit={3} />

        {/* MEN'S FASHION */}
        <Menfashion />

      </ContentWrapper>
      <Footer />
      <Outlet />
    </div>
  );
}
