import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { useCart } from "../context/CartContext";
import myImage from "../assets/temporaryImage.jpeg";
import { listenToProducts } from "../firebase";
import { useCategories } from "../context/CategoriesContext";
import GoBackBtn from "../components/GoBackBtn";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [productsLoading, setProductsLoading] = useState(true);
  const { categories, loading: categoriesLoading } = useCategories();
  const { addToCart } = useCart();

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

  const cardElements = filteredProducts.map((product) => (
    <div
      key={product.id}
      className="bg-white m-2 p-6 rounded-4xl shadow-md hover:shadow-lg/25"
    >
      <Link to={`/products/${product.id}`}>
        <img
          className="w-52 h-[200px] object-cover"
          src={myImage}
          alt={`Cover of ${product.title}`}
        />
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

  if (productsLoading || categoriesLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-12 h-12 border-8 border-(--primary) border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
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
