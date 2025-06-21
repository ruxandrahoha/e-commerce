import { useState } from "react"
import { useNavigate } from "react-router"
import { addProduct } from "../firebase"
import GoBackBtn from "../components/GoBackBtn"
import { useCategories } from "../context/CategoriesContext"

export default function AddProduct() {
  const { categories, loading: categoriesLoading } = useCategories()
  const [product, setProduct] = useState({
    title: "",
    author: "",
    isbn: "",
    category: "",
    publishingHouse: "",
    publishingYear: "",
    price: "",
    description: "",
    pageNumber: "",
    image: null
  })
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const productToSubmit = {
      ...product,
      isbn: parseFloat(product.isbn),
      price: parseFloat(product.price),
      publishingYear: parseInt(product.publishingYear),
      pageNumber: parseInt(product.pageNumber),
    }
    await addProduct(productToSubmit) // You'll update this to also upload the image
    navigate("/dashboard")
  }

  if (categoriesLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-12 h-12 border-8 border-(--primary) border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="flex justify-center items-start">
      <GoBackBtn className="bg-white text-black rounded-4xl mr-2 px-4 py-2 shadow hover:bg-(--primary) hover:text-white cursor-pointer" />

      <form onSubmit={handleSubmit} className="w-xl bg-white p-6 rounded-4xl shadow-md">
        <div className="flex justify-center">
          <h2 className="text-xl  font-medium mb-4">Adaugă o carte nouă</h2>
        </div>
        <div className="flex flex-col gap-2">
          <label>
            <span className="font-medium mb-1">Titlu*</span>
            <input
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-4xl shadow-md"
              value={product.title}
              onChange={(e) => setProduct({ ...product, title: e.target.value })}
              required
            />
          </label>

          <label>
            <span className="font-medium mb-1">Autor*</span>
            <input
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-4xl shadow-md"
              value={product.author}
              onChange={(e) => setProduct({ ...product, author: e.target.value })}
              required
            />
          </label>

          <label>
            <span className="font-medium mb-1">ISBN*</span>
            <input
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-4xl shadow-md"
              value={product.isbn}
              onChange={(e) => setProduct({ ...product, isbn: e.target.value })}
              required
            />
          </label>

          <label>
            <span className=" font-medium mb-1">Categorie*</span>
            <select
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-4xl shadow-md"
              value={product.category}
              onChange={(e) => setProduct({ ...product, category: e.target.value })}
              required
            >
              <option disabled value=""></option>
              {categories.map(category => {
                return (
                  <option key={category.id} value={category.name}>{category.name}</option>
                )
              })}
            </select>
          </label>

          <label>
            <span className=" font-medium mb-1">Preț* (RON)</span>
            <input
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-4xl shadow-md"
              type="number"
              value={product.price}
              onChange={(e) => setProduct({ ...product, price: e.target.value })}
              required
            />
          </label>

          <label>
            <span className=" font-medium mb-1">Editură</span>
            <input
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-4xl shadow-md"
              value={product.publishingHouse}
              onChange={(e) => setProduct({ ...product, publishingHouse: e.target.value })}
            />
          </label>

          <label>
            <span className=" font-medium mb-1">Nr. pagini</span>
            <input
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-4xl shadow-md"
              value={product.pageNumber}
              onChange={(e) => setProduct({ ...product, pageNumber: e.target.value })}
            />
          </label>

          <label>
            <span className=" font-medium mb-1">Anul publicării</span>
            <input
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-4xl shadow-md"
              value={product.publishingYear}
              onChange={(e) => setProduct({ ...product, publishingYear: e.target.value })}
            />
          </label>

          <label>
            <span className=" font-medium mb-1">Descriere</span>
            <textarea
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-4xl shadow-md"
              value={product.description}
              onChange={(e) => setProduct({ ...product, description: e.target.value })}
            />
          </label>

          <label className="mb-1 hover:cursor-pointer">
            <span className=" font-medium mb-1">Imagine*</span>
            <input
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-4xl shadow-md"
              type="file"
              accept="image/*"
              onChange={(e) => setProduct({ ...product, image: e.target.files[0] })}
            />
          </label>
        </div>
        
        <p className="text-gray-500 my-2">* câmp obligatoriu</p>

        <div className="flex justify-center">
          <button type="submit" className="bg-(--primary) text-white px-6 py-2 rounded-4xl hover:bg-(--primary-darker) transform cursor-pointer">
            Confirm
          </button>
        </div>
      </form>
    </div>
  );
}
