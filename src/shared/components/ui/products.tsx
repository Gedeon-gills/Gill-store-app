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
  }, []);

  console.log("Products data:", products);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="flex flex-wrap gap-4 sm:gap-6 lg:gap-7 justify-center px-2 sm:px-4">
      {products.map((product, index) => (
        <div key={`${product._id}-${index}`} className="w-full sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-21px)] xl:w-[calc(20%-22px)] max-w-[280px]">
          <ProductHomeCard
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
        </div>
      ))}
    </div>
  );
}
