import { useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { HiChevronDown, HiUser } from "react-icons/hi2";
import LogoutButton from "./LogoutButton";

export default function UserMenu() {
  const { loggedUser, loading } = useAuth();
  const [dashboardOpen, setDashboardOpen] = useState(false);

  if (loading) {
    return <div className="w-32"></div>;
  }

  if (loggedUser) {
    return (
      <Popover className="relative">
        <PopoverButton className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-white border border-neutral-200 hover:border-accent-300 hover:bg-neutral-50 transition-all font-medium text-neutral-700">
          <HiUser className="w-5 h-5" />
          <span className="hidden md:block">
            {loggedUser.displayName || "Utilizator"}
          </span>
          <HiChevronDown className="w-4 h-4" />
        </PopoverButton>

        <PopoverPanel className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-large border border-neutral-200 p-2 z-50 animate-scale-in">
          {({ close }) => (
            <div className="space-y-1">
              <div className="px-4 py-3 border-b border-neutral-100">
                <p className="font-semibold text-neutral-900">
                  {loggedUser.displayName || "Utilizator"}
                </p>
                <p className="text-sm text-neutral-600">{loggedUser.email}</p>
              </div>

              {loggedUser?.isAdmin && (
                <div className="py-2">
                  <button
                    onClick={() => setDashboardOpen(!dashboardOpen)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-all font-medium text-neutral-700 hover:bg-neutral-100 ${
                      dashboardOpen ? "bg-neutral-100" : ""
                    }`}
                  >
                    Dashboard
                  </button>

                  {dashboardOpen && (
                    <div className="ml-4 mt-2 space-y-1">
                      <Link
                        to="/dashboard/orders"
                        onClick={() => {
                          setDashboardOpen(false);
                          close();
                        }}
                        className="block px-4 text-md py-1 text-neutral-600 hover:text-accent-700 hover:bg-neutral-50 rounded-lg transition-all"
                      >
                        Comenzi
                      </Link>
                      <Link
                        to="/dashboard/products"
                        onClick={() => {
                          setDashboardOpen(false);
                          close();
                        }}
                        className="block px-4 text-md py-1 text-neutral-600 hover:text-accent-700 hover:bg-neutral-50 rounded-lg transition-all"
                      >
                        Produse
                      </Link>
                    </div>
                  )}
                </div>
              )}

              <Link
                to="/orders"
                onClick={() => {
                  setDashboardOpen(false);
                  close();
                }}
                className="block px-4 py-2 text-neutral-700 hover:text-accent-700 hover:bg-neutral-100 rounded-lg transition-all font-medium"
              >
                Comenzile mele
              </Link>

              <Link
                to="/wishlist"
                onClick={() => {
                  setDashboardOpen(false);
                  close();
                }}
                className="block px-4 py-2 text-neutral-700 hover:text-accent-700 hover:bg-neutral-100 rounded-lg transition-all font-medium"
              >
                Lista de dorințe
              </Link>

              <div className="border-t border-neutral-100 pt-2">
                <LogoutButton className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-all font-medium" />
              </div>
            </div>
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
