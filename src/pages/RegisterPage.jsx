import { useState } from "react";
import { useNavigate, Navigate } from "react-router";
import { registerUser } from "../firebase";
import { FaCheckCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

export default function RegisterPage() {
  const { loggedUser } = useAuth();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  if (loggedUser) {
    return <Navigate to="/" />;
  }

  const passwordOk =
    user.password === user.confirmPassword && user.password.length > 5;

  async function handleRegister() {
    const success = await registerUser(user);
    if (success) {
      navigate("/");
      toast.success(`Cont înregistrat cu succes!`);
    }
  }

  return (
    <div className="flex justify-center h-full">
      <div className="w-1/3 my-auto border-2 border-(--secondary) p-4 rounded-4xl bg-white px-20 shadow-md">
        <form className="flex flex-col gap-4 my-6">
          <label htmlFor="name" className="text-sm font-medium text-gray-700">
            Nume
            <input
              type="name"
              id="name"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-4xl shadow-md"
              placeholder="Ion Popescu"
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              required
            />
          </label>

          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email
            <input
              type="email"
              id="email"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-4xl shadow-md"
              placeholder="you@example.com"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              required
            />
          </label>

          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-700"
          >
            Parolă
            <input
              type="password"
              id="password"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-4xl shadow-md"
              placeholder="••••••••"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              required
            />
            {user.password.length > 5 ? (
              <span className="text-xs text-green-600">
                Minim 6 caractere
                <FaCheckCircle className="inline mx-2" />
              </span>
            ) : (
              <span className="text-xs">Minim 6 caractere</span>
            )}
          </label>

          <label
            htmlFor="confirmPassword"
            className="text-sm font-medium text-gray-700"
          >
            Confirmare parolă
            <input
              type="password"
              id="confirmPassword"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-4xl shadow-md"
              placeholder="••••••••"
              onChange={(e) =>
                setUser({ ...user, confirmPassword: e.target.value })
              }
              required
            />
          </label>

          {user.confirmPassword.length > 5 &&
            user.password !== user.confirmPassword && (
              <span className="text-red-400 text-sm m-0">
                Parolele nu coincid!
              </span>
            )}

          <button
            type="submit"
            disabled={!passwordOk}
            className={`w-full mx-auto text-white py-2 mt-3 rounded-4xl shadow-md transition cursor-pointer 
                        ${
                          passwordOk
                            ? "bg-(--primary) hover:bg-(--primary-darker)"
                            : "bg-gray-500 cursor-not-allowed opacity-80"
                        }`}
            onClick={(e) => {
              e.preventDefault();
              if (passwordOk) handleRegister();
            }}
          >
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
}
