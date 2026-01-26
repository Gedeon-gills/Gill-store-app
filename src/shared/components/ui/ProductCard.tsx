import {
  FaShuffle,
  FaHeart,
  FaCartShopping,
  FaSearchengin,
} from "react-icons/fa6";
import { useState } from "react";
import { Link } from "react-router-dom";

interface ProductsIn {
  id: number;
  name: string;
  description: string;
  Image: string;
  price: number;
  priceDown?: number;
}

export default function ProductHomeCard(props: ProductsIn) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link to={`/product/${props.id}`}>
      <div
        className="relative group rounded-lg bg-white overflow-hidden shadow-[0_0_0_rgba(0,0,0,0.0)]
                   hover:shadow-[0_8px_20px_rgba(0,0,0,0.15),0_-8px_20px_rgba(0,0,0,0.15)]
                   transition-all duration-300 pb-4 m-4 w-64 cursor-pointer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Featured Tag */}
        <span className="absolute top-2 left-2 bg-yellow-400 text-[10px] font-semibold px-2 py-1 rounded">
          FEATURED
        </span>

        {/* Heart Button */}
        <button
          onClick={(e) => e.preventDefault()}
          className="absolute top-2 right-2 bg-white rounded-full p-2 shadow hover:text-red-500 transition"
        >
          <FaHeart />
        </button>

        {/* Product Image */}
        <div className="w-full h-64 overflow-hidden bg-gray-100">
          <img
            src={props.Image}
            alt={props.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        {/* Product Info */}
        <div className="px-3 mt-3 text-center">
          <p className="text-[11px] text-gray-500 uppercase">
            {props.description}
          </p>
          <h2 className="text-sm font-semibold mt-1 capitalize leading-tight">
            {props.name}
          </h2>

          <div className="flex justify-center gap-2 mt-2 items-center">
            <span className="text-blue-600 font-semibold">${props.price}</span>
            {props.priceDown && (
              <>
                <span className="text-gray-400 line-through">
                  ${props.priceDown}
                </span>
                <span className="text-green-500 font-semibold">
                  {Math.round(
                    ((props.priceDown - props.price) / props.priceDown) * 100,
                  )}
                  % Off
                </span>
              </>
            )}
          </div>
        </div>

        {/* Hover Actions */}
        <div
          className={`absolute left-1/2 -translate-x-1/2 bottom-3 flex gap-3 transition-all duration-300 ${
            hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
        >
          {[FaShuffle, FaCartShopping, FaSearchengin].map((Icon, i) => (
            <button
              key={i}
              onClick={(e) => e.preventDefault()}
              className="bg-white p-2 rounded-md shadow hover:bg-gray-100 transition"
            >
              <Icon className="text-gray-700 text-lg" />
            </button>
          ))}
        </div>
      </div>
    </Link>
  );
}
