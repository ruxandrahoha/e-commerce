import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getProductById } from "../firebase";
import { useCart } from "../context/CartContext";
import Spinner from "../components/Spinner";
import { useWishlist } from "../context/WishlistContext";
import { HiHeart, HiOutlineHeart, HiPlus, HiCheck } from "react-icons/hi2";
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
      <div className="min-h-screen bg-primary-100 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-medium">
          <p className="text-3xl font-semibold text-neutral-900 mb-4">
            Produsul nu a fost găsit.
          </p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-primary-100 py-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-white rounded-3xl shadow-medium overflow-hidden">
          <div className="grid md:grid-cols-2 gap-12 p-8 md:p-12">
            {/* Image */}
            <div className="flex justify-center">
              <img
                className="w-full max-w-md h-auto object-contain rounded-2xl shadow-soft"
                src={product.image}
                alt={`Coperta ${product.title}`}
              />
            </div>

            {/* Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold text-neutral-900 mb-3">
                  {product.title}
                </h1>
                <h2 className="text-xl text-neutral-600 mb-6">de {product.author}</h2>
              </div>

              <div className="bg-neutral-50 rounded-2xl p-6 space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-semibold text-neutral-700">ISBN:</span>
                    <p className="text-neutral-600">{product.isbn}</p>
                  </div>
                  {product.publishingHouse && (
                    <div>
                      <span className="font-semibold text-neutral-700">Editura:</span>
                      <p className="text-neutral-600">{product.publishingHouse}</p>
                    </div>
                  )}
                  {product.publishingYear && (
                    <div>
                      <span className="font-semibold text-neutral-700">An publicare:</span>
                      <p className="text-neutral-600">{product.publishingYear}</p>
                    </div>
                  )}
                  {product.pageNumber && (
                    <div>
                      <span className="font-semibold text-neutral-700">Pagini:</span>
                      <p className="text-neutral-600">{product.pageNumber}</p>
                    </div>
                  )}
                </div>
              </div>

              {product.description && (
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-3">Descriere</h3>
                  <p className="text-neutral-600 leading-relaxed bg-neutral-50 p-4 rounded-xl">
                    {product.description}
                  </p>
                </div>
              )}

              <div className="border-t pt-6">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-3xl font-bold text-accent-700">
                    {product.price} lei
                  </span>
                </div>

                <div className="flex gap-4">
                  <button
                    className={`flex-1 flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-semibold transition-all ${
                      isAddedToCart
                        ? "bg-green-600 text-white"
                        : "bg-accent-700 hover:bg-accent-800 text-white"
                    }`}
                    onClick={handleAddToCart}
                  >
                    <span>Adaugă în coș</span>
                    {isAddedToCart ? (
                      <HiCheck className="w-6 h-6" />
                    ) : (
                      <HiPlus className="w-6 h-6" />
                    )}
                  </button>

                  <button
                    className={`p-4 rounded-2xl transition-all ${
                      isInWishlist(product.id)
                        ? "bg-red-50 text-red-600 hover:bg-red-100"
                        : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                    }`}
                    onClick={() => toggleWishlist(product)}
                  >
                    {isInWishlist(product.id) ? (
                      <HiHeart className="w-6 h-6" />
                    ) : (
                      <HiOutlineHeart className="w-6 h-6" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}