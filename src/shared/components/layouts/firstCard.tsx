import { Link } from "react-router-dom";

interface FirstCardProps {
  image: string;
  label: string;
}

export default function FirstCard({ image, label }: FirstCardProps) {
  return (
    <div className="relative w-full sm:w-60 lg:w-120 h-48 sm:h-56 lg:h-70 p-2 sm:p-3 overflow-hidden group cursor-pointer">
      <img
        src={image}
        alt={label}
        className="w-full h-full object-cover transition-transform duration-500 transform group-hover:scale-110 rounded-lg"
      />
      <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 text-white">
        <p className="font-semibold text-sm sm:text-base">{label}</p>
        <button className="mt-1 sm:mt-2 px-2 sm:px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs sm:text-sm">
          <Link to={"/Shop"}>Shop Now</Link>
        </button>
      </div>
    </div>
  );
}
