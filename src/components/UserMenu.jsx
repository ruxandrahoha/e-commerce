import { useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { IoChevronDown } from "react-icons/io5";
import LogoutButton from "./LogoutButton";

export default function UserMenu() {
  const { loggedUser, loading } = useAuth();
  const [dashboardOpen, setDashboardOpen] = useState(false);

  if (loading) {
    return <div className="w-32"></div>;
  }

  if (loggedUser) {
    return (
      <Popover className="relative inline-block">
        <PopoverButton className="flex items-center gap-1 px-4 py-2 mx-2 font-semibold text-(--secondary) hover:text-[#eaccc1] cursor-pointer">
          Bun venit, {loggedUser.displayName || "user"}!
          <IoChevronDown size={20} />
        </PopoverButton>

        <PopoverPanel
          as="div"
          className="absolute right-0 mt-1 w-36 bg-white shadow-lg rounded-xl p-2 z-50 border-2 border-(--primary) font-semibold"
        >
          {({ close }) => (
            <>
              {loggedUser?.isAdmin && (
                <>
                  <button
                    onClick={() => setDashboardOpen(!dashboardOpen)}
                    className={`block w-full text-center px-4 py-2 rounded-md transition mb-2 ${
                      dashboardOpen
                        ? "bg-(--primary) text-(--secondary) hover:bg-(--primary-darker)"
                        : "bg-(--secondary) text-(--primary)"
                    }`}
                  >
                    Dashboard
                  </button>

                  {dashboardOpen && (
                    <ul className="px-2">
                      <li>
                        <Link
                          to="/dashboard/orders"
                          onClick={() => {
                            setDashboardOpen(false);
                            close();
                          }}
                          className="block w-full text-center px-4 py-2 bg-(--secondary) text-(--primary) hover:bg-(--primary) hover:text-(--secondary) rounded-md transition mb-2"
                        >
                          Comenzi
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/dashboard/products"
                          onClick={() => {
                            setDashboardOpen(false);
                            close();
                          }}
                          className="block w-full text-center px-4 py-2 bg-(--secondary) text-(--primary) hover:bg-(--primary) hover:text-(--secondary) rounded-md transition mb-2"
                        >
                          Produse
                        </Link>
                      </li>
                    </ul>
                  )}
                </>
              )}
              <Link
                to="/orders"
                onClick={() => {
                  setDashboardOpen(false);
                  close();
                }}
                className="block w-full text-center px-4 py-2 bg-(--secondary) text-(--primary) hover:bg-(--primary) hover:text-(--secondary) rounded-md transition mb-2"
              >
                Comenzile mele
              </Link>
              <Link
                to="/wishlist"
                onClick={() => {
                  setDashboardOpen(false);
                  close();
                }}
                className="block w-full text-center px-4 py-2 bg-(--secondary) text-(--primary) hover:bg-(--primary) hover:text-(--secondary) rounded-md transition mb-2"
              >
                Wishlist
              </Link>
              <LogoutButton className="block w-full text-center px-4 py-2 bg-(--secondary) text-(--red) hover:bg-(--primary) hover:text-(--secondary) rounded-md transition cursor-pointer" />
            </>
          )}
        </PopoverPanel>
      </Popover>
    );
  }
  return (
    <Link
      className="px-4 py-2 text-(--secondary) mx-2 font-medium hover:underline"
      to="/login"
    >
      Autentificare
    </Link>
  );
}
