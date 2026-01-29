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
    <div className="relative h-48 sm:h-64 lg:h-[70vh] w-full lg:w-[50vw] overflow-hidden">
      {slides[index].type === "video" ? (
        <video
          src={slides[index].src}
          autoPlay
          muted
          loop
          playsInline
          controls={false}
          disablePictureInPicture
          onContextMenu={(e) => e.preventDefault()}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
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
          <h1 className="text-xl sm:text-2xl lg:text-4xl font-bold animate-slideUp">
            {slides[index].title}
          </h1>
          <p className="mt-2 sm:mt-4 text-sm sm:text-base lg:text-lg animate-slideUp delay-200">
            {slides[index].subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}
