import React from "react"
import { Link, NavLink } from "react-router"

export default function Header() {
    return (
        <header className="w-screen bg-pink-200 flex justify-between text-xl py-4 px-4">
            <Link className="hover:bg-pink-300" to="/">Librarie</Link>
            <nav className="px-6">
                <NavLink className="px-4 py-4 hover:bg-pink-300" to="/products">
                    Produse
                </NavLink>
                <NavLink className="px-4 py-4 hover:bg-pink-300" to="/cart">
                    Coș de cumpărături
                </NavLink>
                <NavLink className="px-4 py-4 hover:bg-pink-300" to="/login">
                    Autentificare
                </NavLink>
                <NavLink className="px-4 py-4 hover:bg-pink-300" to="/dashboard">
                    Dashboard
                </NavLink>
            </nav>
        </header>
    )
}