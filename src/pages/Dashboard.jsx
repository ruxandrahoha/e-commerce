import { useEffect, useState } from "react"
import { Link } from "react-router"
//import { products } from "../database"
import myImage from "../assets/temporaryImage.jpeg"

import { listenToProducts, editProduct, deleteProduct, addProduct } from "../firebase"

export default function Dashboard() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const unsubscribe = listenToProducts(setProducts)

    
  }, []);

  const cardElements = products.map(product => {
    return (
        <div key={product.id} className="w-64 bg-white m-2 p-4 rounded-xl shadow-md">
            <img className="w-64 h-[250px] object-cover" src={myImage} alt={`Cover of ${product.title}`}></img>
            <h1 className="font-bold">{product.title}</h1>
            <h2 className="">de {product.author}</h2>
            <div className="flex justify-between pt-4">
              <p className="text-lg mt-2">{product.price} lei</p>
                <Link to={`/dashboard/edit/${product.id}`}>
                  <button className="text-md bg-blue-200 rounded-4xl p-2 px-4 cursor-pointer hover:bg-blue-400 transition">Edit</button>
                </Link>
                <button className="text-md bg-blue-200 rounded-4xl p-2 px-4 cursor-pointer hover:bg-blue-400 transition" onClick={() => deleteProduct(product)}>Delete</button>
            </div>
        </div>
    )
  })

  return (
    <div className="flex flex-wrap justify-center items-center w-5/6 m-auto">
      <div className="w-64 h-96 flex justify-center items-center bg-white m-2 p-4 rounded-xl shadow-md">
        <Link to="/dashboard/add">
          <button className="text-md h-12 my-auto bg-blue-200 rounded-4xl p-2 px-4 cursor-pointer hover:bg-blue-300 active:bg-blue-300 transition" onClick={() => addProduct()}>Add new item</button>
        </Link>
      </div>
      {cardElements}
    </div>
  );
}

