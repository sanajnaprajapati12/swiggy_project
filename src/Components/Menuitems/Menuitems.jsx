

import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";
import Navbar from "./MenuNavbar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

// ================= Helper Function =================
const safeText = (value, fallback = "N/A") => {
  if (value === null || value === undefined) return fallback;
  if (typeof value === "object") return JSON.stringify(value); // object/array ko string bana do
  return String(value);
};
const getImage = (item) => {
  if (item?.image) return item.image; // single image
  if (Array.isArray(item?.images) && item.images.length > 0)
    return item.images[0]; // first from array
  return "https://via.placeholder.com/150"; // fallback
};

// ================= Food Card Popup =================
const FoodCard = ({ item, onClose }) => {
  const [qty, setQty] = useState(1);
  

  return (
    <div className="max-w-md w-full bg-white rounded-2xl shadow-lg overflow-hidden relative">
      <button
        className="absolute top-2 right-2 bg-white rounded-full w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gray-800 shadow-md z-50"
        onClick={onClose}
      >
        ×
      </button>
      <img
        src={getImage(item)}
        alt={safeText(item?.itemName, "No name")}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">
            {safeText(item?.itemName, "Unnamed Item")}
          </h2>
          <span className="text-orange-600 font-bold">
            ₹{safeText(item?.price, "N/A")}
          </span>
        </div>
        <div className="flex items-center gap-1 text-sm mt-1">
          <Star className="w-4 h-4 text-green-500 fill-yellow-500" />
          <span className="font-medium">{safeText(item?.rating, "0")}</span>
          <span className="text-gray-500">({safeText(item?.votes, "0")})</span>
        </div>
        <div className="flex items-center gap-3 mt-3">
          <button
            className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-lg hover:bg-gray-100"
            onClick={() => qty > 1 && setQty(qty - 1)}
          >
            −
          </button>
          <span className="text-lg font-semibold">{qty}</span>
          <button
            className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-lg hover:bg-gray-100"
            onClick={() => setQty(qty + 1)}
          >
            +
          </button>
        </div>
        <p className="text-gray-600 text-sm mt-3">
          {safeText(item?.description, "No details available")}
        </p>
      </div>
    </div>
  );
};

