import { useParams } from "react-router-dom";
import { products } from "../../store/products";
import type { Product } from "../../store/products";
import { useState, useEffect } from "react";
import { useCart } from "../layouts/cartcontext";
import Layout from "../layouts/layout";

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p: Product) => p.id === Number(id));
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [activeImage, setActiveImage] = useState<string>("");

  useEffect(() => {
    if (product?.images?.[0]) {
      setActiveImage(product.images[0]);
    }
  }, [product]);

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-gray-800">Product not found</h1>
        </div>
      </Layout>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <nav className="mb-6 text-sm text-gray-600">
          <span>Home</span> / <span>Products</span> / <span className="text-gray-900">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <div className="mb-4">
              <img
                src={activeImage || product.images[0]}
                alt={product.name}
                className="w-full h-[500px] object-cover rounded-lg"
              />
            </div>
            <div className="flex gap-3 overflow-x-auto">
              {product.images.map((img: string, index: number) => (
                <img
                  key={index}
                  src={img}
                  onClick={() => setActiveImage(img)}
                  className={`w-20 h-20 object-cover rounded cursor-pointer border-2 ${
                    (activeImage || product.images[0]) === img ? "border-blue-500" : "border-gray-200"
                  }`}
                />
              ))}
            </div>
          </div>

          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-bold text-blue-600">${product.price}</span>
              {product.oldPrice && (
                <span className="text-xl text-gray-400 line-through">${product.oldPrice}</span>
              )}
            </div>

            <p className="text-gray-600 mb-6 leading-relaxed">
              {product.description}
            </p>

            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-2">SKU: {product.sku}</p>
              <p className="text-sm text-green-600 font-medium">{product.availability}</p>
            </div>

            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center border border-gray-300 rounded">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                  className="w-16 text-center border-0 border-l border-r border-gray-300 py-2"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
              
              <button
                onClick={handleAddToCart}
                className={`px-8 py-3 rounded font-medium transition ${
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
                <li>Category: {product.category}</li>
                <li>Availability: {product.availability}</li>
                <li>SKU: {product.sku}</li>
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
