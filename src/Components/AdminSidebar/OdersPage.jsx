import React, { useEffect, useState } from "react";
import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const OrdersTable = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All");

  const restaurantId = localStorage.getItem("restaurantId");
  const token = localStorage.getItem("token"); // JWT token

  const fetchOrders = async () => {
    if (!restaurantId) {
      console.error("❌ Restaurant ID not found in localStorage");
      setLoading(false);
      return;
    }
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
      console.error("❌ Error fetching orders:", err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId, newStatus) => {
    setUpdating(orderId);
    try {
      let endpoint =
        newStatus === "Confirmed"
          ? `${baseURL}/orders/${orderId}/confirm`
          : `${baseURL}/orders/${orderId}/status`;
      let payload = newStatus === "Confirmed" ? {} : { status: newStatus };

      const res = await axios.patch(endpoint, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        setOrders((prev) =>
          prev.map((o) => (o._id === orderId ? { ...o, status: newStatus } : o))
        );
      }
    } catch (err) {
      console.error("❌ Error updating status:", err);
      alert("Failed to update order status. Make sure you are authorized.");
    } finally {
      setUpdating(null);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Filtered orders based on status
  const filteredOrders =
    statusFilter === "All"
      ? orders
      : orders.filter((order) => order.status === statusFilter);

  if (loading) {
    return (
      <div className="text-center py-10">
        <p className="text-lg text-gray-600">Loading orders...</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <p className="text-gray-500 text-center mt-10">
        No orders found for this restaurant.
      </p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">All Orders</h1>

      {/* Status filter */}
      <div className="mb-4">
        <label className="mr-2 font-medium text-gray-700">
          Filter by Status:
        </label>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-300 rounded-md px-2 py-1"
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {/* Table view for medium and up */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg rounded-xl overflow-hidden">
          <thead className="bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
            <tr>
              {[
                "Order ID",
                "Customer",
                "Items",
                "Total",
                "Date",
                "Status",
                "Actions",
              ].map((header) => (
                <th
                  key={header}
                  className="text-left px-4 py-3 text-sm font-semibold text-gray-700 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredOrders.map((order, idx) => (
              <tr
                key={order._id}
                className={`transition hover:bg-gray-50 ${
                  idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="px-4 py-3 text-sm">{order._id}</td>
                <td className="px-4 py-3 text-sm">
                  {order.userId.name || "N/A"}
                </td>
                <td className="px-4 py-3 text-sm space-y-1">
                  {order.items?.map((item, i) => (
                    <div key={i}>
                      {item.name} × {item.quantity}
                    </div>
                  ))}
                </td>
                <td className="px-4 py-3 text-sm font-semibold">
                  ₹{order.totalAmount}
                </td>
                <td className="px-4 py-3 text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString()}{" "}
                  {new Date(order.createdAt).toLocaleTimeString()}
                </td>
                <td className="px-4 py-3 text-sm">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      order.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : order.status === "Confirmed"
                        ? "bg-green-100 text-green-800"
                        : order.status === "Cancelled"
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-center">
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order._id, e.target.value)}
                    disabled={updating === order._id}
                    className="border border-gray-300 rounded-md px-2 py-1 text-sm w-full"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Delivered">Delivered</option>
                    <option
                      value="Cancelled"
                      disabled={
                        order.status === "Confirmed" ||
                        order.status === "Delivered"
                      }
                    >
                      Cancelled
                    </option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card view for mobile */}
      <div className="md:hidden space-y-4">
        {filteredOrders.map((order) => (
          <div
            key={order._id}
            className="bg-white shadow-md rounded-xl p-4 space-y-2"
          >
            <div className="flex justify-between items-center">
              <p className="font-semibold text-sm">Order ID:</p>
              <p className="text-sm">{order._id}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="font-semibold text-sm">Customer:</p>
              <p className="text-sm">{order.userId.name || "N/A"}</p>
            </div>
            <div>
              <p className="font-semibold text-sm mb-1">Items:</p>
              {order.items?.map((item, i) => (
                <p key={i} className="text-sm ml-2">
                  {item.name} × {item.quantity}
                </p>
              ))}
            </div>
            <div className="flex justify-between items-center">
              <p className="font-semibold text-sm">Total:</p>
              <p className="text-sm">₹{order.totalAmount}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="font-semibold text-sm">Date:</p>
              <p className="text-sm">
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className="font-semibold text-sm">Status:</p>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  order.status === "Pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : order.status === "Confirmed"
                    ? "bg-green-100 text-green-800"
                    : order.status === "Cancelled"
                    ? "bg-red-100 text-red-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {order.status}
              </span>
            </div>
            <div>
              <p className="font-semibold text-sm mb-1">Actions:</p>
              <select
                value={order.status}
                onChange={(e) => updateStatus(order._id, e.target.value)}
                disabled={updating === order._id}
                className="border border-gray-300 rounded-md px-2 py-1 text-sm w-full"
              >
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Delivered">Delivered</option>
                <option
                  value="Cancelled"
                  disabled={
                    order.status === "Confirmed" || order.status === "Delivered"
                  }
                >
                  Cancelled
                </option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersTable;
