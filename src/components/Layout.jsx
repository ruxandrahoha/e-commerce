import React from "react"
import { Outlet } from "react-router"
import Header from "./Header"
import Footer from "./Footer"

export default function Layout() {
    return (
        <div className="flex flex-col justify-between">
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer/>
        </div>
    )
}