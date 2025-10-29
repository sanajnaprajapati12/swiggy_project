import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Users,
  ShoppingBag,
  Utensils,
  DollarSign,
  Sun,
  Moon,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useSelector } from "react-redux";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const AdminDashboard = () => {
  const [chartType, setChartType] = useState("bar");
  const [darkMode, setDarkMode] = useState(false);
  const [usersCount, setUsersCount] = useState(0);
  const [ordersData, setOrdersData] = useState([]);
  const [restaurantsCount, setRestaurantsCount] = useState(0);
  const [ordersRevenue, setOrdersRevenue] = useState(0);

  const reduxUser = useSelector((state) => state.user?.user);
  const userName = reduxUser?.name || "Admin";

  // Fetch Users
  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${baseURL}/getAlluser`, {
        withCredentials: true,
      });
      setUsersCount(res.data.users?.length || 0);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch Orders & Revenue
  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${baseURL}/orders`, {
        withCredentials: true,
      });
      const orders = res.data.orders || [];

      // Calculate total revenue
      const totalRevenue = orders.reduce(
        (acc, o) => acc + (o.totalAmount || 0),
        0
      );
      setOrdersRevenue(totalRevenue);

      // Calculate weekly orders
      const last7Days = Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (6 - i));
        return d;
      });

      const weeklyData = last7Days.map((date) => {
        const dayOrders = orders.filter((o) => {
          const orderDate = new Date(o.createdAt);
          return (
            orderDate.getFullYear() === date.getFullYear() &&
            orderDate.getMonth() === date.getMonth() &&
            orderDate.getDate() === date.getDate()
          );
        });
        return {
          day: date.toLocaleDateString("en-US", { weekday: "short" }),
          orders: dayOrders.length,
          revenue: dayOrders.reduce((acc, o) => acc + (o.totalAmount || 0), 0),
        };
      });

      setOrdersData(weeklyData);
    } catch (err) {
      console.error(err);
      setOrdersData([]);
    }
  };

  // Fetch Restaurants
  const fetchRestaurants = async () => {
    try {
      const res = await axios.get(`${baseURL}/getrestaurants`);
      const restaurants =
        res.data.restaurants || res.data.data || res.data || [];
      setRestaurantsCount(restaurants.length);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchOrders();
    fetchRestaurants();
  }, []);

  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      } min-h-screen p-4 sm:p-6 md:p-8 transition-colors`}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold">
          👋 Welcome, {userName}!
        </h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg shadow-md transition bg-gray-200 dark:bg-gray-700 hover:scale-105"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
        {[
          {
            title: "Users",
            value: usersCount,
            icon: <Users size={24} />,
            color: "from-orange-400 to-pink-500",
          },
          {
            title: "Orders (This Week)",
            value: ordersData.reduce((acc, o) => acc + o.orders, 0),
            icon: <ShoppingBag size={24} />,
            color: "from-green-400 to-teal-500",
          },
          {
            title: "Restaurants",
            value: restaurantsCount,
            icon: <Utensils size={24} />,
            color: "from-blue-400 to-indigo-500",
          },
          {
            title: "Revenue (₹)",
            value: `₹${ordersRevenue}`,
            icon: <DollarSign size={24} />,
            color: "from-yellow-400 to-orange-500",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className={`bg-gradient-to-r ${stat.color} p-4 sm:p-6 rounded-2xl text-white shadow-lg`}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-base sm:text-lg font-semibold">
                {stat.title}
              </h2>
              {stat.icon}
            </div>
            <p className="text-2xl sm:text-3xl font-bold mt-2">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Weekly Orders & Revenue Chart */}
      <div
        className={`rounded-xl shadow-md p-4 sm:p-6 mb-10 ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg sm:text-xl font-bold">
            📊 Orders & Revenue Last 7 Days
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => setChartType("bar")}
              className={`${
                chartType === "bar"
                  ? "bg-orange-500 text-white"
                  : "bg-gray-200 dark:bg-gray-700"
              } px-3 py-2 rounded-lg`}
            >
              Bar Chart
            </button>
            <button
              onClick={() => setChartType("line")}
              className={`${
                chartType === "line"
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 dark:bg-gray-700"
              } px-3 py-2 rounded-lg`}
            >
              Line Chart
            </button>
          </div>
        </div>
        <div className="w-full h-64 sm:h-96">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === "bar" ? (
              <BarChart data={ordersData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={darkMode ? "#555" : "#ccc"}
                />
                <XAxis dataKey="day" stroke={darkMode ? "#ddd" : "#333"} />
                <YAxis stroke={darkMode ? "#ddd" : "#333"} />
                <Tooltip />
                <Legend />
                <Bar dataKey="orders" fill="#ff7f50" radius={[6, 6, 0, 0]} />
                <Bar dataKey="revenue" fill="#00b894" radius={[6, 6, 0, 0]} />
              </BarChart>
            ) : (
              <LineChart data={ordersData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={darkMode ? "#555" : "#ccc"}
                />
                <XAxis dataKey="day" stroke={darkMode ? "#ddd" : "#333"} />
                <YAxis stroke={darkMode ? "#ddd" : "#333"} />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="orders"
                  stroke="#ff7f50"
                  strokeWidth={3}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#00b894"
                  strokeWidth={3}
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
