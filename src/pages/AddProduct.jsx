import { useState } from "react";
import { useNavigate } from "react-router";
import { addProduct } from "../firebase";

export default function AddProduct() {
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
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    const productToSubmit = {
    ...product,
    isbn: parseFloat(product.isbn),
    price: parseFloat(product.price),
    publishingYear: parseInt(product.publishingYear),
    pageNumber: parseInt(product.pageNumber),
  };
    await addProduct(productToSubmit) // You'll update this to also upload the image
    navigate("/dashboard")
  };

  return (
    <div className="flex justify-center items-start my-8">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="bg-white text-black rounded-4xl mr-2 px-4 py-2 shadow hover:bg-(--primary) hover:text-white cursor-pointer"
      >
        ← Back
      </button>

      <form onSubmit={handleSubmit} className="w-xl bg-white p-6 rounded-4xl shadow-md">
        <div className="flex justify-center">
          <h2 className="text-xl  font-medium mb-4">Adaugă o carte nouă</h2>
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
            <option value="books">Ficțiune</option>
            <option value="cassettes">Poezie</option>
            <option value="cds">Istorie</option>
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

        <label className="block mb-1 hover:cursor-pointer">
          <span className="block font-medium mb-1">Imagine*</span>
          <input
            className="border p-1 w-full rounded"
            type="file"
            accept="image/*"
            onChange={(e) => setProduct({ ...product, image: e.target.files[0] })}
          />
        </label>
        
        <p className="text-gray-500 mb-3">* câmp obligatoriu</p>

        <div className="flex justify-center">
          <button type="submit" className="bg-(--primary) text-white px-6 py-2 rounded-4xl hover:bg-(--primary-darker) transform cursor-pointer">
            Confirm
          </button>
        </div>
      </form>
    </div>
  );
}
