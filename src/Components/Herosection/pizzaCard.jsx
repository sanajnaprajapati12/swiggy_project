// src/App.jsx
import React from "react";
import Navbar from "./CardNAvbar";


export default function App() {
  const pizzaCard = [
    {
      image:
        "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/RX_THUMBNAIL/IMAGES/VENDOR/2025/8/8/40c690b3-9e6a-418f-8945-ef53ffff43cc_79502.JPG",
      offer: "₹50 OFF ABOVE ₹499",
      title: "Bikanervala",

      rating: "4.4",
      time: "35-40 mins",
      cuisine: "Indian, Continental, Chinese, Snacks",
      location: "THE ONE",
    },
    {
      image:
        "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/RX_THUMBNAIL/IMAGES/VENDOR/2025/6/9/41d2ced1-7522-4b0f-86bf-f778a193542a_581971.JPG",
      offer: "ITEMS AT ₹99",
      title: "Pizza Hut",
      rating: "4.1",
      time: "25-30 mins",
      cuisine: "Pizzas",
      location: "Kalani Nagar",
    },
    {
      image:
        "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/RX_THUMBNAIL/IMAGES/VENDOR/2024/9/3/df17cd54-f7de-46e6-b7b3-6d046f94887b_80652.jpg",
      offer: "ITEMS AT ₹69",
      title: "Domino's Pizza",
      rating: "4.2",
      time: "20-25 mins",
      cuisine: "Pizzas, Italian, Pastas, Desserts",
      location: "Village Sirpur",
    },
    {
      image:
        "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/FOOD_CATALOG/IMAGES/CMS/2024/10/18/f15949ee-3be0-42ac-9fc8-e35f6d68a698_bcda8e36-97be-4a77-9cd2-2c26f7fc1eb3.jpg",

      offer: "ITEMS AT ₹69",
      title: "Domino's Pizza",
      rating: "4.2",
      time: "20-25 mins",
      cuisine: "Pizzas, Italian, Pastas, Desserts",
      location: "Village Sirpur",
    },
    {
      image:
        "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/RX_THUMBNAIL/IMAGES/VENDOR/2025/2/15/38303126-e752-491b-abcf-bf6df837acd0_1045820.jpg",

      offer: "ITEMS AT ₹69",
      title: "Domino's Pizza",
      rating: "4.2",
      time: "20-25 mins",
      cuisine: "Pizzas, Italian, Pastas, Desserts",
      location: "Village Sirpur",
    },
    {
      image:
        "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/07709d331cd71ea41313b90264c55583",
      offer: "ITEMS AT ₹69",
      title: "Domino's Pizza",
      rating: "4.2",
      time: "20-25 mins",
      cuisine: "Pizzas, Italian, Pastas, Desserts",
      location: "Village Sirpur",
    },
    {
      image:
        "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/ngo7nevsfurcdxicbeuy",
      offer: "ITEMS AT ₹69",
      title: "Domino's Pizza",
      rating: "4.2",
      time: "20-25 mins",
      cuisine: "Pizzas, Italian, Pastas, Desserts",
      location: "Village Sirpur",
    },
    {
      image:
        "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/lrjidf0xiif47i9fgvfk",
      offer: "ITEMS AT ₹69",
      title: "Domino's Pizza",
      rating: "4.2",
      time: "20-25 mins",
      cuisine: "Pizzas, Italian, Pastas, Desserts",
      location: "Village Sirpur",
    },
    {
      image:
        "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/RX_THUMBNAIL/IMAGES/VENDOR/2024/6/28/23046c3d-48e9-42f4-ab89-7da4e434d0fd_917549.jpg",
      offer: "ITEMS AT ₹69",
      title: "Domino's Pizza",
      rating: "4.2",
      time: "20-25 mins",
      cuisine: "Pizzas, Italian, Pastas, Desserts",
      location: "Village Sirpur",
    },
    {
      image:
        "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/72af49a5ebf450824b8483634fd69ecf",
      offer: "ITEMS AT ₹69",
      title: "Domino's Pizza",
      rating: "4.2",
      time: "20-25 mins",
      cuisine: "Pizzas, Italian, Pastas, Desserts",
      location: "Village Sirpur",
    },
    {
      image:
        "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/uwbpnswfhrzfrbkvyhce",
      offer: "ITEMS AT ₹69",
      title: "Domino's Pizza",
      rating: "4.2",
      time: "20-25 mins",
      cuisine: "Pizzas, Italian, Pastas, Desserts",
      location: "Village Sirpur",
    },
    {
      image:
        "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/a32c82d2cb7b226375993aba43a8a967",
      offer: "ITEMS AT ₹69",
      title: "Domino's Pizza",
      rating: "4.2",
      time: "20-25 mins",
      cuisine: "Pizzas, Italian, Pastas, Desserts",
      location: "Village Sirpur",
    },
    {
      image:
        "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/76b8010a588629b5060f27dc192f2c64",
      offer: "ITEMS AT ₹69",
      title: "Domino's Pizza",
      rating: "4.2",
      time: "20-25 mins",
      cuisine: "Pizzas, Italian, Pastas, Desserts",
      location: "Village Sirpur",
    },
    {
      image:
        "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/76b8010a588629b5060f27dc192f2c64",
      offer: "ITEMS AT ₹69",
      title: "Domino's Pizza",
      rating: "4.2",
      time: "20-25 mins",
      cuisine: "Pizzas, Italian, Pastas, Desserts",
      location: "Village Sirpur",
    },
    {
      image:
        "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/d845f9d4caf98c894b742979deb0a55e",
      offer: "ITEMS AT ₹69",
      title: "Domino's Pizza",
      rating: "4.2",
      time: "20-25 mins",
      cuisine: "Pizzas, Italian, Pastas, Desserts",
      location: "Village Sirpur",
    },
    {
      image:
        "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/FOOD_CATALOG/IMAGES/CMS/2024/3/9/17d198ca-2138-4913-bc82-40e9df6677c0_41f8a45b-aaf3-4840-8cfd-7f0349f8b315_compressed",
      offer: "ITEMS AT ₹69",
      title: "Domino's Pizza",
      rating: "4.2",
      time: "20-25 mins",
      cuisine: "Pizzas, Italian, Pastas, Desserts",
      location: "Village Sirpur",
    },
    {
      image:
        "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/FOOD_CATALOG/IMAGES/CMS/2024/3/29/166f7b83-08d5-43b7-8600-6002f47d2fb9_2f63da53-a3f2-471e-a1a8-29592222ed9d.jpg",
      offer: "ITEMS AT ₹69",
      title: "Domino's Pizza",
      rating: "4.2",
      time: "20-25 mins",
      cuisine: "Pizzas, Italian, Pastas, Desserts",
      location: "Village Sirpur",
    },
    {
      image:
        "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/FOOD_CATALOG/IMAGES/CMS/2024/10/15/0d43a76d-6c25-4c74-a550-48daff153842_3d0c4f7b-0a89-41ce-a221-30e855f8d0d0.jpg_compressed",
      offer: "ITEMS AT ₹69",
      title: "Domino's Pizza",
      rating: "4.2",
      time: "20-25 mins",
      cuisine: "Pizzas, Italian, Pastas, Desserts",
      location: "Village Sirpur",
    },
    {
      image:
        "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/FOOD_CATALOG/IMAGES/CMS/2024/4/22/2c9a962e-82d4-46d1-85bb-1985d8558c24_ee24831e-e8a8-4baf-b82e-48385eb11ae0.jpg",
      offer: "ITEMS AT ₹69",
      title: "Domino's Pizza",
      rating: "4.2",
      time: "20-25 mins",
      cuisine: "Pizzas, Italian, Pastas, Desserts",
      location: "Village Sirpur",
    },
    {
      image:
        "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/72af49a5ebf450824b8483634fd69ecf",
      offer: "ITEMS AT ₹69",
      title: "Domino's Pizza",
      rating: "4.2",
      time: "20-25 mins",
      cuisine: "Pizzas, Italian, Pastas, Desserts",
      location: "Village Sirpur",
    },
    {
      image:
        "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/qvpfwq6dolarqkltcmoi",
      offer: "ITEMS AT ₹69",
      title: "Domino's Pizza",
      rating: "4.2",
      time: "20-25 mins",
      cuisine: "Pizzas, Italian, Pastas, Desserts",
      location: "Village Sirpur",
    },
    {
      image:
        "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/e9f88d8716c99368142ddc8a96dc775a",
      offer: "ITEMS AT ₹69",
      title: "Domino's Pizza",
      rating: "4.2",
      time: "20-25 mins",
      cuisine: "Pizzas, Italian, Pastas, Desserts",
      location: "Village Sirpur",
    },
    {
      image:
        "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/FOOD_CATALOG/IMAGES/CMS/2024/6/16/c0ec670a-de60-4ab0-8877-713c629a5b2a_ad0daf22-535a-4b97-9e9f-b2cc542c4df9.JPG",
      offer: "ITEMS AT ₹69",
      title: "Domino's Pizza",
      rating: "4.2",
      time: "20-25 mins",
      cuisine: "Pizzas, Italian, Pastas, Desserts",
      location: "Village Sirpur",
    },
    {
      image:
        "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/urgkmt9n6tgrz2pghsnc",
      offer: "ITEMS AT ₹69",
      title: "Domino's Pizza",
      rating: "4.2",
      time: "20-25 mins",
      cuisine: "Pizzas, Italian, Pastas, Desserts",
      location: "Village Sirpur",
    },
    {
      image:
        "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/e9f88d8716c99368142ddc8a96dc775a",
      offer: "ITEMS AT ₹69",
      title: "Domino's Pizza",
      rating: "4.2",
      time: "20-25 mins",
      cuisine: "Pizzas, Italian, Pastas, Desserts",
      location: "Village Sirpur",
    },
    {
      image:
        "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/FOOD_CATALOG/IMAGES/CMS/2025/3/25/ffc77896-480a-4546-b4bf-3f30c17dd3bb_295dddfd-1413-4db6-b7a2-ef5c3c897917.jpg",
      offer: "ITEMS AT ₹69",
      title: "Domino's Pizza",
      rating: "4.2",
      time: "20-25 mins",
      cuisine: "Pizzas, Italian, Pastas, Desserts",
      location: "Village Sirpur",
    },

    {
      image:
        "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/FOOD_CATALOG/IMAGES/CMS/2025/8/1/ed84626e-80f1-4847-b5f9-14169b6fee7f_c5473c64-84db-49be-b09f-a6ab3c7ee86a.jpg",
      offer: "ITEMS AT ₹69",
      title: "Domino's Pizza",
      rating: "4.2",
      time: "20-25 mins",
      cuisine: "Pizzas, Italian, Pastas, Desserts",
      location: "Village Sirpur",
    },
    {
      image:
        "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/taj5cocgejbv9f5uewwy",
      offer: "ITEMS AT ₹69",
      title: "Domino's Pizza",
      rating: "4.2",
      time: "20-25 mins",
      cuisine: "Pizzas, Italian, Pastas, Desserts",
      location: "Village Sirpur",
    },
    {
      image:
        "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/16f4e16c8c4c7be6f3e86105a03a111f",
      offer: "ITEMS AT ₹69",
      title: "Domino's Pizza",
      rating: "4.2",
      time: "20-25 mins",
      cuisine: "Pizzas, Italian, Pastas, Desserts",
      location: "Village Sirpur",
    },
    {
      image:
        "hthttps://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/FOOD_CATALOG/IMAGES/CMS/2024/4/5/9e3d4651-e4dd-469d-88e9-47f26eb2f2cd_02f1e43b-a8ac-4904-9abd-17027e27e180.jpg",
      offer: "ITEMS AT ₹69",
      title: "Domino's Pizza",
      rating: "4.2",
      time: "20-25 mins",
      cuisine: "Pizzas, Italian, Pastas, Desserts",
      location: "Village Sirpur",
    },
    {
      image:
        "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/RX_THUMBNAIL/IMAGES/VENDOR/2024/4/24/7efb6bdc-d001-438d-bf48-73e3cf50575f_875405.jpg",
      offer: "ITEMS AT ₹69",
      title: "Domino's Pizza",
      rating: "4.2",
      time: "20-25 mins",
      cuisine: "Pizzas, Italian, Pastas, Desserts",
      location: "Village Sirpur",
    },
    {
      image:
        "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/290b5e8e3800b0f44b2ba557ab96305f",
      offer: "ITEMS AT ₹69",
      title: "Domino's Pizza",
      rating: "4.2",
      time: "20-25 mins",
      cuisine: "Pizzas, Italian, Pastas, Desserts",
      location: "Village Sirpur",
    },
  ];

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50  pt-16 ">
        <h1 className="text-4xl font-bold mb-4  ml-20">Pizza</h1>
        <p className="text-black-500 mb-6 ml-20">
          Cheesilicious pizzas to make every day extraordinary.
        </p>

        <p className="text-4xl font-bold  ml-20">184 Restaurants to explore</p>
        {/* Responsive Grid */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-10 ml-20 mr-20 ">
          {pizzaCard.map((pizza, idx) => (
            <div
              key={idx}
              className=" rounded-2xl shadow overflow-hidden hover:shadow-lg transition duration-300"
            >
              <div className="relative">
                <img
                  src={pizza.image}
                  alt={pizza.title}
                  className="w-full h-40 object-cover "
                />
                {
                  <span className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                    {pizza.offer}
                  </span>
                }
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-lg">{pizza.title}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="text-green-600 font-semibold">
                    ★ {pizza.rating}
                  </span>
                  <span>• {pizza.time}</span>
                </div>
                <p className="text-gray-500 text-sm truncate">
                  {pizza.cuisine}
                </p>
                <p className="text-gray-400 text-xs">{pizza.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
