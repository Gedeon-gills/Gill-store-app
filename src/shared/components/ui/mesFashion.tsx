import { useState, useEffect } from "react";
import Products from "./products";

export const Menfashion = () => {
  const Menimages = [
    {
      src: "/image/collection/Brown and Pink Modern Summer Collection Poster.jpg",
    },
    {
      src: "/image/collection/Neutral Men Simple Fashion Sale Instagram Post.jpg",
    },
    {
      src: "/image/collection/Yellow And White Minimalist Weekend Sale Instagram Story.jpg",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % Menimages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [Menimages.length]);

  return (
    <div className="space-y-12">
      {/* MEN */}
      <section className="max-w-7xl mx-auto w-full px-4 border-t-2 border-t-blue-900 py-8">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Sidebar */}
          <div className="flex-shrink-0 w-full md:w-44 h-80 md:h-[530px] bg-white rounded-xl shadow-md p-6 text-blue-900">
            <h1 className="text-base font-semibold mb-4 text-center">
              Men's Fashion
            </h1>
            <ul className="space-y-2 text-gray-700 text-sm text-center md:text-left">
              {[
                "Wallets",
                "T-Shirts",
                "Shirts",
                "Jeans",
                "Jackets & Coats",
              ].map((item) => (
                <li key={item} className="hover:text-blue-900 cursor-pointer">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Slider */}
          <div className="relative w-full md:w-96 h-80 md:h-[530px] overflow-hidden rounded-xl">
            {Menimages.map((slide, index) => (
              <div
                key={index}
                className={`absolute top-0 left-0 w-full h-full transition-transform duration-700 ${
                  index === currentSlide
                    ? "translate-x-0 z-10"
                    : index < currentSlide
                      ? "-translate-x-full z-0"
                      : "translate-x-full z-0"
                }`}
              >
                <img
                  src={slide.src}
                  alt="Featured"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            ))}
          </div>

          {/* Featured Products */}
          <div className="lg:col-span-9">
            <Products random limit={6} />
          </div>
        </div>
      </section>

      {/* WOMEN */}
      <section className="max-w-7xl mx-auto w-full px-4 border-t-2 border-t-red-300 py-8">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="flex-shrink-0 w-full md:w-44 h-80 md:h-[530px] bg-white rounded-xl shadow-md p-6 text-red-500">
            <h1 className="text-base font-semibold mb-4 text-center">
              Women's Fashion
            </h1>
            <ul className="space-y-2 text-gray-700 text-sm text-center md:text-left">
              {[
                "Trousers & Capris",
                "Tops",
                "Shorts & Skirts",
                "Lingerie & Nightwear",
                "Jeans",
                "Dresses",
                "Jackets & Coats",
              ].map((item) => (
                <li key={item} className="hover:text-red-500 cursor-pointer">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative w-full md:w-96 h-80 md:h-[530px] overflow-hidden rounded-xl">
            <img
              src="/image/collection/New Minimal Fashion Collection Model Instagram Post.jpg"
              alt="Women's Featured"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
          
          {/* Featured Products */}
          <div className="lg:col-span-9">
            <Products random limit={6} />
          </div>
          
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="max-w-7xl mx-auto w-full px-4 border-t-2 border-t-[#C76E00] py-8">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="flex-shrink-0 w-full md:w-44 h-64 md:h-[440px] bg-white rounded-xl shadow-md p-6 text-[#C76E00]">
            <h1 className="text-base font-semibold mb-4 text-center">
              Fashion Categories
            </h1>
            <ul className="space-y-2 text-gray-700 text-sm text-center md:text-left">
              {[
                "Women",
                "Watches",
                "Shoes",
                "Men",
                "Jewellery",
                "Beauty & Care",
                "Bags & Backpacks",
                "Accessories",
              ].map((item) => (
                <li key={item} className="hover:text-[#C76E00] cursor-pointer">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative w-full md:w-80 h-64 md:h-[440px] overflow-hidden rounded-xl">
            <img
              src="/image/collection/Blue and White Clean Minimalist Winter Sale Men Wear Collection Instagram Post.jpg"
              alt="Categories Featured"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>

          {/* Featured Products */}
          <div className="lg:col-span-9">
            <Products random limit={6} />
          </div>
          
        </div>
      </section>
    </div>
  );
};
