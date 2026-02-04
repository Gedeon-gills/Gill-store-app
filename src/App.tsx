import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./shared/components/layouts/cartcontext";
import { WishlistProvider } from "./shared/components/layouts/wishlistcontext";
import { NotificationProvider } from "./shared/contexts/NotificationContext";
import ProtectedRoute from "./shared/components/ProtectedRoute";
import OrderManagement from "./shared/components/pages/OrderManagement";
import Home from "./shared/components/pages/Home";
import Blogs from "./shared/components/pages/blogs";
import About from "./shared/components/pages/about";
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
import Orders from "./admin/Orders";
import Products from "./admin/Products";
import Customers from "./admin/Customers";
import Analytics from "./admin/Analytics";
import { AdminLayout } from './admin/adminLayout';
import { Dashboard } from './admin/dashboard';



export default function App() {
  
  return (
    <NotificationProvider>
      <CartProvider>
        <WishlistProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/pages" element={<About />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/Carts" element={<Carts />} />
              <Route path="/Elements" element={<Elements />} />
              <Route path="/category/:name" element={<CategoriesWeb />} />
              <Route path="/ContactUs" element={<ContactUs />} />
              <Route path="/FAQ" element={<FAQ />} />
              <Route path="/Favourites" element={<Favourites />} />
              <Route path="/Shop" element={<Shop />} />
              <Route path="/shop/:category" element={<Shop />} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/orders" element={<ProtectedRoute><OrderManagement /></ProtectedRoute>} />
              <Route path="/checkout" element={<Checkout />} />


              {/* Admin Dashboard Routes */}
            <Route path="/admin" element={<ProtectedRoute requiredRole="admin"><AdminLayout /></ProtectedRoute>}>
              <Route index element={<Dashboard />} />
              <Route path="products" element={<Products />} />
              <Route path="orders" element={<Orders />} />
              <Route path="customers" element={<Customers />} />
              <Route path="settings" element={<Analytics />} />
            </Route>
            
            {/* Vendor Dashboard Routes */}
            <Route path="/vendor/dashboard" element={<ProtectedRoute requiredRole="vendor"><div>Vendor Dashboard Coming Soon</div></ProtectedRoute>} />
            </Routes>
          </BrowserRouter>
        </WishlistProvider>
      </CartProvider>
    </NotificationProvider>
  );
}
