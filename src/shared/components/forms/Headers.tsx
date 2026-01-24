import FirstNavBar from "../layouts/NavabarFirst";
import SecondNavBar from "../layouts/NavbarSecond";
import NavbarThird from "../layouts/NavbarThird";
import StickyNavBar from "../layouts/FourthNavbar";
export default function Header() {
  return (
    <div>
      <FirstNavBar />
      <SecondNavBar />
      <NavbarThird />
      <StickyNavBar />
    </div>
  );
}
