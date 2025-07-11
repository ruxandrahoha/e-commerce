import { Link, NavLink } from "react-router";
import { useCart } from "../context/CartContext";
import UserMenu from "./UserMenu";

export default function Navbar() {
  const { cart } = useCart();
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-neutral-200 sticky top-0 z-50 shadow-soft">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link
            className="text-2xl font-bold text-accent-700 hover:text-accent-800 transition-colors"
            to="/"
          >
            📚 Librăria Modernă
          </Link>
          
          <nav className="flex items-center space-x-8">
            <NavLink
              className={({ isActive }) =>
                `font-medium transition-colors px-3 py-2 rounded-lg ${
                  isActive
                    ? "text-accent-700 bg-accent-50"
                    : "text-neutral-700 hover:text-accent-700 hover:bg-neutral-50"
                }`
              }
              to="/products"
            >
              Cărți
            </NavLink>
            
            <NavLink
              className={({ isActive }) =>
                `font-medium transition-colors relative px-3 py-2 rounded-lg ${
                  isActive
                    ? "text-accent-700 bg-accent-50"
                    : "text-neutral-700 hover:text-accent-700 hover:bg-neutral-50"
                }`
              }
              to="/cart"
            >
              <span className="flex items-center space-x-2">
                <span>Coș</span>
                {cart.length > 0 && (
                  <span className="bg-accent-700 text-white text-sm font-bold px-2 py-1 rounded-full min-w-[1.5rem] text-center">
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