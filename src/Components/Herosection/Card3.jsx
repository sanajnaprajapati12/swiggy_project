import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

import "./index.css"
const baseURL = import.meta.env.VITE_API_BASE_URL;

const RestaurantsCard = () => {
  const [restaurants, setRestaurants] = useState([]);
  const navigate = useNavigate();
  const sliderRef = useRef(null);

  const fetchRestaurants = async () => {
    try {
      const res = await axios.post(
        `${baseURL}/getrestaurants`,
        {},
        { withCredentials: true }
      );
      if (res.data?.data) setRestaurants(res.data.data);
    } catch (err) {
      console.error("Error fetching restaurants:", err);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const scrollLeft = () =>
    sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
  const scrollRight = () =>
    sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });

  return (
      <div className="max-w-7xl mx-auto p-4 ">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Restaurants</h1>

      {restaurants.length > 0 ? (
        <>
          {/* Desktop & Tablet slider */}
          <div className="relative hidden md:block">
            <button
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10"
            >
              &#10094;
            </button>
            <button
              onClick={scrollRight}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10"
            >
              &#10095;
            </button>

            <div
              ref={sliderRef}
              className="flex gap-5 overflow-x-auto scroll-smooth scrollbar-hide py-2"
            >
              {restaurants.map((restro) => {
                const offerText = restro.offers?.join(", ") || "No offers";
                const city = restro.location?.city || "City not available";
                const category =
                  restro.category?.replace(/"/g, "") || "Category";
                const rating = restro.rating || 0;

                return (
                  <div
                    key={restro._id}
                    onClick={() => navigate(`/ResturentDetail/${restro._id}`)}
                    className="min-w-[200px] sm:min-w-[220px] md:min-w-[250px] lg:min-w-[280px] xl:min-w-[300px] 2xl:min-w-[320px] hover:scale-105 cursor-pointer shadow-xl rounded-xl p-2 sm:p-3 bg-white transition-transform duration-200 flex-shrink-0"
                  >
                    <img
                      src={restro.images?.[0] || "/placeholder.png"}
                      alt={restro.name}
                      className="rounded-xl w-full h-32 sm:h-36 md:h-40 lg:h-44 xl:h-48 2xl:h-52 object-cover"
                    />
                    <div className="mt-2 mx-1">
                      <div className="flex justify-between items-center">
                        <p className="font-semibold text-gray-800 text-sm sm:text-base">
                          {restro.name.replace(/"/g, "")}
                        </p>
                        <div className="flex items-center gap-1 bg-green-100 text-green-700 px-1 sm:px-2 rounded-md text-xs sm:text-sm">
                          <Star size={14} />
                          <span>{rating.toFixed(1)}</span>
                        </div>
                      </div>
                      <p className="text-gray-500 text-xs sm:text-sm">
                        {category}
                      </p>
                      <div className="text-gray-500 text-xs sm:text-sm mt-1 flex justify-between">
                        <p>{city}</p>
                        <p>
                          {restro.deliveryTime
                            ? `${restro.deliveryTime} min`
                            : "2 km"}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 mx-1 space-y-1">
                      <button className="bg-green-500 w-full rounded-md py-1 text-xs sm:text-sm font-bold text-white">
                        {offerText}
                      </button>
                      <button className="bg-green-200 w-full rounded-md py-1 text-xs sm:text-sm font-bold text-green-500">
                        {restro.isPureVeg ? "Pure Veg" : "Non-Veg"} |{" "}
                        {restro.isOpen ? "Open Now" : "Closed"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile horizontal scroll */}
          <div className="md:hidden overflow-x-auto scrollbar-hide py-2">
            <div className="flex gap-3 px-2">
              {restaurants.map((restro) => {
                const offerText = restro.offers?.join(", ") || "No offers";
                const city = restro.location?.city || "City not available";
                const category =
                  restro.category?.replace(/"/g, "") || "Category";
                const rating = restro.rating || 0;

                return (
                  <div
                    key={restro._id}
                    onClick={() => navigate(`/ResturentDetail/${restro._id}`)}
                    className="min-w-[160px] sm:min-w-[180px] hover:scale-105 cursor-pointer shadow-xl rounded-xl p-2 bg-white transition-transform duration-200 flex-shrink-0"
                  >
                    <img
                      src={restro.images?.[0] || "/placeholder.png"}
                      alt={restro.name}
                      className="rounded-xl w-full h-28 sm:h-32 object-cover"
                    />
                    <div className="mt-1 mx-1">
                      <div className="flex justify-between items-center">
                        <p className="font-semibold text-gray-800 text-xs sm:text-sm">
                          {restro.name.replace(/"/g, "")}
                        </p>
                        <div className="flex items-center gap-1 bg-green-100 text-green-700 px-1 rounded-md text-xs">
                          <Star size={12} />
                          <span>{rating.toFixed(1)}</span>
                        </div>
                      </div>
                      <p className="text-gray-500 text-xs">{category}</p>
                      <div className="text-gray-500 text-xs mt-1 flex justify-between">
                        <p>{city}</p>
                        <p>
                          {restro.deliveryTime
                            ? `${restro.deliveryTime} min`
                            : "2 km"}
                        </p>
                      </div>
                    </div>
                    <div className="mt-1 mx-1 space-y-1">
                      <button className="bg-green-500 w-full rounded-md py-1 text-xs font-bold text-white">
                        {offerText}
                      </button>
                      <button className="bg-green-200 w-full rounded-md py-1 text-xs font-bold text-green-500">
                        {restro.isPureVeg ? "Pure Veg" : "Non-Veg"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <p className="text-gray-500">Loading restaurants...</p>
      )}
    </div>
  );
};

export default RestaurantsCard;
