import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  FiHome,
  FiShoppingBag,
  FiHeart,
  FiCreditCard,
  FiMapPin,
  FiSettings,
  FiMenu,
  FiX,
} from "react-icons/fi";

const menuItems = [
  { name: "Dashboard", icon: <FiHome />, path: "/userdashboard" },
  {
    name: "Orders",
    icon: <FiShoppingBag />,
    path: "/userdashboard/userorders",
  },
  { name: "Favourites", icon: <FiHeart />, path: "/userdashboard/favourites" },
  { name: "Payments", icon: <FiCreditCard />, path: "/userdashboard/payments" },
  { name: "Addresses", icon: <FiMapPin />, path: "/userdashboard/addresses" },
  { name: "Settings", icon: <FiSettings />, path: "/userdashboard/settings" },
];

const UserSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="w-60 bg-gray-50 border-r h-screen p-6 hidden md:block">
        <ul className="space-y-6 text-lg">
          {menuItems.map((item, idx) => (
            <li key={idx}>
              <NavLink
                to={item.path}
                end
                className={({ isActive }) =>
                  `flex items-center gap-3 font-medium cursor-pointer transition-colors ${
                    isActive
                      ? "text-orange-500"
                      : "text-gray-700 hover:text-orange-500"
                  }`
                }
              >
                {item.icon}
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </aside>

      {/* Mobile Hamburger */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-orange-500 text-white rounded-lg shadow-lg"
      >
        <FiMenu size={24} />
      </button>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black bg-opacity-50"
          onClick={() => setIsOpen(false)}
        />
        {/* Sidebar content */}
        <div className="relative w-64 h-full bg-gray-50 shadow-xl p-6 flex flex-col">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-lg bg-gray-200 hover:bg-gray-300"
          >
            <FiX size={22} />
          </button>
          <ul className="space-y-6 text-lg mt-12">
            {menuItems.map((item, idx) => (
              <li key={idx}>
                <NavLink
                  to={item.path}
                  end
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 font-medium cursor-pointer transition-colors ${
                      isActive
                        ? "text-orange-500"
                        : "text-gray-700 hover:text-orange-500"
                    }`
                  }
                >
                  {item.icon}
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mobile Bottom Navbar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-t flex justify-around py-2 border-t z-30">
        {menuItems.map((item, idx) => (
          <NavLink
            to={item.path}
            key={idx}
            end
            className={`flex flex-col items-center text-xs ${
              location.pathname === item.path
                ? "text-orange-500"
                : "text-gray-600"
            }`}
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </>
  );
};

export default UserSidebar;
