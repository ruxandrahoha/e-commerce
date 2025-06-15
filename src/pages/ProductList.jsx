import { Link } from "react-router"
import { products } from "../database"
import { useCart } from "../context/CartContext"
import myImage from "../assets/temporaryImage.jpeg"

export default function ProductList() {

  const { addToCart } = useCart();

  const cardElements = products.map(product => {
    return (
        <div key={product.id} className="w-64 bg-white m-2 p-4 rounded-xl shadow-md">
          <Link to={`/products/${product.id}`}>
            <img className="w-64 h-[250px] object-cover" src={myImage} alt={`Cover of ${product.title}`}></img>
            <h1 className="font-bold">{product.title}</h1>
          </Link>
            <h2 className="">de {product.author}</h2>
            <div className="flex justify-between pt-4">
              <p className="text-lg mt-2">{product.price.lei} lei</p>
              <button className="text-md bg-pink-200 rounded-4xl p-2 px-4 cursor-pointer hover:bg-pink-300 active:bg-pink-300 transition" onClick={() => addToCart(product)}>Add to cart</button>
            </div>
        </div>
    )
  })

  return (
    <div className="flex flex-wrap justify-center items-center w-5/6 m-auto">
      {cardElements}
    </div>
  );
}

