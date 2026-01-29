// src/layouts/Productshomepage.tsx
import ProductHomeCard from "../ui/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { ProductsService } from "../../services/productSetUp";

export default function HomeProducts() {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: ProductsService.getProducts
  });

  if (isLoading) return <div>Loading products...</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6">
      {products.slice(0, 10).map((product) => (
        <ProductHomeCard
          key={product._id}
          id={product._id}
          name={product.name}
          price={product.price}
          oldPrice={product.oldPrice}
          images={product.Images}
          category={product.category.name}
          breadcrumb=""
          description=""
          sku=""
          availability={product.inStock ? "In Stock" : "Out of Stock"}
        />
      ))}
    </div>
  );
}
