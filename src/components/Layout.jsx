import React from "react"
import { Outlet } from "react-router"
import { Link, NavLink } from "react-router"

export default function Layout() {
    return (
        <div className="flex flex-col h-screen">

            <header className="bg-pink-200 flex justify-between items-center text-lg px-4">
                <Link className="bg-pink-300 text-2xl px-6 py-2 rounded-4xl  hover:bg-yellow-900 hover:text-pink-200" to="/">Librarie</Link>
                <nav className="py-6">
                    <NavLink className="px-4 py-2 bg-pink-300 rounded-4xl mx-2 hover:bg-yellow-900 hover:text-pink-200" to="/products">
                        Produse
                    </NavLink>
                    <NavLink className="px-4 py-2 bg-pink-300 rounded-4xl mx-2  hover:bg-yellow-900 hover:text-pink-200" to="/cart">
                        Coș de cumpărături
                    </NavLink>
                    <NavLink className="px-4 py-2 bg-pink-300 rounded-4xl mx-2  hover:bg-yellow-900 hover:text-pink-200" to="/login">
                        Autentificare
                    </NavLink>
                    <NavLink className="px-4 py-2 bg-pink-300 rounded-4xl mx-2  hover:bg-yellow-900 hover:text-pink-200" to="/dashboard">
                        Dashboard
                    </NavLink>
                </nav>
            </header>

            <main className="flex-1 p-4 bg-yellow-100">
                <Outlet />
            </main>

            <footer className="bg-gradient-to-t from-pink-200 via-pink-200 to-yellow-100 text-center p-8">
                <p className="">Ruxandra Hoha</p>
            </footer>

        </div>
    )
}