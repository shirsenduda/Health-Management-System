import React, { useContext, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AdminContext } from "./Context/AdminContext";
import { DoctorContext } from "./Context/DoctorContext";

import Login from "./Pages/Login";
import Nav from "./Componets/Nav";
import Dashboard from "./Pages/Admin/Dashboard";
import AllAppointments from "./Pages/Admin/AllAppointments";
import AddDoctor from "./Pages/Admin/AddDoctor";
import DoctorList from "./Pages/Admin/DoctorList";
import SideBar from "./Componets/Sidebar";
import DocDashboard from "./Pages/Doctor/docDashboard";
import DocProfile from "./Pages/Doctor/DocProfile";
import DocAllAppointments from "./Pages/Doctor/DocAllAppointments";
import DocMessageSection from "./Pages/Doctor/DocMessageSection";

const App = () => {
  const { aToken } = useContext(AdminContext);
  const { doctorToken } = useContext(DoctorContext);
  const [isShrunk, setIsShrunk] = useState(false);

  // ✅ Show login only if no one is logged in
  if (!aToken && !doctorToken) {
    return (
      <>
        <ToastContainer />
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <Login />
        </div>
      </>
    );
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="bg-[#F8F9FD] h-screen w-full">
        <Nav isShrunk={isShrunk} setIsShrunk={setIsShrunk} />
        <div className="flex min-h-screen">
          <SideBar isShrunk={isShrunk} />
          <main className="flex-1 p-4 sm:p-6 overflow-auto">
            <Routes>
              {/* Admin Routes */}
              {aToken && (
                <>
                  <Route path="/" element={<Navigate to="/admin-dashboard" />} />
                  <Route path="/admin-dashboard" element={<Dashboard />} />
                  <Route path="/all-appointments" element={<AllAppointments />} />
                  <Route path="/add-doctor" element={<AddDoctor />} />
                  <Route path="/doctor-list" element={<DoctorList />} />
                  <Route path="*" element={<Navigate to="/admin-dashboard" />} />
                </>
              )}

              {/* Doctor Routes */}
              {doctorToken && (
                <>
                  <Route path="/" element={<Navigate to="/doctor-dashboard" />} />
                  <Route path="/doctor-dashboard" element={<DocDashboard />} />
                  <Route path="/doctor-Profile" element={<DocProfile/>} />
                  <Route path="/doctor-Appointment" element={<DocAllAppointments />} />
                  <Route path="/doctor-message" element={<DocMessageSection/>} />
                </>
              )}
            </Routes>
          </main>
        </div>
      </div>
    </>
  );
};

export default App;
