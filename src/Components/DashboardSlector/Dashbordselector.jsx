import React, { useState } from "react";

import { GoArrowUpRight } from "react-icons/go";
import { HiLocationMarker } from "react-icons/hi";
import { FiSearch } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Footer from "../Footer";
import FoodCategories from "../Herosection/Card";
import GrocerySlider from "../Herosection/Card2";
import RestaurantCardSlider from "../Herosection/Card3";
import SignUpModal from "../Signup";
import Login from "../Login";
import "./logos.css";

function Dashboardselector() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const { user, isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleDashboardClick = (role) => {
    if (!isAuthenticated) {
      setShowLogin(true);
      return;
    }
    const routes = {
      user: "/UserDashboard",
      owner: "/dashboard",
      admin: "/admin",
    };
    navigate(routes[role] || "/login");
  };

  const DashboardButton = ({ role, label }) => (
    <button
      onClick={() => handleDashboardClick(role)}
      className="bg-black text-white px-4 py-2 rounded-2xl hover:opacity-90 text-sm sm:text-base"
    >
      {label}
    </button>
  );

  const renderDashboardButtons = () => {
    if (!isAuthenticated) {
      return (
        <div className="flex flex-col sm:flex-row gap-2">
          <DashboardButton role="user" label="User Dashboard" />
          <DashboardButton role="owner" label="Owner Dashboard" />
          <DashboardButton role="admin" label="Admin Dashboard" />
        </div>
      );
    }
    if (user?.role === "user")
      return <DashboardButton role="user" label="User Dashboard" />;
    if (user?.role === "owner")
      return <DashboardButton role="owner" label="Owner Dashboard" />;
    if (user?.role === "admin")
      return <DashboardButton role="admin" label="Admin Dashboard" />;
    return null;
  };

  return (
    <>
      {/* Header */}
      <header className="bg-blue-400 shadow-md relative overflow-hidden">
        <div className="w-full flex items-center justify-between py-4 px-4 md:px-8">
          <div className="logo text-white text-2xl font-bold">
            Bite<span className="rush">Rush</span>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
            <a
              href="#"
              className="text-white hover:underline font-bold text-sm sm:text-base"
            >
              Swiggy Corporate
            </a>
            <a
              href="#"
              className="text-white hover:underline font-bold text-sm sm:text-base"
            >
              Partner with us
            </a>
            <button className="flex items-center gap-2 border border-white text-white px-4 sm:px-5 py-2 sm:py-3 font-bold rounded-2xl hover:bg-white hover:text-orange-600 text-sm sm:text-base">
              Get the App <GoArrowUpRight />
            </button>
            {renderDashboardButtons()}
          </nav>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              <svg
                className="w-7 h-7 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 8h16M4 16h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-orange-600 px-4 pb-4 space-y-2">
            <a href="#" className="block text-white py-2 hover:underline">
              Swiggy Corporate
            </a>
            <a href="#" className="block text-white py-2 hover:underline">
              Partner with us
            </a>
            <button className="flex items-center gap-2 border border-white text-white px-5 py-3 font-bold rounded-2xl hover:bg-white hover:text-orange-600">
              Get the App <GoArrowUpRight />
            </button>
            {renderDashboardButtons()}
          </div>
        )}

        {/* Hero Section */}
        <div className="relative flex flex-col lg:flex-row items-center justify-center min-h-[600px] lg:min-h-[700px] px-4 lg:px-0">
          <img
            className="hidden lg:block absolute -left-6 md:-left-20 w-[250px] sm:w-[300px] lg:w-[350px] h-auto object-contain"
            src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/testing/seo-home/Veggies_new.png"
            alt="Veggies"
          />
          <div className="flex flex-col justify-center items-center text-center z-10 px-2 sm:px-4 lg:px-0 w-full">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-snug">
              Order food & groceries. Discover <br /> best restaurants. BiteRush
              it!
            </h1>
            <div className="mt-6 flex flex-col sm:flex-row justify-center gap-2 sm:gap-3 w-full max-w-[800px]">
              <div className="relative w-full sm:w-[45%]">
                <HiLocationMarker className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-600 text-xl" />
                <input
                  type="text"
                  placeholder="Enter your location"
                  className="pl-10 pr-4 py-2 sm:py-3 w-full rounded-xl text-base sm:text-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div className="relative w-full sm:w-[55%]">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                <input
                  type="text"
                  placeholder="Search for restaurants, items or more"
                  className="pl-10 pr-4 py-2 sm:py-3 w-full rounded-xl text-base sm:text-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            <div className="flex gap-3 sm:gap-4 overflow-x-auto mt-6 px-2 md:px-0">
              {[
                "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/23/ec86a309-9b06-48e2-9adc-35753f06bc0a_Food3BU.png",
                "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/23/b5c57bbf-df54-4dad-95d1-62e3a7a8424d_IM3BU.png",
                "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/23/b6d9b7ab-91c7-4f72-9bf2-fcd4ceec3537_DO3BU.png",
              ].map((src, i) => (
                <img
                  key={i}
                  className="w-[150px] sm:w-[220px] md:w-[280px] h-[150px] sm:h-[220px] md:h-[290px] object-cover rounded-lg flex-shrink-0"
                  src={src}
                  alt={`Food ${i + 1}`}
                />
              ))}
            </div>
          </div>

          <img
            className="hidden lg:block absolute -right-6 md:-right-20 w-[250px] sm:w-[300px] lg:w-[350px] h-auto object-contain"
            src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/testing/seo-home/Sushi_replace.png"
            alt="Sushi"
          />
        </div>
      </header>

      {/* Sections */}
      <section className="bg-white min-h-screen">
        <FoodCategories />
      </section>
      <section className="min-h-screen">
        <GrocerySlider />
      </section>
      <section className="min-h-screen">
        <RestaurantCardSlider />
      </section>

      <section>
        <img
          className="w-full object-cover"
          src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/m/seo/App_download_banner.png"
          alt="App Banner"
        />
      </section>

      <Footer />

      {/* Modals */}
      {showLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center">
          <Login closeModal={() => setShowLogin(false)} />
        </div>
      )}
      {showSignUp && <SignUpModal closeModal={() => setShowSignUp(false)} />}
    </>
  );
}

export default Dashboardselector;
