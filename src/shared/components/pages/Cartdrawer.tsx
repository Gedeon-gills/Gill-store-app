import { useCart } from "../layouts/cartcontext";
interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { cart, increaseQty, decreaseQty } = useCart();

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 z-[60] ${isOpen ? "visible opacity-100" : "invisible opacity-0"}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-[400px] bg-white z-[70] transform transition ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="bg-[#2b78ef] p-4 text-white text-center font-bold">
          My Cart
        </div>

        {/* CONTENT */}
        {cart.length === 0 ? (
          /* EMPTY STATE */
          <div className="flex flex-col items-center justify-center h-full">
            <p className="uppercase text-sm">Shopping Cart is Empty!</p>
          </div>
        ) : (
          /* CART ITEMS */
          <div className="p-4 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex gap-4 border-b pb-4">
                <img src={item.images[0]} className="w-20 h-20 object-cover" />

                <div className="flex-1">
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-500">${item.price}</p>

                  <div className="flex items-center gap-3 mt-2">
                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="px-2 border"
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => increaseQty(item.id)}
                      className="px-2 border"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
