import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import {
  getFirestore, collection, onSnapshot,
  getDocs, addDoc, deleteDoc, doc,
  query, where,
  orderBy, serverTimestamp,
  updateDoc
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAA512BoGc903K9JatyxQNGhjw8scKqOXU",
  authDomain: "e-commerce-17758.firebaseapp.com",
  projectId: "e-commerce-17758",
  storageBucket: "e-commerce-17758.firebasestorage.app",
  messagingSenderId: "360174152454",
  appId: "1:360174152454:web:d02b5ef10df5276c068c87"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
const colRef = collection(db, 'products')


export function listenToProducts(setProducts) {
  const colRef = collection(db, "products");
  return onSnapshot(
    colRef,
    (snapshot) => {
      const products = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(products);
    },
    (error) => {
      console.error("Error listening to products:", error);
    }
  );
}

export async function addProduct(product) {
  addDoc(colRef, {
    title: product.title,
    author: product.author,
    createdAt: serverTimestamp()
  })
}

export async function deleteProduct(product) {
  try {
    const docRef = doc(db, "products", product.id)
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting product:", error)
  }
}


export async function editProduct(product) {
  const docRef = doc(db, "products", product.id);
  try {
    await updateDoc(docRef, {
      title: product.title,
      author: product.author,
      price: product.price,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error updating product:", error);
  }
}



