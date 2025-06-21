import { createContext, useState, useContext, useEffect } from "react"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "../firebase"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [loggedUser, setLoggedUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
        setLoggedUser(currentUser)
        setLoading(false)
        })

        return () => unsubscribe()
    }, [])

    function logout() {
    return signOut(auth)
  }

  return (
    <AuthContext.Provider value={{ loggedUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}