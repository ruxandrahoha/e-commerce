import React from "react"
import { Outlet } from "react-router"
import { Link, NavLink } from "react-router"
import { useCart } from "../context/CartContext"


export default function Layout() {
    const { cart } = useCart();

    return (
        <div className="flex flex-col h-screen">

            <header className="bg-blue-300 flex justify-between items-center text-md px-4 shadow-lg h-16">
                <Link className="bg-blue-200 text-lg px-6 py-2 rounded-4xl shadow-md hover:bg-blue-400 transition" to="/">Nume Magazin</Link>
                <nav className="py-6">
                    <NavLink className="px-4 py-2 bg-blue-200 rounded-4xl mx-2 shadow-md hover:bg-blue-400 transition" to="/products">
                        Produse
                    </NavLink>
                    <NavLink className="px-4 py-2 bg-blue-200 rounded-4xl mx-2 shadow-md hover:bg-blue-400 transition" to="/cart">
                        Coș de cumpărături{cart.length > 0 && ` (${cart.length})`}
                    </NavLink>
                    <NavLink className="px-4 py-2 bg-blue-200 rounded-4xl mx-2 shadow-md hover:bg-blue-400 transition" to="/login">
                        Autentificare
                    </NavLink>
                    <NavLink className="px-4 py-2 bg-blue-200 rounded-4xl mx-2 shadow-md hover:bg-blue-400 transition" to="/dashboard">
                        Dashboard
                    </NavLink>
                </nav>
            </header>

            <main className="bg-gradient-to-b from-blue-200 to-blue-50 flex-1 p-4 pb-12">
                <Outlet />
            </main>

            <footer className="bg-gradient-to-t from-blue-200 via-blue-200 to-blue-50 text-center p-8 pt-16">
                <p className="">© Ruxandra Hoha 2025</p>
            </footer>

        </div>
    )
}