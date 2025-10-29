import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const AddressPage = () => {
  const { user } = useSelector((state) => state.user);
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({
    house: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    type: "Home",
  });
  const [loading, setLoading] = useState(false);

  // Fetch user addresses
  useEffect(() => {
    const fetchAddresses = async () => {
      if (!user?._id) return;
      try {
        const res = await axios.get(`${API_BASE}/user/${user._id}`, {
          withCredentials: true,
        });
        if (res.data?.address) setAddresses([res.data.address]);
      } catch (err) {
        console.error(
          "Error fetching addresses:",
          err.response?.data || err.message
        );
      }
    };
    fetchAddresses();
  }, [user]);

  // Add or update address
  const handleSaveAddress = async () => {
    if (!newAddress.house.trim()) return alert("House/Flat is required!");
    setLoading(true);
    try {
      const res = await axios.put(
        `${API_BASE}/user/${user._id}/address`,
        newAddress,
        { withCredentials: true }
      );
      if (res.data?.success) {
        alert("✅ Address saved successfully!");
        setAddresses([newAddress]);
        setNewAddress({
          house: "",
          street: "",
          city: "",
          state: "",
          pincode: "",
          type: "Home",
        });
      } else {
        alert("❌ Failed to save address");
      }
    } catch (err) {
      console.error("Error saving address:", err.response?.data || err.message);
      alert("⚠️ Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-6">My Addresses</h2>

      {/* Existing addresses */}
      <div className="w-full max-w-md mb-6 space-y-4">
        {addresses.length ? (
          addresses.map((addr, idx) => (
            <div key={idx} className="bg-white p-4 rounded-md shadow-md">
              <p>
                <strong>{addr.type}</strong>
              </p>
              <p>
                {addr.house}, {addr.street}
              </p>
              {addr.city && <p>{addr.city}</p>}
              {addr.state && <p>{addr.state}</p>}
              {addr.pincode && <p>Pincode: {addr.pincode}</p>}
            </div>
          ))
        ) : (
          <p className="text-gray-500">No addresses added yet.</p>
        )}
      </div>

      {/* Add new address */}
      <div className="w-full max-w-md bg-white p-6 rounded-md shadow-md space-y-4">
        <h3 className="text-lg font-semibold">Add / Edit Address</h3>
        <input
          type="text"
          placeholder="House / Flat"
          value={newAddress.house}
          onChange={(e) =>
            setNewAddress({ ...newAddress, house: e.target.value })
          }
          className="w-full border rounded-md p-2"
        />
        <input
          type="text"
          placeholder="Street"
          value={newAddress.street}
          onChange={(e) =>
            setNewAddress({ ...newAddress, street: e.target.value })
          }
          className="w-full border rounded-md p-2"
        />
        <input
          type="text"
          placeholder="City"
          value={newAddress.city}
          onChange={(e) =>
            setNewAddress({ ...newAddress, city: e.target.value })
          }
          className="w-full border rounded-md p-2"
        />
        <input
          type="text"
          placeholder="State"
          value={newAddress.state}
          onChange={(e) =>
            setNewAddress({ ...newAddress, state: e.target.value })
          }
          className="w-full border rounded-md p-2"
        />
        <input
          type="text"
          placeholder="Pincode"
          value={newAddress.pincode}
          onChange={(e) =>
            setNewAddress({ ...newAddress, pincode: e.target.value })
          }
          className="w-full border rounded-md p-2"
        />
        <select
          value={newAddress.type}
          onChange={(e) =>
            setNewAddress({ ...newAddress, type: e.target.value })
          }
          className="w-full border rounded-md p-2"
        >
          <option value="Home">Home</option>
          <option value="Office">Office</option>
          <option value="Other">Other</option>
        </select>

        <button
          onClick={handleSaveAddress}
          disabled={loading}
          className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Address"}
        </button>
      </div>
    </div>
  );
};

export default AddressPage;
