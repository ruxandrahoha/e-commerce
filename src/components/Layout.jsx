import React from "react"
import { Outlet } from "react-router"
import { Link, NavLink } from "react-router"
import { useCart } from "../context/CartContext"


export default function Layout() {
    const { cart } = useCart();

    return (
        <div className="flex flex-col h-screen bg-[#feeae3]">

            <header className="bg-[#6a5478] flex justify-between items-center text-md px-4 shadow-lg h-16">
                <Link className="text-[#feeae3] text-xl font-semibold ml-20 hover:underline" to="/">Nume Librărie</Link>
                <nav className="py-6 mr-20">
                    <NavLink className="px-4 py-2 text-[#feeae3] mx-2 font-medium hover:underline" to="/products">
                        Produse
                    </NavLink>
                    <NavLink className="px-4 py-2 text-[#feeae3] mx-2 font-medium hover:underline" to="/cart">
                        Coș de cumpărături{cart.length > 0 && ` (${cart.length})`}
                    </NavLink>
                    <NavLink className="px-4 py-2 text-[#feeae3] mx-2 font-medium hover:underline" to="/login">
                        Autentificare
                    </NavLink>
                    <NavLink className="px-4 py-2 text-[#feeae3] mx-2 font-medium hover:underline" to="/dashboard">
                        Dashboard
                    </NavLink>
                </nav>
            </header>

            <main className="bg-[#feeae3] flex-1 mx-52">
                <Outlet />
            </main>

            <footer className="bg-[#6a5478] text-white text-center p-8">
                <p className="">© Ruxandra Hoha 2025</p>
            </footer>

        </div>
    )
}