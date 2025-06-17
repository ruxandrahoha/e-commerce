import { useState } from "react";
import { useNavigate } from "react-router";
import { addProduct } from "../firebase";

export default function AddProduct() {
  const [product, setProduct] = useState({ title: "", author: "", price: NaN, image: null, description: "", category: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addProduct(product); // You'll update this to also upload the image
    navigate("/dashboard");
  };

  return (
    <div className="flex justify-center items-start mt-6">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="bg-white text-black rounded-3xl mr-3 p-3 hover:bg-gray-400 cursor-pointer"
      >
        ← Back
      </button>

      <form onSubmit={handleSubmit} className="w-xl bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4">Add New Product</h2>

        <label className="block mb-2">
          <span className="block font-medium mb-1">Title</span>
          <input
            className="border p-2 w-full"
            placeholder="Title"
            value={product.title}
            onChange={(e) => setProduct({ ...product, title: e.target.value })}
            required
          />
        </label>

        <label className="block mb-2">
          <span className="block font-medium mb-1">Author (optional)</span>
          <input
            className="border p-2 w-full"
            placeholder="Author"
            value={product.author}
            onChange={(e) => setProduct({ ...product, author: e.target.value })}
          />
        </label>

        <label className="block mb-2">
          <span className="block font-medium mb-1">Category</span>
          <select
            className="border p-2 w-full"
            value={product.category}
            onChange={(e) => setProduct({ ...product, category: e.target.value })}
            required
          >
            <option disabled value="">Choose here</option>
            <option value="books">Book</option>
            <option value="cassettes">Cassette</option>
            <option value="cds">CD</option>
          </select>
        </label>

        <label className="block mb-2">
          <span className="block font-medium mb-1">Price</span>
          <input
            className="border p-2 w-full"
            type="number"
            placeholder="Price"
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: parseFloat(e.target.value) })}
            required
          />
        </label>

        <label className="block mb-2">
          <span className="block font-medium mb-1">Description</span>
          <textarea
            className="border p-2 w-full"
            placeholder="Description"
            value={product.description}
            onChange={(e) => setProduct({ ...product, description: e.target.value })}
          />
        </label>

        <label className="block mb-4">
          <span className="block font-medium mb-1">Image</span>
          <input
            className="border p-2 w-full"
            type="file"
            accept="image/*"
            onChange={(e) => setProduct({ ...product, image: e.target.files[0] })}
          />
        </label>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Submit
        </button>
      </form>
    </div>
  );
}
