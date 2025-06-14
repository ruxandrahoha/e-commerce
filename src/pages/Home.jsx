import { useState } from "react";
import { Link } from "react-router";
import { addProduct } from "../api";
import Title from "../components/Title";

const Home = () => {
  const [productName, setProductName] = useState("");

  return (
    <div className="bg-amber-700">
      <Title>Magazin</Title>
      <Link to="/products">Go to Products</Link>
      <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} />
      <button
        onClick={() =>
          addProduct({
            id: productName.toLocaleLowerCase().replace(/\s+/g, "-"),
            name: productName,
            price: Math.floor(Math.random() * 100) + 1,
          })
        }
      >
        Add product
      </button>
    </div>
  );
};

export default Home;
