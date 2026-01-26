import ProductHomeCard from "../ui/ProductCard";
import { products } from "../../store/products";
export default function Products() {
  return (
    <div className="flex flex-wrap px-10 mt-7 gap-7">
      {products.map((product) => (
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
