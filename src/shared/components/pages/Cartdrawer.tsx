import { ChevronLeft, Trash2, Plus, Minus } from "lucide-react";
import { useCart } from "../layouts/cartcontext";
import { Link } from "react-router-dom";

const CartDrawer = ({ isOpen, onClose }: any) => {
  const { cart, increaseQty, decreaseQty } = useCart();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div
      className={`fixed inset-y-0 right-0 w-[380px] bg-white z-50 transition-transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 flex items-center">
        <button onClick={onClose}>
          <ChevronLeft />
        </button>
        <h2 className="flex-1 text-center font-bold uppercase text-sm">
          My Cart
        </h2>
      </div>

      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full">
          <p className="uppercase text-sm mb-4">Shopping cart is empty!</p>
        </div>
      ) : (
        <>
          {/* Items */}
          <div className=" space-y-4 overflow-y-auto flex-1">
            {cart.map((item) => (
              <div key={item.id} className="flex gap-3 border-b ">
                <img src={item.images[0]} className="w-16 h-20 object-cover" />

                <div className="flex-1">
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-gray-500">${item.price}</p>

                  <div className="flex items-center gap-2 mt-2">
                    <button onClick={() => decreaseQty(item.id)}>
                      <Minus size={14} />
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQty(item.id)}>
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                <Trash2
                  size={18}
                  className="text-gray-400 cursor-pointer"
                  onClick={() => decreaseQty(item.id)}
                />
              </div>
            ))}
          </div>
          <div className="border-t">
            <div className="flex justify-between font-semibold mb-4">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <Link
              to="/carts"
              className="bg-blue-600 text-white w-full py-3 text-center block"
            >
              View Cart
            </Link>

            <Link
              to="/checkout"
              className="bg-orange-500 text-white w-full py-3 text-center block"
            >
              Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default CartDrawer;
