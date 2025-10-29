// EditProfile.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Camera } from "lucide-react";

const EditProfile = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState({
    name: "Sanju Prajapati",
    email: "admin@swiggyclone.com",
    phone: "+91 9876543210",
    role: "Administrator",
    avatar: "https://i.pravatar.cc/150?u=admin", // Default profile image
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdmin((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle profile picture change
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imgURL = URL.createObjectURL(file);
      setAdmin((prev) => ({ ...prev, avatar: imgURL }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile updated successfully!");
    navigate("/admin/profile");
  };

  return (
    <div className="p-4 md:p-6 bg-gray-100 min-h-screen">
      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">
        Edit Profile
      </h1>

      {/* Form Container */}
      <div className="max-w-4xl bg-white p-6 md:p-8 rounded-2xl shadow-md mx-auto">
        {/* Avatar Upload */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative w-28 h-28 md:w-32 md:h-32">
            <img
              src={admin.avatar}
              alt="Profile"
              className="w-full h-full object-cover rounded-full border-4 border-gray-200 shadow-md"
            />
            <label
              htmlFor="avatarUpload"
              className="absolute bottom-2 right-2 bg-indigo-500 p-2 rounded-full text-white cursor-pointer hover:bg-indigo-600 transition"
            >
              <Camera size={18} />
              <input
                id="avatarUpload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </label>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Click camera to change photo
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          {/* Grid layout on md+ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <label className="block text-gray-700 mb-1 text-sm md:text-base">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={admin.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 md:p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1 text-sm md:text-base">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={admin.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 md:p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <label className="block text-gray-700 mb-1 text-sm md:text-base">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={admin.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 md:p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1 text-sm md:text-base">
                Role
              </label>
              <input
                type="text"
                name="role"
                value={admin.role}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 md:p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
          </div>

          {/* Button */}
          <div className="flex justify-center md:justify-end">
            <button
              type="submit"
              className="mt-4 bg-indigo-500 text-white px-6 py-2 md:px-8 md:py-3 rounded-lg hover:bg-indigo-600 transition text-sm md:text-base"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
