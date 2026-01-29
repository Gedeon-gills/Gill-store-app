import { FaHeart, FaRegHeart, FaEye, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useWishlist } from "../layouts/wishlistcontext";
import { useCart } from "../layouts/cartcontext";
import type { Product } from "../../store/products";

export default function ProductHomeCard(props: Product) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();
  const inWishlist = isInWishlist(props.id);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (inWishlist) {
      removeFromWishlist(props.id);
    } else {
      addToWishlist(props);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(props);
  };

  const discountPercentage = props.oldPrice
    ? Math.round(((props.oldPrice - props.price) / props.oldPrice) * 100)
    : 0;

  return (
    <div className="group relative bg-white transition-all duration-300 hover:shadow-xl hover:shadow-black/10 rounded overflow-hidden m-1 sm:m-2 lg:m-3">
      {/* Badges */}
      <div className="absolute top-2 left-2 z-20 flex flex-col gap-1">
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
        className="absolute right-3 top-3 z-20 rounded-full bg-white p-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 shadow-md"
      >
        {inWishlist ? (
          <FaHeart size={16} className="text-red-500" />
        ) : (
          <FaRegHeart size={16} className="text-gray-400 hover:text-red-500" />
        )}
      </button>
      
      {/* Product Image */}
      <div className="relative overflow-hidden">
        {props.images && (
          <img
            src={props.images[0]}
            alt={props.name}
            className="h-40 sm:h-48 lg:h-56 w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        )}
        
        {/* Hover Actions */}
        <div className="absolute bottom-0 left-0 w-full bg-blue-600/90 flex justify-center gap-4 p-3 transform translate-y-full transition-transform duration-300 group-hover:translate-y-0">
          <button
            onClick={handleAddToCart}
            className="bg-white text-blue-600 p-2 rounded-full hover:bg-gray-100 transition-colors"
            title="Add to Cart"
          >
            <FaShoppingCart size={16} />
          </button>
          <Link
            to={`/product/${props.id}`}
            className="bg-white text-blue-600 p-2 rounded-full hover:bg-gray-100 transition-colors"
            title="Quick View"
          >
            <FaEye size={16} />
          </Link>
        </div>
      </div>
      
      {/* Product Info */}
      <Link to={`/product/${props.id}`} className="block p-3">
        <h3 className="mb-2 text-sm font-medium text-gray-800 line-clamp-2 leading-tight">
          {props.name}
        </h3>
        <div className="flex items-center gap-2 mb-2">
          <span className="font-bold text-gray-900 text-base">${props.price}</span>
          {props.oldPrice && (
            <span className="text-sm text-gray-400 line-through">
              ${props.oldPrice}
            </span>
          )}
        </div>
        <div>
          <span className="text-xs text-green-600 font-medium">
            {props.availability}
          </span>
        </div>
      </Link>
    </div>
  );
}
