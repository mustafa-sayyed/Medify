import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router";
import {
  Login,
  Signup,
  Home,
  ForgotPassword,
  ResetPassword,
  Dashboard,
  NotFound,
} from "./pages";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import fetchCurrentUser from "./utils/fetchCurrentUser";
import { useDispatch } from "react-redux";
import { login, logout } from "./features/userSlice";
import { useQuery } from "@tanstack/react-query";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

function App() {
  // const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // API calls to get the User
  const { isLoading, data, error, isError, isSuccess } = useQuery({
    queryKey: ["user"],
    queryFn: fetchCurrentUser,
    staleTime: 5000,
    refetchOnWindowFocus: false,
    retry: false,
  });

  if (isSuccess) {
    dispatch(login(data.user));
    console.log(data);
  }

  if (isError) {
    console.log(error);
    dispatch(logout());
    localStorage.removeItem("token");
  }

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster position="top-right" />
    </>
  );
}

export default App;
