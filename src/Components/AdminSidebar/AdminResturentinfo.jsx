import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;

// Custom arrow component for react-slick
const CustomArrow = ({ onClick, icon }) => (
  <button
    onClick={onClick}
    className="bg-gray-200 text-gray-700 p-2 rounded-full hover:bg-gray-300"
  >
    {icon}
  </button>
);

const RestaurantInfoPage = () => {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch restaurants from backend
  const fetchRestaurants = async () => {
    try {
      const res = await axios.post(`${baseURL}/getrestaurants`);
      console.log("API Response:", res.data);

      if (Array.isArray(res.data)) {
        setRestaurants(res.data);
      } else if (Array.isArray(res.data.restaurants)) {
        setRestaurants(res.data.restaurants);
      } else if (Array.isArray(res.data.data)) {
        setRestaurants(res.data.data);
      } else {
        setRestaurants([]);
      }
    } catch (err) {
      console.error("Error fetching restaurants:", err);
      setRestaurants([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  // React Slick carousel settings
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

  if (loading) {
    return (
      <div className="text-center py-10">
        <p className="text-lg text-gray-600">Loading restaurants...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center sm:text-left">
        Restaurant Information
      </h1>

      {/* Highlight first restaurant */}
      {restaurants.length > 0 && (
        <div className="bg-white p-6 rounded-2xl shadow-lg grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Info */}
          <div className="space-y-3">
            <h2 className="text-xl font-semibold">{restaurants[0].name}</h2>
            <p>
              <span className="font-semibold">Address:</span>{" "}
              {restaurants[0].address || restaurants[0].location?.address}
            </p>
            <p>
              <span className="font-semibold">Phone:</span>{" "}
              {restaurants[0].phone || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Timings:</span>{" "}
              {restaurants[0].openingTime || "9:00 AM"} -{" "}
              {restaurants[0].closingTime || "11:00 PM"}
            </p>
          </div>

          {/* Google Map */}
          <div className="w-full h-64 md:h-full rounded-lg overflow-hidden shadow-md">
            <iframe
              title="restaurant-map"
              src={`https://www.google.com/maps?q=${encodeURIComponent(
                restaurants[0].address ||
                  restaurants[0].location?.address ||
                  "India"
              )}&output=embed`}
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      )}

      {/* Carousel of all restaurants */}
      <h2 className="text-2xl font-bold mb-6 text-center sm:text-left">
        Discover best restaurants on Dineout
      </h2>

      {restaurants.length === 0 ? (
        <p className="text-gray-500 text-center">
          No restaurants found. Please add one.
        </p>
      ) : (
        <Slider {...settings}>
          {restaurants.map((res) => (
            <div
              key={res._id}
              className="px-3 cursor-pointer"
              onClick={() => {
                localStorage.setItem("restaurantId", res._id);
                // You can navigate to restaurant page if needed:
                // navigate(`/restaurant/${res._id}`);
              }}
            >
              <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition">
                <img
                  src={
                    res.images?.[0] ||
                    res.image ||
                    "https://placehold.co/300x200"
                  }
                  alt={res.name}
                  className="h-48 md:h-56 w-full object-cover"
                />

                <div className="p-4 space-y-1">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold">{res.name}</h3>
                    <span className="text-sm bg-green-500 text-white px-2 py-0.5 rounded-full">
                      ⭐ {res.rating || "4.0"}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">
                    {res.cuisine || "Various cuisines"}
                  </p>
                  <p className="text-gray-500 text-xs break-words">
                    {res.address ||
                      res.location?.address ||
                      "Address not available"}
                  </p>
                </div>

                <div className="p-4 space-y-2">
                  {res.offers?.map((offer, i) => (
                    <div
                      key={i}
                      className={`${
                        i === 0
                          ? "bg-green-100 text-green-800"
                          : "bg-green-200 text-green-900"
                      } font-medium text-sm px-3 py-1 rounded-lg`}
                    >
                      {offer}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default RestaurantInfoPage;
