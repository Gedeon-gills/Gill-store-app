import ShopSidebar from "../layouts/ShopSidebar";
import Header from "../forms/Headers";
import ProductHomeCard from "../ui/ProductCard";
import Footer from "../forms/Footer";
export default function Shop() {
  return (
    <div>
      <Header />
      <div className="flex  bg-blue-100 align-middle justify-center h-90">
        <h1 className="py-32 font-lighter text-gray-600 text-8xl font-sans text-center tracking-wide italic">
          B-DIFFERENT
        </h1>
      </div>
      <div className="flex">
        <ShopSidebar />
        <div>
          <div className="flex px-50 gap-7 mt-7">
            <ProductHomeCard
              name="Men's Casual Sneakers"
              description="Men / Shoes"
              Image="https://i.pinimg.com/1200x/04/4c/ca/044cca18d3dd80893d340835f62e7dfa.jpg"
              price={79}
              priceDown={99}
            />
            <ProductHomeCard
              name="Men's Casual Sneakers"
              description="Men / Shoes"
              Image="https://i.pinimg.com/1200x/04/4c/ca/044cca18d3dd80893d340835f62e7dfa.jpg"
              price={79}
              priceDown={99}
            />
            <ProductHomeCard
              name="Men's Casual Sneakers"
              description="Men / Shoes"
              Image="https://i.pinimg.com/1200x/04/4c/ca/044cca18d3dd80893d340835f62e7dfa.jpg"
              price={79}
              priceDown={99}
            />
          </div>
          <div className="flex px-50 gap-7 mt-7">
            <ProductHomeCard
              name="Men's Casual Sneakers"
              description="Men / Shoes"
              Image="https://i.pinimg.com/1200x/04/4c/ca/044cca18d3dd80893d340835f62e7dfa.jpg"
              price={79}
              priceDown={99}
            />
            <ProductHomeCard
              name="Men's Casual Sneakers"
              description="Men / Shoes"
              Image="https://i.pinimg.com/1200x/04/4c/ca/044cca18d3dd80893d340835f62e7dfa.jpg"
              price={79}
              priceDown={99}
            />
            <ProductHomeCard
              name="Men's Casual Sneakers"
              description="Men / Shoes"
              Image="https://i.pinimg.com/1200x/04/4c/ca/044cca18d3dd80893d340835f62e7dfa.jpg"
              price={79}
              priceDown={99}
            />
          </div>
          <div className="flex px-50 gap-7 mt-7">
            <ProductHomeCard
              name="Men's Casual Sneakers"
              description="Men / Shoes"
              Image="https://i.pinimg.com/1200x/04/4c/ca/044cca18d3dd80893d340835f62e7dfa.jpg"
              price={79}
              priceDown={99}
            />
            <ProductHomeCard
              name="Men's Casual Sneakers"
              description="Men / Shoes"
              Image="https://i.pinimg.com/1200x/04/4c/ca/044cca18d3dd80893d340835f62e7dfa.jpg"
              price={79}
              priceDown={99}
            />
            <ProductHomeCard
              name="Men's Casual Sneakers"
              description="Men / Shoes"
              Image="https://i.pinimg.com/1200x/04/4c/ca/044cca18d3dd80893d340835f62e7dfa.jpg"
              price={79}
              priceDown={99}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
