import { createSlice } from "@reduxjs/toolkit";

// Check if user is already in localStorage
const user = JSON.parse(localStorage.getItem("user")) || null;
const token = localStorage.getItem("token") || null;

const initialState = {
  user: user,
  token: token,
  isAuthenticated: !!token,
  status: "idle", // "idle" | "loading" | "success" | "error"
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;

      // Save to localStorage
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;

      // Remove from localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});

export const { loginSuccess, logout } = userSlice.actions;
export default userSlice.reducer;
