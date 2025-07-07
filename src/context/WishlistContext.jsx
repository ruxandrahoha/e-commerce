import { createContext, useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  function isInWishlist(productId) {
    return wishlist.some((item) => item.id === productId);
  }

  function toggleWishlist(product) {
    const alreadyInWishlist = wishlist.some((item) => item.id === product.id);

    if (alreadyInWishlist) {
      setWishlist((prev) => prev.filter((item) => item.id !== product.id));
      toast.error(`Cartea "${product.title}" a fost scoasă din wishlist!`);
    } else {
      setWishlist((prev) => [...prev, { ...product }]);
      toast.success(`Cartea "${product.title}" a fost adăugată în wishlist!`);
    }
  }

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
