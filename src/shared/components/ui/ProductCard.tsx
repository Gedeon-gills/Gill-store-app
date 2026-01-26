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
        className="w-64 group cursor-pointer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={props.Image}
            alt={props.name}
            className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <button
            onClick={(e) => e.preventDefault()}
            className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:text-red-500"
          >
            <FaHeart />
          </button>
          <div
            className={`absolute inset-0 flex items-center justify-center gap-3 bg-black/30 transition-opacity duration-300 ${
              hovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <button
              onClick={(e) => e.preventDefault()}
              className="bg-white p-3 rounded-full hover:bg-black hover:text-white transition"
            >
              <FaShuffle />
            </button>
            <button
              onClick={(e) => e.preventDefault()}
              className="bg-white p-3 rounded-full hover:bg-black hover:text-white transition"
            >
              <FaCartShopping />
            </button>
            <button
              onClick={(e) => e.preventDefault()}
              className="bg-white p-3 rounded-full hover:bg-black hover:text-white transition"
            >
              <FaSearchengin />
            </button>
          </div>
        </div>

        <div className="mt-3 text-center">
          <p className="text-sm text-gray-500">{props.description}</p>
          <h4 className="font-semibold">{props.name}</h4>
          <div className="flex justify-center gap-2 mt-1">
            <span className="font-bold">${props.price}</span>
            {props.priceDown && (
              <span className="text-gray-400 line-through">
                ${props.priceDown}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
