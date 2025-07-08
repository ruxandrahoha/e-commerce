import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import "./index.css";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrdersPage from "./pages/OrdersPage";
import ProductsDashboard from "./pages/ProductsDashboard";
import OrdersDashboard from "./pages/OrdersDashboard";
import Wishlist from "./pages/Wishlist";
import NotFound from "./pages/NotFound";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { AuthProvider } from "./context/AuthContext";
import { CategoriesProvider } from "./context/CategoriesContext";
import { ToastContainer } from "react-toastify";
import AdminRoute from "./components/AdminRoute";
import UserRoute from "./components/UserRoute";
import TermsAndConditions from "./pages/TermsAndConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ScrollToTop from "./components/ScrollToTop";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <CategoriesProvider>
            <ToastContainer position="bottom-right" autoClose={2500} />
            <BrowserRouter>
              <ScrollToTop />
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path="products">
                    <Route index element={<ProductList />} />
                    <Route path=":id" element={<ProductDetails />} />
                  </Route>
                  <Route path="login" element={<LoginPage />} />
                  <Route path="register" element={<RegisterPage />} />
                  <Route path="cart" element={<Cart />} />

                  <Route path="dashboard" element={<AdminRoute />}>
                    <Route index element={<Navigate to="orders" replace />} />
                    <Route path="orders" element={<OrdersDashboard />} />
                    <Route path="products" element={<ProductsDashboard />} />
                    <Route path="add" element={<AddProduct />} />
                    <Route path="edit/:id" element={<EditProduct />} />
                  </Route>

                  <Route element={<UserRoute />}>
                    <Route path="checkout" element={<Checkout />} />
                    <Route path="wishlist" element={<Wishlist />} />
                    <Route path="orders" element={<OrdersPage />} />
                  </Route>

                  <Route
                    path="/terms-and-conditions"
                    element={<TermsAndConditions />}
                  />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </CategoriesProvider>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  </StrictMode>
);
