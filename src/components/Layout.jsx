import React from "react"
import { Outlet } from "react-router"
import { Link, NavLink } from "react-router"
import { useCart } from "../context/CartContext"


export default function Layout() {
    const { cart } = useCart();

    return (
        <div className="flex flex-col h-screen">

            <header className="bg-pink-300 flex justify-between items-center text-lg px-4">
                <Link className="bg-pink-200 text-xl px-6 py-2 rounded-4xl shadow-md hover:bg-pink-400" to="/">Nume Magazin</Link>
                <nav className="py-6">
                    <NavLink className="px-4 py-2 bg-pink-200 rounded-4xl mx-2 shadow-md hover:bg-pink-400" to="/products">
                        Produse
                    </NavLink>
                    <NavLink className="px-4 py-2 bg-pink-200 rounded-4xl mx-2 shadow-md hover:bg-pink-400" to="/cart">
                        Coș de cumpărături{cart.length > 0 && ` (${cart.length})`}
                    </NavLink>
                    <NavLink className="px-4 py-2 bg-pink-200 rounded-4xl mx-2 shadow-md hover:bg-pink-400" to="/login">
                        Autentificare
                    </NavLink>
                    <NavLink className="px-4 py-2 bg-pink-200 rounded-4xl mx-2 shadow-md hover:bg-pink-400" to="/dashboard">
                        Dashboard
                    </NavLink>
                </nav>
            </header>

            <main className="bg-gradient-to-b from-pink-200 to-yellow-50 flex-1 p-4">
                <Outlet />
            </main>

            <footer className="bg-gradient-to-t from-pink-200 via-pink-200 to-yellow-50 text-center p-8">
                <p className="">Ruxandra Hoha</p>
            </footer>

        </div>
    )
}