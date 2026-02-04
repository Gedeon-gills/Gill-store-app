import { useNavigate } from "react-router-dom";
import { ChevronLeft, Trash2 } from "lucide-react";
import { useCart } from "../layouts/cartcontext";
import type { Product } from "../../store/products";
interface CartItem extends Product {
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
  const navigate = useNavigate();
  const { cart, increaseQty, decreaseQty } = useCart();

  const handleContinueShopping = () => {
    onClose();
    navigate("/Shop");
  };

  const handleViewCart = () => {
    onClose();
    navigate("/Carts");
  };

  const handleCheckout = () => {
    onClose();
    navigate("/checkout");
  };

  const subtotal = cart.reduce(
    (sum: number, item: CartItem) => sum + item.price * item.quantity,
    0,
  );

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed inset-y-0 right-0 z-[70] w-full sm:w-[400px] max-w-[400px] bg-white transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="bg-blue-600 p-3 sm:p-4 flex items-center text-white shadow-md">
          <button onClick={onClose} className="hover:bg-blue-700 p-1 rounded">
            <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
          </button>
          <h2 className="flex-1 text-center font-bold text-base sm:text-lg">
            Shopping Cart ({cart.length})
          </h2>
        </div>

        {/* CART CONTENT */}
        {cart.length === 0 ? (
          /* EMPTY STATE */
          <div className="flex flex-col items-center justify-center h-[70vh] px-4 sm:px-8 text-center">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4 sm:mb-6">
              <svg
                className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6m0 0h15M17 21a2 2 0 100-4 2 2 0 000 4zM9 21a2 2 0 100-4 2 2 0 000 4z"
                />
              </svg>
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
              Your cart is empty
            </h3>
            <p className="text-sm sm:text-base text-gray-500 mb-4 sm:mb-6">
              Add some products to get started
            </p>
            <button
              onClick={handleContinueShopping}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-medium transition-colors text-sm sm:text-base"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          /* ITEMS */
          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto p-3 sm:p-4">
              <div className="space-y-3 sm:space-y-4">
                {cart.map((item: CartItem) => (
                  <div
                    key={item.id}
                    className="flex gap-3 sm:gap-4 p-2.5 sm:p-3 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow"
                  >
                    <img
                      src={item.images?.[0] || 'https://via.placeholder.com/64x64'}
                      alt={item.name}
                      className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-md flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs sm:text-sm font-medium text-gray-900 truncate">
                        {item.name}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-500 mb-1.5 sm:mb-2">
                        ${item.price}
                      </p>
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <button
                          onClick={() => decreaseQty(item.id)}
                          className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50 text-xs sm:text-sm"
                        >
                          -
                        </button>
                        <span className="w-6 sm:w-8 text-center text-xs sm:text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => increaseQty(item.id)}
                          className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50 text-xs sm:text-sm"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <button
                        onClick={() => decreaseQty(item.id)}
                        className="text-gray-400 hover:text-red-500 p-0.5 sm:p-1"
                      >
                        <Trash2 size={14} className="sm:w-4 sm:h-4" />
                      </button>
                      <p className="text-xs sm:text-sm font-semibold text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FOOTER */}
            <div className="border-t bg-gray-50 p-3 sm:p-4">
              <div className="flex justify-between items-center mb-3 sm:mb-4">
                <span className="text-base sm:text-lg font-semibold text-gray-900">
                  Subtotal:
                </span>
                <span className="text-lg sm:text-xl font-bold text-blue-600">
                  ${subtotal.toFixed(2)}
                </span>
              </div>

              <div className="space-y-2 sm:space-y-3">
                <button
                  onClick={handleViewCart}
                  className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2.5 sm:py-3 rounded-lg font-medium transition-colors text-sm sm:text-base"
                >
                  View Cart
                </button>
                <button
                  onClick={handleCheckout}
                  className="bg-orange-500 hover:bg-orange-600 text-white w-full py-2.5 sm:py-3 rounded-lg font-medium transition-colors text-sm sm:text-base"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
