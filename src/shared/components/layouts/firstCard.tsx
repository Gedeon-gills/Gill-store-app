import { slides } from "../../../Assets/images/Slides";

export default function FirstCard() {
  return (
    <div className="relative w-120 h-70 p-3 overflow-hidden group cursor-pointer">
      <img
        src={slides[0].src}
        alt="For men"
        className="w-full h-full object-cover transition-transform duration-500 transform group-hover:scale-110"
      />
      <div className="absolute bottom-4 left-4 text-white">
        <p className="font-semibold">For Men</p>
        <button className="mt-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
          Shop Now
        </button>
      </div>
    </div>
  );
}
