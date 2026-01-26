import ShopSidebar from "../layouts/ShopSidebar";
import Header from "../forms/Headers";
import Products from "../ui/products";
import Footer from "../forms/Footer";

export default function Shop() {
  return (
    <div>
      <Header />
      <div className="flex bg-blue-100 justify-center h-90">
        <h1 className="py-32 text-gray-600 text-8xl font-sans text-center tracking-wide italic">
          B-DIFFERENT
        </h1>
      </div>

      <div className="flex">
        <ShopSidebar />
        <Products limit={0} />
      </div>

      <Footer />
    </div>
  );
}
