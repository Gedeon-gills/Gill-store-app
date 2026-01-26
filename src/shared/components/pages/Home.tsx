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
      <Products />
      <DivStarter description="MEN'S FASHION" />
      <Divisions />
      <DivStarter description="WOMEN'S FASHION" />
      <Divisions />
      <DivStarter description="POPULAR" />
      <Divisions />
      <Footer />
      <Outlet />
    </div>
  );
}
