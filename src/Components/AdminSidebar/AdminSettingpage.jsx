import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const AdminSettings = () => {
  const dispatch = useDispatch();

  // ✅ Get logged-in admin from Redux
 const { user, token } = useSelector((state) => state.user || {});

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    restaurantName: "",
    theme: "light",
    notifications: true,
  });

  // Prefill data from Redux when page loads
  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
        restaurantName: user.restaurantName || "",
      }));
    }
  }, [user]);

  // Input change handler
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(
        `${baseURL}/admin/${user._id}`, // ✅ Update API
        {
          name: form.name,
          email: form.email,
          password: form.password || undefined,
          restaurantName: form.restaurantName,
          theme: form.theme,
          notifications: form.notifications,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.success) {
        alert("✅ Settings updated successfully!");
        // ✅ Update Redux store with new data
        dispatch({ type: "UPDATE_USER", payload: res.data.admin });
      } else {
        alert("❌ Failed to update settings.");
      }
    } catch (error) {
      console.error("❌ Error updating settings:", error);
      alert("Server error while updating settings.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Settings</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white shadow-lg rounded-xl p-6"
      >
        {/* Profile Settings */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Profile Settings
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-600">
              Change Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter new password"
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
        </div>

        {/* Business Settings */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Business Settings
          </h2>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Restaurant Name
            </label>
            <input
              type="text"
              name="restaurantName"
              value={form.restaurantName}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
        </div>

        {/* Preferences */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Preferences
          </h2>
          <div className="flex items-center gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Theme
              </label>
              <select
                name="theme"
                value={form.theme}
                onChange={handleChange}
                className="mt-1 border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="light">🌞 Light</option>
                <option value="dark">🌙 Dark</option>
              </select>
            </div>
            <div className="flex items-center mt-6">
              <input
                type="checkbox"
                name="notifications"
                checked={form.notifications}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <label className="ml-2 text-sm text-gray-700">
                Enable Notifications
              </label>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminSettings;
