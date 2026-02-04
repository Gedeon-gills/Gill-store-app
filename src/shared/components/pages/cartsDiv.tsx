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
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
          <div className="max-w-md mx-auto px-6 py-12 text-center">
            <div className="bg-white rounded-3xl shadow-xl p-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6m0 0h15M17 21a2 2 0 100-4 2 2 0 000 4zM9 21a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
              <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet. Start shopping to fill it up!</p>
              <button
                onClick={() => navigate("/Shop")}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg"
              >
                Start Shopping
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Shopping Cart</h1>
            <p className="text-gray-600">Review your items and proceed to checkout</p>
          </div>
        
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            {/* Cart Items */}
            <div className="xl:col-span-3">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                {/* Desktop Header */}
                <div className="hidden md:grid grid-cols-5 p-6 border-b text-sm font-bold text-gray-700 bg-gradient-to-r from-blue-50 to-purple-50">
                  <div>PRODUCT</div>
                  <div>PRICE</div>
                  <div>QUANTITY</div>
                  <div>SUBTOTAL</div>
                  <div></div>
                </div>

                {/* Cart Items */}
                {cart.map((item: CartItem) => (
                  <div key={item.id} className="border-b last:border-b-0 hover:bg-gray-50 transition-colors">
                    {/* Desktop Layout */}
                    <div className="hidden md:grid grid-cols-5 items-center p-6">
                      <div className="flex items-center gap-4">
                        <img
                          src={item.images[0]}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-xl shadow-md"
                        />
                        <div>
                          <p className="font-semibold text-gray-900">{item.name}</p>
                          <p className="text-sm text-gray-500">SKU: {item.sku}</p>
                        </div>
                      </div>
                      <div className="text-blue-600 font-bold text-lg">${item.price}</div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => decreaseQty(item.id)}
                          className="w-10 h-10 border-2 border-gray-300 rounded-full hover:border-blue-500 hover:bg-blue-50 transition-all flex items-center justify-center font-bold"
                        >
                          -
                        </button>
                        <span className="px-4 py-2 bg-gray-100 rounded-lg font-bold min-w-[60px] text-center">{item.quantity}</span>
                        <button
                          onClick={() => increaseQty(item.id)}
                          className="w-10 h-10 border-2 border-gray-300 rounded-full hover:border-blue-500 hover:bg-blue-50 transition-all flex items-center justify-center font-bold"
                        >
                          +
                        </button>
                      </div>
                      <div className="text-blue-600 font-bold text-lg">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                      <button
                        onClick={() => decreaseQty(item.id)}
                        className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-full transition-all"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>

                    {/* Mobile Layout */}
                    <div className="md:hidden p-6">
                      <div className="flex gap-4">
                        <img
                          src={item.images[0]}
                          alt={item.name}
                          className="w-24 h-24 object-cover rounded-xl shadow-md flex-shrink-0"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
                          <p className="text-blue-600 font-bold text-lg mb-4">${item.price}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => decreaseQty(item.id)}
                                className="w-10 h-10 border-2 border-gray-300 rounded-full hover:border-blue-500 hover:bg-blue-50 transition-all flex items-center justify-center font-bold"
                              >
                                -
                              </button>
                              <span className="px-4 py-2 bg-gray-100 rounded-lg font-bold">{item.quantity}</span>
                              <button
                                onClick={() => increaseQty(item.id)}
                                className="w-10 h-10 border-2 border-gray-300 rounded-full hover:border-blue-500 hover:bg-blue-50 transition-all flex items-center justify-center font-bold"
                              >
                                +
                              </button>
                            </div>
                            <button
                              onClick={() => decreaseQty(item.id)}
                              className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-full transition-all"
                            >
                              <Trash2 size={20} />
                            </button>
                          </div>
                          <p className="text-right font-bold text-lg mt-3 text-blue-600">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Coupon Section */}
                <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <input
                      type="text"
                      placeholder="Enter coupon code"
                      className="border-2 border-gray-200 px-4 py-3 rounded-xl flex-1 focus:border-blue-500 focus:outline-none transition-colors"
                    />
                    <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg">
                      APPLY COUPON
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Cart Totals */}
            <div className="bg-white rounded-2xl shadow-lg p-8 h-fit sticky top-8">
              <h2 className="text-2xl font-bold mb-8 text-gray-900">Order Summary</h2>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({cart.length} items)</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-semibold">${shipping.toFixed(2)}</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between font-bold text-xl text-gray-900">
                    <span>Total</span>
                    <span className="text-blue-600">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Free Shipping Progress */}
              <div className="mb-8 p-4 bg-blue-50 rounded-xl">
                <div className="flex items-center mb-3">
                  <svg className="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                    <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1V8a1 1 0 00-1-1h-3z" />
                  </svg>
                  <span className="font-semibold text-blue-900">Free Shipping Progress</span>
                </div>
                <div className="w-full bg-blue-200 h-3 rounded-full mb-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((subtotal / 200) * 100, 100)}%` }}
                  ></div>
                </div>
                <p className="text-sm text-blue-800">
                  {subtotal >= 200 ? (
                    "🎉 You qualify for free shipping!"
                  ) : (
                    <>Spend <strong>${(200 - subtotal).toFixed(2)}</strong> more for free shipping</>
                  )}
                </p>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg"
              >
                PROCEED TO CHECKOUT
              </button>
              
              <div className="mt-6 flex items-center justify-center text-sm text-gray-500">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                Secure checkout guaranteed
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
