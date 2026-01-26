import { useState } from "react";
import { FaSearchengin } from "react-icons/fa6";
import BlogsProductCard from "../layouts/BlogProduct";
import Header from "../forms/Headers";
import Footer from "../forms/Footer";
import { products } from "../../store/products";

export default function Blogs() {
  const [showRecent, setShowRecent] = useState(true);
  const [showArchives, setShowArchives] = useState(true);
  const [showCategories, setShowCategories] = useState(true);
  const [showTags, setShowTags] = useState(true);

  return (
    <div>
      <Header />

      {/* Page Header */}
      <section className="bg-gray-50">
        <div className="text-center py-16 bg-white">
          <h1 className="text-3xl font-semibold text-gray-900">
            Checkout Our Blogs
          </h1>
          <p className="text-gray-500 mt-2">B-Different</p>
        </div>

        {/* Main layout */}
        <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Blog Cards */}
          <main className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-10">
            {products.slice(0, 8).map((product, i) => (
              <BlogsProductCard
                key={i}
                image={product.images[0]}
                category={product.category || "Technology"}
                title={product.name}
                owner={product.owner || "Admin"}
                date={product.date || "Aug 24, 2024"}
                intro={product.description || "Check out this product!"}
              />
            ))}
          </main>

          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-12">
            {/* Search */}
            <div>
              <div className="flex">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full px-4 py-2 text-sm focus:outline-none bg-white"
                />
                <button className="bg-black text-white px-4 flex items-center justify-center">
                  <FaSearchengin />
                </button>
              </div>
            </div>

            {/* Recent Posts */}
            <div>
              <h1
                onClick={() => setShowRecent(!showRecent)}
                className="text-lg font-semibold cursor-pointer select-none"
              >
                Recent Posts
              </h1>

              {showRecent && (
                <ul className="mt-5 space-y-5">
                  {products.slice(0, 5).map((product, i) => (
                    <li key={i} className="flex gap-4">
                      <img
                        src={product.images[0]}
                        className="w-20 h-20 object-cover"
                      />
                      <div>
                        <p className="text-sm font-medium leading-snug hover:text-blue-600 cursor-pointer">
                          {product.name}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {product.date || "Aug 24, 2024"}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Archives */}
            <div>
              <h1
                onClick={() => setShowArchives(!showArchives)}
                className="text-lg font-semibold cursor-pointer select-none"
              >
                Archives
              </h1>

              {showArchives && (
                <ul className="mt-4 space-y-2 text-sm text-gray-600">
                  <li className="hover:text-blue-600 cursor-pointer">
                    May 2019
                  </li>
                  <li className="hover:text-blue-600 cursor-pointer">
                    January 2020
                  </li>
                  <li className="hover:text-blue-600 cursor-pointer">
                    September 2023
                  </li>
                  <li className="hover:text-blue-600 cursor-pointer">
                    January 2025
                  </li>
                </ul>
              )}
            </div>

            {/* Categories */}
            <div>
              <h1
                onClick={() => setShowCategories(!showCategories)}
                className="text-lg font-semibold cursor-pointer select-none"
              >
                Categories
              </h1>

              {showCategories && (
                <ul className="mt-4 space-y-2 text-sm text-gray-600">
                  {[
                    "Accessories",
                    "Beauty",
                    "Design",
                    "Fashion Design",
                    "Lifestyle",
                    "Travel",
                  ].map((cat) => (
                    <li
                      key={cat}
                      className="hover:text-blue-600 cursor-pointer"
                    >
                      {cat}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Tag Cloud */}
            <div>
              <h1
                onClick={() => setShowTags(!showTags)}
                className="text-lg font-semibold cursor-pointer select-none"
              >
                Tag Cloud
              </h1>

              {showTags && (
                <div className="flex flex-wrap gap-3 mt-4">
                  {[
                    "Design",
                    "Fashion",
                    "Looks",
                    "Men",
                    "Music",
                    "Style",
                    "Women",
                  ].map((tag) => (
                    <button
                      key={tag}
                      className="px-4 py-1 text-sm border hover:bg-black hover:text-white transition"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </aside>
        </div>
      </section>
      <Footer />
    </div>
  );
}
