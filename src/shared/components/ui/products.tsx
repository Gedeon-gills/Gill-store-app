import ProductHomeCard from "../ui/ProductCard";
import { ProductsService } from "../../services/productSetUp";
import { useState, useEffect } from "react";
import LoadingSpinner from "../ui/LoadingSpinner";
import type { ProductResponse } from "../../services/productSetUp";
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
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data:ProductResponse[] = await ProductsService.getProducts();
        let displayedProducts = [...data];
        
        if (category) {
          displayedProducts = displayedProducts.filter(p => p?.category?.name?.includes(category));
        }
        
        if (random) {
          displayedProducts = displayedProducts.sort(() => Math.random() - 0.5);
        }
        
        if (limit) {
          displayedProducts = displayedProducts.slice(0, limit);
        }
        
        setProducts(displayedProducts);
      } catch (err) {
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [limit, category, random]);

  console.log("Products data:", products);

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
          images={product.Images}
          category={product.category.name}
          breadcrumb=""
          description=""
          availability={product.inStock ? "In Stock" : "Out of Stock"}
          sku={product._id}
        />
      ))}
    </div>
  );
}
