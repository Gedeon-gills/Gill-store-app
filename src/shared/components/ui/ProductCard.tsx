import { FaHeart, FaRegHeart, FaEye, FaShoppingCart, FaRandom } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useWishlist } from "../layouts/wishlistcontext";
import { useCart } from "../layouts/cartcontext";
import type { Product } from "../../store/products";

export default function ProductHomeCard(props: Product) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();
  const inWishlist = isInWishlist(props.id);
  
  // Check if user is admin
  const user = localStorage.getItem('user');
  const isAdmin = user ? JSON.parse(user)?.role === 'admin' : false;

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

  const handleProductClick = (e: React.MouseEvent) => {
    if (isAdmin) {
      e.preventDefault();
    }
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
        <span className={`px-2 py-1 text-[8px] sm:text-[10px] font-bold uppercase text-white rounded ${
          props.availability === "In Stock" ? "bg-green-500" : "bg-red-500"
        }`}>
          {props.availability}
        </span>
        {props.owner && (
          <span className="bg-blue-500 px-2 py-1 text-[8px] sm:text-[10px] font-medium text-white rounded">
            {props.owner}
          </span>
        )}
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
        {props.images && props.images.length > 0 ? (
          <img
            src={props.images[0].startsWith('http') ? props.images[0] : `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${props.images[0]}`}
            alt={props.name}
            className="h-40 sm:h-48 lg:h-56 w-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={(e) => {
              e.currentTarget.src = '/placeholder-image.jpg';
            }}
          />
        ) : (
          <div className="h-40 sm:h-48 lg:h-56 w-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">No Image</span>
          </div>
        )}
        
        {/* Hover Actions */}
        <div className="absolute bottom-0 left-0 w-full flex justify-center gap-4 p-3 transform translate-y-full transition-transform duration-300 group-hover:translate-y-0">
          <button
            onClick={handleAddToCart}
            className="bg-white/90 text-gray-800 p-2 rounded-full hover:bg-white transition-colors shadow-md"
            title="Add to Cart"
          >
            <FaShoppingCart size={16} />
          </button>
          <Link
            to={isAdmin ? '#' : `/product/${props.id}`}
            onClick={handleProductClick}
            className={`bg-white/90 text-gray-800 p-2 rounded-full hover:bg-white transition-colors shadow-md ${
              isAdmin ? 'cursor-not-allowed opacity-50' : ''
            }`}
            title={isAdmin ? 'Admin cannot view product details' : 'Quick View'}
          >
            <FaEye size={16} />
          </Link>
          <button
            className="bg-white/90 text-gray-800 p-2 rounded-full hover:bg-white transition-colors shadow-md"
            title="Shuffle"
          >
            <FaRandom size={16} />
          </button>
        </div>
      </div>
      
      {/* Product Info */}
      <Link 
        to={isAdmin ? '#' : `/product/${props.id}`} 
        onClick={handleProductClick}
        className={`block p-3 ${isAdmin ? 'cursor-not-allowed' : ''}`}
      >
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
        <div className="flex items-center justify-between">
          <span className={`text-xs font-medium ${
            props.availability === "In Stock" ? "text-green-600" : "text-red-600"
          }`}>
            {props.availability}
          </span>
          {props.sku && (
            <span className="text-xs text-gray-400">
              SKU: {props.sku.slice(-6)}
            </span>
          )}
        </div>
        {props.description && (
          <p className="text-xs text-gray-500 mt-1 line-clamp-2">
            {props.description}
          </p>
        )}
      </Link>
    </div>
  );
}
