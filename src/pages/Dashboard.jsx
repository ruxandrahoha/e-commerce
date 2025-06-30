import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router";
import myImage from "../assets/temporaryImage.jpeg";
import { TbPencil } from "react-icons/tb";
import { MdOutlineDelete } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { useCategories } from "../context/CategoriesContext";

import {
  listenToProducts,
  deleteProduct,
  addCategory,
  editCategoryName,
  deleteCategory,
} from "../firebase";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const { categories, loading: categoriesLoading } = useCategories();
  const [productsLoading, setProductsLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  //const { loggedUser, loading } = useAuth()

  useEffect(() => {
    const unsubscribeProducts = listenToProducts((data) => {
      setProducts(data);
      setProductsLoading(false);
    });

    return () => unsubscribeProducts();
  }, []);

  const categoryElements = categories.map((category) => {
    return (
      <button
        key={category.id}
        onClick={() => setFilter(category.name)}
        className={`flex gap-2 px-4 py-2 rounded-4xl shadow-md text-(--secondary) cursor-pointer transition hover:bg-(--primary-darker) ${
          filter === category.name ? "bg-(--primary-darker) " : "bg-(--primary)"
        }`}
      >
        {category.name}
        {filter === category.name ? (
          <div className="flex gap-2">
            <span onClick={() => editCategoryName(category.id)}>
              <TbPencil className="text-2xl bg-(--red) text-(--secondary) rounded-4xl p-1 hover:bg-red-600" />
            </span>
            <span onClick={() => deleteCategory(category.id, category.name)}>
              <MdOutlineDelete className="text-2xl bg-(--red) text-(--secondary) rounded-4xl p-1 hover:bg-red-600" />
            </span>
          </div>
        ) : null}
      </button>
    );
  });

  const filteredProducts =
    filter === "all"
      ? products
      : products.filter((product) => product.category === filter);

  const cardElements = filteredProducts.map((product) => {
    return (
      <div
        key={product.id}
        className="w-64 bg-white m-2 p-4 rounded-4xl shadow-md hover:shadow-lg/25"
      >
        <img
          className="w-64 h-[250px] object-cover"
          src={myImage}
          alt={`Cover of ${product.title}`}
        ></img>
        <h1 className="font-bold">{product.title}</h1>
        <h2 className="">de {product.author}</h2>
        <div className="flex justify-between pt-4">
          <p className="text-lg mt-2">{product.price} lei</p>
          <div>
            <Link to={`/dashboard/edit/${product.id}`}>
              <button className="group text-md bg-(--primary) rounded-4xl p-2 px-3 cursor-pointer text-(--secondary) hover:bg-(--primary-darker) transition">
                <TbPencil className="text-xl text-(--secondary) group-hover:text-white transition" />
              </button>
            </Link>
            <button
              className="group text-md bg-(--primary) ml-3 rounded-4xl p-2 px-3 cursor-pointer text-(--secondary) hover:bg-(--primary-darker) transition"
              onClick={() => deleteProduct(product)}
            >
              <MdOutlineDelete className="text-xl text-(--secondary) group-hover:text-white transition" />
            </button>
          </div>
        </div>
      </div>
    );
  });

  if (productsLoading || categoriesLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-12 h-12 border-8 border-(--primary) border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="flex gap-4 mb-4">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-4xl shadow-md text-(--secondary) cursor-pointer transition hover:bg-(--primary-darker) ${
              filter === "all" ? "bg-(--primary-darker) " : "bg-(--primary)"
            }`}
          >
            Toate produsele
          </button>
          {categoryElements}
          <button
            onClick={() => addCategory()}
            className="px-4 py-2 rounded-4xl shadow-md cursor-pointer transition hover:bg-(--primary-darker) bg-(--primary)"
          >
            <IoMdAdd className="text-xl text-(--secondary)" />
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className="flex flex-wrap justify-center items-center w-5/6 m-auto">
          <div className="w-64 h-96 flex justify-center items-center bg-white m-2 p-4 rounded-4xl shadow-md hover:shadow-lg/25">
            <Link to="/dashboard/add">
              <button className="text-md h-12 my-auto bg-(--primary) rounded-4xl p-2 px-4 cursor-pointer text-(--secondary) hover:bg-(--primary-darker) transition">
                Adaugă o carte nouă
              </button>
            </Link>
          </div>
          {cardElements}
        </div>
      </div>
    </>
  );
}
