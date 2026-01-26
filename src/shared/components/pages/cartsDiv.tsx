import Header from "../forms/Headers";
import Footer from "../forms/Footer";
export default function Carts() {
  return (
    <div>
      <Header />
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT: Cart Items */}
          <div className="lg:col-span-2 bg-white border rounded-md">
            {/* Table Header */}
            <div className="grid grid-cols-5 p-4 border-b text-sm font-semibold text-gray-700">
              <div>PRODUCT</div>
              <div>PRICE</div>
              <div>QUANTITY</div>
              <div>SUBTOTAL</div>
              <div></div>
            </div>

            {/* Cart Item */}
            <div className="grid grid-cols-5 items-center p-4 border-b">
              {/* Product */}
              <div className="flex items-center gap-4 col-span-1">
                <img
                  src="https://i.pinimg.com/1200x/32/91/2c/32912c7879e37b6a8edbb5dd4482e904.jpg"
                  alt="watch"
                  className="w-16 h-16 object-cover border"
                />
                <p className="text-sm font-medium">
                  Navy Blue-Silver-White Multifunction Analog Watch
                </p>
              </div>

              {/* Price */}
              <div className="text-blue-600 font-medium">$49.00</div>

              {/* Quantity */}
              <div className="flex items-center gap-2">
                <button className="w-8 h-8 border rounded-full">-</button>
                <span className="px-3 py-1 border">1</span>
                <button className="w-8 h-8 border rounded-full">+</button>
              </div>

              {/* Subtotal */}
              <div className="text-blue-600 font-medium">$49.00</div>

              {/* Remove */}
              <div className="text-gray-400 cursor-pointer">🗑</div>
            </div>

            {/* Coupon */}
            <div className="flex gap-4 p-4">
              <input
                type="text"
                placeholder="Coupon code"
                className="border px-4 py-2 w-64"
              />
              <button className="bg-blue-600 text-white px-6 py-2 font-semibold">
                APPLY COUPON
              </button>
            </div>
          </div>

          {/* RIGHT: Cart Totals */}
          <div className="bg-white border rounded-md p-6">
            <h2 className="text-lg font-semibold mb-4">CART TOTALS</h2>

            <div className="flex justify-between text-sm mb-3">
              <span>Subtotal</span>
              <span className="text-blue-600 font-medium">$49.00</span>
            </div>

            <div className="flex justify-between text-sm mb-3">
              <span>Shipping</span>
              <span>
                Flat rate: <span className="text-blue-600">$5.00</span>
              </span>
            </div>

            <p className="text-xs text-gray-500 mb-4">
              Shipping to CA.{" "}
              <span className="underline cursor-pointer">Change address</span>
            </p>

            <div className="flex justify-between font-semibold text-lg border-t pt-4">
              <span>Total</span>
              <span className="text-blue-600">$54.00</span>
            </div>

            {/* Progress */}
            <div className="mt-6">
              <div className="w-full bg-gray-200 h-2 rounded">
                <div className="bg-blue-600 h-2 w-1/4 rounded"></div>
              </div>
              <p className="text-sm mt-2">
                Spend <strong>$151.00</strong> to get free shipping
              </p>
            </div>

            {/* Button */}
            <button className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white py-3 font-semibold">
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
