// src/components/RestaurantGrid.jsx
import React from "react";
import Navbar from "./CardNAvbar";
const data = [
  {
    id: 1,
    image:
      "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_900/COLLECTIONS/IMAGES/MERCH/2024/7/3/8c1232a7-c8f6-4dd4-95f8-89fe93233515_pic",
    name: "Theobroma",
    price: 290,
    rating: 4.5,
    time: "30-35 mins",
    category: "Bakery, Desserts, Beverages",
    location: "Darshan Mall, Race Course Rd",
  },
  {
    id: 2,
    image:
      "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/RX_THUMBNAIL/IMAGES/VENDOR/2025/4/24/2987a3e7-96e0-4bb1-b139-5fb6d5251d05_915793.JPG",
    name: "Baskin Robbins - Ice Cream",
    price: 79,
    rating: 4.1,
    time: "20-25 mins",
    category: "Desserts, Ice Cream",
    location: "Kalani Nagar",
  },
  {
    id: 3,

    image:
      "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/RX_THUMBNAIL/IMAGES/VENDOR/2025/6/19/b0ecfd0d-9cc3-4fb3-ab31-76fa789090e5_80653.jpg",
    name: "Sweet Truth - Cake",
    price: 59,
    rating: 4.5,
    time: "20-25 mins",
    category: "Desserts, Bakery",
    location: "Sudama Nagar",
  },
  {
    id: 4,

    image:
      "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/kt09zylanc2qd5eg116a",
    name: "Apna Sweets",
    offer: "₹75 OFF Above ₹199",
    rating: 4.7,
    time: "15-20 mins",
    category: "Sweets, Thali, Desserts",
    location: "Bhakt Prahlad Nagar",
  },
  {
    id: 5,
    image:
      "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/RX_THUMBNAIL/IMAGES/VENDOR/2025/8/14/38a6c0d1-b0e5-4b36-a179-687d0b2ef3f3_938373.JPG",
    name: "CakeZone Patisserie",
    rating: 4.2,
    time: "25-30 mins",
    category: "Bakery, Desserts, Beverages",
    location: "Sahjivan Nagar",
    offer: "65% OFF Upto ₹125",
    isAd: true,
  },
  {
    id: 6,
    image:
      "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/RX_THUMBNAIL/IMAGES/VENDOR/2025/2/12/1e19b24a-4f1f-4618-800f-ad31677576aa_606910.JPG",
    name: "Gourmet Ice Cream Cakes",
    rating: 4.6,
    time: "20-25 mins",
    category: "Ice Cream, Bakery",
    location: "Usha Nagar",
    offer: "50% OFF Upto ₹100",
  },
  {
    id: 7,
    image:
      "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/choco",
    name: "CAKE",
    rating: 3.1,
    time: "25-30 mins",
    category: "Bakery",
    location: "Sai Dwar Ke Samne",
    offer: "60% OFF Upto ₹120",
    isAd: true,
  },
  {
    id: 8,
    image:
      "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/1e40e4b15645a739cb0fb509dc2222b5",
    name: "The Dessert Zone",
    rating: 4.0,
    time: "20-25 mins",
    category: "Bakery, Ice Cream",
    location: "Sudama Nagar",
    offer: "20% OFF Above ₹1000",
  },
  {
    id: 9,
    image:
      "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/RX_THUMBNAIL/IMAGES/VENDOR/2025/1/17/19e32ceb-4a9f-4216-b915-edb303a4b20b_927089.JPG",
    name: "Cheesecake & Co.",
    rating: 4.5,
    time: "20-25 mins",
    category: "Bakery, Desserts",
    location: "Sudama Nagar",
    offer: "50% OFF Upto ₹100",
    isAd: true,
  },
  {
    id: 10,
    image:
      "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/xk83q5d9km2xr0mmvdkg",
    name: "Cupcake Bliss Cake & Desserts",
    rating: 4.1,
    time: "20-25 mins",
    category: "Bakery, Desserts",
    location: "Sudama Nagar",
    offer: "20% OFF Above ₹1000",
  },
  {
    id: 11,
    image:
      "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/peeiqdy1edchwtnqtxxq",
    name: "Jain Shree Sweets and Gajak",
    rating: 4.3,
    time: "20-25 mins",
    category: "Sweets",
    location: "Rajwada",
    price: 9,
  },
  {
    id: 12,

    name: "Poonam Patisserie",
    rating: "4.7",
    time: "30-35 mins",
    category: "Bakery",
    location: "Bhawar Kuan",
    img: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/RX_THUMBNAIL/IMAGES/VENDOR/2024/4/24/9d4c6563-18b0-4f5b-8ed0-904d1f05e64d_875507.jpg",
    offer: "",
  },
  {
    id: 13,
    name: "WarmOven Cake & Desserts",
    rating: "4.3",
    time: "20-25 mins",
    category: "Bakery, Desserts, Ice Cream",
    location: "Sudama Nagar",
    img: "https://via.placeholder.com/300x200.png?text=Cake+2",
    offer: "20% OFF ABOVE ₹1000",
  },
  {
    id: 14,
    name: "Lucky Bakers",
    rating: "4.4",
    time: "25-30 mins",
    category: "Pizzas, Bakery",
    location: "Sudama Nagar",
    img: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/x5urodolndmvnbfzmq4j",
    offer: "ITEMS AT ₹29",
  },
  {
    id: 15,
    name: "Krozzon By Masters Bakery",
    rating: "4.0",
    time: "20-25 mins",
    category: "Bakery, Desserts, Chinese",
    location: "Bhawar Kuan",
    img: "https://via.placeholder.com/300x200.png?text=Cake+4",
    offer: "₹75 OFF ABOVE ₹199",
  },
  {
    id: 16,
    name: "Krozzon By Masters Bakery",
    rating: "4.0",
    time: "20-25 mins",
    category: "Bakery, Desserts, Chinese",
    location: "Bhawar Kuan",
    img: "https://via.placeholder.com/300x200.png?text=Cake+4",
    offer: "₹75 OFF ABOVE ₹199",
  },
];

const Cakes = () => {
  return (
    <>
    <Navbar/>
      <div className="p-6 pt-16 mt-20 ml-20 mr-20">
        <div>
          <h1 className="text-4xl font-bold ">Cake</h1>
          <h2 className="text-2xl font-bold mb-4">Restaurants to Explore</h2>
        </div>

        {/* Responsive Grid */}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-10">
          {data.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer"
            >
              {/* Image */}
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-40 object-cover"
                />

                {/* Offer Badge */}
                {item.offer && (
                  <span className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-lg">
                    {item.offer}
                  </span>
                )}

                {/* Price Badge */}
                {item.price && (
                  <span className="absolute bottom-2 right-2 bg-white text-black text-xs px-2 py-1 rounded-lg">
                    Items at ₹{item.price}
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-3">
                {item.isAd && (
                  <span className="text-xs text-gray-500 font-medium">Ad</span>
                )}

                <h3 className="font-bold text-lg">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.category}</p>

                <div className="flex items-center justify-between text-sm mt-2">
                  <span className="flex items-center text-green-600 font-semibold">
                    ⭐ {item.rating}
                  </span>
                  <span className="text-gray-500">{item.time}</span>
                </div>

                <p className="text-xs text-gray-400 mt-1">{item.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Cakes;
