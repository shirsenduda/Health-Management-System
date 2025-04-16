import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import { AdminContext } from "../Context/AdminContext";
import { toast } from "react-toastify";

const Login = () => {
  const [userType, setUserType] = useState("Admin");
  const { setAToken, backendUrl } = useContext(AdminContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // ✅ Initialize navigation

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const endpoint = userType === "Admin" ? "/api/admin/login" : "/api/doctor/login";
      const { data } = await axios.post(`${backendUrl}${endpoint}`, { email, password });

      if (data.success && data.token) {
        console.log("Token received:", data.token);
        localStorage.setItem("aToken", data.token);
        setAToken(data.token); // ✅ Update context state

        toast.success("Login successful! Redirecting...");
        setTimeout(() => navigate("/admin-panel"), 1000); // ✅ Redirect user
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Login error:", error.response?.data?.message || error.message);
      toast.error("Login failed! Please check your credentials.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md"
      >
        <div className="text-center mb-6">
          <p className="text-xl font-semibold text-gray-700">{userType} Login</p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Login
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          {userType === "Admin" ? "Doctor Login?" : "Admin Login?"}{" "}
          <span
            className="cursor-pointer underline text-blue-500 hover:text-blue-600"
            onClick={() => setUserType(userType === "Admin" ? "Doctor" : "Admin")}
          >
            Click here
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
