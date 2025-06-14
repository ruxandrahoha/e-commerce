import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router"
import "./index.css"
import Layout from "./components/Layout"
import Home from "./pages/Home"
import ProductList from "./pages/ProductList"
import ProductDetails from "./pages/ProductDetails"
import LoginPage from "./pages/LoginPage"
import Cart from "./pages/Cart"
import Dashboard from "./pages/Dashboard"
import NotFound from "./pages/NotFound"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/products">
            <Route index element={<ProductList />} />
            <Route path=":id" element={<ProductDetails />}/>
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
