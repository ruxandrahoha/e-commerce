import { Routes, Route } from "react-router";
import { Home, ProductDetail, ProductList } from "./pages";

function App() {
  return (
    <Routes>
      <Route index element={<Home />} />

      <Route path="products">
        <Route index element={<ProductList />} />
        <Route path=":productId" element={<ProductDetail />} />
      </Route>
    </Routes>
  );
}

export default App;
