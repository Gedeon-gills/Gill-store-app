import { useState, useEffect } from "react";


export default function Product() {

  

  const rightImages = ["/image/shoes/white j4.jpg", "/image/jewellery/necklace.jpg"];

  const bigImages = [
    {
      src: "/image/women/black girl suit.jpg",
      h4: "New Arrival",
      h1: "Summer Sale",
      h2: "MIN. 40% OFF",
    },
    {
      src: "/image/men/men.jpg",
      h4: "Trending Now",
      h1: "Autumn Collection",
      h2: "UP TO 50% OFF",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bigImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [bigImages.length]);

  return (
    <div className="max-w-[1200px] mx-auto bg-transparent text-white p-6">
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 relative h-[360px] overflow-hidden">
          <div className="relative h-full w-full">
            {bigImages.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-transform duration-700 ${
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
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 flex flex-col justify-start pt-16 px-8 text-left">
                  <h3 className="text-sm uppercase text-black">{slide.h4}</h3>
                  <h1 className="text-3xl font-bold text-black">{slide.h1}</h1>
                  <h2 className="text-xl font-semibold text-black">{slide.h2}</h2>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {rightImages.map((src, index) => (
            <div
              key={index}
              className="h-[160px] w-full flex items-center justify-center overflow-hidden bg-gray-600"
            >
              <img
                src={src}
                alt={`Product ${index + 1}`}
                className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
