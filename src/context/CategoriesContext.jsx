import { createContext, useContext, useEffect, useState } from "react";
import { listenToCategories } from "../firebase";

const CategoriesContext = createContext(null);

export function CategoriesProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = listenToCategories((newCategories) => {
      setCategories(newCategories);
      setLoading(false);
    });

    return () => unsubscribe?.();
  }, []);

  return (
    <CategoriesContext.Provider value={{ categories, loading }}>
      {children}
    </CategoriesContext.Provider>
  );
}

export function useCategories() {
  return useContext(CategoriesContext);
}
