import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router"
import "./index.css"
import App from "./App"
import ProductList from "./pages/ProductList"
import ProductDetails from "./pages/ProductDetails"
import LoginPage from "./pages/LoginPage"
import Cart from "./pages/Cart"
import Dashboard from "./pages/Dashboard"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/products">
          <Route index element={<ProductList />} />
          <Route path=":productId" element={<ProductDetails />}/>
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
