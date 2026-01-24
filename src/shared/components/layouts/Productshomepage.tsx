import ProductHomeCard from "../ui/ProductCard";
import { products } from "../../store/products";

export default function HomeProducts() {
  return (
    <div className="grid grid-cols-5 gap-6">
      {products.map((product, index) => (
        <ProductHomeCard
          key={index}
          name={product.name}
          description={product.description}
          Image={product.Image[1]}
          price={product.price}
          priceDown={product.priceDown}
        />
      ))}
    </div>
  );
}
