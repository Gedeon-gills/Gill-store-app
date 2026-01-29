import ShopSidebar from "../layouts/ShopSidebar";
import Header from "../forms/Headers";
import Products from "../ui/products";
import Footer from "../forms/Footer";

export default function Shop() {
  return (
    <div>
      <Header />
      <div className="flex bg-blue-100 justify-center h-32 sm:h-48 lg:h-90">
        <h1 className="py-8 sm:py-16 lg:py-32 text-gray-600 text-2xl sm:text-4xl lg:text-8xl font-sans text-center tracking-wide italic">
          B-DIFFERENT
        </h1>
      </div>

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
