import ProductHomeCard from "../ui/ProductCard";
import { products } from "../../store/products";

interface ProductsProps {
  limit: number;
  category?: string; // 👈 optional
}

export default function Products({ limit, category }: ProductsProps) {
  const displayedProducts = products
    .filter((product) => {
      if (!category) return true;

      return product.category?.toLowerCase() === category.toLowerCase();
    })
    .slice(0, limit);

  return (
    <div className="flex flex-wrap px-10 mt-7 ml-12 gap-7">
      {displayedProducts.map((product) => (
        <ProductHomeCard
          key={product.id}
          id={product.id}
          name={product.name}
          description={product.breadcrumb}
          Image={product.images[0]}
          price={product.price}
          priceDown={product.oldPrice}
        />
      ))}
    </div>
  );
}
