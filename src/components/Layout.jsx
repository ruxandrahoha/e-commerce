import React from "react"
import { Outlet } from "react-router"
import { Link, NavLink } from "react-router"
import { useCart } from "../context/CartContext"


export default function Layout() {
    const { cart } = useCart();
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div className="flex flex-col h-screen">

            <header className="bg-(--primary) flex justify-between items-center text-md px-4 shadow-md h-16">
                <Link className="text-(--secondary) text-xl font-semibold ml-20 hover:underline" to="/">Nume Librărie</Link>
                <nav className="py-6 mr-20">
                    <NavLink className="px-4 py-2 text-(--secondary) mx-2 font-medium hover:underline" to="/products">
                        Produse
                    </NavLink>
                    <NavLink className="px-4 py-2 text-(--secondary) mx-2 font-medium hover:underline" to="/cart">
                        Coș de cumpărături{cart.length > 0 && <span className="bg-(--red) rounded-4xl ml-3 px-3 py-1 text-md hover:no-underline hover:decoration-transparent">{totalQuantity}</span>}
                    </NavLink>
                    <NavLink className="px-4 py-2 text-(--secondary) mx-2 font-medium hover:underline" to="/login">
                        Autentificare
                    </NavLink>
                    <NavLink className="px-4 py-2 text-(--secondary) mx-2 font-medium hover:underline" to="/dashboard">
                        Dashboard
                    </NavLink>
                </nav>
            </header>

            <main className="flex-1 px-30 pt-8 pb-16 bg-(--secondary)">
                <Outlet />
            </main>

            <footer className="bg-(--primary) text-white text-center p-6">
                <p className="">© Ruxandra Hoha 2025</p>
            </footer>

        </div>
    )
}