import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router"
import { doc, getDoc } from "firebase/firestore"
import { db, editProduct } from "../firebase"
import GoBackBtn from "../components/GoBackBtn"
import { useCategories } from "../context/CategoriesContext"

export default function EditProduct() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { categories, loading: categoriesLoading } = useCategories()
  const [product, setProduct] = useState({
    id: "",
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

  useEffect(() => {
    async function fetchProduct() {
      const docRef = doc(db, "products", id)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        const data = docSnap.data()
        setProduct({
          id: docSnap.id,
          title: data.title || "",
          author: data.author || "",
          isbn: data.isbn || "",
          category: data.category || "",
          publishingHouse: data.publishingHouse || "",
          publishingYear: data.publishingYear || "",
          price: data.price || "",
          description: data.description || "",
          pageNumber: data.pageNumber || "",
          image: null // leave null, unless you implement image preview/reupload
        })
      } else {
        console.error("No such product!")
      }
    }

    fetchProduct()
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const updatedProduct = {
      ...product,
      isbn: parseFloat(product.isbn),
      price: parseFloat(product.price),
      publishingYear: parseInt(product.publishingYear),
      pageNumber: parseInt(product.pageNumber),
    }

    await editProduct(updatedProduct)
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
          <h2 className="text-xl font-medium mb-4">Editează cartea</h2>
        </div>

        <label className="block mb-3">
          <span className="block font-medium mb-1">Titlu*</span>
          <input
            className="border border-(--primary) p-1 w-full rounded"
            value={product.title}
            onChange={(e) => setProduct({ ...product, title: e.target.value })}
            required
          />
        </label>

        <label className="block mb-3">
          <span className="block font-medium mb-1">Autor*</span>
          <input
            className="border p-1 w-full rounded"
            value={product.author}
            onChange={(e) => setProduct({ ...product, author: e.target.value })}
            required
          />
        </label>

        <label className="block mb-3">
          <span className="block font-medium mb-1">ISBN*</span>
          <input
            className="border p-1 w-full rounded"
            value={product.isbn}
            onChange={(e) => setProduct({ ...product, isbn: e.target.value })}
            required
          />
        </label>

        <label className="block mb-3">
          <span className="block font-medium mb-1">Categorie*</span>
          <select
            className="border p-1 w-full rounded"
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

        <label className="block mb-3">
          <span className="block font-medium mb-1">Preț* (RON)</span>
          <input
            className="border p-1 w-full rounded"
            type="number"
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
            required
          />
        </label>

        <label className="block mb-3">
          <span className="block font-medium mb-1">Editură</span>
          <input
            className="border p-1 w-full rounded"
            value={product.publishingHouse}
            onChange={(e) => setProduct({ ...product, publishingHouse: e.target.value })}
          />
        </label>

        <label className="block mb-3">
          <span className="block font-medium mb-1">Nr. pagini</span>
          <input
            className="border p-1 w-full rounded"
            value={product.pageNumber}
            onChange={(e) => setProduct({ ...product, pageNumber: e.target.value })}
          />
        </label>

        <label className="block mb-3">
          <span className="block font-medium mb-1">Anul publicării</span>
          <input
            className="border p-1 w-full rounded"
            value={product.publishingYear}
            onChange={(e) => setProduct({ ...product, publishingYear: e.target.value })}
          />
        </label>

        <label className="block mb-3">
          <span className="block font-medium mb-1">Descriere</span>
          <textarea
            className="border p-1 w-full rounded"
            value={product.description}
            onChange={(e) => setProduct({ ...product, description: e.target.value })}
          />
        </label>

        <p className="text-gray-500 mb-3">* câmp obligatoriu</p>

        <div className="flex justify-center">
          <button type="submit" className="bg-(--primary) text-white px-6 py-2 rounded-4xl hover:bg-(--primary-darker) transform cursor-pointer">
            Salvează modificările
          </button>
        </div>
      </form>
    </div>
  )
}
