import { useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router"
import { useCart } from "../context/CartContext"
import myImage from "../assets/temporaryImage.jpeg"
import { listenToProducts } from "../firebase"

export default function ProductList() {
  const [products, setProducts] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()
  const { addToCart } = useCart()

  const filter = searchParams.get("filter") || "all"

  useEffect(() => {
    const unsubscribe = listenToProducts(setProducts)
    return () => unsubscribe()
  }, []);

  const filteredProducts = filter === "all" ? products : products.filter((product) => product.category === filter)

  function updateFilter(value) {
    setSearchParams(value === "all" ? {} : { filter: value })
  };

  const cardElements = filteredProducts.map(product => (
    <div key={product.id} className="w-64 bg-white m-2 p-4 rounded-4xl shadow-md">
      <Link to={`/products/${product.id}`}>
        <img className="w-64 h-[250px] object-cover" src={myImage} alt={`Cover of ${product.title}`} />
        <h1 className="font-bold line-clamp-1">{product.title}</h1>
      </Link>
      <h2>de {product.author}</h2>
      <div className="flex justify-between pt-4">
        <p className="text-lg mt-2">{product.price} lei</p>
        <button
          className="text-md bg-(--primary) rounded-4xl p-2 px-4 cursor-pointer hover:bg-(--secondary) active:bg-(--secondary) transition"
          onClick={() => addToCart(product)}
        >
          Add to cart
        </button>
      </div>
    </div>
  ));

  return (
    <div className="flex flex-col items-center mt-6">
      <div className="flex gap-4">
        <button
          onClick={() => updateFilter("all")}
          className={`px-4 py-2 rounded-4xl shadow-md  transition ${filter === "all" ? "bg-(--primary) text-white" : "bg-[#b2a49f] text-black"}`}
        >
          Toate produsele
        </button>
        <button
          onClick={() => updateFilter("fictiune")}
          className={`px-4 py-2 rounded-4xl shadow-md text-white transition ${filter === "fictiune" ? "bg-(--primary)" : "bg-[#b2a49f] text-black"}`}
        >
          Ficțiune
        </button>
        <button
          onClick={() => updateFilter("poezie")}
          className={`px-4 py-2 rounded-4xl shadow-md text-white transition ${filter === "poezie" ? "bg-(--primary)" : "bg-[#b2a49f] text-black"}`}
        >
          Poezie
        </button>
        <button
          onClick={() => updateFilter("istorie")}
          className={`px-4 py-2 rounded-4xl shadow-md text-white transition ${filter === "istorie" ? "bg-(--primary)" : "bg-[#928596]"}`}
        >
          Istorie
        </button>
      </div>
      <div className="flex flex-wrap justify-center items-center w-5/6 m-auto">
        {cardElements}
      </div>
    </div>
  );
}
