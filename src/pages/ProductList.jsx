import { useEffect, useState } from "react"
import { Link } from "react-router"
import { useCart } from "../context/CartContext"
import myImage from "../assets/temporaryImage.jpeg"
import { listenToProducts } from "../firebase"

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const unsubscribe = listenToProducts(setProducts);
    return () => unsubscribe(); // important cleanup
  }, []);

  const cardElements = products.map(product => (
    <div key={product.id} className="w-64 bg-white m-2 p-4 rounded-xl shadow-md">
      <Link to={`/products/${product.id}`}>
        <img className="w-64 h-[250px] object-cover" src={myImage} alt={`Cover of ${product.title}`} />
        <h1 className="font-bold">{product.title}</h1>
      </Link>
      <h2>de {product.author}</h2>
      <div className="flex justify-between pt-4">
        <p className="text-lg mt-2">{product.price} lei</p>
        <button
          className="text-md bg-blue-200 rounded-4xl p-2 px-4 cursor-pointer hover:bg-blue-300 active:bg-blue-300 transition"
          onClick={() => addToCart(product)}
        >
          Add to cart
        </button>
      </div>
    </div>
  ));

  return (
    <div className="flex flex-wrap justify-center items-center w-5/6 m-auto">
      {cardElements}
    </div>
  );
}
