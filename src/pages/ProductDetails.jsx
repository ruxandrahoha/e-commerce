import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getProductById } from "../firebase";
import myImage from "../assets/temporaryImage.jpeg";
import { useCart } from "../context/CartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

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

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-12 h-12 border-8 border-(--primary) border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (!product)
    return (
      <div className="max-w-sm mx-auto text-center">
        <p className="p-8 w-full text-3xl font-serif mt-20">
          Produsul nu a fost găsit.
        </p>
      </div>
    );

  return (
    <div className="flex justify-center items-center md:flex-row gap-6">
      <img
        className="h-full object-contain rounded"
        src={myImage}
        alt={`Coperta ${product.title}`}
      />
      <div className="flex flex-col items-between">
        <h1 className="text-2xl font-bold mb-2">{product.title}</h1>

        <h2 className="text-lg mb-1">de {product.author}</h2>

        <p className="text-md mb-1">ISBN: {product.isbn}</p>

        {product.publishingHouse && (
          <p className="text-md mb-1">Editura: {product.publishingHouse}</p>
        )}

        {product.publishingYear && (
          <p className="text-md mb-1">An publicare: {product.publishingYear}</p>
        )}

        {product.pageNumber && (
          <p className="text-md mb-1">Pagini: {product.pageNumber}</p>
        )}

        {product.description && (
          <p className="text-md mt-4">Descriere: {product.description}</p>
        )}

        <div className="flex justify-between items-center mt-6">
          <span className="text-xl font-semibold">{product.price} lei</span>
          <button
            className="bg-(--primary) text-(--secondary) rounded-4xl px-6 py-2 hover:bg-(--primary-darker)"
            onClick={() => addToCart(product)}
          >
            Adaugă în coș
          </button>
        </div>
      </div>
    </div>
  );
}
