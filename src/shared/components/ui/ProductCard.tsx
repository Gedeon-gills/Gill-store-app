import { FaHeart } from "react-icons/fa6";
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
  return (
    <Link to={`/product/${props.id}`} className="group relative block">
      {/* Badges */}
      <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
        {props.priceDown && (
          <span className="bg-green-600 px-2 py-1 text-xs font-medium text-white">
            {Math.round(
              ((props.priceDown - props.price) / props.priceDown) * 100,
            )}
            % OFF
          </span>
        )}
        <span className="bg-orange-500 px-2 py-1 text-[10px] font-bold uppercase text-white">
          Featured
        </span>
      </div>

      {/* Wishlist Button */}
      <button
        type="button"
        onClick={(e) => e.preventDefault()}
        className="absolute right-2 top-2 z-10 rounded-full bg-white p-2 opacity-0 transition-opacity group-hover:opacity-100"
      >
        <FaHeart size={18} className="text-gray-400 hover:text-red-500" />
      </button>

      {/* Product Image */}
      <div className="mb-3 overflow-hidden rounded bg-gray-100">
        <img
          src={props.Image}
          alt={props.name}
          className="h-80 w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Product Info */}
      <div>
        <h3 className="mb-1 text-sm font-medium text-gray-800 line-clamp-2">
          {props.name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="font-bold text-gray-900">${props.price}</span>
          {props.priceDown && (
            <span className="text-sm text-gray-400 line-through">
              ${props.priceDown}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
