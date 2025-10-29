import { NavLink } from "react-router-dom";
import React from "react";
import {
  Home,
  Users,
  Utensils,
  ShoppingBag,
  User,
  X,
  Settings,
} from "lucide-react";

const AdminSidebar = ({ isOpen, setIsOpen }) => {
  const getLinkClass = ({ isActive }) =>
    `flex items-center gap-3 p-2 rounded-lg transition-colors duration-200 ${
      isActive
        ? "bg-orange-100 text-orange-500 font-semibold"
        : "text-gray-700 hover:bg-gray-100 hover:text-orange-500"
    }`;

  const links = [
    { name: "Dashboard", icon: <Home size={18} />, to: "/admin" },
    { name: "Users", icon: <Users size={18} />, to: "/admin/users" },
    { name: "Orders", icon: <ShoppingBag size={18} />, to: "/admin/orders" },
    {
      name: "Restaurants",
      icon: <Utensils size={18} />,
      to: "/admin/restaurants",
    },
    { name: "Settings", icon: <Settings size={18} />, to: "/admin/setting" },
    { name: "Profile", icon: <User size={18} />, to: "/admin/profile" },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-64 bg-black/40 shadow-xl p-6 flex-col">
        <h1 className="text-3xl font-extrabold text-orange-500 mb-10 tracking-wide">
          🍴 Admin
        </h1>
        <nav className="flex flex-col gap-3">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={getLinkClass}>
              {link.icon}
              <span>{link.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>

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
        <div className="relative w-64 h-full bg-white shadow-xl p-6 flex flex-col">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
          >
            <X size={22} />
          </button>

          <h1 className="text-2xl font-extrabold text-orange-500 mb-10 tracking-wide">
            🍴 Admin
          </h1>

          <nav className="flex flex-col gap-3">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={getLinkClass}
              >
                {React.cloneElement(link.icon, { size: 22 })}
                <span>{link.name}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
