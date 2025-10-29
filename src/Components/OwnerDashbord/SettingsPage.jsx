import React, { useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";

const SettingsPage = () => {
  const [ownerName, setOwnerName] = useState("Sanju Prajapati");
  const [email, setEmail] = useState("owner@example.com");
  const [password, setPassword] = useState("");
  const [profileImages, setProfileImages] = useState([
    "https://i.pravatar.cc/150?img=3",
  ]);

  const handleSave = (e) => {
    e.preventDefault();
    alert("Settings updated successfully!");
    // API call to update owner info can go here
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map((file) => URL.createObjectURL(file));
    setProfileImages(urls);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-lg mt-6">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 text-center sm:text-left">
        Owner Settings
      </h2>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Profile Card */}
        <div className="w-full md:w-1/3 bg-orange-50 rounded-lg p-4 flex flex-col items-center shadow-sm">
          <div className="relative w-full flex justify-center gap-2 overflow-x-auto py-2">
            {profileImages.map((img, index) => (
              <div key={index} className="relative">
                <img
                  src={img}
                  alt={`Owner ${index + 1}`}
                  className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-2 border-orange-400"
                />
                <label className="absolute bottom-0 right-0 bg-orange-500 p-1 rounded-full cursor-pointer hover:bg-orange-600 transition">
                  {index === 0 && (
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  )}
                  <AiOutlineCamera className="text-white text-lg sm:text-xl" />
                </label>
              </div>
            ))}
          </div>
          <h3 className="mt-4 font-bold text-lg sm:text-xl text-gray-800 text-center">
            {ownerName}
          </h3>
          <p className="text-gray-500 text-sm text-center">Owner</p>
        </div>

        {/* Settings Form */}
        <div className="flex-1 bg-white rounded-lg p-4 sm:p-6 shadow-sm">
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Owner Name
              </label>
              <input
                type="text"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition w-full sm:w-auto"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
