import Header from "../forms/Headers";
import Footer from "../forms/Footer";

export default function Favourites() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* ===== Page Header ===== */}
      <div className="bg-gray-100 py-14 text-center">
        <h1 className="text-3xl font-semibold text-gray-800">
          My World, My Desires
        </h1>
        <p className="text-sm text-gray-500 mt-2">My Wishlist</p>
      </div>

      {/* ===== Wishlist Content ===== */}
      <div className="flex-1 max-w-7xl mx-auto px-6 py-16">
        <div className="border border-gray-200">
          {/* Table Header */}
          <div className="hidden md:grid grid-cols-3 bg-gray-50 border-b border-gray-200 px-6 py-4 text-sm font-semibold text-gray-700">
            <span>Product Name</span>
            <span>Unit Price</span>
            <span>Stock Status</span>
          </div>

          {/* Empty State */}
          <div className="text-center py-20 px-6">
            <p className="text-gray-500 text-lg mb-6">
              No products added to the wishlist yet.
            </p>

            <a
              href="/shop"
              className="inline-block bg-black text-white px-8 py-3 text-sm font-semibold hover:bg-gray-800 transition"
            >
              RETURN TO SHOP
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
