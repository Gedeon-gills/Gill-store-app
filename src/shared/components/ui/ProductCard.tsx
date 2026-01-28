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

  return (
    <Link to={`/product/${props.id}`} className="group relative block">
      {/* Badges */}
      <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
        {props.oldPrice && (
          <span className="bg-green-600 px-2 py-1 text-xs font-medium text-white rounded">
            {discountPercentage}% OFF
          </span>
        )}
        <span className="bg-orange-500 px-2 py-1 text-[10px] font-bold uppercase text-white rounded">
          Featured
        </span>
      </div>

      {/* Wishlist Button */}
      <button
        type="button"
        onClick={handleWishlistClick}
        className="absolute right-2 top-2 z-10 rounded-full bg-white p-2 opacity-0 transition-opacity group-hover:opacity-100 shadow-md"
      >
        {inWishlist ? (
          <FaHeart size={18} className="text-red-500" />
        ) : (
          <FaRegHeart size={18} className="text-gray-400 hover:text-red-500" />
        )}
      </button>

      {/* Product Image */}
      <div className="mb-3 overflow-hidden rounded bg-gray-100">
        <img
          src={props.images[0]}
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
          {props.oldPrice && (
            <span className="text-sm text-gray-400 line-through">
              ${props.oldPrice}
            </span>
          )}
        </div>
        <div className="mt-1">
          <span className="text-xs text-green-600 font-medium">
            {props.availability}
          </span>
        </div>
      </div>
    </Link>
  );
}
