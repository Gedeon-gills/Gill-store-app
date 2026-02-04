import ProductHomeCard from "../ui/ProductCard";
import { adminAPI } from "../../services/adminAPI";
import { useState, useEffect } from "react";
import LoadingSpinner from "../ui/LoadingSpinner";

interface Product {
  _id: string;
  name: string;
  price: number;
  images: string[];
  category: string;
  stock: number;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  ratingsAverage?: number;
  ratingsQuantity?: number;
}

interface ProductsProps {
  limit?: number;
  category?: string;
  random?: boolean;
}

export default function Products({
  limit,
  category,
  random = false,
}: ProductsProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let response;
        if (category) {
          response = await adminAPI.getProductsByCategory(category);
        } else {
          response = await adminAPI.getProducts();
        }
        
        let displayedProducts = response.data?.products || [];
        
        if (random) {
          displayedProducts = displayedProducts.sort(() => Math.random() - 0.5);
        }
        
        if (limit) {
          displayedProducts = displayedProducts.slice(0, limit);
        }
        
        setProducts(displayedProducts);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [limit, category, random]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 px-2 sm:px-4">
      {products.map((product, index) => (
        <ProductHomeCard
          key={`${product._id}-${index}`}
          id={product._id}
          name={product.name}
          price={product.price}
          images={product.images || []}
          category={typeof product.category === 'string' ? 'Product' : product.category}
          breadcrumb=""
          description={product.description || ''}
          availability={product.stock > 0 ? "In Stock" : "Out of Stock"}
          sku={product._id}
          date={product.createdAt}
        />
      ))}
    </div>
  );
}
