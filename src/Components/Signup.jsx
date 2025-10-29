import React, { useState } from "react";
import axios from "axios";
import react from "react";
import { NavLink, useNavigate } from "react-router-dom";

const SignUpModal = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    role: "user", // default
  });

  const [errors, setErrors] = useState({});
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  // Validation
  const validate = () => {
    const newErrors = {};
    const mobileRegex = /^[6-9]\d{9}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) newErrors.name = "Enter your name";
    if (!formData.email) newErrors.email = "Enter your email";
    else if (!emailRegex.test(formData.email))
      newErrors.email = "Invalid email";
    if (!formData.password || formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (!formData.mobile) newErrors.mobile = "Enter your mobile number";
    else if (!mobileRegex.test(formData.mobile))
      newErrors.mobile = "Invalid mobile number";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      // ✅ Register API
      await axios.post(`${API_BASE}/register`, formData, {
        headers: { "Content-Type": "application/json" },
      });

      // ✅ Send OTP after signup
      await axios.post(`${API_BASE}/send-otp`, { mobile: formData.mobile });

      alert("✅ Account created. OTP sent to your mobile.");

      // redirect to OTP page & pass mobile number
      navigate("/otpLogin", { state: { mobile: formData.mobile } });

      // reset form
      setFormData({
        name: "",
        email: "",
        mobile: "",
        password: "",
        role: "user",
      });
    } catch (err) {
      alert("❌ " + (err.response?.data?.message || "Signup failed"));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-end z-50">
      <div className="bg-white w-[1000px] max-w-md h-full shadow-xl p-8 overflow-y-auto relative">
        {/* Close Button */}
        <NavLink to="/">
          <button className="text-4xl text-gray-600 absolute top-4 left-4">
            ×
          </button>
        </NavLink>

        {/* Logo / Image */}
        <img
          className="w-[90px] h-[90px] mx-auto mt-8"
          src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r"
          alt="signup-img"
        />

        <h2 className="text-2xl font-bold mt-6 mb-1">Sign Up</h2>
        <p className="text-sm mb-4">
          or{" "}
          <NavLink to="/login">
            <span className="text-orange-500 cursor-pointer">
              login to your account
            </span>
          </NavLink>
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={`w-full px-6 py-5 border ${
              errors.name ? "border-red-500 text-red-500" : "border-gray-300"
            } rounded focus:outline-none`}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className={`w-full px-6 py-5 border ${
              errors.email ? "border-red-500 text-red-500" : "border-gray-300"
            } rounded focus:outline-none`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}

          {/* Mobile */}
          <input
            type="text"
            placeholder="Mobile number"
            value={formData.mobile}
            onChange={(e) =>
              setFormData({ ...formData, mobile: e.target.value })
            }
            className={`w-full px-6 py-5 border ${
              errors.mobile ? "border-red-500 text-red-500" : "border-gray-300"
            } rounded focus:outline-none`}
          />
          {errors.mobile && (
            <p className="text-red-500 text-sm">{errors.mobile}</p>
          )}

          {/* Password */}
          <input
            type="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className={`w-full px-6 py-5 border ${
              errors.password
                ? "border-red-500 text-red-500"
                : "border-gray-300"
            } rounded focus:outline-none`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-4 mt-6 font-semibold rounded hover:bg-orange-700 transition"
          >
            SIGN UP
          </button>

          <p className="text-xs text-gray-500 mt-4 text-center">
            By clicking on Sign Up, I accept the{" "}
            <span className="font-semibold">Terms & Conditions</span> &{" "}
            <span className="font-semibold">Privacy Policy</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUpModal;
