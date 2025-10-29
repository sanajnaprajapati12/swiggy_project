// Navbar.jsx
import React, { useState } from "react";
import { Search, ShoppingCart, User, HelpCircle, Percent } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3 md:py-4">
        {/* ===== Left Side: Logo ===== */}
        <div className="flex items-center gap-2">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/1/13/Swiggy_logo.png"
            alt="logo"
            className="w-8 h-8"
          />
          <span className="hidden md:inline text-lg font-semibold text-gray-800">
            Other ▼
          </span>
        </div>

        {/* ===== Right Side: Menu (Desktop) ===== */}
        <div className="hidden md:flex items-center gap-6 text-gray-700 font-medium">
          <a href="#" className="hover:text-orange-600">
            Swiggy Corporate
          </a>
          <a href="#" className="flex items-center gap-1 hover:text-orange-600">
            <Search size={18} /> Search
          </a>
          <a href="#" className="flex items-center gap-1 hover:text-orange-600">
            <Percent size={18} /> Offers
          </a>
          <a href="#" className="flex items-center gap-1 hover:text-orange-600">
            <HelpCircle size={18} /> Help
          </a>
          <a href="#" className="flex items-center gap-1 hover:text-orange-600">
            <User size={18} /> Sign In
          </a>
          <a href="#" className="flex items-center gap-1 hover:text-orange-600">
            <ShoppingCart size={18} /> Cart
          </a>
        </div>

        {/* ===== Mobile Menu Button ===== */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-700"
        >
          ☰
        </button>
      </div>

      {/* ===== Mobile Dropdown ===== */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md px-4 py-2 space-y-3">
          <a href="#" className="block hover:text-orange-600">
            Swiggy Corporate
          </a>
          <a href="#" className="block hover:text-orange-600">
            Search
          </a>
          <a href="#" className="block hover:text-orange-600">
            Offers
          </a>
          <a href="#" className="block hover:text-orange-600">
            Help
          </a>
          <Link to="/Signin" className="block hover:text-orange-600">
            Sign In
          </Link>
          <a href="#" className="block hover:text-orange-600">
            Cart
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
