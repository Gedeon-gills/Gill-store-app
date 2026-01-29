import { useState } from "react";
import { FaSearchengin } from "react-icons/fa6";
import BlogsProductCard from "../layouts/BlogProduct";
import Header from "../forms/Headers";
import Footer from "../forms/Footer";

// Mock blog data
const blogPosts = [
  {
    id: "1",
    name: "Latest Fashion Trends 2024",
    images: ["https://i.pinimg.com/1200x/9d/be/6a/9dbe6a288dd99d451fd5b3a2fd5881cf.jpg"],
    category: "Fashion",
    description: "Discover the hottest fashion trends for this season",
    owner: "Fashion Editor",
    date: "Dec 15, 2024"
  },
  {
    id: "2",
    name: "Men's Style Guide",
    images: ["https://i.pinimg.com/1200x/93/2b/98/932b986e54a77be6ec5813b95e5454c3.jpg"],
    category: "Men's Fashion",
    description: "Essential style tips for the modern gentleman",
    owner: "Style Expert",
    date: "Dec 12, 2024"
  },
  {
    id: "3",
    name: "Seasonal Accessories",
    images: ["https://i.pinimg.com/1200x/d2/5c/26/d25c265c63c07a3ae081c1dc51cff9d3.jpg"],
    category: "Accessories",
    description: "Must-have accessories for every season",
    owner: "Accessories Team",
    date: "Dec 10, 2024"
  },
  {
    id: "4",
    name: "Women's Wardrobe Essentials",
    images: ["https://i.pinimg.com/736x/57/0c/5a/570c5a69781b17b3e0eec85311f78f33.jpg"],
    category: "Women's Fashion",
    description: "Building the perfect capsule wardrobe",
    owner: "Women's Editor",
    date: "Dec 8, 2024"
  },
  {
    id: "5",
    name: "Handbag Trends",
    images: ["https://i.pinimg.com/736x/9e/4f/ad/9e4fad34fc3f5bf2d1f1915cea1a317c.jpg"],
    category: "Bags",
    description: "The latest in luxury handbag designs",
    owner: "Bag Specialist",
    date: "Dec 5, 2024"
  },
  {
    id: "6",
    name: "Watch Collection Guide",
    images: ["https://i.pinimg.com/736x/a6/86/8f/a6868f8f9dd1314931021884b4a9d6fd.jpg"],
    category: "Watches",
    description: "Timeless pieces for every occasion",
    owner: "Watch Expert",
    date: "Dec 3, 2024"
  },
  {
    id: "7",
    name: "Summer Dress Collection",
    images: ["https://i.pinimg.com/1200x/d6/e4/bb/d6e4bba33d2b6a56d6f2c1ce8c256dfb.jpg"],
    category: "Dresses",
    description: "Light and breezy options for warm weather",
    owner: "Dress Designer",
    date: "Dec 1, 2024"
  },
  {
    id: "8",
    name: "Streetwear Revolution",
    images: ["https://i.pinimg.com/1200x/5a/1b/94/5a1b94a84eaf2dda6fd7406d24f1a79b.jpg"],
    category: "Streetwear",
    description: "How streetwear is changing fashion",
    owner: "Street Style",
    date: "Nov 28, 2024"
  }
];

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
            {blogPosts.slice(0, 8).map((post, i) => (
              <BlogsProductCard
                key={i}
                image={post.images[0]}
                category={post.category}
                title={post.name}
                owner={post.owner}
                date={post.date}
                intro={post.description}
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
                  {blogPosts.slice(0, 5).map((post, i) => (
                    <li key={i} className="flex gap-4">
                      <img
                        src={post.images[0]}
                        className="w-20 h-20 object-cover"
                      />
                      <div>
                        <p className="text-sm font-medium leading-snug hover:text-blue-600 cursor-pointer">
                          {post.name}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {post.date}
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
