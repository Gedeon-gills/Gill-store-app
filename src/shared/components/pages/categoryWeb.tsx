import { useParams } from "react-router-dom";
import { products } from "../../store/products";
import Header from "../forms/Headers";
import Footer from "../forms/Footer";
import ProductHomeCard from "../ui/ProductCard";

export default function CategoriesWeb() {
  const { name } = useParams<{ name: string }>();
  const categoryProducts = products.filter(
    (p) => p.category.toLowerCase() === name?.toLowerCase(),
  );

  return (
    <div>
      <Header />
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-8 capitalize">{name}</h1>

        {categoryProducts.length === 0 ? (
          <p className="text-gray-500">No products found in this category.</p>
        ) : (
        <div className="grid grid-cols-4 gap-6">
            {categoryProducts.map((product) => (
              <ProductHomeCard
                key={product.id}
                {...product}
              />
            ))}
        </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
