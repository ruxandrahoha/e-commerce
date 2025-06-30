import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";
import "./index.css";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Dashboard from "./pages/Dashboard";
import Wishlist from "./pages/Wishlist";
import NotFound from "./pages/NotFound";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { CategoriesProvider } from "./context/CategoriesContext";
import { ToastContainer } from "react-toastify";
import PrivateRoute from "./components/PrivateRoute";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <CategoriesProvider>
          <ToastContainer position="bottom-right" autoClose={2500} />
          <BrowserRouter>
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
                <Route path="checkout" element={<Checkout />} />
                <Route path="wishlist" element={<Wishlist />} />

                <Route path="dashboard" element={<PrivateRoute />}>
                  <Route index element={<Dashboard />} />
                  <Route path="add" element={<AddProduct />} />
                  <Route path="edit/:id" element={<EditProduct />} />
                </Route>

                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </CategoriesProvider>
      </CartProvider>
    </AuthProvider>
  </StrictMode>
);
