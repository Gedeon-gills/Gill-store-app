import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useWishlist } from "../layouts/wishlistcontext";
import type { Product } from "../../store/products";

export default function ProductHomeCard(props: Product) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(props.id);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (inWishlist) {
      removeFromWishlist(props.id);
    } else {
      addToWishlist(props);
    }
  };

  const discountPercentage = props.oldPrice
    ? Math.round(((props.oldPrice - props.price) / props.oldPrice) * 100)
    : 0;
  console.log(props.oldPrice, props.price, props.priceDown, props.images);
  console.log(import.meta.env.VITE_APP_API_URL + "/" + props?.images);

  return (
    <Link to={`/product/${props.id}`} className="group relative block w-full">
      {/* Badges */}
      <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
        {props.oldPrice && (
          <span className="bg-green-600 px-2 py-1 text-[10px] sm:text-xs font-medium text-white rounded">
            {discountPercentage}% OFF
          </span>
        )}
        <span className="bg-orange-500 px-2 py-1 text-[8px] sm:text-[10px] font-bold uppercase text-white rounded">
          Featured
        </span>
      </div>
      {/* Wishlist Button */}
      <button
        type="button"
        onClick={handleWishlistClick}
        className="absolute right-2 top-2 z-10 rounded-full bg-white p-1.5 sm:p-2 opacity-0 transition-opacity group-hover:opacity-100 shadow-md"
      >
        {inWishlist ? (
          <FaHeart size={14} className="sm:w-[18px] sm:h-[18px] text-red-500" />
        ) : (
          <FaRegHeart size={14} className="sm:w-[18px] sm:h-[18px] text-gray-400 hover:text-red-500" />
        )}
      </button>
      {/* Product Image */}
      <div className="mb-2 sm:mb-3 overflow-hidden rounded bg-gray-100">
        {props.images && (
          <img
            src={props.images[0]}
            alt={props.name}
            className="h-48 sm:h-64 lg:h-80 w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}
      </div>
      {/* Product Info */}
      <div className="px-1">
        <h3 className="mb-1 text-xs sm:text-sm font-medium text-gray-800 line-clamp-2 leading-tight">
          {props.name}
        </h3>
        <div className="flex items-center gap-1 sm:gap-2 mb-1">
          <span className="font-bold text-gray-900 text-sm sm:text-base">${props.price}</span>
          {props.oldPrice && (
            <span className="text-xs sm:text-sm text-gray-400 line-through">
              ${props.oldPrice}
            </span>
          )}
        </div>
        <div>
          <span className="text-[10px] sm:text-xs text-green-600 font-medium">
            {props.availability}
          </span>
        </div>
      </div>
    </Link>
  );
}
