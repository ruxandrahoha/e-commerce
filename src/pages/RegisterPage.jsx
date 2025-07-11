import { useState } from "react";
import { useNavigate, Navigate, Link } from "react-router";
import { registerUser } from "../firebase";
import { HiCheckCircle, HiEye, HiEyeSlash } from "react-icons/hi2";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

export default function RegisterPage() {
  const { loggedUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
    <div className="min-h-screen bg-primary-100 flex items-center justify-center py-12 px-6">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-medium p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">Creează cont nou</h1>
            <p className="text-neutral-600">Alătură-te comunității noastre de cititori</p>
          </div>

          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-neutral-700 mb-2">
                Nume complet
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors"
                placeholder="Ion Popescu"
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-neutral-700 mb-2">
                Adresa de email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors"
                placeholder="nume@exemplu.com"
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-neutral-700 mb-2">
                Parola
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="w-full px-4 py-3 pr-12 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors"
                  placeholder="••••••••"
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-500 hover:text-neutral-700"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <HiEyeSlash className="w-5 h-5" /> : <HiEye className="w-5 h-5" />}
                </button>
              </div>
              {user.password.length > 5 ? (
                <div className="flex items-center mt-2 text-green-600 text-sm">
                  <HiCheckCircle className="w-4 h-4 mr-2" />
                  Minim 6 caractere
                </div>
              ) : (
                <p className="text-sm text-neutral-500 mt-2">Minim 6 caractere</p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-neutral-700 mb-2">
                Confirmă parola
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  className="w-full px-4 py-3 pr-12 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors"
                  placeholder="••••••••"
                  onChange={(e) =>
                    setUser({ ...user, confirmPassword: e.target.value })
                  }
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-500 hover:text-neutral-700"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <HiEyeSlash className="w-5 h-5" /> : <HiEye className="w-5 h-5" />}
                </button>
              </div>
              {user.confirmPassword.length > 5 &&
                user.password !== user.confirmPassword && (
                  <p className="text-red-500 text-sm mt-2">
                    Parolele nu coincid!
                  </p>
                )}
            </div>

            <button
              type="submit"
              disabled={!passwordOk}
              className={`w-full py-3 rounded-xl font-semibold transition-colors ${
                passwordOk
                  ? "bg-accent-700 hover:bg-accent-800 text-white"
                  : "bg-neutral-300 text-neutral-500 cursor-not-allowed"
              }`}
              onClick={(e) => {
                e.preventDefault();
                if (passwordOk) handleRegister();
              }}
            >
              Creează contul
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-neutral-600">
              Ai deja cont?{" "}
              <Link to="/login" className="text-accent-700 hover:text-accent-800 font-semibold">
                Conectează-te aici
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}