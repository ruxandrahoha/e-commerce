import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        const wishlistRef = doc(db, "wishlists", firebaseUser.uid);
        const docSnap = await getDoc(wishlistRef);
        if (docSnap.exists()) {
          setWishlist(docSnap.data().items || []);
        } else {
          await setDoc(wishlistRef, { items: [] });
          setWishlist([]);
        }
      } else {
        setWishlist([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const updateWishlistInFirestore = async (newWishlist) => {
    if (!user) return;
    const wishlistRef = doc(db, "wishlists", user.uid);
    await setDoc(wishlistRef, { items: newWishlist });
  };

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  const toggleWishlist = async (product) => {
    if (!user) {
      toast.warning("Trebuie să fii autentificat pentru a adăuga la wishlist.");
      return false;
    }

    const alreadyInWishlist = wishlist.some((item) => item.id === product.id);

    let updatedWishlist;
    if (alreadyInWishlist) {
      updatedWishlist = wishlist.filter((item) => item.id !== product.id);
      toast.error(`Cartea "${product.title}" a fost scoasă din wishlist!`);
    } else {
      updatedWishlist = [...wishlist, product];
      toast.success(`Cartea "${product.title}" a fost adăugată în wishlist!`);
    }

    setWishlist(updatedWishlist);
    await updateWishlistInFirestore(updatedWishlist);
    return true;
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        isInWishlist,
        user,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
