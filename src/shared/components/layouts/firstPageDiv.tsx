import { useEffect, useState } from "react";
import { slides } from "../../../Assets/images/Slides";
export default function HeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[70vh] w-[50vw] mx-40 overflow-hidden">
      {slides[index].type === "video" ? (
        <video
          src={slides[index].src}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <img
          src={slides[index].src}
          alt={slides[index].title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      <div className="absolute inset-0 bg-black/40 flex items-center">
        <div className="max-w-7xl mx-auto px-4 text-white">
          <h1 className="text-4xl font-bold animate-slideUp">
            {slides[index].title}
          </h1>
          <p className="mt-4 text-lg animate-slideUp delay-200">
            {slides[index].subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}
