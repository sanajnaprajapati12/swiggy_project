import React from "react";
import { AiOutlineBell, AiOutlineLogout } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Navbar = ({ ownerName = "Owner", ownerImage }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    
    localStorage.clear();

    sessionStorage.clear();

    
    navigate("/");
  };

  return (
    <div
      style={{
        height: "60px",
        backgroundColor: "black/40",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
       
      }}
    >
      {/* Left - Title */}
      <h2 style={{ color: "#fc8019", margin: 0, fontSize: "20px" }}>
        Owner Dashboard
      </h2>

      {/* Right - Notifications, Profile, Logout */}
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        {/* Notification */}
        <AiOutlineBell
          size={22}
          style={{
            cursor: "pointer",
            color: "#ccc", // ✅ light grey
          }}
        />

        {/* Profile */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img
            src={
              ownerImage ||
              "https://cdn-icons-png.flaticon.com/512/1654/1654220.png"
            }
            alt="Owner"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid #fc8019", // ✅ orange border to match sidebar
            }}
          />
          <span style={{ fontWeight: "500", color: "#eee" }}>{ownerName}</span>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          style={{
            backgroundColor: "#fc8019",
            border: "none",
            padding: "8px 12px",
            borderRadius: "6px",
            color: "#fff",
            cursor: "pointer",
            fontWeight: "500",
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <AiOutlineLogout size={18} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
