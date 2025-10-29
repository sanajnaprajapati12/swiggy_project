import React from "react";
import { AiOutlineShoppingCart, AiOutlineBell } from "react-icons/ai";
import { useSelector } from "react-redux";

const UserNavbar = () => {
  const { user } = useSelector((state) => state.user);

  return (                                                                                                                                                                                                                               
    <nav className="w-full bg-white shadow-md px-6 py-3 flex items-center justify-between">
      {/* Left - Logo */}
      <div className="flex items-center gap-2">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/1/13/Swiggy_logo.png"
          alt="logo"
          className="w-8 h-8"
        />
        <span className="font-bold text-lg">My Account</span>
      </div>

      {/* Right */}
      <div className="flex items-center gap-6">
        <AiOutlineBell className="text-gray-600 text-xl cursor-pointer" />
        <AiOutlineShoppingCart className="text-gray-600 text-xl cursor-pointer" />

        <div className="flex items-center gap-2">
          <span className="text-orange-500 font-medium">
            {user?.name || "User"}
          </span>
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;
