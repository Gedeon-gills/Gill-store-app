import React from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, ChevronLeft } from "lucide-react"; // Optional: Use Lucide for icons

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleContinueShopping = () => {
    onClose();
    navigate("/shop"); // Redirects to your shop page
  };

  return (
    <>
      {/* 1. Backdrop Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      />

      {/* 2. Side Drawer Panel */}
      <div
        className={`fixed inset-y-0 right-0 z-[70] w-full max-w-[400px] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Blue Header Section */}
        <div className="bg-[#2b78ef] p-4 flex items-center text-white">
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/10 rounded-full transition"
          >
            <ChevronLeft size={24} />
          </button>
          <h2 className="flex-1 text-center font-bold tracking-[0.1em] text-sm uppercase">
            My Cart
          </h2>
        </div>

        {/* Empty State Content */}
        <div className="flex flex-col items-center justify-center h-[70vh] px-8 text-center">
          <div className="mb-6 text-gray-400">
            <ShoppingBag size={120} strokeWidth={1} />
          </div>

          <p className="text-[#333] font-semibold mb-8 uppercase text-xs tracking-wider">
            Shopping Cart is Empty!
          </p>

          <button
            onClick={handleContinueShopping}
            className="bg-[#2b78ef] text-white px-8 py-4 rounded-sm text-xs font-bold uppercase hover:bg-blue-700 transition-all w-full shadow-md"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
