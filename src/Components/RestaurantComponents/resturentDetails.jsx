// import React, { useState } from "react";
// import { useLocation, useParams, useNavigate } from "react-router-dom";
// import { Phone, MapPin, Plus } from "lucide-react";
// import Navbar from "./NavbarResturent";

// const RestaurantDetails = () => {
//   const { id } = useParams(); // restaurant id from URL
//   const { state } = useLocation(); // restaurant data passed from navigate
//   const navigate = useNavigate();

//   if (!state) {
//     return (
//       <div className="p-10 text-center">
//         <p className="text-lg text-gray-600">Restaurant not found.</p>
//         <button
//           onClick={() => navigate("/")}
//           className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
//         >
//           Back to Home
//         </button>
//       </div>
//     );
//   }

//   const offers = [
//     {
//       title: "Flat 10% Cashback",
//     //   imges:
//     //     "https://dineout-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/MARKETING_BANNERS/IMAGES/OFFERS/2025/6/1/7252394d-3011-4adb-a188-9a65af839ed9_",
//       desc: "Above ₹100",
//     },
//     {
//       title: "10% off upto ₹150",
//     //   imges: "https://dineout-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/MARKETING_BANNERS/IMAGES/OFFERS/2025/7/31/c41a5d9a-ee5f-4c95-8a39-2b2536ab5e32_",
//       desc: "Use SAVE150UPI | Above ₹1000",
//     },
//     {
//       title: "10% off",

//     //   imges: "https://dineout-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/MARKETING_BANNERS/IMAGES/OFFERS/2025/7/30/fc76e67b-3865-4db2-8be9-c9d6bf0fa83e_",

//       desc: "Use HDFC Cards",
//     },
//   ];

//   const menu = [
//     {
//       category: "Pizzas",
//       items: [
//         {
//           name: "Margherita Pizza",
//           price: 299,
//           img: "https://images.dominos.co.in/new_margherita_2502.jpg",
//         },
//         {
//           name: "Farmhouse Pizza",
//           price: 399,
//           img: "https://images.dominos.co.in/farmhouse.png",
//         },
//       ],
//     },
//     {
//       category: "Burgers",
//       items: [
//         {
//           name: "Veggie Burger",
//           price: 149,
//           img: "https://www.kindpng.com/picc/m/404-4042710_big-king-veg-veg-burger-png-transparent-png.png",
//         },
//         {
//           name: "Cheese Burger",
//           price: 199,
//           img: "https://www.pngall.com/wp-content/uploads/4/Cheeseburger.png",
//         },
//       ],
//     },
//     {
//       category: "Drinks",
//       items: [
//         {
//           name: "Coke (500ml)",
//           price: 49,
//           img: "https://www.pngall.com/wp-content/uploads/2016/04/Coca-Cola-Free-PNG-Image.png",
//         },
//         {
//           name: "Pepsi (500ml)",
//           price: 49,
//           img: "https://www.pngmart.com/files/22/Pepsi-PNG-Isolated-Photo.png",
//         },
//       ],
//     },
//   ];

//   const [cart, setCart] = useState([]);

//   const addToCart = (item) => {
//     setCart([...cart, item]);
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="max-w-7xl mx-auto p-6">
//         {/* Header */}
//         <h1 className="text-4xl font-bold mb-2">{state?.name || "Tinku's"}</h1>
//         <div className="flex space-x-8 border-b pb-2 mb-4">
//           <button className="font-semibold text-orange-500 border-b-2 border-orange-500">
//             Dineout
//           </button>
//           <button className="text-gray-600 hover:text-black text-xl">
//             Photos
//           </button>
//           <button className="text-gray-600 hover:text-black text-xl">
//             Menu
//           </button>
//         </div>

//         {/* Banner */}
//         <div className="relative rounded-2xl overflow-hidden shadow-md">
//           <img
//             src={
//               state?.image ||
//               "https://dineout-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/DINEOUT_ALL_RESTAURANTS/IMAGES/RESTAURANT_IMAGE_SERVICE/2025/7/18/83d275b6-fb17-438f-a27f-00881620c134_image16675ceb225e74710a2420b16bcc927e7.JPG"
//             }
//             alt="Restaurant Banner"
//             className="w-full h-64 object-cover"
//           />
//           <div className="absolute top-6 left-6 bg-white w-[600px]  p-7 rounded-xl shadow-md max-w-sm">
//             <p className="text-sm text-gray-800 font-semibold">
//               ⭐ 4 • 4K+ in Google • ₹400 for two
//             </p>
//             <p className="text-sm text-gray-500 mt-1">Fast Food</p>
//             <p className="text-sm text-gray-600 mt-1">
//               📍 Bhawarkua Main Road, Bhawar Kuwa, Square...
//             </p>
//             <p className="text-green-600 font-semibold mt-2">
//               Open now • OPEN TILL 2AM
//             </p>
//             <div className="flex space-x-4 mt-3">
//               <button className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-xl shadow hover:bg-orange-600">
//                 <Phone size={16} className="mr-2" /> Call
//               </button>
//               <button className="flex items-center px-4 py-2 bg-gray-200 rounded-xl hover:bg-gray-300">
//                 <MapPin size={16} className="mr-2" /> Direction
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Offers Section */}
//         <h2 className="text-xl font-bold mt-8 mb-4">Additional Offers</h2>
//         <div className="flex gap-4 overflow-x-auto scrollbar-hide ">
//           {offers.map((offer, index) => (
//             <div
//               key={index}
//               className="min-w-[200px] bg-orange-50 border border-orange-200 rounded-xl p-4 shadow hover:shadow-md"
//             >
//               <img src="h-10 w-10 ">{offer.imges}</img>
//               <h3 className="text-orange-600 font-semibold">{offer.title}</h3>
//               <p className="text-sm text-gray-700">{offer.desc}</p>
//             </div>
//           ))}
//         </div>

//         {/* Menu Section */}

//         {/* Back button */}
//         {/* <button
//           onClick={() => navigate("/")}
//           className="mt-6 bg-gray-800 text-white px-6 py-2 rounded-lg"
//         >
//           🔙 Back to Restaurants
//         </button> */}
//         <div>
//           <h1 className="text-4xl text-black-500 fot-bold mt-20">Food</h1>
//           <div className="flex w-full">
//             <div className="flex">
//               <img
//                 className=" w-100 h-100"
//                 src="https://dineout-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/DINEOUT_ALL_RESTAURANTS/IMAGES/RESTAURANT_IMAGE_SERVICE/2025/7/18/16dae4fb-3ddc-4229-b4ac-af1e780c5c3b_image7c6d4b149a57e40bb9019e91f8d9269d5.JPG"
//               ></img>
//             </div>
//             <div>
//               <img
//                 className=" w-100 h-100 "
//                 src="https://dineout-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/DINEOUT_ALL_RESTAURANTS/IMAGES/RESTAURANT_IMAGE_SERVICE/2025/7/18/38b5b4a8-b19e-4b66-aeae-29168e3d1c25_image91aebfe7cb01d4723b1932440605bb43d.JPG"
//               ></img>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default RestaurantDetails;
