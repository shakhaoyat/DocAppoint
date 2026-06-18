"use client";
import { useState } from "react";
import NavLink from "./Navlink";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
      const [open, setOpen] = useState(false);

      return (
            <nav className="relative container mx-auto flex items-center justify-between p-4 shadow">
                  {/* Logo */}
                  <div className="flex items-center">
                        {/* <Link href="/">DocAppoint</Link> */}
                        <Link href="/" className="flex items-center" >
                              <Image
                                    width={40}
                                    height={40}
                                    src={"/logo.png"}
                                    alt="logo" />
                              <a className="btn btn-ghost text-xl"><span className="text-blue-500">Doc</span><span className="text-success">Appoint</span></a>
                        </Link>
                  </div>

                  {/* Desktop Menu */}
                  <div className="hidden md:flex items-center gap-5">
                        <NavLink href="/">Home</NavLink>
                        <NavLink href="/all-appointment">All Appointment</NavLink>
                        <NavLink href="/dashboard">Dashboard</NavLink>

                        {/* Features Button */}

                  </div>

                  <div className="hidden md:flex items-center gap-5">
                        <Link href="/login">
                              <div className="w-[131px] h-[51px] rounded-[15px] cursor-pointer transition-all duration-300 bg-gradient-to-br from-blue-500/40 to-transparent hover:bg-blue-500/70 hover:shadow-[0_0_10px_rgba(46,142,255,0.5)] flex items-center justify-center">
                                    <div className="w-[127px] h-[47px] rounded-[13px] bg-info flex items-center justify-center text-white font-semibold">
                                          Login
                                    </div>
                              </div>
                        </Link>

                        {/* Pricing Button */}
                        <Link href="/registration">
                              <div className="w-[131px] h-[51px] rounded-[15px] cursor-pointer transition-all duration-300 bg-gradient-to-br from-blue-500/40 to-transparent hover:bg-blue-500/70 hover:shadow-[0_0_10px_rgba(46,142,255,0.5)] flex items-center justify-center">
                                    <div className="w-[127px] h-[47px] rounded-[13px] bg-accent flex items-center justify-center text-white font-semibold">
                                          Registration
                                    </div>
                              </div>
                        </Link>
                  </div>

                  {/* Mobile Button */}
                  <button
                        className="md:hidden text-2xl"
                        onClick={() => setOpen(!open)}
                  >
                        ☰
                  </button>

                  {/* Mobile Menu */}
                  {open && (
                        <div className="absolute top-16 left-0 w-full bg-white shadow md:hidden p-4 space-y-3">
                              <NavLink href="/" className="block py-2">
                                    Home
                              </NavLink>
                              <NavLink href="/all-appointment" className="block py-2">
                                    All Appointment
                              </NavLink>
                              <NavLink href="/dashboard" className="block py-2">
                                    Dashboard
                              </NavLink>
                              <NavLink href="/login" className="block py-2">
                                    Login
                              </NavLink>
                              <NavLink href="/registration" className="block py-2">
                                    Registration
                              </NavLink>
                        </div>
                  )}
            </nav>
      );
};

export default Navbar;