import { createContext, useState, useContext, useEffect } from "react";
import { onAuthStateChanged, signOut, getIdTokenResult } from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [loggedUser, setLoggedUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const tokenResult = await getIdTokenResult(currentUser);
        console.log("Custom claims:", tokenResult.claims);
        setLoggedUser({
          ...currentUser,
          isAdmin: tokenResult.claims.admin || false,
        });
      } else {
        setLoggedUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  function logout() {
    return signOut(auth);
  }

  return (
    <AuthContext.Provider value={{ loggedUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
