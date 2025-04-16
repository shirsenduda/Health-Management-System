import React, { useContext } from "react";
import { AdminContext } from "../Context/AdminContext";
import { useNavigate } from "react-router-dom";
import { HiOutlineMenu } from "react-icons/hi";
import { FaUserCircle } from "react-icons/fa";

const Nav = ({ isShrunk, setIsShrunk }) => {
  const { aToken, setAToken } = useContext(AdminContext);
  const navigate = useNavigate();

  const logout = () => {
    setAToken("");
    localStorage.removeItem("aToken");
    navigate("/");
  };

  return (
    <nav className="bg-white px-6 py-4 flex justify-between items-center shadow-md border-b border-gray-200">
      {/* Left: Logo + Hamburger (desktop only) */}
      <div className="flex items-center gap-4">
        <img
          src="/assets/assets_frontend/logo.png"
          alt="VitalCare Logo"
          className="w-36 sm:w-40 cursor-pointer"
        />
        <div className="hidden md:block">
          <HiOutlineMenu
            className="text-2xl cursor-pointer text-gray-700"
            onClick={() => setIsShrunk(!isShrunk)}
          />
        </div>
      </div>

      {/* Right: Profile + Logout */}
      <div className="flex items-center gap-4 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200">
        <div className="flex items-center gap-2">
          <FaUserCircle className="text-3xl text-blue-600" />
          <div className="flex flex-col leading-tight">
            <p className="text-sm text-gray-500 font-medium">Welcome</p>
            {aToken ? (
              <p className="text-base font-semibold text-gray-800">Admin</p>
            ) : (
              <p className="text-base font-semibold text-gray-800">Doctor</p>
            )}
          </div>
        </div>

        <button
          onClick={logout}
          className="ml-4 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-full shadow-md transition duration-300"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Nav;
