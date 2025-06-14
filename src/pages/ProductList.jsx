import { Link } from "react-router";
import { getProducts } from "../api";

const ProductList = () => {
  const products = getProducts();

  return (
    <div className="bg-amber-900">
      <h1>ProductList</h1>
      {products.map((product) => (
        <Link to={`/products/${product.id}`} key={product.id}>
          {product.name}
        </Link>
      ))}
    </div>
  );
};

export default ProductList;
