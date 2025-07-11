import { useState } from "react";
import { Link } from "react-router";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { HiPlus, HiCheck, HiTrash } from "react-icons/hi2";
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
      <div className="min-h-screen bg-primary-100 flex items-center justify-center">
        <div className="text-center bg-white p-12 rounded-3xl shadow-medium max-w-md">
          <div className="text-6xl mb-6">💝</div>
          <h2 className="text-3xl font-bold text-neutral-900 mb-4">
            Lista de favorite este goală
          </h2>
          <p className="text-neutral-600 mb-8">
            Salvează cărțile care îți plac pentru a le găsi mai ușor
          </p>
          <Link to="/products">
            <button className="bg-accent-700 hover:bg-accent-800 text-white px-8 py-4 rounded-2xl font-semibold transition-colors">
              Începe cumpărăturile
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-100 py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-neutral-900 mb-4">
            Produsele tale favorite
          </h1>
          <p className="text-xl text-neutral-600">
            Cărțile pe care le-ai salvat pentru mai târziu
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {wishlist.map((product) => {
            const isAdded = addedProductIds.includes(product.id);
            
            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 overflow-hidden border border-neutral-100"
              >
                <Link to={`/products/${product.id}`} className="block">
                  <div className="aspect-[3/4] overflow-hidden bg-neutral-50">
                    <img
                      className="w-full h-full object-cover"
                      src={product.image}
                      alt={`Coperta ${product.title}`}
                    />
                  </div>
                </Link>
                
                <div className="p-6">
                  <Link to={`/products/${product.id}`}>
                    <h3 className="font-semibold text-neutral-900 mb-2 line-clamp-2 hover:text-accent-700 transition-colors">
                      {product.title}
                    </h3>
                  </Link>
                  <p className="text-sm text-neutral-600 mb-4">de {product.author}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-accent-700">{product.price} lei</span>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-all"
                        onClick={() => toggleWishlist(product)}
                      >
                        <HiTrash className="w-5 h-5" />
                      </button>

                      <button
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                          isAdded
                            ? "bg-green-600 text-white"
                            : "bg-accent-700 text-white hover:bg-accent-800"
                        }`}
                        onClick={() => handleAddToCart(product)}
                      >
                        {isAdded ? (
                          <>
                            <HiCheck className="w-5 h-5" />
                            <span className="hidden sm:block">Adăugat</span>
                          </>
                        ) : (
                          <>
                            <HiPlus className="w-5 h-5" />
                            <span className="hidden sm:block">Adaugă</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}