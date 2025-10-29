import React from "react";
import { NavLink } from "react-router-dom";

const foodData = [
  {
    name: "Pizza",
    img: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Pizza.png",
    link: "/pizzas",
  },
  {
    name: "Cake",
    img: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Cake.png",
    link: "/Cakes",
  },
  {
    name: "Dosa",
    img: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Dosa.png",
    link: "/Northindian",
  },
  {
    name: "Burger",
    img: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Burger.png",
    link: "/Burger",
  },
  {
    name: "North Indian",
    img: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Gulab%20Jamun.png",
    link: "/Gulabjamuns",
  },
  {
    name: "Ice Cream",
    img: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Ice%20Cream.png",
    link: "/IceCream",
  },
  {
    name: "Rolls",
    img: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Rolls.png",
    link: "/Rolls",
  },
  {
    name: "Pastry",
    img: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Pastry.png",
    link: "/Pastry",
  },
  {
    name: "Rasmalai",
    img: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Rasmalai.png",
    link: "/Rasmalai",
  },
  {
    name: "Noodles",
    img: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Noodles.png",
    link: "/Noodles",
  },
];

const FoodCategories = () => {
  return (
    <section className="py-4 sm:py-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 max-w-7xl mx-auto ">
      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 text-black-800 sm:text-left">
        Order our best food options
      </h2>

      {/* Grid for large screens (lg and above) */}
      <div className="hidden lg:grid grid-cols-5 gap-5">
        {foodData.map((item, index) => (
          <NavLink
            key={index}
            to={item.link}
            className="flex flex-col items-center text-center"
          >
            <img
              src={item.img}
              alt={item.name}
              className="w-32 h-32 xl:w-36 xl:h-36 2xl:w-40 2xl:h-40 object-contain hover:scale-105 transition-transform"
            />
            
          </NavLink>
        ))}
      </div>

      {/* Slider for smaller screens (<lg) */}
      <div className="lg:hidden flex gap-4 overflow-x-auto scrollbar-hide py-2">
        {foodData.map((item, index) => (
          <NavLink
            key={index}
            to={item.link}
            className="flex flex-col items-center min-w-[120px] sm:min-w-[140px]"
          >
            <img
              src={item.img}
              alt={item.name}
              className="w-24 sm:w-28 md:w-32 object-contain"
            />
            {/* <p className="mt-1 text-sm sm:text-base md:text-lg font-medium text-center">
              {item.name}
            </p> */}
          </NavLink>
        ))}
      </div>
    </section>
  );
};

export default FoodCategories;
