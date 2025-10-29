import React from "react";

import Navbar from "../CardNAvbar";

const restaurants = [
  {
    id: 1,
    name: "The Good Bowl",
    rating: 4.3,
    time: "35-40 mins",
    cuisines: "Biryani, North Indian, Pastas, Punjabi",
    location: "Sudama Nagar",
    pricetext: "ITEMS AT ₹119",
    img: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/RX_THUMBNAIL/IMAGES/VENDOR/2024/11/15/a7b57969-83b7-46f8-9742-67e8e9d52eba_156145.jpg",
  },

  {
    img: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/nvebstizpqoxu4crvyq",
    id: 2,
    name: "Karunawat Bhojan Prasadi",
    rating: 4.2,
    time: "25-30 mins",
    cuisines: "North Indian, Chinese, South Indian",
    location: "Sarafa",
    pricetext: "ITEMS AT ₹79",
  },
  {
    id: 3,
    img: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/2b579171cefc545ce6479e21c0016798",

    name: "Behrouz Biryani",
    rating: 4.4,
    time: "35-40 mins",
    cuisines: "Biryani, Kebabs, Mughlai",
    location: "Sudama Nagar",
    pricetexttextText: "ITEMS AT ₹69",
  },
  {
    id: 4,
    name: "Shree Bhairavnath Misthan",
    rating: 4.3,
    time: "20-25 mins",
    cuisines: "Sweets, Desserts, Beverages",
    location: "Sangam Nagar",
    pricetext: "₹75 OFF ABOVE ₹199",
    img: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/ogoonksdxxzf72hzkypx",
  },
  {
    img: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/hqjlmcqgu7yndr8gtuhp",
    name: "LunchBox – Meals and Thalis",
    rating: "4.4",
    time: "35-40 mins",
    cuisines: "Thalis, North Indian, Biryani",
    location: "Sudama Nagar",
    pricetext: 99,
  },
  {
    img: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/g5txnz35wlrgbskk3r8y",
    name: "Madina Hotel",

    rating: "4.3",
    time: "35-40 mins",
    cuisine: "Biryani, Kebabs, Mughlai",
    locations: "Sudama Nagar",
    pricetext: 229,
  },
  {
    img: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/FOOD_CATALOG/IMAGES/CMS/2024/11/15/41ccaac7-c0e3-4310-b6a5-8c18e51bef4e_1fe268b9-efbd-4c58-9088-ed3117142813.jpg",
    name: "Nafees Restaurant",
    rating: "4.3",
    time: "40-45 mins",
    cuisines: "Mughlai, Biryani, North Indian",
    location: "Bhawar Kuan",
    pricetext: 19,
  },
  {
    img: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/ysaigbqgjsrslqnbm9xu",
    name: "Mahadev Restaurant",
    rating: "4.4",
    time: "20-25 mins",
    cuisines: "Chinese, Thalis, Punjabi",
    location: "MG Road",
    pricetext: 49,
  },
  {
    img: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/RX_THUMBNAIL/IMAGES/VENDOR/2024/5/31/feb5c223-5bb4-49d4-ace3-d507ebff68d7_901682.JPG",
    nmae: "Tej Patta",
    rating: "4.8",
    time: "45-50 mins",
    cuisines: "Rajasthani, North Indian",
    location: "Sudama Nagar",
    offer: "15% OFF",
  },
  {
    img: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/kdbuuhsk3yh0j8ubtl1a",
    name: "Jain Shree Sweets and Gajak",
    rating: "4.3",
    time: "20-25 mins",
    cuisines: "Sweets",
    location: "Rajwada",
    pricetext: 9,
  },
  {
    img: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/w2kpjav095uw3cyvdj2r",
    name: "Pishori Restaurant",
    rating: "4.3",
    time: "25-30 mins",
    cuisines: "North Indian, Mughlai, Kebabs",
    location: "MG Road",
    offer: "₹75 OFF ABOVE ₹199",
  },
  {
    img: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/RX_THUMBNAIL/IMAGES/VENDOR/2024/5/7/02cb861c-1ce1-4c71-b6c9-c32fb0fee821_222259.jpg",
    name: "The Lunch Time",
    rating: "3.6",
    time: "35-40 mins",
    cuisines: "North Indian, Thalis, Combos",
    location: "Sarafa",
    pricetext: 89,
  },
  {
    img: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/RX_THUMBNAIL/IMAGES/VENDOR/2024/5/7/02cb861c-1ce1-4c71-b6c9-c32fb0fee821_222259.jpg",
    name: "Gurukripa Restaurant",
    rating: "4.4",
    time: "30-35 mins",
    cuisines: "North Indian, Thalis, Fast Food",
    location: "Sarafa",
    offer: "₹150 OFF ABOVE ₹299",
  },
  {
    img: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/RX_THUMBNAIL/IMAGES/VENDOR/2025/4/21/0f97b484-7fcb-42f1-a616-e6e4c220c9f8_1082981.JPG",
    name: "Annapurna Bhojnalaya",
    rating: "3.9",
    time: "20-25 mins",
    cuisines: "Indian, Thalis",
    location: "Sarafa",
    offer: "50% OFF",
  },

  {
    img: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/FOOD_CATALOG/IMAGES/CMS/2025/8/6/36b1b70f-bc5f-4e8d-b6cb-149dfce3c8a7_2ea208d3-62c9-47dd-bcbe-86f18fbb74e5.jpeg",
    name: "Paratha House",
    rating: "4.7",
    time: "40-45 mins",
    cuisines: "Home Food, Fast Food, Cafe",
    location: "Sarafa",
  },
  {
    img: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/frvtqydavwacmclhicsw",
    name: "Desi Tadka",
    rating: "4.2",
    time: "20-25 mins",
    cuisines: "Combos, North Indian, Biryani",
    location: "Kanyakubj Nagar",
    pricetext: 9,
  },
  {
    img: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/dtzeql1lso7mhexcek4s",
    name: "Rambabu Ke Parathe",
    rating: "4.6",
    time: "45-50 mins",
    cuisines: "Chaat, Thalis, Indian",
    location: "New Palasia",
    offer: "20% OFF Upto ₹100",
  },
  {
    img: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/FOOD_CATALOG/IMAGES/CMS/2024/5/7/a7ce99e4-5fea-4e40-a5f6-bf0041b9046d_20178712-0633-4647-9312-10257a25cf23.jpg",
    name: "Maheshwari Bhel & Gathiya",
    rating: "4.1",
    time: "20-25 mins",
    cuisines: "Chaat, Snacks",
    location: "Sarafa",
    offer: "10% OFF Upto ₹40",
  },
  {
    img: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/FOOD_CATALOG/IMAGES/CMS/2025/6/19/731e0ac6-96b1-43f5-8e31-035e02bd31a8_9eaf4e91-dfcf-4d9b-9d52-61c11d16c9d4.JPG",
    name: "Hunger Brunch",
    rating: "3.4",
    time: "40-45 mins",
    cuisines: "Chinese, Pizzas, Fast Food",
    location: "Gandhi Nagar",
  },
  {
    img: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/45192b4482bcca9b2e10d14c14cfcaca",
    name: "Arihant Dal Bati",
    rating: "4.0",
    time: "20-25 mins",
    cuisines: "Thalis, Rajasthani",
    location: "Sarafa",
    offer: "₹75 OFF ABOVE ₹199",
  },
  {
    img: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/RX_THUMBNAIL/IMAGES/VENDOR/2025/6/21/f4dd6a6b-84b3-4431-a9ae-2e4e98aa63bc_1126354.jpg",
    name: "Shree Jee Cafe And Fast Food",
    rating: "4.2",
    time: "35-40 mins",
    cuisines: "Chinese, South Indian, Pizzas",
    location: "New Palasia",
  },
  {
    img: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/igrwplj13sepu899gfwz",
    name: "Maharaja Kachori Corner",

    rating: "4.4",
    time: "25-30 mins",
    cuisines: "Street Food, Fast Food, Snacks",
    location: "Mth Compound",
    pricetext: 9,
  },
];

