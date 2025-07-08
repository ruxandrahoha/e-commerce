import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getProductById } from "../firebase";
import { useCart } from "../context/CartContext";
import Spinner from "../components/Spinner";
import { useWishlist } from "../context/WishlistContext";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { IoMdAdd, IoMdCheckmark } from "react-icons/io";
import clickSound from "../assets/add-to-cart.mp3";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const audio = new Audio(clickSound);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const productData = await getProductById(id);
        setProduct(productData);
      } catch (error) {
        console.error("Error fetching product: ", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  function handleAddToCart() {
    addToCart(product);
    setIsAddedToCart(true);
    audio.play();
    setTimeout(() => setIsAddedToCart(false), 1000);
  }

  if (loading) return <Spinner />;

  if (!product)
    return (
      <div className="max-w-sm mx-auto text-center">
        <p className="p-8 w-full text-3xl font-serif mt-20">
          Produsul nu a fost găsit.
        </p>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 flex flex-col md:flex-row gap-10 items-center">
      {/* Imagine */}
      <div className="w-full md:w-1/2">
        <img
          className="w-full h-auto max-h-[500px] object-contain rounded-2xl shadow"
          src={product.image}
          alt={`Coperta ${product.title}`}
        />
      </div>

      {/* Detalii */}
      <div className="w-full md:w-1/2 space-y-3">
        <h1 className="text-3xl font-bold text-[var(--primary)]">
          {product.title}
        </h1>

        <h2 className="text-lg text-gray-600">de {product.author}</h2>

        <div className="text-sm text-gray-700 space-y-1">
          <p>
            <strong>ISBN:</strong> {product.isbn}
          </p>
          {product.publishingHouse && (
            <p>
              <strong>Editura:</strong> {product.publishingHouse}
            </p>
          )}
          {product.publishingYear && (
            <p>
              <strong>An publicare:</strong> {product.publishingYear}
            </p>
          )}
          {product.pageNumber && (
            <p>
              <strong>Pagini:</strong> {product.pageNumber}
            </p>
          )}
        </div>

        {product.description && (
          <div className="mt-4">
            <h3 className="text-md font-medium mb-1">Descriere</h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              {product.description}
            </p>
          </div>
        )}

        <div className="mt-6 space-y-4">
          <span className="text-2xl font-semibold text-[var(--primary)]">
            {product.price} lei
          </span>

          <div className="flex gap-3">
            <button
              className="bg-[var(--primary)] text-[var(--secondary)] rounded-3xl px-6 py-3 font-medium hover:bg-[var(--primary-darker)] transition flex items-center gap-2"
              onClick={handleAddToCart}
            >
              <span>Adaugă în coș</span>
              {isAddedToCart ? (
                <>
                  <IoMdCheckmark className="text-xl" />
                </>
              ) : (
                <>
                  <IoMdAdd className="text-xl" />
                </>
              )}
            </button>

            <button
              className="text-md bg-[var(--primary)] text-[var(--secondary)] rounded-4xl p-3 hover:bg-[var(--primary-darker)] transition"
              onClick={() => toggleWishlist(product)}
            >
              {isInWishlist(product.id) ? (
                <GoHeartFill className="text-xl" />
              ) : (
                <GoHeart className="text-xl text-[var(--secondary)]" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
