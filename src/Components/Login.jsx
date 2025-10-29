// src/pages/Login.jsx
import React, { useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/userslice"; // ✅ import action

const Login = () => {
  const navigate = useNavigate();
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const mobileRegex = /^[6-9]\d{9}$/;

    if (!mobile) return setError("Mobile number is required");
    if (!mobileRegex.test(mobile)) return setError("Enter a valid 10-digit Indian mobile number");
    if (!password) return setError("Password is required");

    setError("");

    try {
      const response = await axios.post(`${API_BASE}/login`, {
        mobile,
        password,
        
      });

      // Save token in cookies
      Cookies.set("token", response.data.token, { expires: 7 });
      // Cookies.set("token", response.data.token, { expires: 2, sameSite: "strict" });
      Cookies.set("role", response.data.user?.role);

      // ✅ Save login response in Redux
      dispatch(
        loginSuccess({
          user: response.data.user,
          token: response.data.token,
        })
      );

      alert(response.data.message || "Login successful ✅");

      const role = response.data.user?.role;
      if (role) {
        navigate("/Dashboard-selector");
        
      } 

    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
     
  }
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-end z-50">
      <div className="bg-white w-[1000px] max-w-md h-full shadow-xl p-8 overflow-y-auto">
        <NavLink to="/">
          {" "}
          <button className="text-4xl float-left text-gray-600">x</button>
        </NavLink>{" "}
        <img
          className="w-[90px] h-[90px] flex ml-60"
          src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r"
        />
        <h2 className="text-2xl font-bold mb-1">Login</h2>
        <p className="text-sm mb-4 ">
          or{" "}
          <NavLink
            to="/Signin"
            className="text-sm mb-4 text-orange-600"
            onClick={() => {
              setShowLogin(false);
              setShowSignUp(true);
            }}
          >
            create an account
          </NavLink>
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Mobile number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className={`w-full px-6 py-5 border mt-10 ${
                error ? "border-red-500 text-red-500" : "border-gray-300"
              } rounded focus:outline-none`}
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-6 py-5 border mt-4 ${
                error ? "border-red-500 text-red-500" : "border-gray-300"
              } rounded focus:outline-none`}
            />
          </div>

          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-4 mt-10 font-semibold rounded hover:bg-orange-600 transition"
          >
            LOGIN
          </button>
          <p className="text-xs text-black-400 mt-4 text-center">
            By clicking on Login, I accept the{" "}
            <span className="font-semibold">Terms & Conditions</span> &{" "}
            <span className="font-semibold">Privacy Policy</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
