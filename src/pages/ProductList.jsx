import { useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router"
import { useCart } from "../context/CartContext"
import myImage from "../assets/temporaryImage.jpeg"
import { listenToProducts } from "../firebase"

export default function ProductList() {
  const [products, setProducts] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()
  const [loading, setLoading] = useState(true)
  const { addToCart } = useCart()

  const filter = searchParams.get("filter") || "all"

  useEffect(() => {
    const unsubscribe = listenToProducts((products) => {
      setProducts(products)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const filteredProducts = filter === "all" ? products : products.filter((product) => product.category === filter)

  function updateFilter(value) {
    setSearchParams(value === "all" ? {} : { filter: value })
  };

  const cardElements = filteredProducts.map(product => (
    <div key={product.id} className="max-w-74 bg-white m-2 p-6 rounded-4xl shadow-md">
      <Link to={`/products/${product.id}`}>
        <img className="w-52 h-[200px] object-cover" src={myImage} alt={`Cover of ${product.title}`} />
        <h1 className="font-bold line-clamp-1">{product.title}</h1>
      </Link>
      <h2>de {product.author}</h2>
      <div className="flex justify-between pt-4">
        <p className="text-lg mt-2">{product.price} lei</p>
        <button
          className="text-md bg-(--primary) text-(--secondary) rounded-4xl p-2 px-4 cursor-pointer hover:bg-(--primary-darker) transition"
          onClick={() => addToCart(product)}
        >
          Add to cart
        </button>
      </div>
    </div>
  ));

  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => updateFilter("all")}
          className={`px-4 py-2 rounded-4xl shadow-md text-(--secondary) cursor-pointer transition hover:bg-(--primary-darker) ${filter === "all" ? "bg-(--primary-darker) " : "bg-(--primary)"}`}
        >
          Toate produsele
        </button>
        <button
          onClick={() => updateFilter("fictiune")}
          className={`px-4 py-2 rounded-4xl shadow-md text-(--secondary) cursor-pointer transition hover:bg-(--primary-darker) ${filter === "fictiune" ? "bg-(--primary-darker) " : "bg-(--primary)"}`}
        >
          Ficțiune
        </button>
        <button
          onClick={() => updateFilter("poezie")}
          className={`px-4 py-2 rounded-4xl shadow-md text-(--secondary) cursor-pointer transition hover:bg-(--primary-darker) ${filter === "poezie" ? "bg-(--primary-darker) " : "bg-(--primary)"}`}
        >
          Poezie
        </button>
        <button
          onClick={() => updateFilter("istorie")}
          className={`px-4 py-2 rounded-4xl shadow-md text-(--secondary) cursor-pointer transition hover:bg-(--primary-darker) ${filter === "istorie" ? "bg-(--primary-darker) " : "bg-(--primary)"}`}
        >
          Istorie
        </button>
      </div>

      { 
        loading 
        ? <div className="flex justify-center items-center h-64">
          <div className="w-12 h-12 border-8 border-(--primary) border-t-transparent rounded-full animate-spin"></div>
        </div>
        : <div className="flex flex-wrap justify-center items-center w-5/6 m-auto">
          {cardElements}
        </div>
      }

    </div>
  );
}
