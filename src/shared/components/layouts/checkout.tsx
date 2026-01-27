import { useEffect, useMemo, useState } from "react";
import Layout from "./layout";
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const CART_STORAGE_KEY = "your_cart";

const loadStoredCart = (): CartItem[] => {
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const Checkout = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() =>
    loadStoredCart(),
  );

  useEffect(() => {
    setCartItems(loadStoredCart());
  }, []);

  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems],
  );
  const shipping = cartItems.length ? 5 : 0;
  const total = subtotal + shipping;

  return (
    <Layout>
      <div className="min-h-screen bg-[#121212] text-white">
        <div className="bg-[#1c1c1c] border-b border-white/10">
          <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-white/70">
            <span>Shopping Cart</span>
            <span className="mx-2">›</span>
            <span>Checkout</span>
            <span className="mx-2">›</span>
            <span>Order Complete</span>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8">
              <div className="space-y-6">
                <div className="bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-sm text-white/70">
                  Returning customer? Click here to login
                </div>
                <div className="bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-sm text-white/70">
                  Have a coupon? Click here to enter your code
                </div>

                <div className="border border-white/10 rounded-lg p-6">
                  <h2 className="text-lg font-bold mb-6">Billing details</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      className="bg-white/10 border border-white/10 px-4 py-3 text-sm"
                      placeholder="First name *"
                    />
                    <input
                      className="bg-white/10 border border-white/10 px-4 py-3 text-sm"
                      placeholder="Last name *"
                    />
                    <input
                      className="bg-white/10 border border-white/10 px-4 py-3 text-sm md:col-span-2"
                      placeholder="Company name (optional)"
                    />
                    <input
                      className="bg-white/10 border border-white/10 px-4 py-3 text-sm md:col-span-2"
                      placeholder="Country / Region *"
                    />
                    <input
                      className="bg-white/10 border border-white/10 px-4 py-3 text-sm md:col-span-2"
                      placeholder="Street address *"
                    />
                    <input
                      className="bg-white/10 border border-white/10 px-4 py-3 text-sm md:col-span-2"
                      placeholder="Town / City *"
                    />
                    <input
                      className="bg-white/10 border border-white/10 px-4 py-3 text-sm"
                      placeholder="State *"
                    />
                    <input
                      className="bg-white/10 border border-white/10 px-4 py-3 text-sm"
                      placeholder="ZIP Code *"
                    />
                    <input
                      className="bg-white/10 border border-white/10 px-4 py-3 text-sm"
                      placeholder="Phone *"
                    />
                    <input
                      className="bg-white/10 border border-white/10 px-4 py-3 text-sm"
                      placeholder="Email address *"
                    />
                    <div className="md:col-span-2">
                      <textarea
                        className="bg-white/10 border border-white/10 px-4 py-3 text-sm w-full min-h-[120px]"
                        placeholder="Order notes (optional)"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="border border-white/10 rounded-lg p-6 space-y-6">
                <h3 className="text-lg font-bold">Your order</h3>
                <div className="space-y-4 text-sm text-white/80">
                  <div className="flex items-center justify-between">
                    <span>Product</span>
                    <span>Subtotal</span>
                  </div>
                  <div className="border-t border-white/10" />
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between"
                    >
                      <span>
                        {item.name} × {item.quantity}
                      </span>
                      <span className="text-blue-400 font-bold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                  <div className="border-t border-white/10 pt-3 flex items-center justify-between">
                    <span>Subtotal</span>
                    <span className="text-blue-400 font-bold">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Shipping</span>
                    <span className="text-blue-400 font-bold">
                      ${shipping.toFixed(2)}
                    </span>
                  </div>
                  <div className="border-t border-white/10 pt-3 flex items-center justify-between text-base">
                    <span>Total</span>
                    <span className="text-blue-400 font-bold">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>
                <button className="w-full bg-orange-500 py-3 text-sm font-bold uppercase">
                  Place Order
                </button>
                <div className="text-xs text-white/60">
                  Your personal data will be used to process your order and
                  support your experience throughout this website.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
