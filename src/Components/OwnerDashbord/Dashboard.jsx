import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./OwnerNavbar";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Dashboard = () => {
  
  const { user, isAuthenticated } = useSelector((state) => state.user);

  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  const ownerName = user?.name;
  const ownerImage =
    user?.image || "https://cdn-icons-png.flaticon.com/512/1654/1654220.png";

  return (
    <div style={{ display: "flex" }}>
      <Sidebar ownerName={ownerName} ownerImage={ownerImage} />
      <div style={{ flex: 1 }}>
        <Navbar ownerName={ownerName} />
        <div style={{ padding: "20px" }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
