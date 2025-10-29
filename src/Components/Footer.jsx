// src/components/Footer.jsx
import React from "react";

import {
  FaInstagram,
  FaFacebookF,
  FaPinterestP,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-800 pt-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 text-sm">
        <div className="col-span-2 md:col-span-1">
          <img
            src="https://media-assets.swiggy.com/portal/testing/seo-home/Group.svg"
            alt="Swiggy"
            className="h-10  mb-2"
          />
          <p className="text-xs mt-1">© 2025 Swiggy Limited</p>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Company</h4>
          <ul className="space-y-1 text-sm">
            <li>About Us</li>
            <li>Swiggy Corporate</li>
            <li>Careers</li>
            <li>Team</li>
            <li>Swiggy One</li>
            <li>Swiggy Instamart</li>
            <li>Swiggy Dineout</li>
            <li>Minis</li>
            <li>Pyng</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Contact us</h4>
          <ul className="space-y-1 text-sm">
            <li>Help & Support</li>
            <li>Partner With Us</li>
            <li>Ride With Us</li>
          </ul>
          <h4 className="font-semibold mt-4 mb-2">Legal</h4>
          <ul className="space-y-1 text-sm">
            <li>Terms & Conditions</li>
            <li>Cookie Policy</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Available in:</h4>
          <ul className="space-y-1 text-sm">
            <li>Bangalore</li>
            <li>Gurgaon</li>
            <li>Hyderabad</li>
            <li>Delhi</li>
            <li>Mumbai</li>
            <li>Pune</li>
            <li>
              <select className="mt-1 border border-gray-300 rounded px-2 py-1">
                <option>685 cities</option>
              </select>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Life at Swiggy</h4>
          <ul className="space-y-1 text-sm">
            <li>Explore With Swiggy</li>
            <li>Swiggy News</li>
            <li>Snackables</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Social Links</h4>
          <div className="flex space-x-3 text-lg mt-2">
            <FaLinkedinIn />
            <FaInstagram />
            <FaFacebookF />
            <FaPinterestP />
            <FaTwitter />
          </div>
        </div>
      </div>
      

      <div className="border-t mt-10 pt-6 pb-10 text-center disply-flex">
        <p className="text-base font-medium mb-4">
          For better experience, download the Swiggy app now
        </p>
        <div className="flex justify-center gap-4">
          <img
            src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_200,h_65/icon-AppStore_lg30tv"
            alt="App Store"
            className="h-15"
          />
          <img
            src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_200,h_65/icon-GooglePlay_1_zixjxl"
            alt="Google Play"
            className="h-15"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
