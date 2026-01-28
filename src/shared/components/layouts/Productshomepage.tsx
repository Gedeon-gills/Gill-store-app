// src/layouts/Productshomepage.tsx
import ProductHomeCard from "../ui/ProductCard";
import { products } from "../../store/products";

export default function HomeProducts() {
  return (
    <div className="grid grid-cols-5 gap-6">
      {products.map((product) => (
        <ProductHomeCard
          key={product.id}
          {...product}
        />
      ))}
    </div>
  );
}
