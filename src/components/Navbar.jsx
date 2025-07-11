import { Link, NavLink } from "react-router";
import { useCart } from "../context/CartContext";
import UserMenu from "./UserMenu";

export default function Navbar() {
  const { cart } = useCart();
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-neutral-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link
            className="text-2xl font-bold warm-gradient-text hover:scale-105 transition-transform"
            to="/"
          >
            📚 Librăria Modernă
          </Link>
          
          <nav className="flex items-center space-x-8">
            <NavLink
              className={({ isActive }) =>
                `nav-link font-medium transition-all ${
                  isActive
                    ? "text-primary-dark"
                    : "text-neutral-700 hover:text-primary"
                }`
              }
              to="/products"
            >
              Cărți
            </NavLink>
            
            <NavLink
              className={({ isActive }) =>
                `nav-link font-medium transition-all relative ${
                  isActive
                    ? "text-primary-dark"
                    : "text-neutral-700 hover:text-primary"
                }`
              }
              to="/cart"
            >
              <span className="flex items-center space-x-2">
                <span>Coș</span>
                {cart.length > 0 && (
                  <span className="bg-accent text-primary-dark text-sm font-bold px-2 py-1 rounded-full animate-pulse">
                    {totalQuantity}
                  </span>
                )}
              </span>
            </NavLink>

            <UserMenu />
          </nav>
        </div>
      </div>
    </header>
  );
}