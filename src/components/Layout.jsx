import React from "react";
import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-8 pb-12 bg-(--secondary)">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
