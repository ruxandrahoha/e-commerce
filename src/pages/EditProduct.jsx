import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { doc, getDoc } from "firebase/firestore";
import { db, editProduct, uploadImage } from "../firebase";
import GoBackBtn from "../components/GoBackBtn";
import { useCategories } from "../context/CategoriesContext";
import Spinner from "../components/Spinner";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { categories, loading: categoriesLoading } = useCategories();

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
    image: "",
  });

  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      const docRef = doc(db, "products", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
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
          image: data.image || "",
        });
        setImageUrl(data.image || "");
      } else {
        console.error("Nu exista produsul!");
      }
    }

    fetchProduct();
  }, [id]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);

    if (file) {
      setImageUrl(URL.createObjectURL(file));
    } else {
      setImageUrl(product.image || "");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let finalImageUrl = imageUrl;

    if (imageFile) {
      finalImageUrl = await uploadImage(imageFile);
    }

    const updatedProduct = {
      ...product,
      image: finalImageUrl,
      isbn: parseFloat(product.isbn),
      price: parseFloat(product.price),
      publishingYear: parseInt(product.publishingYear),
      pageNumber: parseInt(product.pageNumber),
    };

    await editProduct(updatedProduct);
    navigate("/dashboard/products");
  };

  if (loading || categoriesLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex justify-center items-start">
      <GoBackBtn className="bg-white text-black rounded-xl mr-2 px-4 py-2 shadow hover:bg-(--primary) hover:text-white cursor-pointer" />

      <form
        onSubmit={handleSubmit}
        className="w-xl bg-white p-6 rounded-xl shadow-md"
      >
        <div className="flex justify-center">
          <h2 className="text-xl font-medium mb-4">Editează cartea</h2>
        </div>

        <div className="flex flex-col gap-2">
          <label>
            <span className="font-medium mb-1">Titlu*</span>
            <input
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl shadow-md"
              value={product.title}
              onChange={(e) =>
                setProduct({ ...product, title: e.target.value })
              }
              required
            />
          </label>

          <label>
            <span className="font-medium mb-1">Autor*</span>
            <input
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl shadow-md"
              value={product.author}
              onChange={(e) =>
                setProduct({ ...product, author: e.target.value })
              }
              required
            />
          </label>

          <label>
            <span className="font-medium mb-1">ISBN*</span>
            <input
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl shadow-md"
              value={product.isbn}
              onChange={(e) => setProduct({ ...product, isbn: e.target.value })}
              required
            />
          </label>

          <label>
            <span className="font-medium mb-1">Categorie*</span>
            <select
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl shadow-md"
              value={product.category}
              onChange={(e) =>
                setProduct({ ...product, category: e.target.value })
              }
              required
            >
              <option disabled value=""></option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span className="font-medium mb-1">Preț* (RON)</span>
            <input
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl shadow-md"
              type="number"
              value={product.price}
              onChange={(e) =>
                setProduct({ ...product, price: e.target.value })
              }
              required
            />
          </label>

          <label>
            <span className="font-medium mb-1">Editură</span>
            <input
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl shadow-md"
              value={product.publishingHouse}
              onChange={(e) =>
                setProduct({ ...product, publishingHouse: e.target.value })
              }
            />
          </label>

          <label>
            <span className="font-medium mb-1">Nr. pagini</span>
            <input
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl shadow-md"
              value={product.pageNumber}
              onChange={(e) =>
                setProduct({ ...product, pageNumber: e.target.value })
              }
            />
          </label>

          <label>
            <span className="font-medium mb-1">Anul publicării</span>
            <input
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl shadow-md"
              value={product.publishingYear}
              onChange={(e) =>
                setProduct({ ...product, publishingYear: e.target.value })
              }
            />
          </label>

          <label>
            <span className="font-medium mb-1">Descriere</span>
            <textarea
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl shadow-md min-h-[150px] resize-y"
              value={product.description}
              onChange={(e) =>
                setProduct({ ...product, description: e.target.value })
              }
            />
          </label>

          <label className="mb-1 hover:cursor-pointer">
            <span className="font-medium mb-1">Imagine*</span>
            <input
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl shadow-md"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              required={!imageUrl}
            />
          </label>

          {imageUrl && (
            <img
              src={imageUrl}
              alt="Preview imagine"
              className="mt-2 w-32 h-auto rounded-md shadow"
            />
          )}
        </div>

        <p className="text-gray-500 my-2">* câmp obligatoriu</p>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-(--primary) text-white px-6 py-2 rounded-xl hover:bg-(--primary-darker) transform cursor-pointer"
          >
            Salvează modificările
          </button>
        </div>
      </form>
    </div>
  );
}
