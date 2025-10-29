import React, { useState } from "react";
import FoodCategories from "./Card";
import Footer from "../Footer";
import { GoArrowUpRight } from "react-icons/go";
import GrocerySlider from "./Card2";
import RestaurantCardSlider from "./Card3";
import { NavLink } from "react-router-dom";
import SignUpModal from "../Signup";
import Login from "../Login";
import { useSelector } from "react-redux";
import { HiLocationMarker } from "react-icons/hi";
import { FiSearch } from "react-icons/fi";
import "./Logo.css";

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const { user, isAuthenticated } = useSelector((state) => state.user);

  let dashboardRoute = "/login";
  if (isAuthenticated && user) {
    if (user.role === "admin") dashboardRoute = "/admin/dashboard";
    else if (user.role === "owner") dashboardRoute = "/dashboard";
    else if (user.role === "user") dashboardRoute = "/user/dashboard";
  }

  return (
    <>
      {/* Navbar */}
      <header className="bg-blue-400 shadow-md relative overflow-hidden w-full container-normal">
        <div className="max-w-7xl mx-auto w-full px-3 sm:px-6 md:px-8 lg:px-10 py-3 flex items-center justify-between">
          <div className="logo text-white text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-bold">
            Bite<span className="rush">Rush</span>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-3 sm:space-x-4 md:space-x-6 lg:space-x-8">
            <a
              href="#"
              className="text-white hover:underline font-bold text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl"
            >
              Swiggy Corporate
            </a>
            <a
              href="#"
              className="text-white hover:underline font-bold text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl"
            >
              Partner with us
            </a>
            <button className="flex items-center gap-1 sm:gap-2 border border-white text-white px-2 sm:px-3 md:px-5 py-1 sm:py-1.5 md:py-2 font-bold rounded-xl sm:rounded-2xl hover:bg-white hover:text-orange-600 text-xs sm:text-sm md:text-base lg:text-lg">
              Get the App <GoArrowUpRight />
            </button>
            {user?.loggedIn ? (
              <NavLink to={dashboardRoute}>
                <button className="bg-black text-white px-3 sm:px-4 md:px-6 py-1 sm:py-1.5 md:py-2 rounded-xl sm:rounded-2xl hover:opacity-90 text-xs sm:text-sm md:text-base lg:text-lg">
                  Dashboard
                </button>
              </NavLink>
            ) : (
              <button
                className="bg-black text-white px-3 sm:px-4 md:px-6 py-1 sm:py-1.5 md:py-2 rounded-xl sm:rounded-2xl hover:opacity-90 text-xs sm:text-sm md:text-base lg:text-lg"
                onClick={() => setShowLogin(true)}
              >
                Sign In
              </button>
            )}
          </nav>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-white"
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
          <div className="md:hidden bg-orange-600 px-3 sm:px-4 pb-3 sm:pb-4 space-y-1 sm:space-y-2">
            <a
              href="#"
              className="block text-white py-1 sm:py-2 hover:underline text-sm sm:text-base"
            >
              Swiggy Corporate
            </a>
            <a
              href="#"
              className="block text-white py-1 sm:py-2 hover:underline text-sm sm:text-base"
            >
              Partner with us
            </a>
            <button className="flex items-center gap-2 border border-white text-white px-3 sm:px-5 py-2 sm:py-3 font-bold rounded-xl sm:rounded-2xl hover:bg-white hover:text-orange-600 text-sm sm:text-base">
              Get the App <GoArrowUpRight />
            </button>
            <button
              className="w-full bg-black text-white px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-bold rounded-xl sm:rounded-2xl hover:opacity-90"
              onClick={() => setShowLogin(true)}
            >
              Sign In
            </button>
          </div>
        )}

        {/* Hero Section */}
        {/* <div className="relative flex flex-col lg:flex-row items-center justify-between min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] px-2 sm:px-4 md:px-8 lg:px-12 max-w-7xl mx-auto w-full"> */}
        <div className="relative flex flex-col lg:flex-row items-center justify-between min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] px-2 sm:px-4 md:px-8 lg:px-12 max-w-7xl mx-auto w-full overflow-hidden">
          {/* Left Image */}
          <div className="hidden lg:flex justify-center items-center flex-shrink-0">
            <img
              className="max-w-[160px] md:max-w-[200px] lg:max-w-[220px] xl:max-w-[240px] object-contain"
              src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/testing/seo-home/Veggies_new.png"
              alt="Veggies"
            />
          </div>

          {/* Center Content */}
          <div className="flex flex-col justify-center items-center text-center z-10 w-full max-w-xl sm:max-w-2xl md:max-w-3xl px-2 sm:px-4">
            <h1 className="text-base sm:text-lg md:text-2xl lg:text-4xl xl:text-5xl font-bold text-white leading-snug">
              Order food & groceries. Discover <br /> best restaurants. BiteRush
              it!
            </h1>

            {/* Inputs */}
            <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row justify-center gap-2 sm:gap-3 w-full max-w-[600px]">
              <div className="relative w-full sm:w-[45%]">
                <HiLocationMarker className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-orange-600 text-base sm:text-lg md:text-xl" />
                <input
                  type="text"
                  placeholder="Enter your location"
                  className="pl-8 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 w-full rounded-lg sm:rounded-xl text-sm sm:text-base md:text-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div className="relative w-full sm:w-[55%]">
                <FiSearch className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-base sm:text-lg md:text-xl" />
                <input
                  type="text"
                  placeholder="Search for restaurants, items or more"
                  className="pl-8 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 w-full rounded-lg sm:rounded-xl text-sm sm:text-base md:text-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            {/* Food Banner Scroll */}
            <div className="mt-6 sm:mt-8 flex gap-2 sm:gap-4 overflow-x-auto w-full px-1 sm:px-2 scrollbar-hide">
              {[
                "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/23/ec86a309-9b06-48e2-9adc-35753f06bc0a_Food3BU.png",
                "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/23/b5c57bbf-df54-4dad-95d1-62e3a7a8424d_IM3BU.png",
                "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/23/b6d9b7ab-91c7-4f72-9bf2-fcd4ceec3537_DO3BU.png",
              ].map((src, idx) => (
                <img
                  key={idx}
                  className="w-[100px] h-[100px] sm:w-[140px] sm:h-[140px] md:w-[160px] md:h-[160px] lg:w-[180px] lg:h-[180px] xl:w-[200px] xl:h-[200px] object-cover rounded-lg flex-shrink-0"
                  src={src}
                  alt={`Food ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div className="hidden lg:flex justify-center items-center flex-shrink-0">
            <img
              className="max-w-[160px] md:max-w-[200px] lg:max-w-[220px] xl:max-w-[240px] object-contain"
              src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/testing/seo-home/Sushi_replace.png"
              alt="Sushi"
            />
          </div>
        </div>
      </header>

      {/* Sections */}
      <section className="py-6 sm:py-8 md:py-10 px-2 sm:px-4 md:px-6 lg:px-8 bg-white max-w-7xl mx-auto w-full">
        <FoodCategories />
      </section>

      <section className="py-6 sm:py-8 md:py-10 px-2 sm:px-4 md:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <GrocerySlider />
      </section>

      <section className="py-6 sm:py-8 md:py-10 px-2 sm:px-4 md:px-6 lg:px-8 bg-white max-w-7xl mx-auto w-full">
        <RestaurantCardSlider />
      </section>

      {/* App Banner */}
      <div className="w-full">
        <img
          src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/m/seo/App_download_banner.png"
          alt="App Banner"
          className="w-full object-contain"
        />
      </div>

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

export default Home;
