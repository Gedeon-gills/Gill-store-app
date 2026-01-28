import Layout from "../layouts/layout";
import { useWishlist } from "../layouts/wishlistcontext";
import ProductHomeCard from "../ui/ProductCard";

export default function Favourites() {
  const { wishlist, removeFromWishlist } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <Layout>
        <div className="bg-gray-100 py-14 text-center">
          <h1 className="text-3xl font-semibold text-gray-800">
            My World, My Desires
          </h1>
          <p className="text-sm text-gray-500 mt-2">My Wishlist</p>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="border border-gray-200">
            <div className="text-center py-20 px-6">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <p className="text-gray-500 text-lg mb-6">
                No products added to the wishlist yet.
              </p>
              <a
                href="/Shop"
                className="inline-block bg-black text-white px-8 py-3 text-sm font-semibold hover:bg-gray-800 transition"
              >
                RETURN TO SHOP
              </a>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-gray-100 py-14 text-center">
        <h1 className="text-3xl font-semibold text-gray-800">
          My World, My Desires
        </h1>
        <p className="text-sm text-gray-500 mt-2">
          My Wishlist ({wishlist.length} item{wishlist.length !== 1 ? 's' : ''})
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <div key={product.id} className="relative">
              <ProductHomeCard {...product} />
              <button
                onClick={() => removeFromWishlist(product.id)}
                className="absolute top-4 right-4 z-20 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors shadow-md"
                title="Remove from wishlist"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
