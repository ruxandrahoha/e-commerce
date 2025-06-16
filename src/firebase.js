import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { collection, getDocs } from "firebase/firestore";

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

export async function fetchProducts() {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

