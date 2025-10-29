// src/components/Navbar.jsx
import { useState } from "react";

import { FaBars, FaTimes, FaShoppingCart } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import React from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: "Search", href: "#" },
    { name: "Offers", href: "#", badge: "NEW" },
    { name: "Help", href: "#" },
    { name: "Sign In", href: "#" },
    { name: "Cart", href: "#", icon: <FaShoppingCart /> },
  ];

  return (
    <nav className="bg-white  shadow-xl fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo + Location */}
          <div className="flex items-center space-x-2">
            <img
              src="https://www.swiggy.com/" // Replace with your logo
              alt="Logo"
              className="-10 sm:h-12 font-bold"
            />
            <div className="flex items-center text-sm sm:text-base font-medium cursor-pointer">
              <MdLocationOn className="text-orange-500 text-lg" />
              <span>Other</span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="relative flex items-center space-x-1 text-gray-700 hover:text-orange-500 font-medium"
              >
                {link.icon && link.icon}
                <span>{link.name}</span>
                {link.badge && (
                  <span className="absolute -top-2 right-0 text-[10px] text-white bg-orange-500 rounded-full px-1">
                    {link.badge}
                  </span>
                )}
              </a>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <ul className="flex flex-col p-4 space-y-3">
            {navLinks.map((link, index) => (
              <li key={index}>
                <a
                  href={link.href}
                  className="flex items-center space-x-2 text-gray-700 hover:text-orange-500 font-medium"
                >
                  {link.icon && link.icon}
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="ml-1 text-xs text-white bg-orange-500 rounded-full px-1">
                      {link.badge}
                    </span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
