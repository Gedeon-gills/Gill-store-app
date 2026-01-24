import FirstDivision from "../ui/firstDivision";
import Categories from "../ui/Categories";
import HomeProducts from "../layouts/Productshomepage";
import Divisions from "../layouts/divisions";
import DivStarter from "../ui/DivStarter";
export default function Body() {
  return (
    <div>
      <FirstDivision />
      <Categories />
      <DivStarter description="FEATURED PRODUCTS" />
      <HomeProducts />
      <DivStarter description="MEN'S FASHION" />
      <Divisions />
      <DivStarter description="WOMEN'S FASHION" />
      <Divisions />
      <DivStarter description="POPULAR"/>
      <Divisions/>
    </div>
  );
}
