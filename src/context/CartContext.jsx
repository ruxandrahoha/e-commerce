import { createContext, useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { auth, db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [user, setUser] = useState(null);

  const updateCartInFirestore = async (newCart) => {
    if (!user) return;
    const cartRef = doc(db, "carts", user.uid);
    await setDoc(cartRef, { items: newCart });
  };

  const mergeCarts = (firebaseCart, localCart) => {
    const merged = [...firebaseCart];
    for (const item of localCart) {
      const existing = merged.find((p) => p.id === item.id);
      if (existing) {
        existing.quantity = item.quantity;
      } else {
        merged.push(item);
      }
    }
    return merged;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        const cartRef = doc(db, "carts", firebaseUser.uid);
        const docSnap = await getDoc(cartRef);
        const firebaseCart = docSnap.exists() ? docSnap.data().items || [] : [];

        const localCart = JSON.parse(localStorage.getItem("cart")) || [];
        const mergedCart = mergeCarts(firebaseCart, localCart);

        setCart(mergedCart);
        await updateCartInFirestore(mergedCart);
        localStorage.removeItem("cart");
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    if (user) updateCartInFirestore(cart);
  }, [cart, user]);

  function addToCart(product) {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });

    toast.success(`Cartea "${product.title}" a fost adăugată în coș!`);
  }

  function updateQuantity(productId, newQty) {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQty } : item
      )
    );
  }

  function removeFromCart(productId) {
    setCart((prev) => prev.filter((p) => p.id !== productId));
  }

  function clearCart() {
    setCart([]);
  }

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
