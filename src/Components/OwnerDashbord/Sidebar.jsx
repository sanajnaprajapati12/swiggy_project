import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AiOutlineHome,
  AiOutlineOrderedList,
  AiOutlineMenu,
  AiOutlineShop,
  AiOutlineSetting,
  AiOutlineAppstore,
} from "react-icons/ai";

const Sidebar = ({ ownerName = "Owner", ownerImage }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", icon: <AiOutlineHome />, path: "/dashboard" },
    {
      name: "Orders",
      icon: <AiOutlineOrderedList />,
      path: "/dashboard/orders",
    },
    
    {
      name: "Restaurant Info",
      icon: <AiOutlineShop />,
      path: "/dashboard/restaurant",
    },
    {
      name: "Manage Restaurants",
      icon: <AiOutlineShop />,
      path: "/dashboard/manage-restaurants",
    },
    {
      name: "Manage Items",
      icon: <AiOutlineAppstore />,
      path: "/dashboard/items",
    },
    {
      name: "Settings",
      icon: <AiOutlineSetting />,
      path: "/dashboard/settings",
    },
  ];

  return (
    <>
      {/* Mobile Hamburger */}
      <div className="md:hidden flex items-center justify-between p-4 bg-gray-900 text-white">
        <h2 className="font-bold">{ownerName}</h2>
        <button onClick={() => setIsOpen(!isOpen)}>
          <AiOutlineMenu size={25} />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-full z-50 bg-gray-900 text-white transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:relative md:w-64 w-64
        `}
      >
        {/* Owner */}
        <div className="text-center py-6 border-b border-gray-700">
          <img
            src={ownerImage || "https://via.placeholder.com/80"}
            alt="Owner"
            className="w-20 h-20 rounded-full mx-auto object-cover border-2 border-orange-500"
          />
          <h3 className="mt-2 font-semibold">{ownerName}</h3>
        </div>

        {/* Menu Items */}
        <nav className="mt-6">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={index}
                to={item.path}
                className={`
                  flex items-center px-4 py-3 mx-2 my-1 rounded-lg font-medium transition-colors
                  ${
                    isActive
                      ? "bg-orange-500/20 text-orange-500 font-bold"
                      : "text-gray-300 hover:bg-gray-800"
                  }
                `}
                onClick={() => setIsOpen(false)} // close sidebar on mobile after click
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="absolute top-0 left-0 w-full min-h-full bg-black/40 z-50"
          style={{ height: document.body.scrollHeight }} // ensures overlay covers entire content
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
