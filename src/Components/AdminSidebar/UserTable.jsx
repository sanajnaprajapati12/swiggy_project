import React, { useState, useEffect } from "react";
import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${baseURL}/getAlluser`, {
        withCredentials: true,
      });
      setUsers(res.data.users || []);
    } catch (err) {
      console.error("Error fetching users:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle role change
  const handleRoleChange = async (userId, newRole) => {
    try {
      await axios.put(
        `${baseURL}/updateUserRole/${userId}`,
        { role: newRole },
        { withCredentials: true }
      );
      alert("Role updated successfully");
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to update role");
    }
  };

  // Handle delete user
  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`${baseURL}/deleteUser/${userId}`, {
        withCredentials: true,
      });
      alert("User deleted successfully");
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to delete user");
    }
  };

  if (loading) return <p className="text-center mt-6">Loading users...</p>;

  return (
    <div className="max-w-6xl mx-auto p-4 mt-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center sm:text-left">
        All Users
      </h1>

      {users.length > 0 ? (
        <>
          {/* Table view for md+ screens */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-100 text-center">
                  <th className="py-2 px-4 border-b">Name</th>
                  <th className="py-2 px-4 border-b">Email</th>
                  <th className="py-2 px-4 border-b">Mobile</th>
                  <th className="py-2 px-4 border-b">Role</th>
                  <th className="py-2 px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50 text-center">
                    <td className="py-2 px-4 border-b">{user.name}</td>
                    <td className="py-2 px-4 border-b">{user.email}</td>
                    <td className="py-2 px-4 border-b">{user.mobile}</td>
                    <td className="py-2 px-4 border-b">
                      <select
                        value={user.role}
                        onChange={(e) =>
                          handleRoleChange(user._id, e.target.value)
                        }
                        className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td className="py-2 px-4 border-b">
                      <button
                        onClick={() => handleDeleteUser(user._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Card view for small screens */}
          <div className="md:hidden space-y-4">
            {users.map((user) => (
              <div
                key={user._id}
                className="bg-white p-4 rounded-lg shadow flex flex-col gap-2"
              >
                <div className="flex justify-between items-center">
                  <h2 className="font-bold text-lg">{user.name}</h2>
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
                <p className="text-gray-500 text-sm">Email: {user.email}</p>
                <p className="text-gray-500 text-sm">Mobile: {user.mobile}</p>
                <div>
                  <label className="text-gray-700 text-sm mr-2">Role:</label>
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 w-full"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="text-gray-500 text-center">No users found</p>
      )}
    </div>
  );
};

export default UserTable;
