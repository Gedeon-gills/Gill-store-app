import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaSearchengin } from "react-icons/fa6";
import BlogsProductCard from "../layouts/BlogProduct";
import Header from "../forms/Headers";
import Footer from "../forms/Footer";



// Mock blog data
const blogPosts = [
  {
    id: 1,
    name: "Do you Have A Passion for Photography",
    category: "BEAUTY, LIFESTYLE",
    owner: "Martin Gray",
    date: "May 31, 2019",
    description:
      "Sed velit mattis ipsum mi, quam turpis porttitor duis, ipsum fusce congue at, etiam sit nec erat...",
    images:
      ["https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=600"],
  },
  {
    id: 2,
    name: "Notify What Makes You Happy, Smile More!",
    category: "LIFESTYLE, TRAVEL",
    owner: "Martin Gray",
    date: "May 30, 2019",
    description:
      "Sed velit mattis ipsum mi, quam turpis porttitor duis, ipsum fusce congue at, etiam sit nec erat...",
    images:
      ["https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=600"],
  },
  {
    id: 3,
    name: "Do you Have A Passion for Photography",
    category: "BEAUTY, LIFESTYLE",
    owner: "Martin Gray",
    date: "May 31, 2019",
    description:
      "Sed velit mattis ipsum mi, quam turpis porttitor duis, ipsum fusce congue at, etiam sit nec erat...",
    images:
      ["https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=600"],
  },
  {
    id: 4,
    name: "Notify What Makes You Happy, Smile More!",
    category: "LIFESTYLE, TRAVEL",
    owner: "Martin Gray",
    date: "May 30, 2019",
    description:
      "Sed velit mattis ipsum mi, quam turpis porttitor duis, ipsum fusce congue at, etiam sit nec erat...",
    images:
      ["https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=600"],
  },
  {
    id: 5,
    name: "Do you Have A Passion for Photography",
    category: "BEAUTY, LIFESTYLE",
    owner: "Martin Gray",
    date: "May 31, 2019",
    description:
      "Sed velit mattis ipsum mi, quam turpis porttitor duis, ipsum fusce congue at, etiam sit nec erat...",
    images:
      ["https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=600"],
  },
  {
    id: 6,
    name: "Notify What Makes You Happy, Smile More!",
    category: "LIFESTYLE, TRAVEL",
    owner: "Martin Gray",
    date: "May 30, 2019",
    description:
      "Sed velit mattis ipsum mi, quam turpis porttitor duis, ipsum fusce congue at, etiam sit nec erat...",
    images:
      ["https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=600"],
  },
  
];

export default function Blogs() {
  const { category } = useParams<{ category?: string }>();
  const [showRecent, setShowRecent] = useState(true);
  const [showArchives, setShowArchives] = useState(true);
  const [showCategories, setShowCategories] = useState(true);
  const [showTags, setShowTags] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBlogs = blogPosts.filter(blog => 
    blog.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Header />

      {/* Page Header */}
      <section className="bg-gray-50">
        <header className="py-12 text-center bg-[#f9f9f9] border-b mb-10">
        <h1 className="text-5xl font-bold text-gray-700 mb-2 capitalize">
          {category || "Blog"}
        </h1>

        <nav className="text-xs text-gray-400 uppercase tracking-widest">
          <Link to="/" className="hover:text-blue-500">
            Home
          </Link>{" "}
          / <span>{category || "Blog"}</span>
        </nav>
      </header>

        {/* Main layout */}
        <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Blog Cards */}
          <main className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-10">
            {filteredBlogs.slice(0, 8).map((post, i) => (
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
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
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
                    Feb 2022
                  </li>
                  <li className="hover:text-blue-600 cursor-pointer">
                    Sept 2025
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
