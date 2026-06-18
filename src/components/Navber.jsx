"use client";
import { useState } from "react";
import NavLink from "./Navlink";
import Link from "next/link";

const AppNavbar = () => {
      const [open, setOpen] = useState(false);

      return (
            <nav className="p-4 flex justify-between items-center shadow container mx-auto">
                  <div className="font-bold">
                        <Link href="/">Logo</Link>
                  </div>

                  <div className="hidden md:flex gap-4">
                        <NavLink href="/">Home</NavLink>
                        <NavLink href="/appointment">All Appointment</NavLink>
                        <NavLink href="/dashboard">Dashboard</NavLink>

                  </div>

                  {/* desktop */}
                  <div className="hidden md:flex gap-4">
                        <NavLink href="/features">Features</NavLink>
                        <NavLink href="/pricing">Pricing</NavLink>
                  </div>



                  {/* mobile button */}
                  <button
                        className="md:hidden"
                        onClick={() => setOpen(!open)}
                  >
                        ☰
                  </button>

                  {/* mobile menu */}
                  {open && (
                        <div className="absolute top-16 left-0 w-full bg-white shadow md:hidden p-4">
                              <NavLink href="/" className="block py-2">Home</NavLink>
                              <NavLink href="/appointment" className="block py-2">All Appointment</NavLink>
                              <NavLink href="/dashboard" className="block py-2">Dashboard</NavLink>
                              <NavLink href="/features" className="block py-2">Features</NavLink>
                              <NavLink href="/pricing" className="block py-2">Pricing</NavLink>

                        </div>

                  )}
            </nav>
      );
};

export default AppNavbar;