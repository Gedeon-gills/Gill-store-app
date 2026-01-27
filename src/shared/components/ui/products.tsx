import ProductHomeCard from "../ui/ProductCard";
import { products } from "../../store/products";

interface ProductsProps {
  limit?: number;
  category?: string;
  random?: boolean;
}

function shuffleArray<T>(array: T[]) {
  return [...array].sort(() => Math.random() - 0.5);
}

export default function Products({
  limit,
  category,
  random = false,
}: ProductsProps) {
  // Filter products by category if provided
  let displayedProducts = category
    ? products.filter((product) => product.category.includes(category))
    : [...products];

  // Shuffle if random
  if (random) displayedProducts = shuffleArray(displayedProducts);

  // Limit number of products
  if (limit) displayedProducts = displayedProducts.slice(0, limit);

  return (
    <div className="flex flex-wrap gap-7 justify-center px-4">
      {displayedProducts.map((product, index) => (
        <ProductHomeCard
          key={`${product.id}-${index}`} // unique key
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
