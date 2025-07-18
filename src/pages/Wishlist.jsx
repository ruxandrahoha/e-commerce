import { useState } from "react";
import { Link } from "react-router";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { IoMdAdd, IoMdCheckmark } from "react-icons/io";
import { RiDeleteBinLine } from "react-icons/ri";
import clickSound from "../assets/add-to-cart.mp3";

export default function Wishlist() {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [addedProductIds, setAddedProductIds] = useState([]);
  const audio = new Audio(clickSound);

  function handleAddToCart(product) {
    addToCart(product);
    audio.play();

    setAddedProductIds((prev) => [...prev, product.id]);

    setTimeout(() => {
      setAddedProductIds((prev) => prev.filter((id) => id !== product.id));
    }, 1000);
  }

  if (wishlist.length === 0) {
    return (
      <div className="min-h-150 bg-primary-100 flex items-center justify-center">
        <div className="text-center bg-white p-12 rounded-3xl  shadow-lg max-w-md">
          <div className="text-6xl mb-6">❤️</div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">
            Lista de favorite este goală
          </h2>
          <p className="text-neutral-600 mb-8">
            Salvează cărțile care îți plac pentru a le găsi mai ușor
          </p>
          <Link to="/products">
            <button className="bg-(--primary) hover:bg-accent-800 text-white px-8 py-4 rounded-2xl font-semibold transition-colors">
              Începe cumpărăturile
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center mx-20">
      <h1 className="text-3xl my-6 font-bold">Produsele tale favorite</h1>
      <div className="flex flex-wrap justify-center items-center">
        {wishlist.map((product) => {
          console.log("Wishlist product image URL:", product.image);
          return (
            <div
              key={product.id}
              className="bg-white m-2 p-6 rounded-4xl shadow-md hover:shadow-lg/25"
            >
              <Link to={`/products/${product.id}`}>
                <img
                  className="w-52 h-[200px] object-contain mb-2"
                  src={product.image}
                  alt={`Cover of ${product.title}`}
                />
                <h1 className="font-bold line-clamp-1">{product.title}</h1>
              </Link>
              <h2>de {product.author}</h2>
              <div className="flex justify-between pt-4">
                <p className="text-lg mt-2">{product.price} lei</p>
                <div>
                  <button
                    className="text-md bg-(--primary) text-(--secondary) rounded-4xl p-2 mx-2 cursor-pointer hover:bg-(--primary-darker) transition"
                    onClick={() => toggleWishlist(product)}
                  >
                    <RiDeleteBinLine className="text-xl" />
                  </button>

                  <button
                    className="text-md bg-(--primary) text-(--secondary) rounded-4xl p-2 cursor-pointer hover:bg-(--primary-darker) transition"
                    onClick={() => handleAddToCart(product)}
                  >
                    {addedProductIds.includes(product.id) ? (
                      <IoMdCheckmark className="text-xl text-(--secondary)" />
                    ) : (
                      <IoMdAdd className="text-xl text-(--secondary)" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
