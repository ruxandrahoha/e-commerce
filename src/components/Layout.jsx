import React from "react";
import { Outlet } from "react-router";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />

      <main className="flex-1 px-30 pt-8 pb-16 bg-(--secondary)">
        <Outlet />
      </main>

      <footer className="bg-(--primary) text-white text-center p-6">
        <p className="">© Ruxandra Hoha 2025</p>
      </footer>
    </div>
  );
}
