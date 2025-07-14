import { Link, NavLink } from "react-router";
import { useCart } from "../context/CartContext";
import UserMenu from "./UserMenu";

export default function Navbar() {
  const { cart } = useCart();
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-(--primary) shadow-md sticky top-0 z-50 shadow-soft">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link
            className="font-serif text-2xl font-medium text-(--secondary) hover:text-[#a998b0] transition-colors"
            to="/"
          >
            Librărie
          </Link>

          <nav className="flex items-center space-x-12 gap-4">
            <NavLink
              className="px-4 py-2 text-(--secondary) mx-2 font-medium hover:text-[#eaccc1]"
              to="/products"
            >
              Cărți
            </NavLink>

            <NavLink
              className="group px-4 py-2 text-(--secondary) mx-2 font-medium hover:text-[#eaccc1]"
              to="/cart"
            >
              Coș
              {cart.length > 0 && (
                <span className="bg-(--red) rounded-4xl ml-3 px-2 py-1 text-md group-hover:text-(--secondary)">
                  {totalQuantity}
                </span>
              )}
            </NavLink>

            <UserMenu />
          </nav>
        </div>
      </div>
    </header>
  );
}
