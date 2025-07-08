import { useEffect, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router";
import { useCart } from "../context/CartContext";
import { listenToProducts } from "../firebase";
import { useCategories } from "../context/CategoriesContext";
import GoBackBtn from "../components/GoBackBtn";
import Spinner from "../components/Spinner";
import { IoMdAdd, IoMdCheckmark } from "react-icons/io";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { useWishlist } from "../context/WishlistContext";
import clickSound from "../assets/add-to-cart.mp3";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [productsLoading, setProductsLoading] = useState(true);
  const { categories, loading: categoriesLoading } = useCategories();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [addedProductIds, setAddedProductIds] = useState([]);
  const audio = new Audio(clickSound);
  const navigate = useNavigate();

  const filter = searchParams.get("filter") || "all";

  useEffect(() => {
    const unsubscribe = listenToProducts((products) => {
      setProducts(products);
      setProductsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const isValidFilter =
    filter === "all" || categories.some((category) => category.name === filter);
  const filteredProducts = isValidFilter
    ? filter === "all"
      ? products
      : products.filter((product) => product.category === filter)
    : [];

  function updateFilter(value) {
    if (!value || value === "all") {
      setSearchParams({});
    } else {
      setSearchParams({ filter: value });
    }
  }

  const categoryElements = categories.map((category) => {
    return (
      <button
        key={category.id}
        onClick={() => updateFilter(category.name)}
        className={`px-4 py-2 rounded-4xl shadow-md text-(--secondary) cursor-pointer transition hover:bg-(--primary-darker) ${
          filter === category.name ? "bg-(--primary-darker) " : "bg-(--primary)"
        }`}
      >
        {category.name}
      </button>
    );
  });

  function handleAddToCart(product) {
    addToCart(product);
    audio.play();

    setAddedProductIds((prev) => [...prev, product.id]);

    setTimeout(() => {
      setAddedProductIds((prev) => prev.filter((id) => id !== product.id));
    }, 1000);
  }

  const handleWishlistClick = async (product) => {
    const success = await toggleWishlist(product);
    if (!success) {
      navigate("/login", {
        state: {
          errorMessage:
            "Trebuie să fii autentificat pentru a salva produse în wishlist.",
        },
      });
    }
  };

  const cardElements = filteredProducts.map((product) => {
    const inWishlist = isInWishlist(product.id);

    return (
      <div
        key={product.id}
        className="w-64 bg-white m-2 p-4 rounded-4xl shadow-md hover:shadow-lg/25"
      >
        <Link to={`/products/${product.id}`}>
          <img
            className="w-64 mb-2 h-[250px] object-contain"
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
              onClick={() => handleWishlistClick(product)}
            >
              {inWishlist ? (
                <GoHeartFill className="text-xl" />
              ) : (
                <GoHeart className="text-xl text-(--secondary)" />
              )}
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
  });

  if (productsLoading || categoriesLoading) {
    return <Spinner />;
  }

  if (!isValidFilter) {
    return (
      <div className="flex flex-col justify-center items-center p-8 w-full text-2xl font-serif mt-20">
        Această categorie nu există!
        <GoBackBtn className="bg-(--primary) text-(--secondary) text-lg mt-4 hover:bg-(--primary-darker) cursor-pointer transition p-2 rounded-4xl" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center mx-20">
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => updateFilter("all")}
          className={`px-4 py-2 rounded-4xl shadow-md text-(--secondary) cursor-pointer transition hover:bg-(--primary-darker) ${
            filter === "all" ? "bg-(--primary-darker) " : "bg-(--primary)"
          }`}
        >
          Toate produsele
        </button>

        {categoryElements}
      </div>

      <div className="flex flex-col items-center">
        <div className="flex flex-wrap justify-center items-center">
          {filteredProducts.length === 0 ? (
            <p className="text-xl font-serif mt-8">
              Ne pare rău, nu există produse în această categorie.
            </p>
          ) : (
            cardElements
          )}
        </div>
      </div>
    </div>
  );
}
