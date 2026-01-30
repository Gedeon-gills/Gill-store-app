import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./shared/components/layouts/cartcontext";
import { WishlistProvider } from "./shared/components/layouts/wishlistcontext";
import Home from "./shared/components/pages/Home";
import Blogs from "./shared/components/pages/blogs";
import Carts from "./shared/components/pages/cartsDiv";
import Elements from "./shared/components/pages/elements";
import ContactUs from "./shared/components/pages/contactUs";
import FAQ from "./shared/components/pages/F&Q";
import Favourites from "./shared/components/pages/favourites";
import Shop from "./shared/components/pages/shop";
import ProductPage from "./shared/components/pages/prodWeb";
import CategoriesWeb from "./shared/components/pages/categoryWeb";
import Checkout from "./shared/components/layouts/checkout";
import Profile from "./shared/components/pages/Profile";
import ModernDashboard from "./pages/ModernDashboard";
import Orders from "./pages/Orders";
import Products from "./pages/Products";
import Customers from "./pages/Customers";
import Campaign from "./pages/Campaign";
import AddCampaign from "./pages/AddCampaign";
import Analytics from "./pages/Analytics";
export default function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/Carts" element={<Carts />} />
            <Route path="/Elements" element={<Elements />} />
            <Route path="/category/:name" element={<CategoriesWeb />} />
            <Route path="/ContactUs" element={<ContactUs />} />
            <Route path="/FAQ" element={<FAQ />} />
            <Route path="/Favourites" element={<Favourites />} />
            <Route path="/Shop" element={<Shop />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/admin/dashboard" element={<ModernDashboard />} />
            <Route path="/admin/orders" element={<Orders />} />
            <Route path="/admin/products" element={<Products />} />
            <Route path="/admin/customers" element={<Customers />} />
            <Route path="/admin/campaign" element={<Campaign />} />
            <Route path="/admin/campaign/add" element={<AddCampaign />} />
            <Route path="/admin/analytics" element={<Analytics />} />
          </Routes>
        </BrowserRouter>
      </WishlistProvider>
    </CartProvider>
  );
}
