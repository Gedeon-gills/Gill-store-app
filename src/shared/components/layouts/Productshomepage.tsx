// src/layouts/Productshomepage.tsx
import ProductHomeCard from "../ui/ProductCard";
import { products } from "../../store/products";

export default function HomeProducts() {
  return (
    <div className="grid grid-cols-5 gap-6">
      {products.map((product) => (
        <ProductHomeCard
          key={product.id}
          id={product.id} // IMPORTANT: pass the correct id
          name={product.name}
          description={product.breadcrumb} // Use breadcrumb or description field
          Image={product.images[0]} // MUST match your products array
          price={product.price}
          priceDown={product.oldPrice} // optional
        />
      ))}
    </div>
  );
}
