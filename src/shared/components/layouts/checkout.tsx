import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./cartcontext";
import { OrderService } from "../../services/order";
import Layout from "./layout";
import type { Product } from "../../store/products";

interface CartItem extends Product {
  quantity: number;
}

const Checkout = () => {
  const navigate = useNavigate();
  const { cart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
  });

  const subtotal = cart.reduce(
    (sum: number, item: CartItem) => sum + item.price * item.quantity,
    0,
  );
  const shipping = cart.length ? 5 : 0;
  const total = subtotal + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    try {
      await OrderService.createOrder({
        orderId: `ORDER-${Date.now()}`,
        cartName: `${formData.firstName} ${formData.lastName}`,
        totalAmount: total,
        timeOrderPlaced: new Date(),
      });
      
      setOrderComplete(true);
    } catch (error) {
      console.error('Order creation failed:', error);
      alert('Order failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (cart.length === 0) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
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

  if (orderComplete) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <div className="bg-green-50 border border-green-200 rounded-lg p-8 mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-green-800 mb-4">Order Confirmed!</h1>
            <p className="text-lg text-green-700 mb-6">
              Thank you for your purchase! Your order is being processed and will be shipped soon.
            </p>
            <div className="bg-white border border-green-200 rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-2 text-left">
                {cart.map((item: CartItem) => (
                  <div key={item.id} className="flex justify-between">
                    <span>{item.name} × {item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t pt-2 font-semibold">
                  <div className="flex justify-between">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-blue-800 font-medium">
                📦 Your products are on the way!
              </p>
              <p className="text-blue-600 text-sm mt-1">
                Expected delivery: 3-5 business days
              </p>
            </div>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => navigate("/Shop")}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
              >
                Continue Shopping
              </button>
              <button
                onClick={() => navigate("/")}
                className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-4">Checkout</h1>
          <div className="text-sm text-gray-600">
            <span>Cart</span> › <span className="font-medium">Checkout</span>
          </div>
        </div>

        <form onSubmit={handlePlaceOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Billing Details */}
            <div className="lg:col-span-2">
              <div className="bg-white border rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-6">Billing Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="border border-gray-300 px-4 py-3 rounded focus:outline-none focus:border-blue-500"
                    placeholder="First name *"
                    required
                  />
                  <input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="border border-gray-300 px-4 py-3 rounded focus:outline-none focus:border-blue-500"
                    placeholder="Last name *"
                    required
                  />
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="border border-gray-300 px-4 py-3 rounded focus:outline-none focus:border-blue-500 md:col-span-2"
                    placeholder="Email address *"
                    required
                  />
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="border border-gray-300 px-4 py-3 rounded focus:outline-none focus:border-blue-500 md:col-span-2"
                    placeholder="Phone *"
                    required
                  />
                  <input
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="border border-gray-300 px-4 py-3 rounded focus:outline-none focus:border-blue-500 md:col-span-2"
                    placeholder="Street address *"
                    required
                  />
                  <input
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="border border-gray-300 px-4 py-3 rounded focus:outline-none focus:border-blue-500"
                    placeholder="City *"
                    required
                  />
                  <input
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className="border border-gray-300 px-4 py-3 rounded focus:outline-none focus:border-blue-500"
                    placeholder="ZIP Code *"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <div className="bg-white border rounded-lg p-6 sticky top-4">
                <h3 className="text-xl font-semibold mb-6">Your Order</h3>
                <div className="space-y-4">
                  <div className="flex justify-between font-medium border-b pb-2">
                    <span>Product</span>
                    <span>Subtotal</span>
                  </div>
                  {cart.map((item: CartItem) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>{item.name} × {item.quantity}</span>
                      <span className="font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-medium">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span className="font-medium">${shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold border-t pt-2">
                      <span>Total</span>
                      <span className="text-blue-600">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className={`w-full mt-6 py-3 rounded-lg font-semibold transition-colors ${
                    isProcessing
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-orange-500 hover:bg-orange-600 text-white"
                  }`}
                >
                  {isProcessing ? "Processing..." : "Place Order"}
                </button>
                <p className="text-xs text-gray-500 mt-4">
                  Your personal data will be used to process your order and support your experience.
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Checkout;
