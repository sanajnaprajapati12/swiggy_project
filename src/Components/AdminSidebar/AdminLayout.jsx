import { Outlet } from "react-router-dom";
import React, { useState } from "react";
import AdminSidebar from "../AdminSidebar/AdminSidebar.jsx";
import Navbar from "../AdminSidebar/Navbar.jsx";
import { useSelector } from "react-redux";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
   const { user, isAuthenticated } = useSelector((state) => state.user);
if (!isAuthenticated) {
  return <Navigate to="/login" />;
}

  const adminName = user?.name;
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <Navbar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <div className="p-4 sm:p-6 flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
