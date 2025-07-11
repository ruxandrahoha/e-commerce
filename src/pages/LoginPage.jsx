import { useState, useEffect } from "react";
import { Link, useNavigate, Navigate, useLocation } from "react-router";
import { loginUser } from "../firebase";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { HiEye, HiEyeSlash } from "react-icons/hi2";

export default function LoginPage() {
  const { loggedUser } = useAuth();
  const location = useLocation();
  const message = location.state?.errorMessage || null;
  const [showPassword, setShowPassword] = useState(false);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (message) {
      window.history.replaceState({}, document.title);
    }
  }, []);

  if (loggedUser) {
    return <Navigate to="/" />;
  }

  async function handleLogin(e) {
    e.preventDefault();
    if (!user.email || !user.password) {
      toast.error("Completează emailul și parola.");
      return;
    }
    const success = await loginUser(user);
    if (success) {
      navigate("/");
      toast.success("Te-ai conectat cu succes!");
    } else {
      toast.error("Date incorecte. Încearcă din nou.");
    }
  }

  return (
    <div className="min-h-screen bg-primary-100 flex items-center justify-center py-12 px-6">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-medium p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">Bun venit înapoi</h1>
            <p className="text-neutral-600">Conectează-te la contul tău</p>
          </div>

          {message && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6">
              {message}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleLogin}>
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
            </div>

            <button
              type="submit"
              className="w-full bg-accent-700 hover:bg-accent-800 text-white py-3 rounded-xl font-semibold transition-colors"
            >
              Conectare
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-neutral-600">
              Nu ai cont încă?{" "}
              <Link to="/register" className="text-accent-700 hover:text-accent-800 font-semibold">
                Creează unul aici
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}