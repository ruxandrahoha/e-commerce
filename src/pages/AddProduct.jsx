import { useState } from "react";
import { useNavigate } from "react-router";
import { addProduct } from "../firebase";

export default function AddProduct() {
  const [product, setProduct] = useState({ title: "", author: "", price: "", image: null });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addProduct(product); // You'll update this to also upload the image
    navigate("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto mt-8 bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
      <input
        className="border p-2 mb-2 w-full"
        placeholder="Title"
        value={product.title}
        onChange={(e) => setProduct({ ...product, title: e.target.value })}
        required
      />
      <input
        className="border p-2 mb-2 w-full"
        placeholder="Author"
        value={product.author}
        onChange={(e) => setProduct({ ...product, author: e.target.value })}
        required
      />
      <input
        className="border p-2 mb-2 w-full"
        type="number"
        placeholder="Price"
        value={product.price}
        onChange={(e) => setProduct({ ...product, price: parseFloat(e.target.value).toString() })}
        required
      />
      <input
        className="border p-2 mb-4 w-full"
        type="file"
        accept="image/*"
        onChange={(e) => setProduct({ ...product, image: e.target.files[0] })}
        required
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Submit
      </button>
    </form>
  );
}
