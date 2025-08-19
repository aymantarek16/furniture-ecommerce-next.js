"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

import React, { useEffect, useState } from "react";
import {
  FaTruck,
  FaHeart,
  FaShoppingCart,
  FaBars,
  FaTimes,
  FaSun,
  FaMoon,
} from "react-icons/fa";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Get card items form redux store to display the item count
  const cartItems = useSelector((state) => state.cart.items);
  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

// Get whishlist items form redux store to display item count
const wishlistItems = useSelector((state) => state.wishlist.items);
const wishlistItemCount = wishlistItems.length;

  const toggleDarkMode = () => {
    document.body.classList.toggle("dark");
    setIsDark(!isDark);
    localStorage.setItem("theme", !isDark ? "dark" : "light");
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (!savedTheme) {
      document.body.classList.add("dark");
      setIsDark(true);
      localStorage.setItem("theme", "dark");
    } else if (savedTheme === "dark") {
      document.body.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  const pathname = usePathname();

  const navItems = [
    { label: "Home", href: "/" },
    { label: "New Arrivals", href: "/new-arrivals" },
    { label: "Top Sellers", href: "/top-sellers" },
    { label: "Products", href: "/products" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-slate-50 px-6 py-4 flex items-center justify-between shadow-md">
      {/* left section: logo */}
      <div className="flex flex-col leading-tight">
        <span className="text-lg md:text-2xl font-bold text-[#d3287e]">
          Rise Of Coding
        </span>
        <span className="text-sm text-gray-500 tracking-widest self-center">
          Furniture Store
        </span>
      </div>

      {/* center section: Link */}
      <ul className="hidden md:flex gap-8 text-zinc-500  font-medium">
        {navItems.map(({ label, href }) => (
          <li key={href}>
            <Link
              href={href}
              className={`hover:text-[#a01f64] transition-colors ${
                pathname === href ? "text-[#d82886] font-semibold" : ""
              }`}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>

      {/* right section: icons */}
      <div className="flex items-center gap-6 text-gray-700 text-xl">
        <div className="navIcon flex gap-4 md:gap-6">
          <FaTruck className=" hover:text-[#a01f64] cursor-pointer" />
          <Link href="/wishlist" className="relative">
            <FaHeart className=" hover:text-[#a01f64]" />
              {wishlistItemCount > 0 && (
              <span className="absolute -top-3 -right-4 bg-[#a91f64] text-white text-xs font-semibold rounded-full px-1.5">
                {wishlistItemCount}
              </span>
            )}
          </Link>
          <Link href="/cart" className="relative">
            <FaShoppingCart className=" hover:text-[#a01f64]" />
            {cartItemCount > 0 && (
              <span className="absolute -top-3 -right-4 bg-[#a91f64] text-white text-xs font-semibold rounded-full px-1.5">
                {cartItemCount}
              </span>
            )}
          </Link>
          {/* Button Dark mode toggle */}
          <button
            onClick={toggleDarkMode}
            className="text-xl cursor-pointer hover:text-[#a01f64]"
          >
            {isDark ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </div>

      {/* menu icon */}
      <div className="md:hidden flex">
        <button onClick={toggleMenu}>
          {isMenuOpen ? (
            <FaTimes className="text-2xl hover:text-[#a91f64] cursor-pointer" />
          ) : (
            <FaBars className="text-2xl hover:text-[#a91f64] cursor-pointer" />
          )}
        </button>
      </div>

      {/* mobile menu */}
      {isMenuOpen && (
        <ul
          className="mobMenu absolute top-full left-0 w-full bg-white text-zinc-500 flex flex-col items-center
    gap-4 py-4  font-medium md:hidden shadow-md"
        >
          {navItems.map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                className={`hover:text-[#a01f64] transition-colors ${
                  pathname === href ? "text-[#a01f64] font-semibold" : ""
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
