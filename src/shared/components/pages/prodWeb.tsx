import { useParams } from "react-router-dom";
import { products } from "../../store/products";
import { useState } from "react";

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === Number(id));

  const [activeImage, setActiveImage] = useState(product?.images[0]);

  if (!product) {
    return <div className="p-10 text-center">Product not found</div>;
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <div className="border rounded-lg overflow-hidden mb-4">
            <img
              src={activeImage}
              alt={product.name}
              className="w-full h-[500px] object-cover"
            />
          </div>
          <div className="flex gap-3">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                onClick={() => setActiveImage(img)}
                className={`w-20 h-24 object-cover border rounded cursor-pointer ${
                  activeImage === img ? "border-blue-500" : ""
                }`}
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-4">
          <p className="text-sm text-gray-500">{product.description}</p>
          <h1 className="text-3xl font-bold">{product.name}</h1>

          <div className="flex items-center gap-3">
            <span className="text-2xl font-semibold text-blue-600">
              ${product.price}
            </span>
            {product.priceDown && (
              <span className="line-through text-gray-400">
                ${product.priceDown}
              </span>
            )}
          </div>

          <p className="text-gray-600">
            High-quality product crafted with premium materials. Designed for
            comfort, durability, and modern style.
          </p>

          <button className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition">
            Add to Cart
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-14">
        <div className="border-b flex gap-8 text-sm font-medium">
          <button className="border-b-2 border-blue-600 pb-2">
            Description
          </button>
          <button className="pb-2 text-gray-500">Additional Info</button>
          <button className="pb-2 text-gray-500">Reviews</button>
        </div>

        <div className="mt-6 text-gray-600 max-w-3xl">
          <p>
            This product matches the premium style seen in the Kapee template.
            Clean layout, focus on imagery, and conversion-driven UI.
          </p>
        </div>
      </div>
    </section>
  );
}
