import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ProductsService } from "../../services/productSetUp";
import Header from "../forms/Headers";
import Footer from "../forms/Footer";
import ProductHomeCard from "../ui/ProductCard";

export default function CategoriesWeb() {
  const { name } = useParams<{ name: string }>();
  
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: ProductsService.getProducts
  });
  
  const categoryProducts = products.filter(
    (p) => p.category?.name?.toLowerCase() === name?.toLowerCase(),
  );

  return (
    <div>
      <Header />
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-8 capitalize">{name}</h1>

        {isLoading ? (
          <p className="text-gray-500">Loading products...</p>
        ) : categoryProducts.length === 0 ? (
          <p className="text-gray-500">No products found in this category.</p>
        ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {categoryProducts.map((product) => (
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
        )}
      </div>
      <Footer />
    </div>
  );
}
