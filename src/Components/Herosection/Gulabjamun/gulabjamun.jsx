import React from "react";

const Gulabjamunrestaurants = [
  {
    id: 1,
    name: "Agarwal Khichadi Malharganj",
    img: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/wf6a7jokjcmqf7gmbwqj",
    offer: "₹75 OFF ABOVE ₹199",
    rating: 4.5,
    time: "10-15 mins",
    cuisine: "Indian",
    location: "Sarafa",
  },
  {
    id: 2,
    name: "Apna Sweets",
    img: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/rxazmyo9lbxhshub2jew",
    offer: "₹75 OFF ABOVE ₹199",
    rating: 4.7,
    time: "15-20 mins",
    cuisine: "North Indian, Sweets, Thali, Desserts",
    location: "Bhakt Prahlad Nagar",
  },
  {
    id: 3,
    name: "Shree Bhairavnath Misthan",
    img: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/mbbqfbspr8mpcxjz0dlm",
    offer: "₹75 OFF ABOVE ₹199",
    rating: 4.3,
    time: "15-20 mins",
    cuisine: "Sweets, Desserts, Beverages",
    location: "Sangam Nagar",
  },
  {
    id: 4,
    name: "The Indories Village",
    img: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/ef6c1d4990f68f6f8d5c",
    offer: "₹100 OFF ABOVE ₹999",
    rating: 3.8,
    time: "15-20 mins",
    cuisine: "Chinese, Indian",
    location: "Malharganj",
  },
  {
    name: "Shree Nath",
    image:
      "",
    rating: 3.7,
    time: "15-20 mins",
    category: "Snacks",
    location: "Sudama Nagar",
    offer: "10% OFF UPTO ₹40",
  },
  {
    name: "Baskin Robbins – Ice Cream",
    image:
      "",
    rating: 4.1,
    time: "15-20 mins",
    category: "Desserts, Ice Cream",
    location: "Kalani Nagar",
    offer: "ITEMS AT ₹97",
  },
  {
    name: "Mahadev Lassi",
    image:
      "",
    rating: 4.5,
    time: "20-25 mins",
    category: "Beverages, Snacks",
    location: "Rajwada",
    offer: "20% OFF UPTO ₹50",
  },
  {
    name: "Shri Shiv Shati Restaurant",
    image:
      "",
    rating: 4.4,
    time: "20-25 mins",
    category: "Chinese",
    location: "Sudama Nagar",
    offer: "",
  },
  {
    name: "Sweet Truth - Cake and Desserts",
    image:
      "",
    rating: 4.5,
    time: "25-30 mins",
    category: "Desserts, Bakery",
    location: "Sudama Nagar",
    offer: "ITEMS AT ₹59",
  },
  {
    name: "Atithi Dhaba",
    image:
      "",
    rating: 3.8,
    time: "25-30 mins",
    category: "North Eastern",
    location: "Sarafa",
    offer: "10% OFF UPTO ₹40",
  },
  {
    name: "Agrawal Sweets",
    image:
      "",
    rating: 4.7,
    time: "25-30 mins",
    category: "Sweets, Bakery, Snacks",
    location: "M.G Road",
    offer: "₹125 OFF ABOVE ₹299",
  },
  {
    name: "Hotel Malwa Country",
    image:
      "",
    rating: 3.9,
    time: "25-30 mins",
    category: "Indian",
    location: "Rajwada",
    offer: "ITEMS AT ₹29",
  },
];

const GulabJamun = () => {
  return (
    <div className="px-4 md:px-12 py-8">
      <h1 className="text-3xl font-bold mb-2">Gulab Jamun</h1>
      <p className="text-gray-600 mb-6">
        Sweeten your day with these delicious and syrupy Gulab Jamuns.
      </p>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Gulabjamunrestaurants.map((rest) => (
          <div
            key={rest.id}
            className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            {/* Image + Offer */}
            <div className="relative">
              <img
                src={rest.img}
                alt={rest.name}
                className="w-full h-40 object-cover"
              />
              <span className="absolute bottom-2 left-2 bg-black text-white text-xs px-2 py-1 rounded-lg">
                {rest.offer}
              </span>
            </div>

            {/* Details */}
            <div className="p-3">
              <h2 className="text-lg font-semibold">{rest.name}</h2>
              <div className="flex items-center text-sm text-gray-600 mt-1">
                <span className="text-green-600 font-bold mr-2">
                  ★ {rest.rating}
                </span>
                <span>{rest.time}</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">{rest.cuisine}</p>
              <p className="text-sm text-gray-500">{rest.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gulabjamunrestaurants;
