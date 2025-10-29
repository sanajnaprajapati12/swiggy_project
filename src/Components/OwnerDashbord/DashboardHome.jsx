import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const DashboardHome = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const restaurantId = localStorage.getItem("restaurantId");
  const token = localStorage.getItem("token");

  // Fetch orders from backend
  const fetchOrders = async () => {
    if (!restaurantId) return;
    try {
      const res = await axios.get(
        `${baseURL}/restaurant-order/${restaurantId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.data.success && Array.isArray(res.data.orders)) {
        setOrders(res.data.orders);
      } else if (Array.isArray(res.data.data)) {
        setOrders(res.data.data);
      } else {
        setOrders([]);
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Compute stats
  const totalOrders = orders.length;
  const revenueToday = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  const pendingOrders = orders.filter((o) => o.status === "Pending").length;

  // Prepare chart data dynamically (last 7 days)
  const getLast7DaysData = () => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const today = new Date();
    const last7Days = Array.from({ length: 7 }).map((_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() - (6 - i));
      return { date, day: days[date.getDay()] };
    });

    const orderData = last7Days.map((d) => {
      const ordersCount = orders.filter(
        (o) => new Date(o.createdAt).toDateString() === d.date.toDateString()
      ).length;
      return { day: d.day, orders: ordersCount };
    });

    const revenueData = last7Days.map((d) => {
      const revenue = orders
        .filter(
          (o) => new Date(o.createdAt).toDateString() === d.date.toDateString()
        )
        .reduce((sum, o) => sum + (o.totalAmount || 0), 0);
      return { day: d.day, revenue };
    });

    return { orderData, revenueData };
  };

  const { orderData, revenueData } = getLast7DaysData();

  if (loading) {
    return (
      <div className="text-center py-10">
        <p className="text-lg text-gray-600">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      } min-h-screen p-4 md:p-6 transition-colors duration-300`}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 py-2 rounded-lg shadow-md bg-gray-200 dark:bg-gray-800 hover:opacity-80 transition"
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        {[
          { title: "Total Orders", value: totalOrders, color: "bg-orange-500" },
          {
            title: "Revenue Today",
            value: `₹${revenueToday}`,
            color: "bg-green-500",
          },
          { title: "Active Menu Items", value: 45, color: "bg-blue-500" }, // replace if dynamic
          {
            title: "Pending Orders",
            value: pendingOrders,
            color: "bg-red-500",
          },
        ].map((stat, index) => (
          <div
            key={index}
            className={`p-4 md:p-6 rounded-2xl text-white shadow-lg ${stat.color}`}
          >
            <h2 className="text-lg md:text-xl font-medium">{stat.title}</h2>
            <p className="text-xl md:text-2xl font-bold mt-2">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-8">
        {/* Orders Trend */}
        <div
          className={`${
            darkMode ? "bg-gray-800" : "bg-white"
          } p-4 md:p-6 rounded-2xl shadow-lg`}
        >
          <h2 className="text-xl md:text-2xl font-semibold mb-4">
            Orders Trend (Last 7 Days)
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={orderData}>
              <CartesianGrid stroke={darkMode ? "#444" : "#f0f0f0"} />
              <XAxis dataKey="day" stroke={darkMode ? "#fff" : "#000"} />
              <YAxis stroke={darkMode ? "#fff" : "#000"} />
              <Tooltip
                contentStyle={{
                  backgroundColor: darkMode ? "#333" : "#fff",
                  color: darkMode ? "#fff" : "#000",
                }}
              />
              <Line
                type="monotone"
                dataKey="orders"
                stroke="#fc8019"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Chart */}
        <div
          className={`${
            darkMode ? "bg-gray-800" : "bg-white"
          } p-4 md:p-6 rounded-2xl shadow-lg`}
        >
          <h2 className="text-xl md:text-2xl font-semibold mb-4">
            Revenue (Last 7 Days)
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={revenueData}>
              <CartesianGrid stroke={darkMode ? "#444" : "#f0f0f0"} />
              <XAxis dataKey="day" stroke={darkMode ? "#fff" : "#000"} />
              <YAxis stroke={darkMode ? "#fff" : "#000"} />
              <Tooltip
                contentStyle={{
                  backgroundColor: darkMode ? "#333" : "#fff",
                  color: darkMode ? "#fff" : "#000",
                }}
              />
              <Bar dataKey="revenue" fill="#28a745" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
