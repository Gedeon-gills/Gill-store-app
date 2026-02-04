import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./cartcontext";
import  orderService  from "../../services/order";
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
  const [orderNumber, setOrderNumber] = useState("");
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    paymentMethod: 'card'
  });

  const subtotal = cart.reduce(
    (sum: number, item: CartItem) => sum + item.price * item.quantity,
    0,
  );
  const shipping = cart.length ? 5 : 0;
  const total = subtotal + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    try {
      const user = localStorage.getItem('user');
      if (!user || user === 'undefined') {
        alert('Please login to place an order');
        navigate('/login');
        return;
      }

      const userData = JSON.parse(user);
      const cartName = `${userData.username}_cart`;
      
      const orderData = {
        cartName: cartName
      };
      
      const result = await orderService.createOrder(orderData);
      setOrderNumber(result.order.orderId || result.order._id);
      
      // Clear cart after successful order
      localStorage.removeItem(cartName);
      
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
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              {/* Success Header */}
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-12 text-center">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h1 className="text-4xl font-bold text-white mb-4">Order Confirmed!</h1>
                <p className="text-xl text-green-100 mb-2">
                  Thank you for your purchase!
                </p>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-3 inline-block">
                  <p className="text-white font-semibold">
                    Order #{orderNumber}
                  </p>
                </div>
              </div>

              <div className="px-8 py-8">
                {/* Order Details */}
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  {/* Order Summary */}
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-3">📦</div>
                      Order Summary
                    </h2>
                    <div className="space-y-4">
                      {cart.map((item: CartItem) => (
                        <div key={item.id} className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-sm">
                          <img 
                            src={item.images?.[0] || '/placeholder.jpg'} 
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{item.name}</h4>
                            <p className="text-gray-500 text-sm">Quantity: {item.quantity}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                        </div>
                      ))}
                      <div className="border-t pt-4">
                        <div className="flex justify-between text-lg font-bold text-gray-900">
                          <span>Total Paid</span>
                          <span className="text-green-600">${total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Delivery Info */}
                  <div className="space-y-6">
                    <div className="bg-blue-50 rounded-2xl p-6">
                      <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-3">🚚</div>
                        Delivery Information
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center text-blue-800">
                          <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                          </svg>
                          <span className="font-semibold">Expected Delivery: 3-5 business days</span>
                        </div>
                        <div className="flex items-center text-blue-800">
                          <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                          </svg>
                          <span>Confirmation email sent</span>
                        </div>
                        <div className="flex items-center text-blue-800">
                          <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                          </svg>
                          <span>Free returns within 30 days</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-yellow-50 rounded-2xl p-6">
                      <h3 className="text-xl font-bold text-yellow-900 mb-4 flex items-center">
                        <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold mr-3">⭐</div>
                        What's Next?
                      </h3>
                      <div className="space-y-3 text-yellow-800">
                        <div className="flex items-start">
                          <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-white text-xs font-bold mr-3 mt-0.5">1</div>
                          <span>We'll prepare your order within 24 hours</span>
                        </div>
                        <div className="flex items-start">
                          <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-white text-xs font-bold mr-3 mt-0.5">2</div>
                          <span>You'll receive tracking information via email</span>
                        </div>
                        <div className="flex items-start">
                          <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-white text-xs font-bold mr-3 mt-0.5">3</div>
                          <span>Enjoy your new products!</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => navigate("/orders")}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg"
                  >
                    Track Your Order
                  </button>
                  <button
                    onClick={() => navigate("/Shop")}
                    className="bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-xl font-bold transition-all"
                  >
                    Continue Shopping
                  </button>
                  <button
                    onClick={() => navigate("/")}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-4 rounded-xl font-bold transition-all"
                  >
                    Back to Home
                  </button>
                </div>

                {/* Footer Message */}
                <div className="mt-8 text-center">
                  <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl p-6">
                    <p className="text-gray-700 font-semibold mb-2">
                      🎉 Thank you for choosing GillStore!
                    </p>
                    <p className="text-gray-600 text-sm">
                      We appreciate your business and hope you love your new products. 
                      Don't forget to leave a review once you receive your order!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Secure Checkout</h1>
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">1. Cart</span>
              <span className="text-gray-400">→</span>
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full">2. Checkout</span>
              <span className="text-gray-400">→</span>
              <span className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full">3. Complete</span>
            </div>
          </div>

          <form onSubmit={handlePlaceOrder}>
            <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
              {/* Billing Details */}
              <div className="xl:col-span-3">
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                  <div className="flex items-center mb-6">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-3">1</div>
                    <h2 className="text-2xl font-bold text-gray-900">Billing Information</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                      <input
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
                        placeholder="Enter your first name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                      <input
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
                        placeholder="Enter your last name"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                      <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
                        placeholder="Enter your email address"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                      <input
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
                        placeholder="Enter your phone number"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Street Address *</label>
                      <input
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
                        placeholder="Enter your street address"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                      <input
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
                        placeholder="Enter your city"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code *</label>
                      <input
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
                        placeholder="Enter ZIP code"
                        required
                      />
                    </div>
                  </div>
                </div>
                
                {/* Payment Method */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-3">2</div>
                    <h3 className="text-2xl font-bold text-gray-900">Payment Method</h3>
                  </div>
                  <div className="space-y-4">
                    <label className="flex items-center p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-blue-300 transition-colors">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={formData.paymentMethod === 'card'}
                        onChange={handleInputChange}
                        className="mr-4 w-5 h-5 text-blue-600"
                      />
                      <div className="flex items-center">
                        <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded mr-3 flex items-center justify-center">
                          <span className="text-white text-xs font-bold">💳</span>
                        </div>
                        <div>
                          <span className="font-semibold">Credit/Debit Card</span>
                          <p className="text-sm text-gray-500">Visa, Mastercard, American Express</p>
                        </div>
                      </div>
                    </label>
                    <label className="flex items-center p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-blue-300 transition-colors">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="paypal"
                        checked={formData.paymentMethod === 'paypal'}
                        onChange={handleInputChange}
                        className="mr-4 w-5 h-5 text-blue-600"
                      />
                      <div className="flex items-center">
                        <div className="w-12 h-8 bg-blue-500 rounded mr-3 flex items-center justify-center">
                          <span className="text-white text-xs font-bold">PP</span>
                        </div>
                        <div>
                          <span className="font-semibold">PayPal</span>
                          <p className="text-sm text-gray-500">Pay with your PayPal account</p>
                        </div>
                      </div>
                    </label>
                    <label className="flex items-center p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-blue-300 transition-colors">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={formData.paymentMethod === 'cod'}
                        onChange={handleInputChange}
                        className="mr-4 w-5 h-5 text-blue-600"
                      />
                      <div className="flex items-center">
                        <div className="w-12 h-8 bg-green-500 rounded mr-3 flex items-center justify-center">
                          <span className="text-white text-xs font-bold">💵</span>
                        </div>
                        <div>
                          <span className="font-semibold">Cash on Delivery</span>
                          <p className="text-sm text-gray-500">Pay when you receive your order</p>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="xl:col-span-2">
                <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-8">
                  <div className="flex items-center mb-6">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-3">3</div>
                    <h3 className="text-2xl font-bold text-gray-900">Order Summary</h3>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    {cart.map((item: CartItem) => (
                      <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                        <img 
                          src={item.images?.[0] || '/placeholder.jpg'} 
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 text-sm">{item.name}</h4>
                          <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t border-gray-200 pt-6 space-y-3">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal ({cart.length} items)</span>
                      <span className="font-semibold">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>
                      <span className="font-semibold">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold text-gray-900 border-t pt-3">
                      <span>Total</span>
                      <span className="text-blue-600">${total.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className={`w-full mt-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 ${
                      isProcessing
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
                    }`}
                  >
                    {isProcessing ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-2"></div>
                        Processing Order...
                      </div>
                    ) : (
                      `Place Order • $${total.toFixed(2)}`
                    )}
                  </button>
                  
                  <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                    <div className="flex items-center text-blue-800 text-sm">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                      <span className="font-semibold">Secure Checkout</span>
                    </div>
                    <p className="text-blue-700 text-xs mt-1">
                      Your payment information is encrypted and secure. We never store your card details.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
