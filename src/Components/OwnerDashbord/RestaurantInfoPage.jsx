import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const CustomArrow = ({ onClick, icon }) => (
  <button
    onClick={onClick}
    className="bg-gray-200 text-gray-700 p-2 rounded-full hover:bg-gray-300"
  >
    {icon}
  </button>
);

const RestaurantInfoPage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(null);

  // Fetch Restaurants
  const fetchRestaurants = async () => {
    try {
      const res = await axios.post(`${baseURL}/getrestaurants`);
      if (Array.isArray(res.data)) setRestaurants(res.data);
      else if (Array.isArray(res.data.restaurants))
        setRestaurants(res.data.restaurants);
      else if (Array.isArray(res.data.data)) setRestaurants(res.data.data);
      else setRestaurants([]);
    } catch (err) {
      console.error("Error fetching restaurants:", err);
      setRestaurants([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch Orders
  const fetchOrders = async (restaurantId) => {
    if (!restaurantId) return;
    setOrdersLoading(true);
    try {
      const res = await axios.get(
        `${baseURL}/restaurant-order/${restaurantId}`
      );
      if (res.data.success && Array.isArray(res.data.orders))
        setOrders(res.data.orders);
      else setOrders([]);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setOrders([]);
    } finally {
      setOrdersLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  useEffect(() => {
    if (selectedRestaurantId) fetchOrders(selectedRestaurantId);
  }, [selectedRestaurantId]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 400,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <CustomArrow icon={<FaArrowRight />} />,
    prevArrow: <CustomArrow icon={<FaArrowLeft />} />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  if (loading)
    return (
      <p className="text-center py-10 text-gray-600">Loading restaurants...</p>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center sm:text-left">
        Restaurant Information
      </h1>

      {/* Restaurant Carousel */}
      {restaurants.length === 0 ? (
        <p className="text-gray-500 text-center">No restaurants found.</p>
      ) : (
        <Slider {...settings}>
          {restaurants.map((res) => (
            <div
              key={res._id}
              className={`px-2 sm:px-3 cursor-pointer transition transform hover:scale-105 ${
                selectedRestaurantId === res._id ? "opacity-70" : ""
              }`}
              onClick={() => setSelectedRestaurantId(res._id)}
            >
              <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                <img
                  src={
                    res.images?.[0] ||
                    res.image ||
                    "https://placehold.co/300x200"
                  }
                  alt={res.name}
                  className="h-40 sm:h-48 md:h-56 w-full object-cover"
                />
                <div className="p-3 sm:p-4 space-y-1">
                  <div className="flex justify-between items-center">
                    <h3 className="text-base sm:text-lg font-bold">
                      {res.name}
                    </h3>
                    <span className="text-xs sm:text-sm bg-green-500 text-white px-2 py-0.5 rounded-full">
                      ⭐ {res.rating || "4.0"}
                    </span>
                  </div>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    {res.cuisine || "Various cuisines"}
                  </p>
                  <p className="text-gray-500 text-[10px] sm:text-xs break-words">
                    {res.address ||
                      res.location?.address ||
                      "Address not available"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      )}

      {/* Orders Section */}
      {selectedRestaurantId && (
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Orders for this Restaurant
          </h2>

          {ordersLoading ? (
            <p className="text-gray-500">Loading orders...</p>
          ) : orders.length === 0 ? (
            <p className="text-gray-500">
              No orders found for this restaurant.
            </p>
          ) : (
            <>
              {/* Table view for medium+ screens */}
              <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full border border-gray-200 bg-white rounded-xl shadow-md">
                  <thead>
                    <tr className="bg-gray-100 text-left text-gray-700">
                      <th className="py-3 px-4 border-b">Order ID</th>
                      <th className="py-3 px-4 border-b">Customer Name</th>
                      <th className="py-3 px-4 border-b">Items</th>
                      <th className="py-3 px-4 border-b">Total Price</th>
                      <th className="py-3 px-4 border-b">Date</th>
                      <th className="py-3 px-4 border-b">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr
                        key={order._id}
                        className="hover:bg-gray-50 transition text-sm"
                      >
                        <td className="py-3 px-4 border-b">{order._id}</td>
                        <td className="py-3 px-4 border-b">
                          {order.userId.name || "N/A"}
                        </td>
                        <td className="py-3 px-4 border-b">
                          <ul className="list-disc list-inside">
                            {order.items?.map((item, i) => (
                              <li key={i}>
                                {item.name} × {item.quantity}
                              </li>
                            ))}
                          </ul>
                        </td>
                        <td className="py-3 px-4 border-b">
                          ₹{order.totalAmount}
                        </td>
                        <td className="py-3 px-4 border-b">
                          {order.createdAt
                            ? new Date(order.createdAt).toLocaleDateString(
                                "en-GB",
                                {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                }
                              )
                            : "N/A"}
                        </td>
                        <td className="py-3 px-4 border-b">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              order.status === "Completed"
                                ? "bg-green-100 text-green-700"
                                : order.status === "Pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Card view for mobile */}
              <div className="md:hidden space-y-4">
                {orders.map((order) => (
                  <div
                    key={order._id}
                    className="bg-white shadow-md rounded-xl p-4 space-y-2"
                  >
                    <div className="flex justify-between text-sm">
                      <span className="font-semibold">Order ID:</span>
                      <span>{order._id}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="font-semibold">Customer:</span>
                      <span>{order.userId.name || "N/A"}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-sm">Items:</span>
                      <ul className="list-disc list-inside ml-2">
                        {order.items?.map((item, i) => (
                          <li key={i}>
                            {item.name} × {item.quantity}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="font-semibold">Total:</span>
                      <span>₹{order.totalAmount}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="font-semibold">Date:</span>
                      <span>
                        {order.createdAt
                          ? new Date(order.createdAt).toLocaleDateString(
                              "en-GB"
                            )
                          : "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="font-semibold">Status:</span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          order.status === "Completed"
                            ? "bg-green-100 text-green-700"
                            : order.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default RestaurantInfoPage;
