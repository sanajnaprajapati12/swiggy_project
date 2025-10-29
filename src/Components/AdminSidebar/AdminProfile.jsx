// AdminProfile.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

const AdminProfile = () => {
  const [admin] = useState({
    name: "Sanju Prajapati",
    email: "admin@swiggyclone.com",
    phone: "+91 9876543210",
    role: "Administrator",
    totalOrders: 1250,
    totalRevenue: "₹2,34,000",
    totalRestaurants: 35,
  });

  const [recentOrders] = useState([
    {
      id: "ORD001",
      customer: "Rohit Sharma",
      restaurant: "Pizza Palace",
      amount: 450,
      status: "Delivered",
    },
    {
      id: "ORD002",
      customer: "Anita Joshi",
      restaurant: "Burger King",
      amount: 300,
      status: "Pending",
    },
    {
      id: "ORD003",
      customer: "Rahul Verma",
      restaurant: "Sushi Hub",
      amount: 700,
      status: "Cancelled",
    },
    {
      id: "ORD004",
      customer: "Neha Singh",
      restaurant: "Domino's",
      amount: 550,
      status: "Delivered",
    },
  ]);

  return (
    <div className="p-4 md:p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">
        Admin Profile
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-indigo-500 text-white p-4 rounded-2xl shadow-md flex flex-col items-center justify-center text-center">
          <h2 className="font-semibold">Total Orders</h2>
          <p className="text-xl md:text-2xl font-bold mt-2">
            {admin.totalOrders}
          </p>
        </div>
        <div className="bg-green-500 text-white p-4 rounded-2xl shadow-md flex flex-col items-center justify-center text-center">
          <h2 className="font-semibold">Revenue</h2>
          <p className="text-xl md:text-2xl font-bold mt-2">
            {admin.totalRevenue}
          </p>
        </div>
        <div className="bg-yellow-500 text-white p-4 rounded-2xl shadow-md flex flex-col items-center justify-center text-center">
          <h2 className="font-semibold">Restaurants</h2>
          <p className="text-xl md:text-2xl font-bold mt-2">
            {admin.totalRestaurants}
          </p>
        </div>
      </div>

      {/* Profile Card */}
      <div className="max-w-3xl bg-white p-6 rounded-2xl shadow-md mx-auto mb-6">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6 text-center md:text-left">
          <img
            src="https://i.pravatar.cc/150?img=12"
            alt="Admin"
            className="w-24 h-24 rounded-full border-4 border-indigo-500"
          />
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-semibold">{admin.name}</h2>
            <p className="text-gray-600">{admin.role}</p>
            <p className="text-gray-600 mt-1">{admin.email}</p>
            <p className="text-gray-600 mt-1">{admin.phone}</p>
          </div>
        </div>
        <Link to="/admin/edit-profile">
          <button className="mt-6 w-full md:w-auto bg-indigo-500 text-white px-6 py-2 rounded-lg hover:bg-indigo-600 transition">
            Edit Profile
          </button>
        </Link>
      </div>

      {/* Recent Orders Section */}
      <div className="max-w-5xl bg-white p-6 rounded-2xl shadow-md mx-auto">
        <h2 className="text-lg md:text-xl font-bold mb-4 text-center md:text-left">
          Recent Orders
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm md:text-base">
            <thead>
              <tr>
                <th className="px-3 md:px-4 py-2 text-left font-medium text-gray-500 uppercase">
                  Order ID
                </th>
                <th className="px-3 md:px-4 py-2 text-left font-medium text-gray-500 uppercase">
                  Customer
                </th>
                <th className="px-3 md:px-4 py-2 text-left font-medium text-gray-500 uppercase">
                  Restaurant
                </th>
                <th className="px-3 md:px-4 py-2 text-left font-medium text-gray-500 uppercase">
                  Amount
                </th>
                <th className="px-3 md:px-4 py-2 text-left font-medium text-gray-500 uppercase">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td className="px-3 md:px-4 py-2">{order.id}</td>
                  <td className="px-3 md:px-4 py-2">{order.customer}</td>
                  <td className="px-3 md:px-4 py-2">{order.restaurant}</td>
                  <td className="px-3 md:px-4 py-2">₹{order.amount}</td>
                  <td className="px-3 md:px-4 py-2">
                    <span
                      className={`px-3 py-1 rounded-full text-white text-xs md:text-sm ${
                        order.status === "Delivered"
                          ? "bg-green-500"
                          : order.status === "Pending"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