const RestaurantList = () => {
  return (
    <>
      <Navbar />
      <div className="p-4 max-w-7xl mx-auto pt-16 mt-20 ">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold ">North Indian</h1>
            <p className="text-gray-500">
              Indulge with the best of North Indian cuisines.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
            <button className="px-4 py-2 border rounded-full hover:bg-gray-100">
              Filter
            </button>
            <button className="px-4 py-2 border rounded-full hover:bg-gray-100">
              Sort By
            </button>
            <button className="px-4 py-2 border rounded-full hover:bg-gray-100">
              10 Mins Delivery
            </button>
          </div>
        </div>

        {/* Restaurant count */}
        <h2 className="text-xl font-semibold mb-4">
          {restaurants.length} Restaurants to explore
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {restaurants.map((res) => (
            <div
              key={res.id}
              className="border rounded-xl overflow-hidden shadow hover:shadow-lg transition"
            >
              <div className="relative">
                <img
                  src={res.img}
                  alt={res.name}
                  className="w-full h-40 object-cover"
                />
                <span className="absolute bottom-2 left-2 bg-black text-white text-xs px-2 py-1 rounded">
                  {res.pricetext}
                </span>
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-lg">{res.name}</h3>
                <div className="flex items-center text-sm text-gray-600 mt-1">
                  <span className="text-green-600 font-bold">
                    ★ {res.rating}
                  </span>
                  <span className="mx-2">•</span>
                  <span>{res.time}</span>
                </div>
                <p className="text-gray-500 text-sm truncate">{res.cuisines}</p>
                <p className="text-gray-400 text-xs">{res.location}</p>
                <p className="text-gray-400 text-xs">{res.offer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default RestaurantList;
