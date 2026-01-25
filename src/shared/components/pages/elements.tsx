import Header from "../forms/Headers";
import Footer from "../forms/Footer";
export default function ElementsPage() {
  return (
    <section className="relative bg-white">
      <Header />
      <div className="fixed bottom-16 left-6 z-50">
        <div className="w-20 h-20 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg">
          <span className="text-2xl font-bold">$39</span>
        </div>
      </div>

      {/* ===== Header ===== */}
      <div className="text-center py-20 bg-gray-50">
        <h1 className="text-5xl font-semibold text-gray-800">Elements</h1>
        <p className="text-gray-500 mt-4">B-DIFFERENT</p>
      </div>

      {/* ===== Elements Lists ===== */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          {/* Column 1 */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-6">Elements</h3>
            <ul className="space-y-4 text-gray-600">
              <li>Typography</li>
              <li>Headings</li>
              <li>Buttons</li>
              <li>Social Buttons</li>
              <li>Progress Bar</li>
              <li>Map</li>
              <li>Lists</li>
              <li>Video Player</li>
              <li>Newsletter</li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="font-semibold text-blue-600 mb-6">Elements</h3>
            <ul className="space-y-4 text-gray-600">
              <li>Info Box</li>
              <li>Instagram</li>
              <li>Tabs</li>
              <li>Tours</li>
              <li>Accordions</li>
              <li>Counter</li>
              <li>Countdown Timer</li>
              <li>Team</li>
              <li>Testimonials</li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-6">Elements</h3>
            <ul className="space-y-4 text-gray-600">
              <li>Blog Listing</li>
              <li>Blog Carousel</li>
              <li>Portfolio Listing</li>
              <li>Portfolio Carousel</li>
              <li>Banner Carousel</li>
              <li>Banners</li>
              <li>Image Gallery</li>
              <li>Recently Viewed Products</li>
              <li>Products Brands</li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-6">Elements</h3>
            <ul className="space-y-4 text-gray-600">
              <li>Products Grid & Carousel</li>
              <li>Products Tabs</li>
              <li>Products With Banner</li>
              <li>Products And Categories Box</li>
              <li>Products Categories</li>
              <li>Products Categories Thumbnail</li>
              <li>Hot Deal Products</li>
              <li>Products Widgets</li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
}
