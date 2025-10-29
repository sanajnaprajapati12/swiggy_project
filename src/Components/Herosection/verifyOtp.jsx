import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const OtpLogin = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const baseURL = import.meta.env.VITE_API_BASE_URL;

  // Pre-fill mobile number from SignUp
  useEffect(() => {
    if (location.state?.mobile) {
      setMobile(location.state.mobile);
    } else {
      navigate("/signup"); // redirect if no mobile
    }
  }, [location.state, navigate]);

  // Verify OTP
  const verifyOtp = async () => {
    if (!otp) {
      setError("Please enter OTP.");
      return;
    }
    try {
      setLoading(true);
      setError("");
      const res = await fetch(`${baseURL}/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile, otp }),
      });
      console.log(res)
      const data = await res.json();

      if (data.success) {
        alert("Login successful ✅");
        navigate("/Dashboard-selector"); // only navigate on success
      } else {
        setError(data.message || "Invalid OTP. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50">
      {/* Right-side sliding panel */}
      <div className="fixed right-0 top-0 h-full w-full sm:w-[400px] bg-white shadow-xl p-8 overflow-y-auto transform transition-transform duration-300 ease-in-out translate-x-0">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Verify OTP
        </h2>

        <label className="block text-gray-600 text-sm mb-1">
          Mobile Number
        </label>
        <input
          type="text"
          value={mobile}
          readOnly
          className="w-full p-3 mb-4 border border-gray-300 rounded-md bg-gray-100 text-gray-700 focus:outline-none"
        />

        <label className="block text-gray-600 text-sm mb-1">Enter OTP</label>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
        />

        <button
          onClick={verifyOtp}
          disabled={loading}
          className="w-full bg-orange-500 text-white py-3 rounded-md font-medium hover:bg-orange-600 transition disabled:opacity-50"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        {error && (
          <p className="text-red-500 text-sm mt-3 text-center">{error}</p>
        )}

        <p className="text-xs text-gray-500 text-center mt-6">
          By continuing, you agree to our{" "}
          <span className="text-blue-500 underline cursor-pointer">
            Terms & Conditions
          </span>{" "}
          and{" "}
          <span className="text-blue-500 underline cursor-pointer">
            Privacy Policy
          </span>
          .
        </p>
      </div>
    </div>
  );
};

export default OtpLogin;
