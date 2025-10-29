import React from "react";
import { useSelector } from "react-redux";

const UserDashboardHome = () => {
  const { user, token } = useSelector((state) => state.user);

  // Sirf role user ho & token ho tabhi data dikhaye
  const isUser = token && user?.role === "user";

  // Initials
  const initials =
    isUser && user?.name
      ? user.name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
      : "U";

  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      {/* Avatar */}
      <div className="w-20 h-20 flex items-center justify-center rounded-full bg-orange-500 text-white text-2xl font-bold shadow-md">
        {initials}
      </div>

      {/* Welcome Text */}
      <h1 className="mt-4 text-3xl font-extrabold text-gray-800">
        🎉 Welcome, {isUser ? user?.name : "Guest User"}
      </h1>
      <p className="mt-2 text-gray-600">
        {isUser ? user?.email : "No Email"} •{" "}
        {isUser ? user?.mobile: "No Phone"}
      </p>

      {/* Info */}
      <p className="mt-4 text-lg text-gray-600 max-w-xl">
        Manage your{" "}
        <span className="font-semibold text-orange-500">orders</span>, track
        your <span className="font-semibold text-orange-500">payments</span>,
        and update your{" "}
        <span className="font-semibold text-orange-500">profile</span>
        all in one place.
      </p>

      {/* CTA Button */}
      <button className="mt-6 px-6 py-2 bg-orange-500 text-white rounded-lg shadow-md hover:bg-orange-600 transition">
        Explore Orders
      </button>
    </div>
  );
};

export default UserDashboardHome;
