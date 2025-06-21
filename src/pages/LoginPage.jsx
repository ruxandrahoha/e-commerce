import { useState } from "react"
import { useNavigate, Navigate } from "react-router"
import { Link } from "react-router"
import { loginUser } from "../firebase"
import { toast } from "react-toastify"
import { useAuth } from "../context/AuthContext"

export default function LoginPage() {

  const { loggedUser } = useAuth()
  

  const [user, setUser] = useState({
        email: "",
        password: "",
    })
    const navigate = useNavigate()

  if(loggedUser) {
    return <Navigate to="/" />
  }

  async function handleLogin(e) {
      e.preventDefault()
      if (!user.email || !user.password) {
        toast.error("Completează emailul și parola.")
        return
      }
      const success = await loginUser(user)
      if (success) {
        navigate("/")
        toast.success("Te-ai conectat cu succes!")
      } else {
      toast.error("Date incorecte. Încearcă din nou.")
      }
      
    }

  return (
    <div className="flex justify-center h-full">
      <div className="w-1/3 my-auto border-2 border-(--secondary) p-4 rounded-4xl bg-white px-20 shadow-md">
        <form className="flex flex-col space-y-6 mt-6" onSubmit={handleLogin}>
            <label htmlFor="email" className=" text-sm font-medium text-gray-700">
              Email
            <input
              type="email"
              id="email"
              className="mt-1  w-full px-4 py-2 border border-gray-300 rounded-4xl shadow-md"
              placeholder="you@example.com"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            </label>
            <label htmlFor="password" className=" text-sm font-medium text-gray-700">
              Parolă
            <input
              type="password"
              id="password"
              className="mt-1  w-full px-4 py-2 border border-gray-300 rounded-4xl shadow-md"
              placeholder="••••••••"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            </label>
          <button
            type="submit"
            className="w-full mx-auto mb-4 bg-(--primary) text-white py-2 rounded-4xl shadow-md hover:bg-(--primary-darker) transition cursor-pointer"
          >
            Conectare
          </button>
          <Link to="/register">
            <button
              type="button"
              className="w-full mx-auto bg-(--primary) text-white py-2 rounded-4xl shadow-md hover:bg-(--primary-darker) transition cursor-pointer"
            >
              Creare cont
            </button>
          </Link>
          <p className="text-center text-gray-600 hover:underline cursor-pointer">Ti-ai uitat parola?</p>
        </form>
        
      </div>
    </div>
  );
}