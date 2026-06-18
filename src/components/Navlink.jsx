"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavLink = ({ href, className, children }) => {
      const pathname = usePathname();
      console.log(pathname, "pathname");

      const isActive = href === pathname;

      return (
            <Link
                  href={href}
                  className={`${isActive ? "border-b-2 cursor-pointer transition-all duration-300 bg-gradient-to-br from-blue-500/40 to-transparent hover:bg-blue-500/70 hover:shadow-[0_0_10px_rgba(46,142,255,0.5)] " : ""} ${className}`}
            >
                  {children}
            </Link>
      );
};

export default NavLink;