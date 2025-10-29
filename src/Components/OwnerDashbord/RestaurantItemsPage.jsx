import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const RestaurantItemsPage = () => {
  const { id } = useParams(); // 👈 restaurantId from URL
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    try {
      const res = await axios.post(`${baseURL}/getItemById/${id}`);
      console.log("Items API Response:", res.data);

      if (Array.isArray(res.data)) {
        setItems(res.data);
      } else if (Array.isArray(res.data.items)) {
        setItems(res.data.items);
      } else if (Array.isArray(res.data.data)) {
        setItems(res.data.data);
      } else {
        setItems([]);
      }
    } catch (err) {
      console.error("Error fetching items:", err);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-lg text-gray-600 animate-pulse">
          Loading delicious items...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">
        🍴 Restaurant Menu
      </h1>

      {items.length === 0 ? (
        <p className="text-gray-500 text-center text-lg">
          No items found for this restaurant.
        </p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {items.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl hover:scale-[1.02] transition transform cursor-pointer"
            >
              {/* Image */}
              <div className="relative">
                <img
                  src={item.image || "https://placehold.co/400x300"}
                  alt={item.name}
                  className="h-44 w-full object-cover"
                />
                {/* Price badge */}
                <span className="absolute bottom-2 right-2 bg-gradient-to-r from-pink-500 to-red-500 text-white text-sm font-semibold px-3 py-1 rounded-full shadow-lg">
                  ₹{item.price}
                </span>
              </div>

              {/* Content */}
              <div className="p-4 space-y-2">
                <h3 className="text-lg font-bold text-gray-900 truncate">
                  {item.name}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-2">
                  {item.description || "A delicious dish to try!"}
                </p>

                {/* Veg/Non-Veg Indicator */}
                <div className="flex items-center justify-between mt-3">
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      item.isVeg
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.isVeg ? "Veg 🌱" : "Non-Veg 🍗"}
                  </span>

                  {/* Add Button */}
                  <button className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-3 py-1 rounded-lg shadow-md">
                    ADD +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RestaurantItemsPage;
