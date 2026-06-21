"use client";

import { useState } from "react";
import NavLink from "./Navlink";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Avatar, Spinner } from "@heroui/react";
import { authClient } from "@/lib/auth-client";

const Navbar = () => {
      const [open, setOpen] = useState(false);
      const router = useRouter();

      const { data: session, isPending } = authClient.useSession();
      const user = session?.user;
      const avatarSrc = user?.image || "/user.png";

      const handleLogout = async () => {
            await authClient.signOut();
            router.refresh();
            router.push("/login");
      };

      return (
            <nav className="relative container mx-auto flex items-center justify-between p-4 shadow bg-white">

                  {/* Logo */}
                  <div className="flex items-center">
                        <Link href="/" className="flex items-center gap-2">
                              <Image
                                    width={40}
                                    height={40}
                                    src="/logo.png"
                                    alt="logo"
                                    priority
                              />
                              <h2 className="text-xl font-bold">
                                    <span className="text-blue-500">Doc</span>
                                    <span className="text-success">Appoint</span>
                              </h2>
                        </Link>
                  </div>

                  {/* Desktop Menu */}
                  <div className="hidden md:flex items-center gap-5">
                        <NavLink href="/">Home</NavLink>
                        <NavLink href="/all-appointments">All Appointments</NavLink>
                        <NavLink href="/dashboard">Dashboard</NavLink>
                  </div>

                  {/* Desktop Auth Section (NO DROPDOWN) */}
                  <div className="hidden md:flex items-center gap-4">

                        {isPending ? (
                              <Spinner size="sm" />
                        ) : user ? (
                              <>
                                    {/* Avatar */}
                                    <div className="flex items-center gap-2">
                                          <Image
                                                width={40}
                                                height={40}
                                                src={
                                                      user?.image ||
                                                      "https://ui-avatars.com/api/?name=" + encodeURIComponent(user?.name || "User")
                                                }
                                                alt={user?.name || "User"}
                                                className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-500/10"
                                          />

                                          <div className="flex flex-col leading-tight">
                                                <span className="text-xs text-gray-500">Hello</span>
                                                <span className="font-semibold truncate max-w-[120px]">
                                                      {user?.name}
                                                </span>
                                          </div>
                                    </div>

                                    {/* Buttons */}


                                    {/* <button
                                          onClick={handleLogout}
                                          className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
                                    >
                                          Logout
                                    </button> */}

                                    <Link href="/registration">
                                          <div className="w-[131px] h-[51px] rounded-[15px] cursor-pointer transition-all duration-300 bg-gradient-to-br from-blue-500/40 to-transparent hover:bg-blue-500/70 hover:shadow-[0_0_10px_rgba(46,142,255,0.5)] flex items-center justify-center">
                                                <div className="w-[127px] h-[47px] rounded-[13px] bg-accent flex items-center justify-center text-white font-semibold" onClick={handleLogout}>
                                                      Logout
                                                </div>
                                          </div>
                                    </Link>
                              </>



                        ) : (
                              <>
                                    {/* Login Button */}
                                    <Link href="/login">
                                          <div className="w-[131px] h-[51px] rounded-[15px] cursor-pointer transition-all duration-300 bg-gradient-to-br from-blue-500/40 to-transparent hover:bg-blue-500/70 hover:shadow-[0_0_10px_rgba(46,142,255,0.5)] flex items-center justify-center">
                                                <div className="w-[127px] h-[47px] rounded-[13px] bg-success flex items-center justify-center text-white font-semibold">
                                                      Login
                                                </div>
                                          </div>
                                    </Link>

                                    {/* Register Button */}
                                    <Link href="/registration">
                                          <div className="w-[131px] h-[51px] rounded-[15px] cursor-pointer transition-all duration-300 bg-gradient-to-br from-blue-500/40 to-transparent hover:bg-blue-500/70 hover:shadow-[0_0_10px_rgba(46,142,255,0.5)] flex items-center justify-center">
                                                <div className="w-[127px] h-[47px] rounded-[13px] bg-accent flex items-center justify-center text-white font-semibold">
                                                      Registration
                                                </div>
                                          </div>
                                    </Link>
                              </>
                        )}
                  </div>

                  {/* Mobile Button */}
                  <button
                        className="md:hidden text-2xl"
                        onClick={() => setOpen(!open)}
                  >
                        ☰
                  </button>

                  {/* Mobile Menu */}
                  {
                        open && (
                              <div className="absolute top-16 left-0 w-full bg-white shadow md:hidden p-4 space-y-3 z-50">
                                    <NavLink href="/" className="block py-2">
                                          Home
                                    </NavLink>
                                    <NavLink href="/all-appointments" className="block py-2">
                                          All Appointments
                                    </NavLink>
                                    <NavLink href="/dashboard" className="block py-2">
                                          Dashboard
                                    </NavLink>

                                    {!user ? (
                                          <>
                                                <NavLink href="/login" className="block py-2">
                                                      Login
                                                </NavLink>
                                                <NavLink href="/registration" className="block py-2">
                                                      Registration
                                                </NavLink>
                                          </>
                                    ) : (
                                          <>

                                                <button
                                                      onClick={handleLogout}
                                                      className="text-red-500 block py-2"
                                                >
                                                      Logout
                                                </button>
                                          </>
                                    )}
                              </div>
                        )
                  }
            </nav >
      );
};

export default Navbar;