// ================= Add Item Modal Popup =================
const AddItemModal = ({ item, onClose, onAdd }) => {
  const [selectedQty, setSelectedQty] = useState(
    item?.quantities
      ? item.quantities[0]
      : { label: "Default", price: item?.price || 0 }
  );

  return (
    <div className="max-w-md w-full bg-white rounded-2xl shadow-lg overflow-hidden relative">
      <button
        className="absolute top-2 right-2 bg-white rounded-full w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gray-800 shadow-md z-50"
        onClick={onClose}
      >
        ×
      </button>
      <img
        src={getImage(item)}
        alt={safeText(item?.itemName, "No name")}
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">
          {safeText(item?.itemName, "Unnamed Item")}
        </h2>
        <p className="text-gray-600 text-sm mt-1">
          {safeText(item?.description, "No description")}
        </p>

        {item?.quantities && (
          <div className="mt-4">
            <p className="text-sm font-medium mb-2">Quantity</p>
            <div className="flex gap-2 flex-wrap">
              {item.quantities.map((q) => (
                <button
                  key={q.label}
                  onClick={() => setSelectedQty(q)}
                  className={`px-3 py-1 border rounded-lg ${
                    selectedQty.label === q.label
                      ? "bg-green-600 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {safeText(q.label)}
                </button>
              ))}
            </div>
          </div>
        )}

        <p className="mt-4 font-bold text-gray-800 text-lg">
          ₹
          {safeText(
            selectedQty?.price?.toFixed?.(2) ?? selectedQty?.price,
            "0"
          )}
        </p>

        <button
          className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold"
          onClick={() => {
            onAdd({ ...item, selectedQty });
            onClose();
          }}
        >
          Add Item to Cart
        </button>
      </div>
    </div>
  );
};

// ================= Restaurant Detail Page =================
const RestaurantDetail = () => {
  const [restaurant, setRestaurant] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [addItemPopup, setAddItemPopup] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  const API_BASE = import.meta.env.VITE_API_BASE_URL;
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const cleanId = String(id).replace(/[^0-9a-zA-Z]/g, "");
        const res = await axios.get(`${API_BASE}/getrestaurants/${cleanId}`);

        console.log("🔥 Raw API Response:", res.data);

        if (res.data.success) {
          setRestaurant(res.data.data);
        }
      } catch (err) {
        console.error("❌ Error fetching restaurant:", err);
      }
    };

    fetchRestaurant();
  }, [id, API_BASE]);

  const handleAddToCart = (item) => {
    const newItem = {
      _id: item._id,
      name: item.name || item.itemName, // ✅ fallback to itemName
      price: item.selectedQty?.price || item.price,
      image: item.image || item.images?.[0] || "",
      restaurantId: restaurant?._id || restaurant?.id,
      qty: 1,
      restaurantName: restaurant?.name || "Unknown Restaurant",
    };

    const updatedCart = [...cartItems, newItem];
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };


  if (!restaurant) return <p className="p-4">Loading...</p>;

  return (
    <div>
      <Navbar />

      {/* Restaurant Header */}

      <div className="max-w-5xl mx-auto p-4 md:p-6 relative">
        <div className="bg-gray-300 shadow rounded-2xl p-5 md:p-8">
          <div className="bg-white shadow rounded-2xl p-5 md:p-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              {safeText(restaurant?.name, "Unnamed Restaurant")}
            </h1>
            <div className="flex flex-col md:flex-row md:items-center md:gap-4 mt-2 text-gray-700">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 text-green-600" />
                <span className="font-semibold">
                  {safeText(restaurant?.rating, "0")}
                </span>
                <span className="text-sm text-gray-500">
                  ({safeText(restaurant?.items?.length, "0")} items)
                </span>
              </div>
              <span className="text-sm md:text-base">
                ₹{safeText(restaurant?.priceForTwo, "N/A")} for two
              </span>
            </div>
            <p className="mt-2 text-sm text-gray-600">
              <span className="text-orange-600 font-medium">
                {safeText(restaurant?.cuisine, "Cuisine not available")}
              </span>
            </p>
            <p className="mt-1 text-sm text-gray-600">
              Outlet: {safeText(restaurant?.location, "Unknown")}
            </p>
          </div>
        </div>

        {/* Menu Section */}
        <div className="mt-8">
          <h2 className="text-lg font-bold text-gray-900">Menu</h2>
          <div className="mt-4 space-y-6">
            {restaurant?.items?.map((item, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row justify-between items-start bg-white rounded-xl shadow-sm border p-4 hover:shadow-md transition"
              >
                <div className="flex-1">
                  <h3 className="mt-1 font-semibold text-gray-800">
                    {safeText(item?.itemName, "Unnamed Item")}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {safeText(item?.description, "No description")}
                  </p>
                  <p className="text-sm font-medium mt-1">
                    ₹{safeText(item?.price, "N/A")}
                  </p>
                </div>
                <div className="mt-4 md:mt-0 md:ml-6 flex flex-col items-center">
                  <img
                    src={
                      item?.image
                        ? item.image
                        : item?.images?.[0] || "https://via.placeholder.com/150"
                    }
                    alt={safeText(item?.itemName, "No name")}
                    className="w-28 h-28 object-cover rounded-xl border cursor-pointer"
                    onClick={() => setSelectedItem(item)}
                  />
                  <button
                    className="mt-2 px-6 py-1.5 text-sm font-bold border border-green-600 text-green-600 rounded-lg hover:bg-green-600 hover:text-white transition"
                    onClick={() => setAddItemPopup(item)}
                  >
                    ADD
                  </button>
                  <span className="text-xs text-gray-400 mt-1">
                    Customisable
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Popups */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <FoodCard item={selectedItem} onClose={() => setSelectedItem(null)} />
        </div>
      )}
      {addItemPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 p-4">
          <AddItemModal
            item={addItemPopup}
            onAdd={handleAddToCart}
            onClose={() => setAddItemPopup(null)}
          />
        </div>
      )}

      {/* Cart Bottom Bar */}
      {cartItems.length > 0 && (
        <div className="fixed bottom-4 right-4 bg-white shadow-lg rounded-xl px-4 py-3 w-80 z-50 flex justify-between items-center">
          <div>
            <p className="font-semibold text-gray-800">
              {cartItems.length} item(s)
            </p>
            <p className="text-green-600 font-bold">
              ₹
              {cartItems
                .reduce(
                  (acc, i) =>
                    acc + (i.selectedQty ? i.selectedQty.price : i.price),
                  0
                )
                .toFixed(2)}
            </p>
          </div>
          <button
            className="bg-green-600 text-white px-4 py-2 w-full rounded-lg font-semibold hover:bg-green-700 ml-2"
            onClick={() => navigate("/checkout")}
          >
            View Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default RestaurantDetail; 