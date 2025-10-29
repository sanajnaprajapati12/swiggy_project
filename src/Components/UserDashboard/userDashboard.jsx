import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import UserNavbar from "../UserDashboard/UserNavbar";
import UserSidebar from "../UserDashboard/CustmoerSidebar";

const UserDashboard = () => {
  const { user, token } = useSelector((state) => state.user);
  const displayName =
    token && user?.role === "user" ? user?.name || "User" : "User";

  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate("/userdashboard/edit-profile");
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-blue-900">
      {/* Navbar */}
      <UserNavbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      <div className="flex flex-1 flex-col md:flex-row px-4 sm:px-6 lg:px-8 mt-4">
        {/* Sidebar */}
        <UserSidebar
          isOpen={isSidebarOpen}
          toggleSidebar={() => setIsSidebarOpen(false)}
        />

        {/* Main Content */}
        <main className="flex-1 bg-white rounded-lg shadow-lg overflow-hidden p-6 md:ml-4">
          {/* Header */}
          <div className="flex items-center justify-between border-b pb-4 mb-6">
            <h2 className="text-2xl font-bold text-gray-800">{displayName}</h2>

            <button
              onClick={() => navigate("/userdashboard/edit-profile")}
              className="px-5 py-2 border border-blue-900 text-blue-900 rounded hover:bg-blue-900 hover:text-white transition"
            >
              Edit Profile
            </button>
          </div>

          {/* Outlet for nested pages */}
          <div className="w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;
