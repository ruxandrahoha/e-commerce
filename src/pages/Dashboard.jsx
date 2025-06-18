import { useEffect, useState } from "react"
import { Link } from "react-router"
//import { products } from "../database"
import myImage from "../assets/temporaryImage.jpeg"
import { TbPencil } from "react-icons/tb"
import { MdOutlineDelete } from "react-icons/md"
import { IoMdAdd } from "react-icons/io"

import { listenToProducts, editProduct, deleteProduct, addProduct, addCategory, editCategoryName, deleteCategory } from "../firebase"

export default function Dashboard() {

  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [filter, setFilter] = useState("all")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = listenToProducts((products) => {
      setProducts(products)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const filteredProducts = filter === "all"
    ? products
    : products.filter(product => product.category === filter);

  const categoryElements = categories.map(category => {
    
  })

  const cardElements = filteredProducts.map(product => {
    return (
        <div key={product.id} className="w-64 bg-white m-2 p-4 rounded-4xl shadow-md">
            <img className="w-64 h-[250px] object-cover" src={myImage} alt={`Cover of ${product.title}`}></img>
            <h1 className="font-bold">{product.title}</h1>
            <h2 className="">de {product.author}</h2>
            <div className="flex justify-between pt-4">
              <p className="text-lg mt-2">{product.price} lei</p>
              <div>
              <Link to={`/dashboard/edit/${product.id}`}>
                <button 
                  className="group text-md bg-(--primary) rounded-4xl p-2 px-3 cursor-pointer text-(--secondary) hover:bg-(--primary-darker) transition">
                  <TbPencil className="text-xl text-(--secondary) group-hover:text-white transition" />
                </button>
              </Link>
              <button 
                className="group text-md bg-(--primary) ml-3 rounded-4xl p-2 px-3 cursor-pointer text-(--secondary) hover:bg-(--primary-darker) transition" 
                onClick={() => deleteProduct(product)}>
                  <MdOutlineDelete className="text-xl text-(--secondary) group-hover:text-white transition" />
              </button>
              </div>
            </div>
        </div>
    )
  })

  return (
    <>
    <div className="flex flex-col items-center">
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => addCategory()}
          className="px-4 py-2 rounded-4xl shadow-md cursor-pointer transition hover:bg-(--primary-darker) bg-(--primary)"
        >
          <IoMdAdd className="text-xl text-(--secondary)" />
        </button>
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-4xl shadow-md text-(--secondary) cursor-pointer transition hover:bg-(--primary-darker) ${filter === "all" ? "bg-(--primary-darker) " : "bg-(--primary)"}`}
        >
          Toate produsele
        </button>
        <button
          onClick={() => setFilter("fictiune")}
          className={`flex gap-2 px-4 py-2 rounded-4xl shadow-md text-(--secondary) cursor-pointer transition hover:bg-(--primary-darker) ${filter === "fictiune" ? "bg-(--primary-darker) " : "bg-(--primary)"}`}
        >
          Ficțiune
          {
          filter === "fictiune" 
          ? 
          <div className="flex gap-2">
            <span onClick={() => editCategory()}>
              <TbPencil className="text-2xl bg-(--red) text-(--secondary) rounded-4xl p-1 hover:bg-red-600" />
            </span>
            <span onClick={() => console.log("delete")}>
              <MdOutlineDelete className="text-2xl bg-(--red) text-(--secondary) rounded-4xl p-1 hover:bg-red-600" />
            </span>
          </div>
          : null
          }
        </button>
        <button
          onClick={() => setFilter("poezie")}
          className={`flex gap-2 px-4 py-2 rounded-4xl shadow-md text-(--secondary) cursor-pointer transition hover:bg-(--primary-darker) ${filter === "poezie" ? "bg-(--primary-darker) " : "bg-(--primary)"}`}
        >
          Poezie
          {
          filter === "poezie" 
          ? 
          <div className="flex gap-2">
            <span onClick={() => editCategory()}>
              <TbPencil className="text-2xl bg-(--red) text-(--secondary) rounded-4xl p-1 hover:bg-red-600" />
            </span>
            <span onClick={() => deleteCategory()}>
              <MdOutlineDelete className="text-2xl bg-(--red) text-(--secondary) rounded-4xl p-1 hover:bg-red-600" />
            </span>
          </div>
          : null
          }
        </button>
        <button
          onClick={() => setFilter("istorie")}
          className={`flex gap-2 px-4 py-2 rounded-4xl shadow-md text-(--secondary) cursor-pointer transition hover:bg-(--primary-darker) ${filter === "istorie" ? "bg-(--primary-darker) " : "bg-(--primary)"}`}
        >
          Istorie
          {
          filter === "istorie" 
          ? 
          <div className="flex gap-2">
            <span onClick={() => editCategory()}>
              <TbPencil className="text-2xl bg-(--red) text-(--secondary) rounded-4xl p-1 hover:bg-red-600" />
            </span>
            <span onClick={() => deleteCategory()}>
              <MdOutlineDelete className="text-2xl bg-(--red) text-(--secondary) rounded-4xl p-1 hover:bg-red-600" />
            </span>
          </div>
          : null
          }
        </button>
      </div>
    </div>
      
        { 
        loading 
        ? <div className="flex justify-center items-center h-64">
          <div className="w-12 h-12 border-8 border-(--primary) border-t-transparent rounded-full animate-spin"></div>
        </div>
        : (
        <div className="flex flex-col items-center">
            <div className="flex flex-wrap justify-center items-center w-5/6 m-auto">
              <div className="w-64 h-96 flex justify-center items-center bg-white m-2 p-4 rounded-4xl shadow-md">
                <Link to="/dashboard/add">
                  <button className="text-md h-12 my-auto bg-(--primary) rounded-4xl p-2 px-4 cursor-pointer text-(--secondary) hover:bg-(--primary-darker) transition">Adaugă o carte nouă</button>
                </Link>
              </div>
              {cardElements}
            </div>
          </div>
        )
      }
     </> 
  );
}

