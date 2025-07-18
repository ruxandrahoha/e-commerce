import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  onSnapshot,
  getDoc,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
  getDocs,
  orderBy,
  serverTimestamp,
  updateDoc,
  runTransaction,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAA512BoGc903K9JatyxQNGhjw8scKqOXU",
  authDomain: "e-commerce-17758.firebaseapp.com",
  projectId: "e-commerce-17758",
  storageBucket: "e-commerce-17758.firebasestorage.app",
  messagingSenderId: "360174152454",
  appId: "1:360174152454:web:d02b5ef10df5276c068c87",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
const colRef = collection(db, "products");
const categoriesRef = collection(db, "categories");
const storage = getStorage();

export function listenToProducts(setProducts) {
  const productsQuery = query(colRef, orderBy("createdAt", "desc"));

  return onSnapshot(
    productsQuery,
    (snapshot) => {
      const products = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(products);
    },
    (error) => {
      console.error("Error listening to products:", error);
    }
  );
}

export async function addProduct(product) {
  const imageUrl = await uploadImage(product.image);

  await addDoc(colRef, {
    title: product.title,
    author: product.author,
    isbn: product.isbn,
    publishingHouse: product.publishingHouse || null,
    publishingYear: product.publishingYear || null,
    price: product.price,
    category: product.category,
    description: product.description || null,
    pageNumber: product.pageNumber,
    image: imageUrl,
    createdAt: serverTimestamp(),
  });
}

export async function deleteProduct(product) {
  const confirmDelete = confirm(
    `Sunteți sigur că ștergeți cartea "${product.title}"?`
  );
  if (!confirmDelete) return;

  try {
    const docRef = doc(db, "products", product.id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting product:", error);
  }
}

export async function editProduct(product) {
  const docRef = doc(db, "products", product.id);

  try {
    await updateDoc(docRef, {
      title: product.title,
      author: product.author,
      isbn: product.isbn,
      category: product.category,
      publishingHouse: product.publishingHouse,
      publishingYear: product.publishingYear,
      price: product.price,
      description: product.description,
      pageNumber: product.pageNumber,
      image: product.image, // imaginea actualizată (URL)
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error updating product:", error);
  }
}

export async function getProductById(id) {
  const docRef = doc(db, "products", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  } else {
    throw new Error("Product not found");
  }
}

export function listenToCategories(setCategories) {
  const categoriesQuery = query(categoriesRef, orderBy("createdAt", "asc"));

  return onSnapshot(
    categoriesQuery,
    (snapshot) => {
      const category = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCategories(category);
    },
    (error) => {
      console.error("Error listening to categories:", error);
    }
  );
}

export async function addCategory() {
  const name = prompt("Numele categoriei noi:");
  if (!name) return;
  try {
    await addDoc(categoriesRef, {
      name,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error adding category:", error);
  }
}

export async function editCategoryName(id, currentName) {
  const newName = prompt(`Noul nume al categoriei ${currentName}:`);
  if (!newName) return;
  try {
    const docRef = doc(db, "categories", id);
    await updateDoc(docRef, { name: newName });
  } catch (error) {
    console.error("Error editing category name:", error);
  }
}

export async function deleteCategory(id, categoryName) {
  const confirmDelete = confirm(
    `Sunteți sigur că ștergeți această categorie "${categoryName}"? TOATE cărțile din această categorie vor fi șterse!`
  );
  if (!confirmDelete) return;

  try {
    const productsRef = collection(db, "products");
    const q = query(productsRef, where("category", "==", categoryName));
    const querySnapshot = await getDocs(q);
    const batchDeletes = querySnapshot.docs.map((docSnap) =>
      deleteDoc(doc(db, "products", docSnap.id))
    );

    await Promise.all(batchDeletes);

    const docRef = doc(db, "categories", id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting category and its products:", error);
  }
}

export async function registerUser({ name, email, password }) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    await updateProfile(user, {
      displayName: name,
    });

    console.log("User created:", user);
    console.log("Display name set:", user.displayName);
    return true;
  } catch (error) {
    console.error("Registration error:", error.message);
    return false;
  }
}

export async function loginUser({ email, password }) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("Logged in as:", userCredential.user);
    return true;
  } catch (error) {
    console.error("Login error:", error.message);
    return false;
  }
}

//Functii pentru orders
export async function addOrder(orderData) {
  const ordersRef = collection(db, "orders");
  try {
    await addDoc(ordersRef, {
      ...orderData,
      status: "În procesare",
      createdAt: serverTimestamp(),
    });
    console.log("Order saved successfully!");
    return true;
  } catch (error) {
    console.error("Error saving order:", error);
    return false;
  }
}

export async function generateSequentialOrderId() {
  const orderCounterRef = doc(db, "metadata", "orderCounter");

  const newOrderId = await runTransaction(db, async (transaction) => {
    const docSnapshot = await transaction.get(orderCounterRef);

    if (!docSnapshot.exists()) {
      transaction.set(orderCounterRef, { lastOrderId: 12345 });
      return 12345;
    }

    const lastOrderId = docSnapshot.data().lastOrderId || 12344;
    const nextOrderId = lastOrderId + 1;

    transaction.update(orderCounterRef, { lastOrderId: nextOrderId });
    return nextOrderId;
  });

  return newOrderId;
}

export function listenToAllOrders(setOrders) {
  const ordersRef = collection(db, "orders");
  const ordersQuery = query(ordersRef, orderBy("createdAt", "desc"));

  return onSnapshot(
    ordersQuery,
    (snapshot) => {
      const orders = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(orders);
    },
    (error) => {
      console.error("Error listening to orders:", error);
    }
  );
}

export async function updateOrderStatus(orderId, newStatus) {
  try {
    const orderRef = doc(db, "orders", orderId);
    await updateDoc(orderRef, {
      status: newStatus,
    });
    console.log(`Status actualizat la: ${newStatus}`);
  } catch (error) {
    console.error("Eroare la actualizarea statusului comenzii:", error);
  }
}

//storage
export async function uploadImage(file) {
  const imageRef = ref(storage, `products/${Date.now()}-${file.name}`);
  const snapshot = await uploadBytes(imageRef, file);
  const downloadURL = await getDownloadURL(snapshot.ref);
  return downloadURL;
}
