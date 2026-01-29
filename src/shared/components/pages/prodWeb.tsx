import { useParams } from "react-router-dom";
import { ProductsService } from "../../services/productSetUp";
import { useState, useEffect } from "react";
import { useCart } from "../layouts/cartcontext";
import Layout from "../layouts/layout";
import { PageLoader } from "../ui/LoadingSpinner";
import type { ProductResponse } from "../../services/productSetUp";

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [activeImage, setActiveImage] = useState<string>("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log('Fetching product with ID:', id);
        
        // Check if ID is valid MongoDB ObjectId format (24 hex characters)
        if (!id || id === '0' || !/^[0-9a-fA-F]{24}$/.test(id)) {
          setError('Invalid product ID');
          setLoading(false);
          return;
        }
        
        const data = await ProductsService.getProduct(id);
        console.log('Product data received:', data);
        setProduct(data);
        if (data?.Images?.[0]) {
          setActiveImage(data.Images[0]);
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  if (loading) return <PageLoader />;
  if (error) return (
    <Layout>
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">{error}</h1>
      </div>
    </Layout>
  );
  if (!product) return (
    <Layout>
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-800">Product not found</h1>
      </div>
    </Layout>
  );

  const handleAddToCart = () => {
    const productForCart = {
      id: product._id,
      name: product.name,
      breadcrumb: "",
      images: product.Images,
      price: product.price,
      category: product.category.name,
      description: "",
      sku: product._id,
      availability: product.inStock ? "In Stock" : "Out of Stock" as "In Stock" | "Out of Stock"
    };
    addToCart(productForCart);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-4 sm:py-8">
        <nav className="mb-4 sm:mb-6 text-xs sm:text-sm text-gray-600">
          <span>Home</span> / <span>Products</span> / <span className="text-gray-900">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          <div>
            <div className="mb-3 sm:mb-4">
              <img
                src={activeImage || product.Images[0]}
                alt={product.name}
                className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover rounded-lg"
              />
            </div>
            <div className="flex gap-2 sm:gap-3 overflow-x-auto">
              {product.Images.map((img: string, index: number) => (
                <img
                  key={index}
                  src={img}
                  onClick={() => setActiveImage(img)}
                  className={`w-16 h-16 sm:w-20 sm:h-20 object-cover rounded cursor-pointer border-2 ${
                    (activeImage || product.Images[0]) === img ? "border-blue-500" : "border-gray-200"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="mt-6 lg:mt-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">{product.name}</h1>
            
            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <span className="text-2xl sm:text-3xl font-bold text-blue-600">${product.price}</span>
              {product.oldPrice && (
                <span className="text-lg sm:text-xl text-gray-400 line-through">${product.oldPrice}</span>
              )}
            </div>

            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
              Premium quality product crafted with attention to detail. Perfect for everyday use with style and comfort.
            </p>

            <div className="mb-4 sm:mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3 sm:mb-4">
                <span className="text-sm font-medium text-gray-700">Size:</span>
                <div className="flex gap-2 flex-wrap">
                  {['X', 'S', 'M', 'L', 'XL', 'XXL'].map(size => (
                    <button 
                      key={size} 
                      className={`px-3 py-1 border rounded text-sm ${
                        product.size === size 
                          ? 'border-blue-500 bg-blue-50 text-blue-600' 
                          : 'border-gray-300 hover:border-blue-500'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3 sm:mb-4">
                <span className="text-sm font-medium text-gray-700">Color:</span>
                <div className="flex gap-2">
                  <button className="w-8 h-8 rounded-full bg-blue-600 border-2 border-gray-300"></button>
                  <button className="w-8 h-8 rounded-full bg-gray-800 border-2 border-gray-300"></button>
                  <button className="w-8 h-8 rounded-full bg-red-600 border-2 border-gray-300"></button>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 mb-2">SKU: {product._id}</p>
              <p className="text-xs sm:text-sm text-green-600 font-medium">{product.inStock ? "✓ In Stock" : "✗ Out of Stock"}</p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="flex items-center border border-gray-300 rounded w-full sm:w-auto">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 sm:px-4 py-2 text-gray-600 hover:bg-gray-100"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                  className="w-12 sm:w-16 text-center border-0 border-l border-r border-gray-300 py-2 text-sm"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 sm:px-4 py-2 text-gray-600 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
              
              <button
                onClick={handleAddToCart}
                className={`flex-1 sm:flex-none px-6 sm:px-8 py-3 rounded font-medium transition text-sm sm:text-base ${
                  addedToCart
                    ? "bg-green-600 text-white"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {addedToCart ? "✓ Added to Cart" : "Add to Cart"}
              </button>
            </div>

            <div className="border-t pt-6">
              <h3 className="font-semibold mb-3">Product Details</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>Category: {product.category.name}</li>
                <li>Size: {product.size || 'Not specified'}</li>
                <li>Availability: {product.inStock ? "In Stock" : "Out of Stock"}</li>
                <li>SKU: {product._id}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              <button className="py-4 px-1 border-b-2 border-blue-500 font-medium text-blue-600">
                Description
              </button>
              <button className="py-4 px-1 font-medium text-gray-500 hover:text-gray-700">
                Additional Information
              </button>
              <button className="py-4 px-1 font-medium text-gray-500 hover:text-gray-700">
                Reviews
              </button>
            </nav>
          </div>
          
          <div className="py-8">
            <div className="prose max-w-none">
              <p className="text-gray-600 leading-relaxed">
                This premium product is crafted with the finest materials and attention to detail. 
                Perfect for everyday use, it combines style, comfort, and durability in one exceptional package.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
