import { useEffect, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router";
import { useCart } from "../context/CartContext";
import { listenToProducts } from "../firebase";
import { useCategories } from "../context/CategoriesContext";
import GoBackBtn from "../components/GoBackBtn";
import Spinner from "../components/Spinner";
import { HiPlus, HiCheck, HiHeart, HiOutlineHeart } from "react-icons/hi2";
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
        className={`px-6 py-3 rounded-xl font-medium transition-all ${
          filter === category.name
            ? "bg-accent-700 text-white shadow-medium"
            : "bg-white text-neutral-700 hover:bg-neutral-50 border border-neutral-200 hover:border-accent-300"
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
    const isAdded = addedProductIds.includes(product.id);

    return (
      <div
        key={product.id}
        className="bg-white rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 overflow-hidden border border-neutral-100 hover:border-neutral-200 group"
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
            <h3 className="font-semibold text-neutral-900 mb-2 line-clamp-2 group-hover:text-accent-700 transition-colors">
              {product.title}
            </h3>
          </Link>
          <p className="text-sm text-neutral-600 mb-4">de {product.author}</p>
          
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-accent-700">{product.price} lei</span>
            
            <div className="flex items-center space-x-2">
              <button
                className={`p-2 rounded-lg transition-all ${
                  inWishlist
                    ? "bg-red-50 text-red-600 hover:bg-red-100"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                }`}
                onClick={() => handleWishlistClick(product)}
              >
                {inWishlist ? (
                  <HiHeart className="w-5 h-5" />
                ) : (
                  <HiOutlineHeart className="w-5 h-5" />
                )}
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
  });

  if (productsLoading || categoriesLoading) {
    return <Spinner />;
  }

  if (!isValidFilter) {
    return (
      <div className="flex flex-col justify-center items-center p-8 min-h-96 bg-primary-100">
        <div className="text-center space-y-4 bg-white p-8 rounded-2xl shadow-medium">
          <h2 className="text-3xl font-bold text-neutral-900">Categoria nu există</h2>
          <p className="text-neutral-600">Ne pare rău, categoria căutată nu a fost găsită.</p>
          <GoBackBtn className="bg-accent-700 hover:bg-accent-800 text-white px-6 py-3 rounded-xl font-medium transition-colors" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 bg-primary-100">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-neutral-900 mb-4">
            Descoperă cărțile noastre
          </h1>
          <p className="text-xl text-neutral-600">
            Explorează colecția noastră vastă de cărți din toate genurile
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => updateFilter("all")}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              filter === "all"
                ? "bg-accent-700 text-white shadow-medium"
                : "bg-white text-neutral-700 hover:bg-neutral-50 border border-neutral-200 hover:border-accent-300"
            }`}
          >
            Toate cărțile
          </button>
          {categoryElements}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.length === 0 ? (
            <div className="col-span-full text-center py-16">
              <div className="space-y-4 bg-white p-8 rounded-2xl shadow-medium max-w-md mx-auto">
                <h3 className="text-2xl font-semibold text-neutral-900">
                  Nu am găsit cărți în această categorie
                </h3>
                <p className="text-neutral-600">
                  Încearcă să selectezi o altă categorie sau revino mai târziu.
                </p>
              </div>
            </div>
          ) : (
            cardElements
          )}
        </div>
      </div>
    </div>
  );
}