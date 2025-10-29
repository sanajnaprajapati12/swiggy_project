import { Menu, X, Search, ShoppingCart } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  // ✅ Redux se user nikal lo
  const { user } = useSelector((state) => state.user || {});

  return (
    <div className="flex items-center justify-between bg-white shadow-md px-4 md:px-6 py-3 md:py-4 sticky top-0 z-50">
      {/* Hamburger + Logo */}
      <div className="flex items-center gap-3 md:gap-4">
        <button
          className="md:hidden"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <h1 className="text-xl md:text-2xl font-bold text-orange-500">
          🍴 {user?.name || "Admin"}
        </h1>
      </div>

      {/* Search */}
      <div className="hidden sm:flex items-center bg-gray-100 rounded-lg px-2 md:px-3 py-1.5 md:py-2 w-1/2 max-w-md">
        <Search size={16} className="text-gray-500" />
        <input
          type="text"
          placeholder="Search users, orders, restaurants..."
          className="ml-2 bg-transparent outline-none w-full text-xs md:text-sm"
        />
      </div>

      {/* Profile/Cart */}
      <div className="flex items-center gap-4 md:gap-6">
        <div className="relative cursor-pointer">
          <ShoppingCart className="text-orange-500" size={22} />
          <span className="absolute -top-1.5 -right-1.5 bg-orange-500 text-white text-[10px] md:text-xs rounded-full px-1.5 md:px-2">
            3
          </span>
        </div>
        <img
          src="https://i.pravatar.cc/40"
          alt="user"
          className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-orange-500 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Navbar;
