import React from "react";

const Navbar = () => {
  return (
    <nav className="w-full bg-white shadow-2xl  sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <img
          className="h-10 w-45"
          src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_260/portal/m/seo/Logos/Swiggy/Swiggy%20logo-2.png"
        ></img>
        <p className="text-black-500 text-2xl  font-bold">Setup your precise location</p>
        {/* Search Bar */}
        <div className="hidden md:flex w-1/2">
          <input
            type="text"
            placeholder="Search for restaurant and food"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Profile */}
        <div className="flex gap-4 items-center">
          <img className="" src=""></img>
          <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
