import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router"
import { doc, getDoc } from "firebase/firestore"
import { db, editProduct } from "../firebase"

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({ title: "", author: "", price: "" });

  useEffect(() => {
    async function fetchProduct() {
      const docRef = doc(db, "products", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setProduct({ id: docSnap.id, title: data.title, author: data.author, price: data.price });
      } else {
        console.error("No such product!");
      }
    }

    fetchProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await editProduct(product);
    navigate("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto mt-8 bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
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
        className="border p-2 mb-4 w-full"
        type="number"
        placeholder="Price"
        value={product.price}
        onChange={(e) => setProduct({ ...product, price: parseFloat(e.target.value) })}
        required
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Save Changes
      </button>
    </form>
  );
}
