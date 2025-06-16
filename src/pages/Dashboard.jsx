import { useEffect, useState } from "react"
import { Link } from "react-router"
//import { products } from "../database"
import { useCart } from "../context/CartContext"
import myImage from "../assets/temporaryImage.jpeg"

import { fetchProducts, editProduct, deleteProduct, addProduct } from "../firebase"

export default function Dashboard() {

  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  const cardElements = products.map(product => {
    return (
        <div key={product.id} className="w-64 bg-white m-2 p-4 rounded-xl shadow-md">
          <Link to={`/products/${product.id}`}>
            <img className="w-64 h-[250px] object-cover" src={myImage} alt={`Cover of ${product.title}`}></img>
            <h1 className="font-bold">{product.title}</h1>
          </Link>
            <h2 className="">de {product.author}</h2>
            <div className="flex justify-between pt-4">
              <p className="text-lg mt-2">{product.price} lei</p>
                {/* <button className="..." onClick={() => editProduct(product)}>Edit</button> */}
                {/* <button className="..." onClick={() => deleteProduct(product)}>Delete</button> */}
            </div>
        </div>
    )
  })

  return (
    <div className="flex flex-wrap justify-center items-center w-5/6 m-auto">
      <div className="w-64 h-96 flex justify-center items-align bg-white m-2 p-4 rounded-xl shadow-md">
        {/* <button onClick={() => addProduct()}>Add new item</button> */}
      </div>
      {cardElements}
    </div>
  );
}

