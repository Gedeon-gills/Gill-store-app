import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { useCart } from "../layouts/cartcontext";
import Layout from "../layouts/layout";
import type { Product } from "../../store/products";

interface CartItem extends Product {
  quantity: number;
}

export default function Carts() {
  const navigate = useNavigate();
  const { cart, increaseQty, decreaseQty } = useCart();

  const subtotal = cart.reduce(
    (sum: number, item: CartItem) => sum + item.price * item.quantity,
    0,
  );
  const shipping = 5.00;
  const total = subtotal + shipping;

  const handleCheckout = () => {
    navigate("/checkout");
  };

  if (cart.length === 0) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <button
            onClick={() => navigate("/Shop")}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg"
          >
            Continue Shopping
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
        <h1 className="text-2xl font-bold mb-8">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white border rounded-lg overflow-hidden">
              {/* Desktop Header */}
              <div className="hidden md:grid grid-cols-5 p-4 border-b text-sm font-semibold text-gray-700 bg-gray-50">
                <div>PRODUCT</div>
                <div>PRICE</div>
                <div>QUANTITY</div>
                <div>SUBTOTAL</div>
                <div></div>
              </div>

              {/* Cart Items */}
              {cart.map((item: CartItem) => (
                <div key={item.id} className="border-b last:border-b-0">
                  {/* Desktop Layout */}
                  <div className="hidden md:grid grid-cols-5 items-center p-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <p className="text-sm font-medium">{item.name}</p>
                    </div>
                    <div className="text-blue-600 font-medium">${item.price}</div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => decreaseQty(item.id)}
                        className="w-8 h-8 border rounded-full hover:bg-gray-50"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 border rounded">{item.quantity}</span>
                      <button
                        onClick={() => increaseQty(item.id)}
                        className="w-8 h-8 border rounded-full hover:bg-gray-50"
                      >
                        +
                      </button>
                    </div>
                    <div className="text-blue-600 font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  {/* Mobile Layout */}
                  <div className="md:hidden p-4">
                    <div className="flex gap-4">
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded flex-shrink-0"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-sm mb-2">{item.name}</h3>
                        <p className="text-blue-600 font-medium mb-3">${item.price}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => decreaseQty(item.id)}
                              className="w-8 h-8 border rounded-full"
                            >
                              -
                            </button>
                            <span className="px-3 py-1 border rounded">{item.quantity}</span>
                            <button
                              onClick={() => increaseQty(item.id)}
                              className="w-8 h-8 border rounded-full"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => decreaseQty(item.id)}
                            className="text-gray-400 hover:text-red-500"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                        <p className="text-right font-medium mt-2">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Coupon Section */}
              <div className="p-4 bg-gray-50">
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="text"
                    placeholder="Coupon code"
                    className="border px-4 py-2 rounded flex-1"
                  />
                  <button className="bg-blue-600 text-white px-6 py-2 rounded font-semibold hover:bg-blue-700">
                    APPLY COUPON
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Cart Totals */}
          <div className="bg-white border rounded-lg p-6 h-fit">
            <h2 className="text-lg font-semibold mb-6">CART TOTALS</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span className="text-blue-600 font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span>
                  Flat rate: <span className="text-blue-600">${shipping.toFixed(2)}</span>
                </span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span className="text-blue-600">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Free Shipping Progress */}
            <div className="mb-6">
              <div className="w-full bg-gray-200 h-2 rounded">
                <div 
                  className="bg-blue-600 h-2 rounded transition-all"
                  style={{ width: `${Math.min((subtotal / 200) * 100, 100)}%` }}
                ></div>
              </div>
              <p className="text-sm mt-2 text-gray-600">
                {subtotal >= 200 ? (
                  "🎉 You qualify for free shipping!"
                ) : (
                  <>Spend <strong>${(200 - subtotal).toFixed(2)}</strong> more for free shipping</>
                )}
              </p>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition-colors"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
